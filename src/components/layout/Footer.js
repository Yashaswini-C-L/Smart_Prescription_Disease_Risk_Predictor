import React from 'react';
import { ShieldCheck } from 'lucide-react';

const e = React.createElement;

export const Footer = () => {
  return e(
    'footer',
    {
      className: 'mt-12 py-6 border-t border-[#EDF1F7] text-center text-xs text-[#8B98B2] space-y-2'
    },
    e(
      'div',
      { className: 'flex items-center justify-center gap-1.5 font-bold text-[#475569]' },
      e(ShieldCheck, { className: 'w-4 h-4 text-blue-600' }),
      e('span', null, 'Personal Digital Health Assistant — Demonstration Platform')
    ),
    e(
      'p',
      { className: 'max-w-xl mx-auto text-[11px] leading-relaxed text-[#94A3B8]' },
      'Informational & educational tool only. Medical information and simulated machine learning risk assessments do not substitute professional clinical diagnosis, prescription alterations, or healthcare provider consultation.'
    )
  );
};
