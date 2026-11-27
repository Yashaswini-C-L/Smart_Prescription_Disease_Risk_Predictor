import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center text-forest text-sm font-medium">
        Loading session...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Module Placeholder Component for Member 2, 3, 4
const ModulePlaceholder = ({ title, member, description }) => (
  <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-5 sm:p-8 text-center max-w-xl mx-auto my-6 sm:my-12">
    <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mx-auto mb-4 text-forest font-bold">
      {member.charAt(0)}
    </div>
    <h2 className="text-base sm:text-lg font-bold text-forest-dark mb-2">{title}</h2>
    <p className="text-xs text-gray-500 mb-4 leading-relaxed">{description}</p>
    <span className="inline-block px-3 py-1 bg-sage-light/30 border border-sage/50 text-forest text-xs rounded-full font-medium">
      Assigned to {member}
    </span>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Application Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout title="Patient Dashboard" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />

            {/* Reserved Module Routes for teammates */}
            <Route
              path="timeline"
              element={
                <ModulePlaceholder
                  title="Medical Timeline & Records"
                  member="Member 2"
                  description="Prescription and Lab Report upload with chronological visualization will be integrated here."
                />
              }
            />
            <Route
              path="interactions"
              element={
                <ModulePlaceholder
                  title="Drug-Drug Interaction Checker"
                  member="Member 3"
                  description="Real-time multi-drug safety checks and alert badges will be integrated here."
                />
              }
            />
            <Route
              path="risk-assessment"
              element={
                <ModulePlaceholder
                  title="Disease Risk Assessment (ML)"
                  member="Member 4"
                  description="Machine Learning risk predictor and diagnostic lab tests suggestion will be integrated here."
                />
              }
            />
            <Route
              path="roadmap"
              element={
                <ModulePlaceholder
                  title="Health Monitoring Roadmap"
                  member="Member 4"
                  description="Structured 3-month, 6-month, and 1-year preventive follow-up plans will be integrated here."
                />
              }
            />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
