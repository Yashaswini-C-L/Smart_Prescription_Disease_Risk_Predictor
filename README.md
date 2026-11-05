# Smart Prescription & Disease Risk Predictor
## Personal Healthcare Web Application Frontend

A patient-centric personal digital health assistant built strictly with:
- **React.js** using Create React App
- **JavaScript only** (`.js` files only)
- **No JSX syntax** (Built 100% using `React.createElement()`)
- **Tailwind CSS v3**
- **React Router DOM**
- **Recharts**
- **Lucide React**
- **jsPDF** for Consolidated Health Report generation

---

## 🚀 Running the Project

### Development Server
```bash
npm start
```
Runs the app in development mode at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Builds the app for production to the `build` folder. Tested and compiled cleanly with zero errors.

---

## 🧭 Navigation Structure & Routes

### MY HEALTH
1. **Dashboard** (`/`):
   - Welcome greeting: *"Good Morning, [User Name]! Your health journey, organized in one place."*
   - Prominent section: **Your Health, All in One Place** with 4 primary action cards:
     1. *Upload Records*
     2. *Check Medicines*
     3. *Assess Health Risks*
     4. *View Health Roadmap*
   - Summary metric cards: Total Medical Records, Active Medications, Completed Health Assessments, Upcoming Tasks.
   - Medicine Safety Overview & Disease Risk Overview.
   - Recent Medical Records & Roadmap preview.
2. **My Medical Records** (`/records`):
   - **Method A: Document Upload** (Scanned prescriptions, lab reports, medical documents with file selection & preview).
   - **Method B: Manual Entry** (Enter prescriptions, lab tests, and history notes directly).
   - Search, category filter pills, metadata viewer, and authorized deletion.
3. **Medical Timeline** (`/timeline`):
   - Chronological unified stream of prescriptions, lab reports, AI risk assessments, and clinical history.
   - Date and record-type filters.
4. **My Prescriptions** (`/prescriptions`):
   - Active and completed medication lists.
   - Dosage, frequency, duration, start/end dates, prescribing doctor, and directions.
   - Manual entry and scanned document attachment.
5. **My Lab Reports** (`/lab-reports`):
   - Numerical biomarker values (Fasting Glucose, HbA1c, Cholesterol, BP, eGFR) with units and reference ranges.
   - 6-Month Fasting Blood Glucose trend curve powered by Recharts.
   - Document upload and manual entry support.

### HEALTH INTELLIGENCE
6. **Medicine Safety Checker** (`/medicine-safety`):
   - Searchable medicine library with quick pre-filled demonstration pairs (e.g., Warfarin + Aspirin, Lisinopril + Spironolactone).
   - Analysis tray with add/remove capability.
   - Severity badges (High / Moderate / Minor), biological mechanism explanations, and precautions for doctor consultation.
   - Explicit clinical demonstration disclaimer.
7. **Disease Risk Assessment** (`/disease-risk`):
   - Patient clinical factor sliders (Age, BMI, Systolic BP, Fasting Glucose, HbA1c, LDL, Smoking, Family History).
   - Multi-factor models: *Type 2 Diabetes Progression*, *10-Year ASCVD Heart Risk*, and *Renal Secondary Risk*.
   - Animated SVG circular probability meter (Low, Moderate, High).
   - 5-Year progression projection and key contributing biomarker drivers breakdown.
   - Assessment history log.
8. **Health Insights** (`/health-insights`):
   - Multi-biomarker progression line chart (Systolic BP vs Fasting Glucose vs Cholesterol over 6 months).
   - Personal health insight cards (Blood Pressure stabilization, Glycemic surveillance, Renal function).
   - Medication adherence summary.

### PREVENTIVE CARE
9. **Health Roadmap** (`/roadmap`):
   - Divided into **Next 3 Months**, **Next 6 Months**, and **Next 12 Months**.
   - Interactive checklist items with progress percentage bar and physician focus notes.
10. **Suggested Lab Tests** (`/suggested-tests`):
    - Evidence-based test recommendations (HbA1c panel, Lipid profile, uACR, Serum Electrolytes, ECG).
    - Clinical rationale, priority, and "Add to Roadmap" / "Mark Completed" actions.
11. **Reminders** (`/reminders`):
    - Medication, lab test, and doctor follow-up reminders.
    - Add, edit, delete, and check-off completion status with LocalStorage persistence.

### ACCOUNT & AUTH
12. **My Health Profile** (`/profile`):
    - Personal details, biological sex, dynamic BMI computation, allergies, chronic conditions, and emergency contacts.
13. **Settings** (`/settings`):
    - Notification preferences, privacy settings, demo baseline reset, and logout.
14. **Help & Support** (`/help`):
    - FAQs, clinical disclaimer, and emergency medical advisory notice.
15. **Authentication Pages**:
    - **Login** (`/login`)
    - **Register** (`/register`)
    - **Forgot Password** (`/forgot-password`)
    - **Reset Password** (`/reset-password`)

---

## 📄 Consolidated Health Report (PDF Generation)
- Located in the top header: **"Download My Health Report"**
- Built using **jsPDF** (client-side export without requiring server rendering).
- Compiles:
  1. Patient Profile Summary (Name, DOB, Age, Sex, Blood Group, BMI, Allergies, Conditions, Emergency Contact)
  2. Active Prescriptions & Medications
  3. Laboratory Test Diagnostics Summary
  4. Medicine Safety & Interaction Check History
  5. Disease Risk Assessment & Five-Year Progression History
  6. Preventive Healthcare Roadmap (3, 6, 12 Months)
  7. Clear section headers, date stamps, and mandatory medical disclaimer banners.

---

## 🛡️ Architecture & Principles
- **Strictly Personal Health Assistant**: Does not contain hospital statistics, inpatient/outpatient hospital beds, or doctor billing.
- **Pure JavaScript & `React.createElement()`**: 100% free of JSX syntax across all 25+ files.
- **Future Integration Ready**: Includes [`src/services/api.js`](file:///d:/Projects/Personal/Smart_Prescription_Disease_Risk_Predictor/src/services/api.js) as modular service placeholders for future Express.js, MongoDB, and Python FastAPI/ML microservices.
