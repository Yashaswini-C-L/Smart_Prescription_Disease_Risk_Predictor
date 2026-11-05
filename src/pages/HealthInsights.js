import React from 'react';
import { useHealth } from '../context/HealthContext';
import {
  BarChart3,
  TrendingUp,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Pill,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const e = React.createElement;

export const HealthInsights = () => {
  const {
    historicalVitalsTrends,
    prescriptions,
    labReports,
    riskAssessments
  } = useHealth();

  return e(
    'div',
    { className: 'space-y-6 animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      null,
      e('div', { className: 'flex items-center gap-2' },
        e(BarChart3, { className: 'w-6 h-6 text-[#1E60F2]' }),
        e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Personal Health Insights')
      ),
      e(
        'p',
        { className: 'text-xs text-[#6B7A99] mt-1' },
        'Synthesis of laboratory trends, medication adherence, and preventive health markers.'
      )
    ),

    // Four Health Insight Cards
    e(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-3 gap-5' },

      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card' },
        e('div', { className: 'flex items-center gap-2 text-xs font-bold text-blue-600 mb-2' },
          e(Sparkles, { className: 'w-4 h-4' }),
          e('span', null, 'Blood Pressure Trend')
        ),
        e('div', { className: 'text-sm font-bold text-[#1A2338] mb-1' }, 'Stabilizing Under Lisinopril'),
        e('p', { className: 'text-xs text-[#6B7A99] leading-relaxed' },
          'Systolic BP has decreased from 144 mmHg in May to 138 mmHg in October. Continue regular morning monitoring.'
        )
      ),

      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card' },
        e('div', { className: 'flex items-center gap-2 text-xs font-bold text-amber-600 mb-2' },
          e(AlertTriangle, { className: 'w-4 h-4' }),
          e('span', null, 'Glycemic Surveillance')
        ),
        e('div', { className: 'text-sm font-bold text-[#1A2338] mb-1' }, 'Impaired Fasting Glucose'),
        e('p', { className: 'text-xs text-[#6B7A99] leading-relaxed' },
          'Fasting blood glucose has hovered between 108 and 115 mg/dL. Keep up with dietary carbohydrate reduction and 90-day HbA1c tests.'
        )
      ),

      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card' },
        e('div', { className: 'flex items-center gap-2 text-xs font-bold text-emerald-600 mb-2' },
          e(ShieldCheck, { className: 'w-4 h-4' }),
          e('span', null, 'Kidney Function')
        ),
        e('div', { className: 'text-sm font-bold text-[#1A2338] mb-1' }, 'Preserved eGFR Filtration'),
        e('p', { className: 'text-xs text-[#6B7A99] leading-relaxed' },
          'Renal filtration rate remains normal (88-92 mL/min/1.73m²). Annual urine microalbumin test recommended to maintain safety.'
        )
      )
    ),

    // Visual Chart 1: Blood Pressure & Glucose Multi-Line Chart
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card' },
      e('div', { className: 'flex justify-between items-center mb-4' },
        e('div', null,
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, '6-Month Multi-Biomarker Progression'),
          e('span', { className: 'text-xs text-[#8B98B2]' }, 'Systolic BP (mmHg) vs Fasting Glucose (mg/dL) vs Total Cholesterol (mg/dL)')
        )
      ),
      e(
        'div',
        { className: 'h-64 w-full' },
        e(
          ResponsiveContainer,
          { width: '100%', height: '100%' },
          e(
            LineChart,
            { data: historicalVitalsTrends },
            e(XAxis, { dataKey: 'month', stroke: '#94A3B8', fontSize: 11 }),
            e(YAxis, { domain: [80, 240], stroke: '#94A3B8', fontSize: 11 }),
            e(Tooltip, {
              contentStyle: {
                backgroundColor: '#FFF',
                borderRadius: '12px',
                border: '1px solid #EDF1F7',
                fontSize: '12px'
              }
            }),
            e(Legend, { wrapperStyle: { fontSize: '11px', paddingTop: '10px' } }),
            e(Line, {
              type: 'monotone',
              dataKey: 'systolic',
              name: 'Systolic BP (mmHg)',
              stroke: '#1E60F2',
              strokeWidth: 2.5,
              dot: { r: 3 }
            }),
            e(Line, {
              type: 'monotone',
              dataKey: 'fastingGlucose',
              name: 'Fasting Glucose (mg/dL)',
              stroke: '#00C5BA',
              strokeWidth: 2.5,
              dot: { r: 3 }
            }),
            e(Line, {
              type: 'monotone',
              dataKey: 'totalCholesterol',
              name: 'Total Cholesterol (mg/dL)',
              stroke: '#F59E0B',
              strokeWidth: 2.5,
              dot: { r: 3 }
            })
          )
        )
      )
    ),

    // Medication Safety Summary Box
    e(
      'div',
      { className: 'p-6 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-2xl border border-blue-200/80 text-xs text-blue-900 space-y-2' },
      e('div', { className: 'flex items-center gap-2 font-bold text-sm text-[#1E60F2]' },
        e(Pill, { className: 'w-4 h-4' }),
        e('span', null, 'Active Medication Regimen Adherence')
      ),
      e('p', { className: 'leading-relaxed text-[#334155]' },
        `You currently take ${prescriptions.filter(p => p.status === 'Active').length} active prescribed medications. Maintain consistent daily timing, and ensure non-steroidal anti-inflammatory drugs (NSAIDs like Ibuprofen) are used cautiously to protect renal balance while taking Lisinopril.`
      )
    )
  );
};
