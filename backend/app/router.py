"""Cancer Prediction API"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from .service import predict_cancer

router = APIRouter(prefix="/api/cancer", tags=["Cancer Prediction"])


class CancerPredictRequest(BaseModel):
    """30 breast cancer features"""
    radius_mean: float = Field(..., gt=0, description="Radius mean")
    texture_mean: float = Field(..., gt=0, description="Texture mean")
    perimeter_mean: float = Field(..., gt=0, description="Perimeter mean")
    area_mean: float = Field(..., gt=0, description="Area mean")
    smoothness_mean: float = Field(..., gt=0, description="Smoothness mean")
    compactness_mean: float = Field(..., gt=0, description="Compactness mean")
    concavity_mean: float = Field(..., gt=0, description="Concavity mean")
    concave_points_mean: float = Field(..., gt=0, description="Concave points mean")
    symmetry_mean: float = Field(..., gt=0, description="Symmetry mean")
    fractal_dimension_mean: float = Field(..., gt=0, description="Fractal dimension mean")
    radius_se: float = Field(..., gt=0, description="Radius SE")
    texture_se: float = Field(..., gt=0, description="Texture SE")
    perimeter_se: float = Field(..., gt=0, description="Perimeter SE")
    area_se: float = Field(..., gt=0, description="Area SE")
    smoothness_se: float = Field(..., gt=0, description="Smoothness SE")
    compactness_se: float = Field(..., gt=0, description="Compactness SE")
    concavity_se: float = Field(..., gt=0, description="Concavity SE")
    concave_points_se: float = Field(..., gt=0, description="Concave points SE")
    symmetry_se: float = Field(..., gt=0, description="Symmetry SE")
    fractal_dimension_se: float = Field(..., gt=0, description="Fractal dimension SE")
    radius_worst: float = Field(..., gt=0, description="Radius worst")
    texture_worst: float = Field(..., gt=0, description="Texture worst")
    perimeter_worst: float = Field(..., gt=0, description="Perimeter worst")
    area_worst: float = Field(..., gt=0, description="Area worst")
    smoothness_worst: float = Field(..., gt=0, description="Smoothness worst")
    compactness_worst: float = Field(..., gt=0, description="Compactness worst")
    concavity_worst: float = Field(..., gt=0, description="Concavity worst")
    concave_points_worst: float = Field(..., gt=0, description="Concave points worst")
    symmetry_worst: float = Field(..., gt=0, description="Symmetry worst")
    fractal_dimension_worst: float = Field(..., gt=0, description="Fractal dimension worst")


class CancerPredictResponse(BaseModel):
    diagnosis: str
    confidence: float
    prob_benign: float
    prob_malignant: float


@router.post("/predict", response_model=CancerPredictResponse)
async def predict(request: CancerPredictRequest):
    try:
        features = request.model_dump()
        return predict_cancer(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))