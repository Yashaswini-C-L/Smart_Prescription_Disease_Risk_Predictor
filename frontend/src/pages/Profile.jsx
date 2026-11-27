import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { User, HeartPulse, Shield, Check, AlertCircle } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'other',
    bloodGroup: 'O+',
    contactNumber: '',
    address: '',
    allergies: '',
    chronicConditions: ''
  });

  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        gender: user.gender || 'other',
        bloodGroup: user.bloodGroup || 'O+',
        contactNumber: user.contactNumber || '',
        address: user.address || '',
        allergies: Array.isArray(user.allergies) ? user.allergies.join(', ') : '',
        chronicConditions: Array.isArray(user.chronicConditions) ? user.chronicConditions.join(', ') : ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const payload = {
        name: formData.name,
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        contactNumber: formData.contactNumber,
        address: formData.address,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
        chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      await updateProfile(payload);
      setStatusMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-forest-dark">Patient Profile</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your personal medical parameters and contact information
        </p>
      </div>

      {statusMessage.text && (
        <div
          className={`p-3.5 rounded-lg text-xs sm:text-sm flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-card border border-ivory-dark p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Section: Basic Info */}
          <div className="md:col-span-2 pb-2.5 border-b border-gray-100 flex items-center gap-2">
            <User className="w-4 h-4 text-forest" />
            <h2 className="text-sm font-semibold text-forest-dark">Basic Identification</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-[11px] text-gray-400 mt-1">Email address cannot be changed.</p>
          </div>

          {/* Section: Medical Info */}
          <div className="md:col-span-2 pt-3 sm:pt-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-forest" />
            <h2 className="text-sm font-semibold text-forest-dark">Clinical & Physical Demographics</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Age (Years)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="125"
              placeholder="e.g. 45"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Biological Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Phone</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address / Location</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, city"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
          </div>

          {/* Clinical Alerts */}
          <div className="md:col-span-2 pt-3 sm:pt-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest" />
            <h2 className="text-sm font-semibold text-forest-dark">Health Background & Sensitivities</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Known Drug / Food Allergies
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="e.g. Penicillin, Sulfa drugs (comma separated)"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
            <p className="text-[11px] text-gray-400 mt-1">Separate multiple items with commas</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Existing Chronic Conditions
            </label>
            <input
              type="text"
              name="chronicConditions"
              value={formData.chronicConditions}
              onChange={handleChange}
              placeholder="e.g. Hypertension, Type 2 Diabetes (comma separated)"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest bg-white transition"
            />
            <p className="text-[11px] text-gray-400 mt-1">Separate multiple items with commas</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto bg-forest hover:bg-forest-dark text-white font-medium text-xs sm:text-sm py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 min-h-[44px]"
          >
            {isSaving ? 'Saving Updates...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
