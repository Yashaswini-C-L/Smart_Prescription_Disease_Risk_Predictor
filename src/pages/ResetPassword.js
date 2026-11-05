import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useHealth } from '../context/HealthContext';

const e = React.createElement;

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useHealth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    addToast('Password reset successfully (Demonstration). Please log in.', 'success');
    navigate('/login');
  };

  return e(
    'div',
    { className: 'min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4' },
    e(
      'div',
      { className: 'bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-8 space-y-5 animate-in fade-in duration-200' },
      e(
        'div',
        { className: 'text-center space-y-1' },
        e('h1', { className: 'text-xl font-bold text-[#1A2338]' }, 'Reset Your Password'),
        e('p', { className: 'text-xs text-[#6B7A99]' }, 'Enter and confirm your new secure password.')
      ),

      e(
        'form',
        { onSubmit: handleSubmit, className: 'space-y-4' },
        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'New Password'),
          e('div', { className: 'relative' },
            e(Lock, { className: 'w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'password',
              required: true,
              value: newPassword,
              onChange: (ev) => setNewPassword(ev.target.value),
              placeholder: '••••••••',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Confirm New Password'),
          e('div', { className: 'relative' },
            e(Lock, { className: 'w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'password',
              required: true,
              value: confirmPassword,
              onChange: (ev) => setConfirmPassword(ev.target.value),
              placeholder: '••••••••',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          )
        ),

        e(
          'button',
          {
            type: 'submit',
            className: 'w-full py-2.5 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5'
          },
          e('span', null, 'Update Password'),
          e(ArrowRight, { className: 'w-3.5 h-3.5' })
        )
      ),

      e(
        'div',
        { className: 'text-center pt-2' },
        e(
          Link,
          { to: '/login', className: 'text-xs font-bold text-slate-500 hover:text-slate-800' },
          'Cancel and return to Sign In'
        )
      )
    )
  );
};
