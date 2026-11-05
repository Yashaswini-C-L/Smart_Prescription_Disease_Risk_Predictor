import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';

// Pages
import { Dashboard } from './pages/Dashboard';
import { MedicalRecords } from './pages/MedicalRecords';
import { MedicalTimeline } from './pages/MedicalTimeline';
import { Prescriptions } from './pages/Prescriptions';
import { LabReports } from './pages/LabReports';
import { MedicineSafety } from './pages/MedicineSafety';
import { DiseaseRisk } from './pages/DiseaseRisk';
import { HealthInsights } from './pages/HealthInsights';
import { HealthRoadmap } from './pages/HealthRoadmap';
import { SuggestedTests } from './pages/SuggestedTests';
import { Reminders } from './pages/Reminders';
import { HealthProfile } from './pages/HealthProfile';
import { Settings } from './pages/Settings';
import { HelpSupport } from './pages/HelpSupport';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

const e = React.createElement;

const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return e(
    'div',
    { className: 'min-h-screen bg-[#F5F7FB] flex text-[#1A2338]' },
    // Sidebar
    e(Sidebar, {
      isOpen: isSidebarOpen,
      onClose: () => setIsSidebarOpen(false)
    }),

    // Main column
    e(
      'div',
      { className: 'flex-1 flex flex-col min-w-0' },
      e(Header, { onOpenSidebar: () => setIsSidebarOpen(true) }),
      e(
        'main',
        { className: 'flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto' },
        children,
        e(Footer, null)
      )
    ),

    e(Toast, null)
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return e(
    Routes,
    null,
    // Auth Routes
    e(Route, { path: '/login', element: e(Login, null) }),
    e(Route, { path: '/register', element: e(Register, null) }),
    e(Route, { path: '/forgot-password', element: e(ForgotPassword, null) }),
    e(Route, { path: '/reset-password', element: e(ResetPassword, null) }),

    // Protected Health App Routes
    e(
      Route,
      {
        path: '/',
        element: e(AuthenticatedLayout, null, e(Dashboard, null))
      }
    ),
    e(
      Route,
      {
        path: '/records',
        element: e(AuthenticatedLayout, null, e(MedicalRecords, null))
      }
    ),
    e(
      Route,
      {
        path: '/timeline',
        element: e(AuthenticatedLayout, null, e(MedicalTimeline, null))
      }
    ),
    e(
      Route,
      {
        path: '/prescriptions',
        element: e(AuthenticatedLayout, null, e(Prescriptions, null))
      }
    ),
    e(
      Route,
      {
        path: '/lab-reports',
        element: e(AuthenticatedLayout, null, e(LabReports, null))
      }
    ),
    e(
      Route,
      {
        path: '/medicine-safety',
        element: e(AuthenticatedLayout, null, e(MedicineSafety, null))
      }
    ),
    e(
      Route,
      {
        path: '/disease-risk',
        element: e(AuthenticatedLayout, null, e(DiseaseRisk, null))
      }
    ),
    e(
      Route,
      {
        path: '/health-insights',
        element: e(AuthenticatedLayout, null, e(HealthInsights, null))
      }
    ),
    e(
      Route,
      {
        path: '/roadmap',
        element: e(AuthenticatedLayout, null, e(HealthRoadmap, null))
      }
    ),
    e(
      Route,
      {
        path: '/suggested-tests',
        element: e(AuthenticatedLayout, null, e(SuggestedTests, null))
      }
    ),
    e(
      Route,
      {
        path: '/reminders',
        element: e(AuthenticatedLayout, null, e(Reminders, null))
      }
    ),
    e(
      Route,
      {
        path: '/profile',
        element: e(AuthenticatedLayout, null, e(HealthProfile, null))
      }
    ),
    e(
      Route,
      {
        path: '/settings',
        element: e(AuthenticatedLayout, null, e(Settings, null))
      }
    ),
    e(
      Route,
      {
        path: '/help',
        element: e(AuthenticatedLayout, null, e(HelpSupport, null))
      }
    ),

    // Wildcard redirect to dashboard
    e(Route, { path: '*', element: e(Navigate, { to: '/', replace: true }) })
  );
};

export default function App() {
  return e(
    BrowserRouter,
    null,
    e(
      AuthProvider,
      null,
      e(
        HealthProvider,
        null,
        e(AppRoutes, null)
      )
    )
  );
}
