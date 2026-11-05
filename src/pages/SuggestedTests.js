import React from 'react';
import { useHealth } from '../context/HealthContext';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

const e = React.createElement;

export const SuggestedTests = () => {
  const { suggestedTests, addTestToRoadmap, toggleTestCompleted } = useHealth();

  return e(
    'div',
    { className: 'space-y-6 animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      null,
      e('div', { className: 'flex items-center gap-2' },
        e(ClipboardList, { className: 'w-6 h-6 text-[#1E60F2]' }),
        e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Suggested Lab Tests')
      ),
      e(
        'p',
        { className: 'text-xs text-[#6B7A99] mt-1' },
        'Diagnostic laboratory test recommendations aligned with your active prescriptions and assessed risk factors.'
      )
    ),

    // Grid of Suggested Tests
    e(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 gap-5' },
      suggestedTests.map(test =>
        e(
          'div',
          {
            key: test.id,
            className: 'bg-white rounded-2xl p-6 border border-[#EDF1F7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4'
          },
          e('div', { className: 'space-y-2' },
            e('div', { className: 'flex justify-between items-start gap-2' },
              e(StatusBadge, { status: `${test.priority} Priority`, size: 'xs' }),
              e('span', { className: 'text-xs font-semibold text-[#8B98B2] flex items-center gap-1' },
                e(Clock, { className: 'w-3 h-3' }),
                test.monitoringPeriod
              )
            ),
            e('h3', { className: 'text-base font-bold text-[#1A2338]' }, test.name),
            e('div', { className: 'text-xs font-bold text-blue-600' }, test.category),
            e('p', { className: 'text-xs text-[#334155] leading-relaxed bg-[#F8FAFD] p-3 rounded-xl border border-[#EDF1F7]' },
              test.reason
            ),
            e('div', { className: 'text-xs text-[#6B7A99]' },
              e('strong', { className: 'text-[#1A2338]' }, 'Related Health Indicator: '),
              test.relatedFactor
            )
          ),

          // Actions
          e('div', { className: 'pt-3 border-t border-[#EDF1F7] flex items-center justify-between text-xs' },
            e(
              'button',
              {
                onClick: () => toggleTestCompleted(test.id),
                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  test.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`
              },
              e(CheckCircle2, { className: 'w-3.5 h-3.5' }),
              e('span', null, test.completed ? 'Marked Completed' : 'Mark Completed')
            ),

            !test.inRoadmap
              ? e(
                  'button',
                  {
                    onClick: () => addTestToRoadmap(test.id),
                    className: 'text-blue-600 font-bold hover:underline flex items-center gap-1'
                  },
                  e(Plus, { className: 'w-3.5 h-3.5' }),
                  e('span', null, 'Add to Roadmap')
                )
              : e('span', { className: 'text-emerald-600 font-bold text-xs' }, '✓ In Roadmap')
          )
        )
      )
    )
  );
};
