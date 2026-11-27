import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
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
          <h1 className="text-xl sm:text-2xl font-bold text-forest-dark">Smart Prescription</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Disease Risk & Medication Safety Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-card border border-ivory-dark p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-forest-dark mb-1">Welcome back</h2>
          <p className="text-xs text-gray-500 mb-5 sm:mb-6">Enter your registered credentials to access your portal</p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Password
                </label>
              </div>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[44px] mt-2 bg-forest hover:bg-forest-dark text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 sm:pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-semibold text-forest hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-gray-500 mt-6 leading-relaxed">
          For educational & research evaluation purposes. Not a replacement for professional clinical care.
        </p>
      </div>
    </div>
  );
};

export default Login;
