import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please verify your details.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* Brand header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-forest items-center justify-center text-ivory font-bold text-xl mb-3 shadow-sm">
            SP
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-forest-dark">Create Account</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Smart Prescription & Disease Risk Predictor</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-forest-dark mb-1">Patient Registration</h2>
          <p className="text-xs text-gray-500 mb-5 sm:mb-6">Enter your details to create your secure patient profile</p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 pl-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full px-3.5 py-2.5 pl-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Password (min. 6 characters)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
                />
                <CheckCircle2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[44px] mt-2 bg-forest hover:bg-forest-dark text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
            >
              <span>{isSubmitting ? 'Registering...' : 'Register'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 sm:pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-forest hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
