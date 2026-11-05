import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const e = React.createElement;

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSubmitted(true);
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
        e('h1', { className: 'text-xl font-bold text-[#1A2338]' }, 'Forgot Password?'),
        e('p', { className: 'text-xs text-[#6B7A99]' }, 'Enter your registered email address to receive a recovery link.')
      ),

      submitted
        ? e(
            'div',
            { className: 'p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-xs text-emerald-900' },
            e(CheckCircle2, { className: 'w-8 h-8 text-emerald-600 mx-auto' }),
            e('div', { className: 'font-bold' }, 'Demonstration Reset Link Sent!'),
            e('p', { className: 'text-[11px] text-emerald-800' },
              `We have dispatched simulated password reset instructions to ${email}.`
            ),
            e(Link, {
              to: '/reset-password',
              className: 'inline-block text-xs font-bold text-blue-600 underline pt-2'
            }, 'Proceed to Reset Password Page')
          )
        : e(
            'form',
            { onSubmit: handleSubmit, className: 'space-y-4' },
            e('div', null,
              e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Registered Email'),
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
            e(
              'button',
              {
                type: 'submit',
                className: 'w-full py-2.5 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
              },
              'Send Password Reset Link'
            )
          ),

      e(
        'div',
        { className: 'text-center pt-2' },
        e(
          Link,
          { to: '/login', className: 'text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1' },
          e(ArrowLeft, { className: 'w-3.5 h-3.5' }),
          e('span', null, 'Back to Sign In')
        )
      )
    )
  );
};
