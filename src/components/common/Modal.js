import React from 'react';
import { X } from 'lucide-react';

const e = React.createElement;

export const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return e(
    'div',
    {
      className: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs'
    },
    e(
      'div',
      {
        className: `bg-white rounded-3xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col`
      },
      e(
        'div',
        {
          className: 'p-6 border-b border-[#EDF1F7] flex items-center justify-between sticky top-0 bg-white z-10'
        },
        e(
          'div',
          null,
          e('h2', { className: 'text-base font-bold text-[#1A2338]' }, title),
          subtitle ? e('p', { className: 'text-xs text-[#6B7A99] mt-0.5' }, subtitle) : null
        ),
        e(
          'button',
          {
            onClick: onClose,
            className: 'p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors'
          },
          e(X, { className: 'w-5 h-5' })
        )
      ),
      e('div', { className: 'p-6 flex-1' }, children)
    )
  );
};
