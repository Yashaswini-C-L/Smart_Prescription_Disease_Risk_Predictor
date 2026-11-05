import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const e = React.createElement;

export const Toast = () => {
  const { toasts, removeToast } = useHealth();

  if (!toasts || toasts.length === 0) return null;

  return e(
    'div',
    {
      className: 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none'
    },
    toasts.map((toast) => {
      const isSuccess = toast.type === 'success';
      const isError = toast.type === 'error';
      const isWarning = toast.type === 'warning';

      let bg = 'bg-white/95 border-slate-200 text-slate-800';
      let icon = e(Info, { className: 'w-4 h-4 text-blue-600' });

      if (isSuccess) {
        bg = 'bg-emerald-50/95 border-emerald-200 text-emerald-900';
        icon = e(CheckCircle2, { className: 'w-4 h-4 text-emerald-600' });
      } else if (isError) {
        bg = 'bg-rose-50/95 border-rose-200 text-rose-900';
        icon = e(AlertTriangle, { className: 'w-4 h-4 text-rose-600' });
      } else if (isWarning) {
        bg = 'bg-amber-50/95 border-amber-200 text-amber-900';
        icon = e(AlertTriangle, { className: 'w-4 h-4 text-amber-600' });
      }

      return e(
        'div',
        {
          key: toast.id,
          className: `pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md transition-all ${bg}`
        },
        e('div', { className: 'mt-0.5 flex-shrink-0' }, icon),
        e('div', { className: 'flex-1 text-xs font-semibold leading-relaxed' }, toast.message),
        e(
          'button',
          {
            onClick: () => removeToast(toast.id),
            className: 'text-slate-400 hover:text-slate-600 p-0.5'
          },
          e(X, { className: 'w-3.5 h-3.5' })
        )
      );
    })
  );
};
