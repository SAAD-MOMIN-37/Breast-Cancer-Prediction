"""Cancer Prediction FastAPI App"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .service import load_models
from .router import router

app = FastAPI(
    title="Cancer Prediction API",
    description="Breast cancer diagnosis prediction using ML ensemble",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def startup_event():
    load_models()
    print("Cancer Prediction models loaded successfully")


@app.get("/")
async def root():
    return {"message": "Cancer Prediction API", "status": "running"}