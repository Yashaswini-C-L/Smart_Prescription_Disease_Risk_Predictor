// Helper utilities for formatting and IDs

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};

export const generateId = (prefix = 'ID') => {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase();
};

export const calculateBmi = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

export const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-amber-600 bg-amber-50' };
  if (bmi < 25) return { label: 'Normal Weight', color: 'text-emerald-600 bg-emerald-50' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600 bg-amber-50' };
  return { label: 'Obese', color: 'text-rose-600 bg-rose-50' };
};
