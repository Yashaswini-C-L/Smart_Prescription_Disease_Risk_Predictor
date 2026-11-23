import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const MemberPlaceholder = ({ title, member, description }) => (
  <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-8 text-center max-w-xl mx-auto my-12">
    <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mx-auto mb-4 text-forest font-bold text-lg">
      {member.slice(-1)}
    </div>
    <h2 className="text-lg font-bold text-forest-dark mb-2">{title}</h2>
    <p className="text-xs text-gray-500 mb-4">{description}</p>
    <span className="inline-block px-3 py-1 bg-sage-light/30 border border-sage/50 text-forest text-xs rounded-full font-medium">
      Module Assigned to {member}
    </span>
  </div>
);

const Home = () => (
  <div className="max-w-4xl mx-auto text-center py-16 px-4">
    <div className="inline-flex w-14 h-14 rounded-2xl bg-forest items-center justify-center text-ivory font-bold text-xl mb-4 shadow-sm">
      SP
    </div>
    <h1 className="text-3xl font-bold text-forest-dark mb-3">
      Smart Prescription & Disease Risk Predictor
    </h1>
    <p className="text-sm text-gray-600 max-w-xl mx-auto mb-8">
      AI-driven healthcare web application for medical record management, drug-drug interaction detection, and longitudinal disease risk prediction.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      <Link to="/auth" className="p-4 bg-white rounded-xl border border-ivory-dark shadow-card hover:border-forest transition">
        <span className="text-[10px] font-bold text-sage uppercase">Member 1</span>
        <h3 className="text-sm font-semibold text-forest-dark mt-1">Auth & Dashboard</h3>
        <p className="text-xs text-gray-500 mt-1">Patient authentication, profile, & overview dashboard.</p>
      </Link>
      <Link to="/records" className="p-4 bg-white rounded-xl border border-ivory-dark shadow-card hover:border-forest transition">
        <span className="text-[10px] font-bold text-sage uppercase">Member 2</span>
        <h3 className="text-sm font-semibold text-forest-dark mt-1">Medical Records</h3>
        <p className="text-xs text-gray-500 mt-1">Prescriptions, lab reports, and timeline management.</p>
      </Link>
      <Link to="/interactions" className="p-4 bg-white rounded-xl border border-ivory-dark shadow-card hover:border-forest transition">
        <span className="text-[10px] font-bold text-sage uppercase">Member 3</span>
        <h3 className="text-sm font-semibold text-forest-dark mt-1">Drug Interactions</h3>
        <p className="text-xs text-gray-500 mt-1">Cross-referencing medication safety and interaction alerts.</p>
      </Link>
      <Link to="/risk-prediction" className="p-4 bg-white rounded-xl border border-ivory-dark shadow-card hover:border-forest transition">
        <span className="text-[10px] font-bold text-sage uppercase">Member 4</span>
        <h3 className="text-sm font-semibold text-forest-dark mt-1">ML Risk & Roadmap</h3>
        <p className="text-xs text-gray-500 mt-1">Disease risk prediction and health monitoring roadmap.</p>
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ivory font-sans text-forest-dark flex flex-col">
        <header className="h-16 bg-white border-b border-ivory-dark px-6 flex items-center justify-between shadow-subtle">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest text-ivory flex items-center justify-center font-bold text-sm">
              SP
            </div>
            <span className="font-semibold text-sm text-forest-dark">Smart Prescription System</span>
          </Link>
          <div className="text-xs text-sage-dark font-medium">Foundation Shell</div>
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={<MemberPlaceholder title="Authentication & Dashboard" member="Member 1" description="Patient login, profile management, and dashboard interface." />}
            />
            <Route
              path="/records"
              element={<MemberPlaceholder title="Medical Records & Timeline" member="Member 2" description="Prescription uploads, OCR processing, and chronological timeline." />}
            />
            <Route
              path="/interactions"
              element={<MemberPlaceholder title="Drug Interaction Checker" member="Member 3" description="Medication safety checker and interaction warning badges." />}
            />
            <Route
              path="/risk-prediction"
              element={<MemberPlaceholder title="ML Disease Risk Predictor" member="Member 4" description="FastAPI machine learning model integration and monitoring roadmap." />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
