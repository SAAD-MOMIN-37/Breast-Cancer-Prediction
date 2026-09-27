"""Cancer Prediction Service"""
import pickle
import os
from pathlib import Path
import numpy as np
import pandas as pd

MODELS_DIR = Path(__file__).resolve().parent.parent / "models"

# Loaded at startup
scaler = None
label_encoder = None
feature_names = None
feature_name_map = {}
voting_model = None
logistic_model = None


def load_models():
    global scaler, label_encoder, feature_names, feature_name_map, voting_model, logistic_model
    with open(MODELS_DIR / "scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    with open(MODELS_DIR / "label_encoder.pkl", "rb") as f:
        label_encoder = pickle.load(f)
    with open(MODELS_DIR / "feature_names.pkl", "rb") as f:
        feature_names = pickle.load(f)
    # Create mapping from Pydantic field names (underscores) to original feature names (spaces)
    if isinstance(feature_names, list):
        feature_name_map = {name.replace(' ', '_'): name for name in feature_names}
    else:
        feature_name_map = {}
    with open(MODELS_DIR / "voting_classifier.pkl", "rb") as f:
        voting_model = pickle.load(f)
    with open(MODELS_DIR / "best_model_Logistic_Regression.pkl", "rb") as f:
        logistic_model = pickle.load(f)


def predict_cancer(features: dict) -> dict:
    """Predict cancer diagnosis from 30 features"""
    # Map Pydantic field names (underscores) to original feature names (spaces)
    mapped_features = {feature_name_map.get(k, k): v for k, v in features.items()}
    # Build DataFrame in correct feature order
    features_df = pd.DataFrame([mapped_features], columns=feature_names)
    features_scaled = scaler.transform(features_df)
    features_scaled = np.asarray(features_scaled)

    prediction = voting_model.predict(features_scaled)[0]
    probability = voting_model.predict_proba(features_scaled)[0]

    diagnosis = label_encoder.inverse_transform([prediction])[0]
    diagnosis_text = "Malignant" if diagnosis == "M" else "Benign"

    return {
        "diagnosis": diagnosis_text,
        "confidence": float(probability[prediction]),
        "prob_benign": float(probability[0]),
        "prob_malignant": float(probability[1]),
    }