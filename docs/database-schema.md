# Database Schema Specification (MongoDB)

This document describes the schema designs for MongoDB collections used in the application.

## 1. `users` Collection
Managed by: **Member 1**

```json
{
  "_id": "ObjectId",
  "name": "String (Required)",
  "email": "String (Required, Unique, Lowercase)",
  "password": "String (Required, Hashed with bcrypt)",
  "age": "Number (Optional)",
  "gender": "String (Enum: ['male', 'female', 'other'])",
  "bloodGroup": "String (Enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])",
  "contactNumber": "String (Optional)",
  "address": "String (Optional)",
  "allergies": ["String"],
  "chronicConditions": ["String"],
  "createdAt": "Date (Default: now)",
  "updatedAt": "Date (Default: now)"
}
```

## 2. `medicalrecords` Collection
Managed by: **Member 2**

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (Ref: 'User', Required)",
  "recordType": "String (Enum: ['prescription', 'lab_report'], Required)",
  "title": "String (Required)",
  "recordDate": "Date (Required)",
  "doctorOrLabName": "String",
  "fileUrl": "String (Path or URL to uploaded PDF/image)",
  "fileName": "String",
  "medicines": [
    {
      "name": "String",
      "dosage": "String",
      "frequency": "String",
      "duration": "String"
    }
  ],
  "extractedText": "String (OCR extracted text if applicable)",
  "notes": "String",
  "createdAt": "Date (Default: now)",
  "updatedAt": "Date (Default: now)"
}
```

## 3. `medicines` & `druginteractions` Collection
Managed by: **Member 3**

```json
// druginteractions
{
  "_id": "ObjectId",
  "drugA": "String (Required, Index)",
  "drugB": "String (Required, Index)",
  "severity": "String (Enum: ['Low', 'Moderate', 'High', 'Critical'])",
  "description": "String",
  "recommendation": "String"
}
```

## 4. `riskassessments` Collection
Managed by: **Member 4**

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (Ref: 'User', Required)",
  "assessmentDate": "Date (Default: now)",
  "inputMetrics": {
    "age": "Number",
    "bmi": "Number",
    "systolicBp": "Number",
    "diastolicBp": "Number",
    "fastingBloodSugar": "Number",
    "cholesterol": "Number"
  },
  "predictedDisease": "String",
  "riskScore": "Number (0 - 100)",
  "riskCategory": "String (Enum: ['Low', 'Moderate', 'High'])",
  "suggestedLabTests": [
    {
      "testName": "String",
      "purpose": "String"
    }
  ],
  "roadmap": {
    "threeMonth": "String",
    "sixMonth": "String",
    "oneYear": "String"
  }
}
```
