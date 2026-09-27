# PRJ Cancer Prediction - Plan

## Overview
Breast cancer diagnosis prediction using ML ensemble (Voting Classifier + Stacking Classifier).

## Current State

### Backend (Complete)
- **FastAPI** app on `backend/`
  - `app/main.py` - FastAPI setup with CORS, startup model loading
  - `app/router.py` - `/api/cancer/predict` endpoint, 30-feature Pydantic models
  - `app/service.py` - Model loading + prediction logic
  - `run.py` - Entry point (uvicorn port 8001)
  - `requirements.txt` - fastapi, uvicorn, scikit-learn, pandas, numpy, imbalanced-learn, joblib
- **Models** (`backend/models/`)
  - `scaler.pkl`, `label_encoder.pkl`, `feature_names.pkl`
  - `voting_classifier.pkl`, `stacking_classifier.pkl`
  - `best_model_Logistic_Regression.pkl`

### Frontend (Incomplete)
- **React + Vite + TypeScript** in `frontend/`
  - `package.json` configured with react, axios, vite
  - `src/api/client.ts` - Axios client (localhost:8001)
  - `src/api/cancer.ts` - CancerFeatures interface + predictCancer API call
  - **Missing**: App.tsx, main.tsx, index.html, CSS, UI components

### Notebooks
- `PRJ Cancer Prediction Training.ipynb` - Complete training pipeline
- `PRJ Cancer Prediction Testing.ipynb` - Complete testing + interactive prediction

## Tasks

### 1. Complete Frontend
- [ ] Create `index.html`
- [ ] Create `main.tsx` entry point
- [ ] Create `App.tsx` with routing/layout
- [ ] Build feature input form (30 inputs, or simplified key features)
- [ ] Build prediction results display (diagnosis, confidence, probabilities)
- [ ] Add CSS styling (responsive, modern UI)
- [ ] Wire up API calls to backend

### 2. Testing
- [ ] Install frontend deps and run dev server
- [ ] Install backend deps and run FastAPI server
- [ ] Verify prediction flow end-to-end

## Run Commands
```bash
# Backend
cd backend && pip install -r requirements.txt && python run.py

# Frontend
cd frontend && npm install && npm run dev
```