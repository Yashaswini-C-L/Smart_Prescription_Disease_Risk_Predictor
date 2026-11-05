import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserProfile } from '../data/mockData';

const e = React.createElement;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('medaxis_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('medaxis_auth_token');
    return token ? true : true; // Default to demonstration logged-in state
  });

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    localStorage.setItem('medaxis_user_profile', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      setAuthError('Please provide both email and password.');
      return false;
    }
    const loggedInUser = {
      ...user,
      email: email,
      name: user.name || email.split('@')[0].replace('.', ' ')
    };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem('medaxis_auth_token', 'demo-token-' + Date.now());
    setAuthError(null);
    return true;
  };

  const register = (userData) => {
    if (!userData.email || !userData.password || !userData.name) {
      setAuthError('Please fill out all required registration fields.');
      return false;
    }
    const newUser = {
      ...initialUserProfile,
      ...userData,
      id: `P-${Math.floor(10000 + Math.random() * 90000)}`
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('medaxis_auth_token', 'demo-token-' + Date.now());
    setAuthError(null);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('medaxis_auth_token');
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return e(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated,
        authError,
        setAuthError,
        login,
        register,
        logout,
        updateProfile
      }
    },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
