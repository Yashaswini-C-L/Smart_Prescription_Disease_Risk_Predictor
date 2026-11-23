# API Contracts: Smart Prescription & Disease Risk Predictor

This document outlines the standard REST API contracts across all four modules to ensure smooth collaboration among the team members.

---

## 1. General Standards
- **Base URL**: `http://localhost:5000/api`
- **ML Service URL**: `http://localhost:8000`
- **Content-Type**: `application/json` (or `multipart/form-data` for file uploads)
- **Authentication**: JWT Bearer Token in `Authorization` header (`Bearer <token>`) for protected routes.

### Standard Response Envelope
```json
{
  "success": true,
  "message": "Operation successful description",
  "data": {}
}
```

### Standard Error Envelope
```json
{
  "success": false,
  "message": "Error description here",
  "errors": []
}
```

---

## 2. Module 1: Authentication & Patient Profile (Member 1)
- Owner: **Member 1** (`member-1-auth-dashboard`)

### 2.1 Register User
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "673cf901...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "token": "jwt_token_string"
    }
  }
  ```

### 2.2 Login User
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "673cf901...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "token": "jwt_token_string"
    }
  }
  ```

### 2.3 Get Current User Profile
- **Method**: `GET`
- **Endpoint**: `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "673cf901...",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 45,
        "gender": "male",
        "bloodGroup": "O+",
        "contactNumber": "+1234567890",
        "address": "123 Health Ave",
        "allergies": ["Penicillin"],
        "chronicConditions": ["Hypertension"]
      }
    }
  }
  ```

### 2.4 Update Patient Profile
- **Method**: `PUT`
- **Endpoint**: `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 46,
    "gender": "male",
    "bloodGroup": "O+",
    "contactNumber": "+1234567890",
    "address": "123 Health Ave",
    "allergies": ["Penicillin"],
    "chronicConditions": ["Hypertension"]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": { "user": { ... } }
  }
  ```

### 2.5 Get Dashboard Summary
- **Method**: `GET`
- **Endpoint**: `/api/dashboard/summary`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "totalPrescriptions": 4,
      "totalLabReports": 3,
      "recentRecords": [ ... ],
      "latestRiskAssessment": { ... },
      "activeWarningsCount": 1
    }
  }
  ```

---

## 3. Module 2: Medical Record Management (Member 2)
- Target Branch: `member-2-records`

### 3.1 Upload Prescription / Lab Report
- **Method**: `POST`
- **Endpoint**: `/api/records`
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Form Data**:
  - `file`: (binary document: PDF, JPG, PNG)
  - `recordType`: `"prescription"` | `"lab_report"`
  - `recordDate`: `"YYYY-MM-DD"`
  - `title`: `"Dr. Smith Consultation"`
  - `doctorOrLabName`: `"City Health Clinic"`
  - `medicines`: JSON string of medicines `[{"name": "Metformin", "dosage": "500mg"}]`
  - `notes`: `"Follow-up after blood sugar test"`
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Medical record uploaded successfully",
    "data": {
      "_id": "673d0a...",
      "userId": "673cf901...",
      "recordType": "prescription",
      "recordDate": "2026-11-20T00:00:00.000Z",
      "fileUrl": "/uploads/prescription-123.pdf"
    }
  }
  ```

### 3.2 Get Medical Records Timeline
- **Method**: `GET`
- **Endpoint**: `/api/records?type=all&sort=desc`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "673d0a...",
        "recordType": "prescription",
        "recordDate": "2026-11-20T00:00:00.000Z",
        "title": "Cardiology Visit",
        "medicines": ["Aspirin", "Atorvastatin"],
        "fileUrl": "/uploads/sample.pdf"
      }
    ]
  }
  ```

### 3.3 Delete Medical Record
- **Method**: `DELETE`
- **Endpoint**: `/api/records/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Record deleted successfully"
  }
  ```

---

## 4. Module 3: Drug-Drug Interaction Detection (Member 3)
- Target Branch: `member-3-interactions`

### 4.1 Check Interactions for Medicine List
- **Method**: `POST`
- **Endpoint**: `/api/interactions/check`
- **Headers**: `Authorization: Bearer <token>` (Optional or Protected)
- **Request Body**:
  ```json
  {
    "medicines": ["Aspirin", "Warfarin", "Ibuprofen"]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "hasInteractions": true,
      "totalAlerts": 1,
      "interactions": [
        {
          "drugA": "Aspirin",
          "drugB": "Warfarin",
          "severity": "High",
          "description": "Increased risk of severe bleeding when taken concurrently.",
          "recommendation": "Avoid combination or closely monitor INR levels."
        }
      ]
    }
  }
  ```

---

## 5. Module 4 & 5 & 6: Disease Risk & Health Roadmap (Member 4 / ML Service)
- Target Branch: `member-4-ml-roadmap`

### 5.1 FastAPI ML Endpoint: Predict Disease Risk
- **Method**: `POST`
- **Service**: FastAPI (`http://localhost:8000/predict`)
- **Request Body**:
  ```json
  {
    "age": 52,
    "gender": "male",
    "bmi": 28.4,
    "systolicBp": 138,
    "diastolicBp": 88,
    "fastingBloodSugar": 126,
    "cholesterol": 210,
    "smoking": false,
    "familyHistory": true
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "disease": "Type 2 Diabetes / Cardiovascular Risk",
    "riskScore": 72.5,
    "riskCategory": "High",
    "contributingFactors": [
      { "factor": "Fasting Blood Sugar", "impact": "High" },
      { "factor": "BMI", "impact": "Moderate" }
    ],
    "suggestedLabTests": [
      {
        "testName": "HbA1c Glycated Hemoglobin",
        "purpose": "Evaluate 3-month average blood sugar levels."
      },
      {
        "testName": "Lipid Profile Panel",
        "purpose": "Assess LDL, HDL, and Triglycerides."
      }
    ],
    "roadmap": {
      "threeMonth": "Repeat HbA1c test and dietary review",
      "sixMonth": "Follow-up lipid profile and cardiovascular checkup",
      "oneYear": "Comprehensive annual metabolic panel"
    }
  }
  ```

### 5.2 Node.js Gateway Endpoint: Save Assessment
- **Method**: `POST`
- **Endpoint**: `/api/risk-assessments`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: `{ ...assessment payload and input parameters... }`
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Risk assessment saved successfully",
    "data": { "_id": "673d...", "createdAt": "2026-11-24T..." }
  }
  ```
