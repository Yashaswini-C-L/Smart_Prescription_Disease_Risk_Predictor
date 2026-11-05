// Personal Health Data Store (Demonstration Data)

export const initialUserProfile = {
  id: "P-88291",
  name: "Sayem Sumon",
  email: "sayem.sumon@example.com",
  dateOfBirth: "1980-04-12",
  age: 46,
  gender: "Male",
  bloodGroup: "O+",
  phone: "+1 (555) 382-9012",
  address: "742 Evergreen Terrace, Springfield",
  heightCm: 176,
  weightKg: 82.5,
  bmi: 26.6,
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: [
    "Hypertension (Stage 1)",
    "Pre-diabetes (Impaired Fasting Glucose)",
  ],
  lifestyle: {
    smoking: false,
    alcohol: "Occasional",
    physicalActivity: "Moderate (2-3 days/week)",
  },
  familyHistory: [
    "Type 2 Diabetes (Maternal)",
    "Essential Hypertension (Paternal)",
  ],
  emergencyContact: {
    name: "Elena Sumon",
    relation: "Spouse",
    phone: "+1 (555) 912-4411",
  },
};

export const initialPrescriptions = [
  {
    id: "RX-101",
    medicineName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily in the morning",
    duration: "90 days",
    startDate: "2026-10-24",
    endDate: "2027-01-22",
    doctor: "Dr. Rachel Vance",
    prescriptionDate: "2026-10-24",
    diagnosis: "Essential Hypertension",
    status: "Active",
    source: "Upload", // "Upload" or "Manual"
    notes: "Take with or without food. Do not discontinue abruptly.",
    fileName: "Prescription_Cardio_DrVance.pdf",
  },
  {
    id: "RX-102",
    medicineName: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    duration: "90 days",
    startDate: "2026-10-24",
    endDate: "2027-01-22",
    doctor: "Dr. Rachel Vance",
    prescriptionDate: "2026-10-24",
    diagnosis: "Pre-diabetes / Impaired Fasting Glucose",
    status: "Active",
    source: "Upload",
    notes: "Take with breakfast and dinner to minimize GI discomfort.",
    fileName: "Prescription_Cardio_DrVance.pdf",
  },
  {
    id: "RX-103",
    medicineName: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    duration: "90 days",
    startDate: "2026-10-24",
    endDate: "2027-01-22",
    doctor: "Dr. Rachel Vance",
    prescriptionDate: "2026-10-24",
    diagnosis: "Elevated LDL Cholesterol",
    status: "Active",
    source: "Manual",
    notes: "Avoid drinking grapefruit juice in excessive quantities.",
    fileName: null,
  },
  {
    id: "RX-104",
    medicineName: "Ibuprofen",
    dosage: "400mg",
    frequency: "Every 8 hours as needed for back pain",
    duration: "5 days",
    startDate: "2026-08-12",
    endDate: "2026-08-17",
    doctor: "Dr. Kevin Walsh",
    prescriptionDate: "2026-08-12",
    diagnosis: "Acute Musculoskeletal Lumbar Strain",
    status: "Completed",
    source: "Manual",
    notes:
      "Course completed. Advised not to combine long-term with blood pressure medications.",
    fileName: null,
  },
];

export const initialLabReports = [
  {
    id: "LAB-201",
    title: "Comprehensive Metabolic & Lipid Panel",
    testName: "Metabolic & Lipid Panel",
    date: "2026-10-18",
    source: "Upload",
    fileName: "Lab_Report_Metabolic_Oct2026.pdf",
    description: "Quarterly blood chemistry and glucose surveillance.",
    biomarkers: [
      {
        name: "Fasting Glucose",
        value: 112,
        unit: "mg/dL",
        reference: "70 - 99",
        status: "Elevated",
      },
      {
        name: "HbA1c",
        value: 6.2,
        unit: "%",
        reference: "< 5.7",
        status: "Pre-diabetic",
      },
      {
        name: "Total Cholesterol",
        value: 218,
        unit: "mg/dL",
        reference: "< 200",
        status: "Borderline High",
      },
      {
        name: "LDL Cholesterol",
        value: 138,
        unit: "mg/dL",
        reference: "< 100",
        status: "Elevated",
      },
      {
        name: "HDL Cholesterol",
        value: 44,
        unit: "mg/dL",
        reference: "> 40",
        status: "Normal",
      },
      {
        name: "Triglycerides",
        value: 180,
        unit: "mg/dL",
        reference: "< 150",
        status: "Elevated",
      },
      {
        name: "Systolic Blood Pressure",
        value: 138,
        unit: "mmHg",
        reference: "< 120",
        status: "Stage 1 HTN",
      },
      {
        name: "Diastolic Blood Pressure",
        value: 88,
        unit: "mmHg",
        reference: "< 80",
        status: "Stage 1 HTN",
      },
      {
        name: "eGFR",
        value: 88,
        unit: "mL/min/1.73m²",
        reference: "> 60",
        status: "Normal Renal Function",
      },
    ],
  },
  {
    id: "LAB-202",
    title: "Mid-Year Fasting Glucose & Renal Check",
    testName: "Fasting Blood Sugar & Creatinine",
    date: "2026-05-10",
    source: "Manual",
    fileName: null,
    description: "Routine baseline checkup.",
    biomarkers: [
      {
        name: "Fasting Glucose",
        value: 108,
        unit: "mg/dL",
        reference: "70 - 99",
        status: "Elevated",
      },
      {
        name: "HbA1c",
        value: 6.0,
        unit: "%",
        reference: "< 5.7",
        status: "Pre-diabetic",
      },
      {
        name: "Total Cholesterol",
        value: 205,
        unit: "mg/dL",
        reference: "< 200",
        status: "Borderline",
      },
      {
        name: "eGFR",
        value: 92,
        unit: "mL/min/1.73m²",
        reference: "> 60",
        status: "Normal",
      },
    ],
  },
];

export const initialMedicalRecords = [
  {
    id: "REC-301",
    type: "prescription",
    title: "Cardiometabolic Prescription Order",
    date: "2026-10-24",
    entryMethod: "document_upload", // "document_upload" or "manual_entry"
    doctor: "Dr. Rachel Vance",
    facility: "Community Family Care Clinic",
    summary:
      "Prescribed Lisinopril 10mg, Metformin 500mg, Atorvastatin 20mg for blood pressure and glucose regulation.",
    fileName: "Prescription_Cardio_DrVance.pdf",
    tags: ["Hypertension", "Pre-diabetes"],
  },
  {
    id: "REC-302",
    type: "lab_report",
    title: "Metabolic & Lipid Laboratory Panel",
    date: "2026-10-18",
    entryMethod: "document_upload",
    doctor: "Dr. Marcus Chen",
    facility: "Precision Diagnostic Pathology",
    summary:
      "Fasting glucose at 112 mg/dL, HbA1c at 6.2%, Total cholesterol at 218 mg/dL.",
    fileName: "Lab_Report_Metabolic_Oct2026.pdf",
    tags: ["Lipid", "HbA1c"],
  },
  {
    id: "REC-303",
    type: "history",
    title: "Annual Preventive Physical Exam Notes",
    date: "2026-09-05",
    entryMethod: "manual_entry",
    doctor: "Dr. Rachel Vance",
    facility: "Community Family Care Clinic",
    summary:
      "Annual checkup. BMI 26.6. Discussed lifestyle modifications, low sodium diet, and home blood pressure monitoring.",
    fileName: null,
    tags: ["Preventive", "Physical"],
  },
  {
    id: "REC-304",
    type: "prescription",
    title: "Orthopedic Acute Lumbar Care",
    date: "2026-08-12",
    entryMethod: "manual_entry",
    doctor: "Dr. Kevin Walsh",
    facility: "Regional Spine & Orthopedics",
    summary:
      "Short course Ibuprofen 400mg prescribed for acute lumbar back strain.",
    fileName: null,
    tags: ["Orthopedics", "Pain"],
  },
];

export const demonstrationDrugInteractions = [
  {
    drugA: "Warfarin",
    drugB: "Aspirin",
    severity: "High",
    effect:
      "Significantly elevated risk of major internal hemorrhage and gastrointestinal bleeding.",
    mechanism:
      "Concurrent platelet inhibition by aspirin and clotting factor synthesis inhibition by warfarin synergistically impair blood clotting.",
    recommendation:
      "Avoid concurrent use unless strictly supervised by a cardiologist with frequent INR monitoring.",
  },
  {
    drugA: "Warfarin",
    drugB: "Ibuprofen",
    severity: "High",
    effect: "Severe risk of stomach ulceration and gastrointestinal bleeding.",
    mechanism:
      "NSAIDs damage stomach lining and impair platelet aggregation while warfarin suppresses clotting.",
    recommendation:
      "Avoid taking ibuprofen while on warfarin. Discuss paracetamol/acetaminophen with your doctor as a safer alternative.",
  },
  {
    drugA: "Lisinopril",
    drugB: "Spironolactone",
    severity: "High",
    effect:
      "Risk of dangerously elevated blood potassium levels (Hyperkalemia).",
    mechanism:
      "Both medications reduce potassium excretion through the kidneys.",
    recommendation:
      "Requires periodic blood potassium tests if prescribed together.",
  },
  {
    drugA: "Lisinopril",
    drugB: "Ibuprofen",
    severity: "Moderate",
    effect:
      "Reduced blood pressure lowering effectiveness and increased kidney strain.",
    mechanism:
      "NSAIDs inhibit renal prostaglandins, reducing kidney blood flow and countering ACE inhibitor vasodilation.",
    recommendation:
      "Avoid frequent or prolonged NSAID use. Keep well hydrated and monitor blood pressure.",
  },
  {
    drugA: "Clopidogrel",
    drugB: "Omeprazole",
    severity: "Moderate",
    effect: "Reduced antiplatelet effectiveness of clopidogrel.",
    mechanism:
      "Omeprazole inhibits CYP2C19 enzyme needed to activate clopidogrel.",
    recommendation:
      "Consult your doctor; pantoprazole or famotidine may be suggested as alternatives.",
  },
  {
    drugA: "Metformin",
    drugB: "Ciprofloxacin",
    severity: "Moderate",
    effect:
      "Potential blood sugar fluctuations and increased hypoglycemia risk.",
    mechanism:
      "Fluoroquinolone antibiotics can alter pancreatic insulin release.",
    recommendation:
      "Monitor blood glucose closely while taking this antibiotic.",
  },
  {
    drugA: "Nitroglycerin",
    drugB: "Sildenafil",
    severity: "High",
    effect:
      "Dangerous, potentially life-threatening drop in systemic blood pressure.",
    mechanism:
      "Combined nitric oxide and PDE-5 inhibition causes severe blood vessel dilation.",
    recommendation: "Strictly contraindicated. Never take together.",
  },
];

export const referenceDrugLibrary = [
  "Metformin",
  "Lisinopril",
  "Atorvastatin",
  "Amlodipine",
  "Warfarin",
  "Aspirin",
  "Ibuprofen",
  "Omeprazole",
  "Clopidogrel",
  "Ciprofloxacin",
  "Spironolactone",
  "Losartan",
  "Levothyroxine",
  "Nitroglycerin",
  "Sildenafil",
  "Pantoprazole",
  "Hydrochlorothiazide",
];

export const initialRiskAssessments = [
  {
    id: "RSK-001",
    assessmentDate: "2026-10-25",
    disease: "Type 2 Diabetes Progression",
    isValidatedModel: true,
    riskScore: 68,
    riskLevel: "Moderate",
    projectedProgression5Year:
      "Estimated 34% probability of progression to clinical Type 2 Diabetes within 3-5 years if fasting glucose and HbA1c remain unaddressed.",
    keyDrivers: [
      "Fasting Glucose 112 mg/dL (in impaired pre-diabetes range 100-125)",
      "HbA1c 6.2% indicating 3-month average glucose elevation",
      "BMI 26.6 kg/m² (overweight threshold)",
      "Maternal family history of Type 2 Diabetes",
    ],
    recommendationsSummary:
      "Schedule quarterly HbA1c testing, engage in 150 minutes of weekly aerobic exercise, and reduce refined carbohydrates.",
  },
  {
    id: "RSK-002",
    assessmentDate: "2026-10-25",
    disease: "10-Year ASCVD Cardiovascular Risk",
    isValidatedModel: true,
    riskScore: 24,
    riskLevel: "Moderate",
    projectedProgression5Year:
      "Estimated 10-year risk of atherosclerotic cardiovascular event is 12.4% based on current blood pressure and lipid profile.",
    keyDrivers: [
      "Systolic blood pressure 138 mmHg (Stage 1 Hypertension)",
      "LDL Cholesterol 138 mg/dL above target (< 100 mg/dL)",
      "Age 46 with male demographic factor",
    ],
    recommendationsSummary:
      "Maintain statin and blood pressure medication adherence, keep daily sodium intake under 2,000 mg, and log home blood pressure.",
  },
];

export const initialRoadmap = [
  {
    milestone: "Next 3 Months",
    timeframe: "November 2026 – January 2027",
    status: "Active",
    goals: [
      {
        id: "g1",
        text: "Repeat Fasting Glucose and HbA1c blood test",
        done: false,
        type: "lab",
      },
      {
        id: "g2",
        text: "Maintain a 14-day home blood pressure log (morning & evening)",
        done: true,
        type: "vitals",
      },
      {
        id: "g3",
        text: "Review medication adherence for Lisinopril and Metformin",
        done: true,
        type: "medicine",
      },
      {
        id: "g4",
        text: "Consult nutritionist regarding dietary carbohydrate reduction",
        done: false,
        type: "lifestyle",
      },
    ],
    clinicalAdvice:
      "Focus on keeping morning fasting blood glucose below 105 mg/dL through consistent dietary timing.",
  },
  {
    milestone: "Next 6 Months",
    timeframe: "February 2027 – April 2027",
    status: "Scheduled",
    goals: [
      {
        id: "g5",
        text: "Follow-up Fasting Lipid Profile (Total, LDL, HDL, Triglycerides)",
        done: false,
        type: "lab",
      },
      {
        id: "g6",
        text: "Serum Creatinine and eGFR kidney safety check",
        done: false,
        type: "lab",
      },
      {
        id: "g7",
        text: "Semi-annual review with your primary care physician",
        done: false,
        type: "visit",
      },
      {
        id: "g8",
        text: "Target body weight reduction milestone: -3 kg",
        done: false,
        type: "lifestyle",
      },
    ],
    clinicalAdvice:
      "Verify whether statin therapy is successfully bringing LDL cholesterol below 100 mg/dL.",
  },
  {
    milestone: "Next 12 Months",
    timeframe: "May 2027 – October 2027",
    status: "Planned",
    goals: [
      {
        id: "g9",
        text: "Annual Comprehensive Health Assessment & Risk Re-evaluation",
        done: false,
        type: "assessment",
      },
      {
        id: "g10",
        text: "Urine Albumin-to-Creatinine Ratio (uACR) test",
        done: false,
        type: "lab",
      },
      {
        id: "g11",
        text: "Resting 12-lead Electrocardiogram (ECG) examination",
        done: false,
        type: "lab",
      },
      {
        id: "g12",
        text: "Comprehensive medication regimen review with doctor",
        done: false,
        type: "medicine",
      },
    ],
    clinicalAdvice:
      "Review 12-month vitals trajectory to determine if any medication dosages can be optimized.",
  },
];

export const initialSuggestedTests = [
  {
    id: "ST-01",
    name: "Glycated Hemoglobin (HbA1c) Panel",
    category: "Diabetic Monitoring",
    reason:
      "Assesses average blood sugar levels over the past 2-3 months to track pre-diabetes management.",
    relatedFactor:
      "Elevated Fasting Glucose (112 mg/dL) & Pre-diabetes History",
    priority: "High",
    monitoringPeriod: "Every 90 Days",
    inRoadmap: true,
    completed: false,
  },
  {
    id: "ST-02",
    name: "Comprehensive Fasting Lipid Profile",
    category: "Cardiovascular Health",
    reason:
      "Monitors Total Cholesterol, LDL, HDL, and Triglycerides to evaluate heart and artery health.",
    relatedFactor:
      "Borderline High Total Cholesterol (218 mg/dL) & Statin Therapy",
    priority: "High",
    monitoringPeriod: "Every 6 Months",
    inRoadmap: true,
    completed: false,
  },
  {
    id: "ST-03",
    name: "Urine Albumin-to-Creatinine Ratio (uACR)",
    category: "Kidney Health",
    reason:
      "Detects early microscopic protein leakage in urine as a preventive check for kidney health.",
    relatedFactor: "Hypertension & Early Metabolic Care",
    priority: "Routine",
    monitoringPeriod: "Annual (12 Months)",
    inRoadmap: true,
    completed: false,
  },
  {
    id: "ST-04",
    name: "Serum Electrolytes (Potassium & Sodium)",
    category: "Medicine Safety",
    reason:
      "Ensures blood pressure medications (like Lisinopril) do not lead to high potassium levels.",
    relatedFactor: "Lisinopril ACE Inhibitor Therapy",
    priority: "Routine",
    monitoringPeriod: "Every 6 Months",
    inRoadmap: false,
    completed: false,
  },
  {
    id: "ST-05",
    name: "Resting 12-Lead Electrocardiogram (ECG)",
    category: "Cardiac Monitoring",
    reason:
      "Screens for electrical heart rhythm health and strain associated with chronic blood pressure.",
    relatedFactor: "Stage 1 Hypertension History",
    priority: "Routine",
    monitoringPeriod: "Annual (12 Months)",
    inRoadmap: true,
    completed: false,
  },
];

export const initialReminders = [
  {
    id: "REM-01",
    title: "Take Morning Blood Pressure Medicine",
    details: "Lisinopril 10mg - 1 tablet with water",
    category: "Medication",
    dueTime: "08:00 AM",
    recurring: "Daily",
    completed: false,
  },
  {
    id: "REM-02",
    title: "Take Metformin with Dinner",
    details: "Metformin 500mg - 1 tablet with food",
    category: "Medication",
    dueTime: "07:30 PM",
    recurring: "Daily",
    completed: true,
  },
  {
    id: "REM-03",
    title: "Upcoming 90-Day HbA1c Blood Test",
    details: "Quarterly glycemic follow-up test at local diagnostic lab",
    category: "Lab Test",
    dueTime: "Jan 15, 2027",
    recurring: "One-time",
    completed: false,
  },
  {
    id: "REM-04",
    title: "Log Morning Blood Pressure Reading",
    details: "Record resting seated blood pressure in health log",
    category: "Follow-up",
    dueTime: "08:30 AM",
    recurring: "Daily",
    completed: false,
  },
];

export const historicalVitalsTrends = [
  {
    month: "May",
    systolic: 144,
    diastolic: 92,
    fastingGlucose: 108,
    totalCholesterol: 205,
  },
  {
    month: "Jun",
    systolic: 142,
    diastolic: 90,
    fastingGlucose: 110,
    totalCholesterol: 210,
  },
  {
    month: "Jul",
    systolic: 140,
    diastolic: 89,
    fastingGlucose: 114,
    totalCholesterol: 215,
  },
  {
    month: "Aug",
    systolic: 138,
    diastolic: 88,
    fastingGlucose: 111,
    totalCholesterol: 214,
  },
  {
    month: "Sep",
    systolic: 139,
    diastolic: 89,
    fastingGlucose: 115,
    totalCholesterol: 220,
  },
  {
    month: "Oct",
    systolic: 138,
    diastolic: 88,
    fastingGlucose: 112,
    totalCholesterol: 218,
  },
];
