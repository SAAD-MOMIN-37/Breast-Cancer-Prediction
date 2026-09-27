# 🩺 Breast Cancer Prediction System

![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML%20Model-F7931E?style=for-the-badge&logo=scikit-learn)
![XGBoost](https://img.shields.io/badge/XGBoost-Gradient%20Boosting-EB0028?style=for-the-badge)

A full-stack machine learning application that predicts whether a breast tumor is **Benign** or **Malignant** using 30 diagnostic features from the Wisconsin Breast Cancer dataset.

The system combines a trained ensemble machine learning model with a **FastAPI backend** and a modern **React + TypeScript frontend** to provide real-time predictions, confidence scores, and probability distributions.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Input Features](#input-features)
- [Model Artifacts](#model-artifacts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Frontend Setup](#frontend-setup)
- [API](#api)
- [Application Workflow](#application-workflow)
- [Application Interface](#application-interface)
- [Engineering Highlights](#engineering-highlights)
- [Backend Dependencies](#backend-dependencies)
- [Future Improvements](#future-improvements)
- [Disclaimer](#disclaimer)
- [Author](#author)
- [Project Highlights](#project-highlights)
- [License](#license)

---

<a id="overview"></a>
## 🚀 Overview

The application accepts 30 numerical diagnostic features describing characteristics of cell nuclei obtained from breast mass measurements.

The input is processed through the same preprocessing pipeline used during model training and passed to a trained ensemble classifier.

The application returns:

- 🟢 Benign / 🔴 Malignant diagnosis
- 📊 Prediction confidence
- 📈 Benign probability
- 📉 Malignant probability

> **Disclaimer:** This project is intended for educational and demonstration purposes only. It is not a medical diagnostic tool and should not be used for clinical decision-making.

---

<a id="features"></a>
## ✨ Features

- 🧠 Machine learning based breast cancer prediction
- 🤖 Ensemble classification model
- ⚡ FastAPI REST API
- ⚛️ React + TypeScript frontend
- 📊 Prediction confidence and probability distribution
- 🧮 30-feature diagnostic input form
- 🧪 Sample patient values for quick testing
- 🔄 Real-time frontend → API prediction workflow
- 📦 Serialized ML model artifacts
- 🔒 CORS-enabled API
- 🩻 Educational medical prediction interface

---

<a id="system-architecture"></a>
## 🏗️ System Architecture

```text
┌───────────────────────────────┐
│        React Frontend         │
│       TypeScript + CSS        │
└───────────────┬───────────────┘
                │
                │ HTTP POST
                ▼
┌───────────────────────────────┐
│        FastAPI Backend        │
│                               │
│  Request Validation           │
│  Feature Preparation          │
│  Prediction Service           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Preprocessing Pipeline    │
│                               │
│  Feature Ordering              │
│  Standard Scaling              │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Ensemble ML Classifier    │
│                               │
│     Voting Classifier         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Prediction Result       │
│                               │
│  Diagnosis                     │
│  Confidence                    │
│  Benign Probability            │
│  Malignant Probability         │
└───────────────────────────────┘
```

---

<a id="machine-learning-pipeline"></a>
## 🧠 Machine Learning Pipeline

```text
30 Diagnostic Features
          │
          ▼
   Feature Validation
          │
          ▼
    Feature Ordering
          │
          ▼
      StandardScaler
          │
          ▼
   Ensemble Classifier
          │
          ▼
    Class Prediction
          │
          ▼
 Probability Estimation
          │
          ▼
   Benign / Malignant
```

The application preserves the feature order used during model training before applying the saved scaler and classifier.

---

<a id="input-features"></a>
## 📊 Input Features

The model uses 30 diagnostic features divided into three groups:

### Mean Features

* radius_mean
* texture_mean
* perimeter_mean
* area_mean
* smoothness_mean
* compactness_mean
* concavity_mean
* concave_points_mean
* symmetry_mean
* fractal_dimension_mean

### Standard Error Features

* radius_se
* texture_se
* perimeter_se
* area_se
* smoothness_se
* compactness_se
* concavity_se
* concave_points_se
* symmetry_se
* fractal_dimension_se

### Worst Features

* radius_worst
* texture_worst
* perimeter_worst
* area_worst
* smoothness_worst
* compactness_worst
* concavity_worst
* concave_points_worst
* symmetry_worst
* fractal_dimension_worst

---

<a id="model-artifacts"></a>
## 🤖 Model Artifacts

The trained machine learning artifacts are stored in:

```text
backend/models/
├── best_model_Logistic_Regression.pkl
├── feature_names.pkl
├── label_encoder.pkl
├── scaler.pkl
├── stacking_classifier.pkl
└── voting_classifier.pkl
```

### Artifact Purpose

| Artifact                             | Purpose                                     |
| ------------------------------------- | -------------------------------------------- |
| `voting_classifier.pkl`               | Main ensemble model used for prediction      |
| `stacking_classifier.pkl`             | Trained stacking ensemble artifact           |
| `best_model_Logistic_Regression.pkl`  | Logistic Regression model                    |
| `scaler.pkl`                          | Feature scaling                              |
| `feature_names.pkl`                   | Preserves training feature order             |
| `label_encoder.pkl`                   | Converts encoded classes to original labels  |

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* CSS

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### Machine Learning

* NumPy
* Pandas
* Scikit-learn
* XGBoost
* Imbalanced-learn
* Joblib

---

<a id="project-structure"></a>
## 📁 Project Structure

```text
PRJ Cancer Prediction/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── router.py
│   │   └── service.py
│   │
│   ├── models/
│   │   ├── best_model_Logistic_Regression.pkl
│   │   ├── feature_names.pkl
│   │   ├── label_encoder.pkl
│   │   ├── scaler.pkl
│   │   ├── stacking_classifier.pkl
│   │   └── voting_classifier.pkl
│   │
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── cancer.ts
│   │   │   └── client.ts
│   │   │
│   │   ├── components/
│   │   │   ├── FeatureForm.tsx
│   │   │   └── ResultsCard.tsx
│   │   │
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

<a id="local-setup"></a>
## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/SAAD-MOMIN-37/Breast-Cancer-Prediction.git
cd Breast-Cancer-Prediction
```

---

### 2. Backend Setup

The project uses **Python 3.11**.

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

#### Windows

```powershell
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn app.main:app --reload --port 8001
```

Backend:

```text
http://localhost:8001
```

API documentation:

```text
http://localhost:8001/docs
```

---

<a id="frontend-setup"></a>
## 🎨 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL displayed by Vite, typically:

```text
http://localhost:5173
```

---

<a id="api"></a>
## 🔌 API

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "service": "breast-cancer-prediction"
}
```

---

### Prediction Endpoint

```http
POST /api/cancer/predict
```

The endpoint accepts the 30 diagnostic features and returns the model prediction.

Example response:

```json
{
  "diagnosis": "Malignant",
  "confidence": 1.0,
  "prob_benign": 0.0,
  "prob_malignant": 1.0
}
```

> Prediction probabilities represent the model output for the supplied input. They should not be interpreted as medical certainty.

---

<a id="application-workflow"></a>
## 🔄 Application Workflow

```text
User enters diagnostic measurements
                ↓
React Feature Form
                ↓
Axios API Request
                ↓
FastAPI Validation
                ↓
Feature Mapping & Ordering
                ↓
Saved Scaler
                ↓
Voting Classifier
                ↓
Prediction + Probabilities
                ↓
React Results Dashboard
```

---

<a id="application-interface"></a>
## 🖥️ Application Interface

The application provides a structured interface for entering the 30 diagnostic measurements and displays the prediction through a dedicated results panel.

### Main Interface

*Add your application screenshot here.*

```text
![Application Interface](docs/screenshots/app-interface.png)
```

### Prediction Result

*Add your prediction screenshot here.*

```text
![Prediction Result](docs/screenshots/prediction-result.png)
```

> Create the `docs/screenshots/` directory and add the screenshots before enabling these image previews.

---

<a id="engineering-highlights"></a>
## 🔍 Engineering Highlights

### Feature Order Preservation

The model expects features in the same order used during training. The backend therefore reconstructs the input according to the saved `feature_names.pkl` artifact before prediction.

### Input Validation

FastAPI + Pydantic validate incoming feature values before they reach the prediction service.

### Model Persistence

The application loads pre-trained serialized models and preprocessing artifacts during backend startup rather than training a model during inference.

### Full-Stack Integration

The project demonstrates an end-to-end ML application:

```text
Machine Learning Model
        ↓
Prediction Service
        ↓
REST API
        ↓
React Frontend
        ↓
Interactive Prediction Interface
```

---

<a id="backend-dependencies"></a>
## 📦 Backend Dependencies

Core backend dependencies include:

```text
FastAPI
Uvicorn
Pydantic
NumPy
Pandas
Scikit-learn
XGBoost
Imbalanced-learn
Joblib
```

---

<a id="future-improvements"></a>
## 🔮 Future Improvements

* Model performance monitoring
* Explainable AI using SHAP
* Feature importance visualization
* Prediction history
* Authentication and user accounts
* Cloud deployment
* Automated model versioning
* API rate limiting
* Production-grade logging
* Automated CI/CD pipeline

---

<a id="disclaimer"></a>
## ⚠️ Disclaimer

This project is developed for **educational, research, and software demonstration purposes**.

It is **not a medical diagnostic system** and should not be used to make clinical decisions. Any real-world medical application would require appropriate clinical validation, regulatory compliance, security controls, and professional medical oversight.

---

<a id="author"></a>
## 👨‍💻 Author

**Saad Momin**

Computer Engineering (AI & ML)

GitHub:
[https://github.com/SAAD-MOMIN-37](https://github.com/SAAD-MOMIN-37)

---

<a id="project-highlights"></a>
## ⭐ Project Highlights

* 🧠 Machine Learning powered classification
* 🤖 Ensemble model inference
* ⚡ FastAPI REST backend
* ⚛️ React + TypeScript frontend
* 📊 Probability-based prediction output
* 🔄 End-to-end ML application workflow
* 🧩 Modular backend architecture
* 📦 Production-style serialized model artifacts

---

<a id="license"></a>
## 📄 License

This project is intended for educational and portfolio purposes.
