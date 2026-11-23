"""
FastAPI Microservice Entrypoint for Disease Risk Prediction
Maintained by Member 4 (Branch: member-4-ml-roadmap)
"""
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List, Dict

app = FastAPI(
    title="Smart Prescription Disease Risk Predictor - ML Service",
    version="1.0.0"
)

class HealthMetricsInput(BaseModel):
    age: int
    gender: Optional[str] = "other"
    bmi: float
    systolicBp: float
    diastolicBp: float
    fastingBloodSugar: float
    cholesterol: float
    smoking: Optional[bool] = False
    familyHistory: Optional[bool] = False

@app.get("/")
def health_check():
    return {
        "service": "ml-service",
        "status": "online",
        "message": "Disease Risk Prediction Service is healthy"
    }

@app.post("/predict")
def predict_risk(metrics: HealthMetricsInput):
    """
    Placeholder endpoint for Model Inference.
    Member 4 can integrate trained scikit-learn models here.
    """
    # Baseline heuristic / placeholder response
    risk_score = 45.0
    category = "Moderate"
    if metrics.fastingBloodSugar > 125 or metrics.systolicBp > 140:
        risk_score = 75.0
        category = "High"
    elif metrics.fastingBloodSugar < 100 and metrics.systolicBp < 120:
        risk_score = 20.0
        category = "Low"

    return {
        "disease": "Type 2 Diabetes & Cardiovascular Risk",
        "riskScore": risk_score,
        "riskCategory": category,
        "suggestedLabTests": [
            {"testName": "HbA1c", "purpose": "Assess glycemic control over past 3 months"},
            {"testName": "Lipid Profile", "purpose": "Check cholesterol and triglycerides"}
        ],
        "roadmap": {
            "threeMonth": "Repeat fasting blood glucose and blood pressure monitoring",
            "sixMonth": "Follow-up HbA1c test and lifestyle consultation",
            "oneYear": "Comprehensive metabolic panel review"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
