"""Breast Cancer Prediction API Routes."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from .service import predict_cancer


router = APIRouter(
    prefix="/api/cancer",
    tags=["Cancer Prediction"],
)


class CancerPredictRequest(BaseModel):
    radius_mean: float = Field(..., gt=0)
    texture_mean: float = Field(..., gt=0)
    perimeter_mean: float = Field(..., gt=0)
    area_mean: float = Field(..., gt=0)
    smoothness_mean: float = Field(..., gt=0)
    compactness_mean: float = Field(..., gt=0)
    concavity_mean: float = Field(..., gt=0)
    concave_points_mean: float = Field(..., gt=0)
    symmetry_mean: float = Field(..., gt=0)
    fractal_dimension_mean: float = Field(..., gt=0)

    radius_se: float = Field(..., gt=0)
    texture_se: float = Field(..., gt=0)
    perimeter_se: float = Field(..., gt=0)
    area_se: float = Field(..., gt=0)
    smoothness_se: float = Field(..., gt=0)
    compactness_se: float = Field(..., gt=0)
    concavity_se: float = Field(..., gt=0)
    concave_points_se: float = Field(..., gt=0)
    symmetry_se: float = Field(..., gt=0)
    fractal_dimension_se: float = Field(..., gt=0)

    radius_worst: float = Field(..., gt=0)
    texture_worst: float = Field(..., gt=0)
    perimeter_worst: float = Field(..., gt=0)
    area_worst: float = Field(..., gt=0)
    smoothness_worst: float = Field(..., gt=0)
    compactness_worst: float = Field(..., gt=0)
    concavity_worst: float = Field(..., gt=0)
    concave_points_worst: float = Field(..., gt=0)
    symmetry_worst: float = Field(..., gt=0)
    fractal_dimension_worst: float = Field(..., gt=0)


class CancerPredictResponse(BaseModel):
    diagnosis: str
    confidence: float
    prob_benign: float
    prob_malignant: float


@router.post(
    "/predict",
    response_model=CancerPredictResponse,
)
async def predict(request: CancerPredictRequest):
    try:
        return predict_cancer(request.model_dump())
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(exc)}",
        ) from exc