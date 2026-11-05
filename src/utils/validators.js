// Validation utilities for patient-entered information

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

export const validateRequired = (val, fieldName = 'Field') => {
  if (!val || (typeof val === 'string' && val.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};
