"""Breast Cancer Prediction Service."""

import pickle
from pathlib import Path

import numpy as np
import pandas as pd


MODELS_DIR = Path(__file__).resolve().parent.parent / "models"

scaler = None
label_encoder = None
feature_names = None
voting_model = None
logistic_model = None


def load_models() -> None:
    """Load all trained artifacts required for inference."""
    global scaler, label_encoder, feature_names
    global voting_model, logistic_model

    with open(MODELS_DIR / "scaler.pkl", "rb") as file:
        scaler = pickle.load(file)

    with open(MODELS_DIR / "label_encoder.pkl", "rb") as file:
        label_encoder = pickle.load(file)

    with open(MODELS_DIR / "feature_names.pkl", "rb") as file:
        feature_names = pickle.load(file)

    with open(MODELS_DIR / "voting_classifier.pkl", "rb") as file:
        voting_model = pickle.load(file)

    with open(MODELS_DIR / "best_model_Logistic_Regression.pkl", "rb") as file:
        logistic_model = pickle.load(file)

def predict_cancer(features: dict) -> dict:
    """Generate a breast cancer prediction from 30 input features."""

    if any(
        artifact is None
        for artifact in (
            scaler,
            label_encoder,
            feature_names,
            voting_model,
        )
    ):
        raise RuntimeError("Prediction models are not loaded.")

    # Map API-friendly feature names to the exact names
    # stored in the trained model's feature_names.pkl.
    feature_name_mapping = {
        "concave points_mean": "concave_points_mean",
        "concave points_se": "concave_points_se",
        "concave points_worst": "concave_points_worst",
    }

    # Preserve the exact feature order used during training.
    input_values = []

    for model_feature in feature_names:
        api_feature = feature_name_mapping.get(
            model_feature,
            model_feature,
        )

        if api_feature not in features:
            raise ValueError(
                f"Missing required feature: {api_feature}"
            )

        input_values.append(features[api_feature])

    features_df = pd.DataFrame(
        [input_values],
        columns=feature_names,
    )

    scaled_features = scaler.transform(features_df)
    scaled_features = np.asarray(scaled_features)

    prediction = int(voting_model.predict(scaled_features)[0])
    probabilities = voting_model.predict_proba(scaled_features)[0]

    # Convert encoded class back to original label.
    encoded_label = label_encoder.inverse_transform([prediction])[0]

    diagnosis = (
        "Malignant"
        if encoded_label == "M"
        else "Benign"
    )

    # Map probabilities using model class indices.
    class_probability = {
        int(class_id): float(probability)
        for class_id, probability in zip(
            voting_model.classes_,
            probabilities,
        )
    }

    prob_benign = class_probability.get(0, 0.0)
    prob_malignant = class_probability.get(1, 0.0)

    return {
        "diagnosis": diagnosis,
        "confidence": float(
            class_probability[prediction]
        ),
        "prob_benign": prob_benign,
        "prob_malignant": prob_malignant,
    }
