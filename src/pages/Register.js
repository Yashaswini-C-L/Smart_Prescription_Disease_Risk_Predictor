import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';

const e = React.createElement;

export const Register = () => {
  const navigate = useNavigate();
  const { register, authError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (register({ name, email, password, gender })) {
      navigate('/');
    }
  };

  return e(
    'div',
    { className: 'min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4' },
    e(
      'div',
      { className: 'bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in duration-200' },

      e(
        'div',
        { className: 'p-6 bg-gradient-to-br from-[#1E60F2] to-indigo-700 text-white text-center' },
        e('h1', { className: 'text-xl font-extrabold tracking-tight' }, 'Create Personal Health Account'),
        e('p', { className: 'text-xs text-blue-100 mt-1' }, 'Organize your prescriptions and assess secondary disease risks.')
      ),

      e(
        'form',
        { onSubmit: handleSubmit, className: 'p-6 space-y-4' },
        authError
          ? e('div', { className: 'p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2' },
              e(AlertCircle, { className: 'w-4 h-4 text-rose-600 flex-shrink-0' }),
              e('span', null, authError)
            )
          : null,

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Full Name'),
          e('div', { className: 'relative' },
            e(User, { className: 'w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'text',
              required: true,
              value: name,
              onChange: (ev) => setName(ev.target.value),
              placeholder: 'e.g. Sayem Sumon',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Email Address'),
          e('div', { className: 'relative' },
            e(Mail, { className: 'w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'email',
              required: true,
              value: email,
              onChange: (ev) => setEmail(ev.target.value),
              placeholder: 'name@example.com',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Create Password'),
          e('div', { className: 'relative' },
            e(Lock, { className: 'w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'password',
              required: true,
              value: password,
              onChange: (ev) => setPassword(ev.target.value),
              placeholder: 'At least 6 characters',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          )
        ),

        e(
          'button',
          {
            type: 'submit',
            className: 'w-full py-2.5 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 mt-2'
          },
          e('span', null, 'Register Account'),
          e(ArrowRight, { className: 'w-3.5 h-3.5' })
        ),

        e(
          'div',
          { className: 'pt-3 text-center text-xs text-[#6B7A99] border-t border-[#EDF1F7]' },
          e('span', null, 'Already registered? '),
          e(Link, { to: '/login', className: 'font-bold text-[#1E60F2] hover:underline' }, 'Sign in here')
        )
      )
    )
  );
};
