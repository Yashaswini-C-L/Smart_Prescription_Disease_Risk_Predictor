import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  FileText,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const e = React.createElement;

export const HelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the Medicine Safety Checker identify interactions?',
      a: 'The checker compares your active medicines against known pharmacological interaction databases (such as DDInter). It flags potential drug-drug interactions, displays severity ratings (High, Moderate, Minor), and provides practical precautions to discuss with your prescribing physician.'
    },
    {
      q: 'Is the Disease Risk Assessment a formal medical diagnosis?',
      a: 'No. The assessment is a preventive statistical calculation designed to help you understand personal risk factors like blood pressure, blood glucose, and BMI over 5-year horizons. It never replaces laboratory testing or clinical diagnosis by a doctor.'
    },
    {
      q: 'How do I download my full consolidated medical report?',
      a: 'Click the "Download My Health Report" button located at the top right of the navigation bar on any page. It creates a standardized, printable PDF file summarizing your profile, active medications, lab records, and roadmap milestones.'
    },
    {
      q: 'What is the difference between Document Upload and Manual Entry?',
      a: 'Document Upload allows you to store scanned PDFs and image files of your doctor orders and lab slips. Manual Entry lets you type specific dosages, frequency instructions, and numerical test results directly into your digital record.'
    }
  ];

  return e(
    'div',
    { className: 'space-y-6 max-w-3xl animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      null,
      e('div', { className: 'flex items-center gap-2' },
        e(HelpCircle, { className: 'w-6 h-6 text-[#1E60F2]' }),
        e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Help & Patient Support')
      ),
      e(
        'p',
        { className: 'text-xs text-[#6B7A99] mt-1' },
        'Find answers to common questions about managing prescriptions, checking drug safety, and utilizing your health roadmap.'
      )
    ),

    // Emergency Advisory Card
    e(
      'div',
      { className: 'p-5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-1' },
      e('div', { className: 'font-bold flex items-center gap-1.5 text-sm text-rose-700' },
        e(Phone, { className: 'w-4 h-4' }),
        e('span', null, 'Emergency Clinical Notice')
      ),
      e('p', { className: 'text-[11px] text-rose-800 leading-relaxed' },
        'If you are experiencing acute chest pain, shortness of breath, severe allergic reactions, or adverse medication effects, immediately call emergency medical services (911 or your local emergency number) or visit the nearest emergency room.'
      )
    ),

    // FAQs Accordion
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
      e('h3', { className: 'text-sm font-bold text-[#1A2338] border-b border-[#EDF1F7] pb-3' },
        'Frequently Asked Questions'
      ),
      e(
        'div',
        { className: 'space-y-3' },
        faqs.map((faq, idx) =>
          e(
            'div',
            {
              key: idx,
              className: 'p-3.5 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer transition-all',
              onClick: () => setOpenFaq(openFaq === idx ? -1 : idx)
            },
            e('div', { className: 'flex justify-between items-center text-xs font-bold text-[#1A2338]' },
              e('span', null, faq.q),
              e(ChevronDown, { className: `w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}` })
            ),
            openFaq === idx
              ? e('p', { className: 'text-xs text-[#475569] mt-2 pt-2 border-t border-slate-200/60 leading-relaxed' },
                  faq.a
                )
              : null
          )
        )
      )
    )
  );
};
