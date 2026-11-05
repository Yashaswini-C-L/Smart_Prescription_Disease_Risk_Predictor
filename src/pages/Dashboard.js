import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import {
  FolderArchive,
  Pill,
  ShieldAlert,
  BrainCircuit,
  Milestone,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Upload,
  AlertTriangle,
  Clock,
  Sparkles,
  HeartPulse,
  TrendingUp,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    records,
    prescriptions,
    labReports,
    riskAssessments,
    roadmap,
    reminders,
    checkDrugInteractions
  } = useHealth();

  const activePrescriptions = prescriptions.filter(p => p.status === 'Active');
  const detectedInteractions = checkDrugInteractions(activePrescriptions.map(p => p.medicineName));
  const latestAssessment = riskAssessments[0] || null;

  // Next upcoming tasks from reminders and roadmap
  const pendingReminders = reminders.filter(r => !r.completed);

  return e(
    'div',
    { className: 'space-y-8 animate-in fade-in duration-150' },

    // Welcome Banner (Requirement 6)
    e(
      'div',
      { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4' },
      e(
        'div',
        null,
        e(
          'h1',
          { className: 'text-2xl sm:text-3xl font-extrabold text-[#1A2338] tracking-tight' },
          `Good Morning, ${user.name ? user.name.split(' ')[0] : 'there'}!`
        ),
        e(
          'p',
          { className: 'text-xs sm:text-sm text-[#6B7A99] font-medium mt-1' },
          'Your health journey, organized in one place.'
        )
      ),
      e(
        'div',
        { className: 'flex items-center gap-2' },
        e(
          'span',
          { className: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1E60F2] border border-blue-200' },
          e(HeartPulse, { className: 'w-3.5 h-3.5' }),
          'Personal Digital Health Assistant'
        )
      )
    ),

    // Prominent Feature Banner (Requirement 6)
    e(
      'div',
      {
        className: 'bg-gradient-to-r from-[#1E60F2] via-blue-700 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden'
      },
      e('div', { className: 'max-w-2xl relative z-10' },
        e('span', { className: 'text-xs font-bold uppercase tracking-wider text-blue-200 block mb-1' },
          'Your Health, All in One Place'
        ),
        e('h2', { className: 'text-xl sm:text-2xl font-bold tracking-tight mb-2' },
          'Understand your medicines, organize your records and stay informed about your health.'
        ),
        e('p', { className: 'text-xs text-blue-100 leading-relaxed mb-6' },
          'Safeguard against conflicting drug combinations, keep chronological diagnostic charts at your fingertips, and follow a preventive monitoring roadmap.'
        ),
        e(
          'div',
          { className: 'grid grid-cols-2 sm:grid-cols-4 gap-3' },
          // Action 1: Upload Records
          e(
            'button',
            {
              onClick: () => navigate('/records'),
              className: 'p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-left border border-white/15 transition-all group'
            },
            e(Upload, { className: 'w-5 h-5 text-blue-200 mb-2 group-hover:scale-110 transition-transform' }),
            e('div', { className: 'text-xs font-bold' }, 'Upload Records'),
            e('div', { className: 'text-[10px] text-blue-200' }, 'Add Rx & Labs')
          ),
          // Action 2: Check Medicines
          e(
            'button',
            {
              onClick: () => navigate('/medicine-safety'),
              className: 'p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-left border border-white/15 transition-all group'
            },
            e(ShieldAlert, { className: 'w-5 h-5 text-amber-200 mb-2 group-hover:scale-110 transition-transform' }),
            e('div', { className: 'text-xs font-bold' }, 'Check Medicines'),
            e('div', { className: 'text-[10px] text-blue-200' }, 'Drug Interactions')
          ),
          // Action 3: Assess Health Risks
          e(
            'button',
            {
              onClick: () => navigate('/disease-risk'),
              className: 'p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-left border border-white/15 transition-all group'
            },
            e(BrainCircuit, { className: 'w-5 h-5 text-teal-200 mb-2 group-hover:scale-110 transition-transform' }),
            e('div', { className: 'text-xs font-bold' }, 'Assess Health Risks'),
            e('div', { className: 'text-[10px] text-blue-200' }, 'Secondary Risks')
          ),
          // Action 4: View Health Roadmap
          e(
            'button',
            {
              onClick: () => navigate('/roadmap'),
              className: 'p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-left border border-white/15 transition-all group'
            },
            e(Milestone, { className: 'w-5 h-5 text-indigo-200 mb-2 group-hover:scale-110 transition-transform' }),
            e('div', { className: 'text-xs font-bold' }, 'Health Roadmap'),
            e('div', { className: 'text-[10px] text-blue-200' }, 'Suggested Tests')
          )
        )
      )
    ),

    // Four Summary Metric Cards (Requirement 6)
    e(
      'div',
      { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' },
      // Total Medical Records
      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card flex items-center justify-between' },
        e('div', null,
          e('span', { className: 'text-xs font-bold text-[#6B7A99] block' }, 'Total Medical Records'),
          e('div', { className: 'text-2xl font-extrabold text-[#1A2338] mt-1' }, records.length),
          e('span', { className: 'text-[10px] text-emerald-600 font-bold' }, 'Prescriptions & Labs archived')
        ),
        e('div', { className: 'w-10 h-10 rounded-xl bg-blue-50 text-[#1E60F2] flex items-center justify-center' },
          e(FolderArchive, { className: 'w-5 h-5' })
        )
      ),

      // Active Medications
      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card flex items-center justify-between' },
        e('div', null,
          e('span', { className: 'text-xs font-bold text-[#6B7A99] block' }, 'Active Medications'),
          e('div', { className: 'text-2xl font-extrabold text-[#1A2338] mt-1' }, activePrescriptions.length),
          e('span', { className: 'text-[10px] text-blue-600 font-bold' }, 'Current daily regimen')
        ),
        e('div', { className: 'w-10 h-10 rounded-xl bg-teal-50 text-[#00C5BA] flex items-center justify-center' },
          e(Pill, { className: 'w-5 h-5' })
        )
      ),

      // Completed Health Assessments
      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card flex items-center justify-between' },
        e('div', null,
          e('span', { className: 'text-xs font-bold text-[#6B7A99] block' }, 'Health Assessments'),
          e('div', { className: 'text-2xl font-extrabold text-[#1A2338] mt-1' }, riskAssessments.length),
          e('span', { className: 'text-[10px] text-indigo-600 font-bold' }, 'AI disease evaluations')
        ),
        e('div', { className: 'w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center' },
          e(BrainCircuit, { className: 'w-5 h-5' })
        )
      ),

      // Upcoming Health Tasks
      e(
        'div',
        { className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card flex items-center justify-between' },
        e('div', null,
          e('span', { className: 'text-xs font-bold text-[#6B7A99] block' }, 'Upcoming Tasks'),
          e('div', { className: 'text-2xl font-extrabold text-[#1A2338] mt-1' }, pendingReminders.length),
          e('span', { className: 'text-[10px] text-amber-600 font-bold' }, 'Reminders & follow-ups')
        ),
        e('div', { className: 'w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center' },
          e(Clock, { className: 'w-5 h-5' })
        )
      )
    ),

    // Middle Grid: Safety Overview & Disease Risk Overview
    e(
      'div',
      { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' },

      // Medicine Safety Overview (Requirement 6)
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col justify-between' },
        e('div', null,
          e('div', { className: 'flex items-center justify-between mb-3' },
            e('div', { className: 'flex items-center gap-2' },
              e(ShieldAlert, { className: 'w-5 h-5 text-[#1E60F2]' }),
              e('h3', { className: 'font-bold text-sm text-[#1A2338]' }, 'Medicine Safety Overview')
            ),
            e(StatusBadge, {
              status: detectedInteractions.length > 0 ? `${detectedInteractions.length} Warning(s)` : 'All Regimens Clear'
            })
          ),
          e('p', { className: 'text-xs text-[#6B7A99] mb-4' },
            `${activePrescriptions.length} active medicines currently cross-referenced against pharmacological drug interaction tables.`
          ),
          detectedInteractions.length > 0
            ? e('div', { className: 'p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1 mb-4' },
                e('div', { className: 'font-bold flex items-center gap-1.5' },
                  e(AlertTriangle, { className: 'w-3.5 h-3.5 text-amber-600' }),
                  e('span', null, `${detectedInteractions[0].drugA} + ${detectedInteractions[0].drugB}`)
                ),
                e('p', { className: 'text-[11px] text-amber-800' }, detectedInteractions[0].effect)
              )
            : e('div', { className: 'p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 mb-4' },
                e(CheckCircle2, { className: 'w-4 h-4 text-emerald-600 flex-shrink-0' }),
                e('span', null, 'No severe interaction risks identified between your active medicines.')
              )
        ),
        e(
          'button',
          {
            onClick: () => navigate('/medicine-safety'),
            className: 'w-full py-2.5 bg-[#F8FAFD] hover:bg-blue-50 text-[#1E60F2] font-bold text-xs rounded-xl border border-[#EDF1F7] transition-colors flex items-center justify-center gap-1.5'
          },
          e('span', null, 'Open Medicine Safety Checker'),
          e(ArrowRight, { className: 'w-3.5 h-3.5' })
        )
      ),

      // Disease Risk Overview (Requirement 6)
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col justify-between' },
        e('div', null,
          e('div', { className: 'flex items-center justify-between mb-3' },
            e('div', { className: 'flex items-center gap-2' },
              e(BrainCircuit, { className: 'w-5 h-5 text-indigo-600' }),
              e('h3', { className: 'font-bold text-sm text-[#1A2338]' }, 'Disease Risk Assessment Overview')
            ),
            latestAssessment
              ? e(StatusBadge, { status: `${latestAssessment.riskLevel} Risk` })
              : null
          ),
          latestAssessment
            ? e('div', null,
                e('div', { className: 'flex items-baseline gap-2 mb-1' },
                  e('span', { className: 'text-3xl font-extrabold text-[#1A2338]' }, `${latestAssessment.riskScore}%`),
                  e('span', { className: 'text-xs text-[#6B7A99]' }, 'Estimated Transition Probability')
                ),
                e('p', { className: 'text-xs font-bold text-[#334155] mb-2' }, latestAssessment.disease),
                e('p', { className: 'text-xs text-[#6B7A99] line-clamp-2 mb-4' }, latestAssessment.recommendationsSummary)
              )
            : e('p', { className: 'text-xs text-[#8B98B2] py-4' }, 'No disease risk assessment recorded yet.')
        ),
        e(
          'button',
          {
            onClick: () => navigate('/disease-risk'),
            className: 'w-full py-2.5 bg-[#F8FAFD] hover:bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl border border-[#EDF1F7] transition-colors flex items-center justify-center gap-1.5'
          },
          e('span', null, 'Explore Disease Risk Predictor'),
          e(ArrowRight, { className: 'w-3.5 h-3.5' })
        )
      )
    ),

    // Bottom Grid: Recent Medical Records + Roadmap Preview
    e(
      'div',
      { className: 'grid grid-cols-1 lg:grid-cols-3 gap-6' },

      // Recent Records List (2 Cols)
      e(
        'div',
        { className: 'lg:col-span-2 bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card' },
        e('div', { className: 'flex items-center justify-between mb-4 pb-3 border-b border-[#EDF1F7]' },
          e('h3', { className: 'font-bold text-sm text-[#1A2338]' }, 'Recent Medical Records & Activity'),
          e('button', {
            onClick: () => navigate('/records'),
            className: 'text-xs font-bold text-[#1E60F2] hover:underline'
          }, 'View All')
        ),
        e(
          'div',
          { className: 'divide-y divide-[#F8FAFD] text-xs' },
          records.slice(0, 4).map((rec) =>
            e(
              'div',
              { key: rec.id, className: 'py-3 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-colors' },
              e('div', { className: 'flex items-center gap-3' },
                e('div', { className: `w-8 h-8 rounded-lg flex items-center justify-center ${
                  rec.type === 'prescription' ? 'bg-blue-50 text-[#1E60F2]' : 'bg-teal-50 text-[#00C5BA]'
                }` },
                  e(FileText, { className: 'w-4 h-4' })
                ),
                e('div', null,
                  e('div', { className: 'font-bold text-[#1A2338]' }, rec.title),
                  e('div', { className: 'text-[11px] text-[#8B98B2]' },
                    `${formatDate(rec.date)} • ${rec.entryMethod === 'document_upload' ? 'Uploaded Document' : 'Manual Entry'}`
                  )
                )
              ),
              e(StatusBadge, { status: rec.type === 'prescription' ? 'Prescription' : 'Lab Diagnostic', size: 'xs' })
            )
          )
        )
      ),

      // Preventive Roadmap Preview (1 Col)
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col justify-between' },
        e('div', null,
          e('div', { className: 'flex items-center justify-between mb-4 pb-3 border-b border-[#EDF1F7]' },
            e('h3', { className: 'font-bold text-sm text-[#1A2338]' }, 'Preventive Health Roadmap'),
            e('span', { className: 'text-xs font-bold text-blue-600' }, '3-Month Milestone')
          ),
          e(
            'div',
            { className: 'space-y-2 mb-4' },
            (roadmap[0]?.goals || []).slice(0, 3).map((goal) =>
              e(
                'div',
                { key: goal.id, className: 'p-2.5 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] text-xs flex items-center gap-2' },
                e('div', { className: `w-2 h-2 rounded-full ${goal.done ? 'bg-emerald-500' : 'bg-slate-300'}` }),
                e('span', { className: `flex-1 truncate ${goal.done ? 'line-through text-slate-400' : 'text-[#334155]'}` }, goal.text)
              )
            )
          )
        ),
        e(
          'button',
          {
            onClick: () => navigate('/roadmap'),
            className: 'w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#1E60F2] font-bold text-xs rounded-xl transition-colors'
          },
          'View Full Roadmap'
        )
      )
    )
  );
};
