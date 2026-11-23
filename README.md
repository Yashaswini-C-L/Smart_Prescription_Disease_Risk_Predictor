# Smart Prescription & Disease Risk Predictor

An AI-driven healthcare web application designed to help patients organize digital medical records, detect potentially dangerous drug-drug interactions, estimate longitudinal disease risks using machine learning, and provide structured health monitoring roadmaps.

---

## 🏗️ Repository Architecture

This repository is organized to enable 4 members to collaborate cleanly on their dedicated branches without collisions:

```
Smart_Prescription_Disease_Risk_Predictor/
│
├── frontend/                     # React JS + Tailwind CSS Application (Client)
│   ├── public/
│   └── src/
│       ├── components/           # Reusable UI widgets (Sidebar, Navbar, Layout, Cards)
│       ├── pages/                # App views (Dashboard, Profile, Login, Register)
│       ├── services/             # API client, AuthContext, & service wrappers
│       ├── App.jsx               # Main React router and authentication guards
│       └── index.css             # Tailwind setup, Inter typography, custom theme palette
│
├── backend/                      # Node.js + Express REST API Gateway
│   ├── config/                   # MongoDB connection logic (db.js)
│   ├── models/                   # Mongoose data schemas (User.js)
│   ├── controllers/              # Route controller business logic (auth, dashboard)
│   ├── routes/                   # Express route definitions
│   ├── middleware/               # JWT authentication middleware
│   ├── .env.example              # Template for backend environment variables
│   └── server.js                 # Express server entrypoint
│
├── ml-service/                   # Python FastAPI & Scikit-learn Service
│   ├── dataset/                  # Medical datasets for model training (.gitkeep)
│   ├── models/                   # Serialized ML model artifacts (.joblib / .pkl)
│   ├── notebooks/                # Exploratory data analysis notebooks
│   ├── preprocess.py             # Feature engineering & dataset preprocessing
│   ├── train.py                  # Model training pipeline
│   ├── predict.py                # Inference helper
│   ├── main.py                   # FastAPI prediction service entrypoint
│   └── requirements.txt          # Python dependencies
│
├── docs/                         # Team Project Documentation
│   ├── api-contracts.md          # Shared REST API specifications across all 4 modules
│   └── database-schema.md        # MongoDB schema design definitions
│
└── README.md
```

---

## 👥 Team Work Allocation & Branches

| Team Member | Branch Name | Assigned Functional Scope |
| :--- | :--- | :--- |
| **Member 1 (You)** | `member-1-auth-dashboard` | Initial repo setup, React frontend, Node backend, JWT authentication, Patient profile, Main dashboard |
| **Member 2** | `member-2-records` | Prescription & Lab Report upload, OCR extraction, chronological medical history timeline |
| **Member 3** | `member-3-interactions` | Drug-drug interaction database matching, severity alerts, safety recommendations |
| **Member 4** | `member-4-ml-roadmap` | Scikit-learn disease risk models, FastAPI inference, lab test recommendation, health monitoring roadmap |

---

## 🎨 Design System & Aesthetic Standard

The application uses a clinical, minimal aesthetic avoiding excessive animations and harsh colors:

- **Primary Color**: Forest Green (`#263B36`)
- **Secondary Color**: Sage (`#A8B8A0`)
- **Background**: Ivory (`#F3F0E8`)
- **Card Elements**: Crisp white with rounded corners (`rounded-xl`) and subtle shadows (`shadow-card`)
- **Typography**: Inter
- **Navigation**: Always-expanded Dark Forest Green sidebar with active sage indicators

---

## 🚀 How to Run the Application Locally

### 1. Backend (Node.js & Express)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
   *(Ensure MongoDB is running or configure your MongoDB Atlas connection string in `backend/.env`)*
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   *The backend will run at `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)*

### 2. Frontend (React JS & Tailwind CSS)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will launch in your browser at `http://localhost:3000`*

### 3. Machine Learning Service (FastAPI & Python)
1. Navigate to the ml-service directory:
   ```bash
   cd ml-service
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   python main.py
   # or
   uvicorn main:app --reload --port 8000
   ```
   *The ML service will run at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`*

---

## 🔐 Security & Git Practices
- Never commit `.env` files or secrets to GitHub. Both root and subfolder `.gitignore` files are pre-configured.
- Always communicate through [`docs/api-contracts.md`](docs/api-contracts.md) before altering cross-module payload structures.
