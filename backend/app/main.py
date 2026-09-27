"""Breast Cancer Prediction FastAPI Application."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .router import router
from .service import load_models


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML artifacts when the API starts."""
    load_models()
    print("Breast Cancer Prediction models loaded successfully.")
    yield


app = FastAPI(
    title="Breast Cancer Prediction API",
    description=(
        "Machine learning API for breast cancer diagnosis "
        "prediction using an ensemble classifier."
    ),
    version="2.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
async def root():
    return {
        "name": "Breast Cancer Prediction API",
        "status": "running",
        "version": "2.0.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "breast-cancer-prediction",
    }