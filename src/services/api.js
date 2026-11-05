// API Service layer - Placeholders ready for future Node.js/Express, MongoDB, and Python ML backend

export const apiService = {
  // Authentication endpoints
  auth: {
    login: async (credentials) => {
      // Future: POST /api/auth/login
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, token: 'demo-jwt-token', user: credentials });
        }, 300);
      });
    },
    register: async (userData) => {
      // Future: POST /api/auth/register
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, token: 'demo-jwt-token', user: userData });
        }, 300);
      });
    },
    forgotPassword: async (email) => {
      // Future: POST /api/auth/forgot-password
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: `Password reset link sent to ${email}` });
        }, 300);
      });
    },
    resetPassword: async (token, newPassword) => {
      // Future: POST /api/auth/reset-password
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: 'Password successfully reset' });
        }, 300);
      });
    }
  },

  // Medical Records endpoints
  records: {
    getAll: async () => {
      // Future: GET /api/records
      const stored = localStorage.getItem('medaxis_records');
      return stored ? JSON.parse(stored) : [];
    },
    create: async (recordData) => {
      // Future: POST /api/records
      return { success: true, record: recordData };
    },
    delete: async (id) => {
      // Future: DELETE /api/records/:id
      return { success: true, id };
    }
  },

  // Drug Interaction Checking (Future: ML/DDInter API)
  interactions: {
    check: async (medicineNames) => {
      // Future: POST /api/ml/drug-interactions
      return { success: true, medicines: medicineNames };
    }
  },

  // Disease Risk Assessment (Future: FastAPI Python Scikit-learn service)
  diseaseRisk: {
    predict: async (patientBiometrics) => {
      // Future: POST /api/ml/predict-risk
      return { success: true, inference: patientBiometrics };
    }
  }
};
