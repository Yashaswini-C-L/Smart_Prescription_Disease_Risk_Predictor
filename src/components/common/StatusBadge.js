import React from 'react';

const e = React.createElement;

export const StatusBadge = ({ status, size = 'sm' }) => {
  const norm = (status || '').toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (norm.includes('active') || norm.includes('normal') || norm.includes('routine') || norm.includes('completed') || norm.includes('low') || norm.includes('optimal')) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (norm.includes('moderate') || norm.includes('borderline') || norm.includes('elevated') || norm.includes('pre-diabetic') || norm.includes('stage 1')) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (norm.includes('high') || norm.includes('critical') || norm.includes('severe') || norm.includes('contraindicated')) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (norm.includes('scheduled') || norm.includes('planned')) {
    colorClasses = 'bg-blue-50 text-[#1E60F2] border-blue-200';
  }

  const padding = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return e(
    'span',
    {
      className: `inline-flex items-center font-bold rounded-lg border ${padding} ${colorClasses}`
    },
    status
  );
};
