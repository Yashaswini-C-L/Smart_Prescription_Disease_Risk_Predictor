import React from 'react';
import { useHealth } from '../context/HealthContext';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Stethoscope,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

const e = React.createElement;

export const HealthRoadmap = () => {
  const { roadmap, toggleRoadmapGoal } = useHealth();

  const totalGoals = roadmap.reduce((acc, m) => acc + m.goals.length, 0);
  const completedGoals = roadmap.reduce((acc, m) => acc + m.goals.filter(g => g.done).length, 0);
  const progressPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return e(
    'div',
    { className: 'space-y-6 animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4' },
      e(
        'div',
        null,
        e('div', { className: 'flex items-center gap-2' },
          e(Milestone, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Preventive Health Roadmap')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'A structured preventive monitoring timeline divided into 3-Month, 6-Month, and 12-Month horizons.'
        )
      ),

      // Completion badge
      e(
        'div',
        { className: 'flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EDF1F7] shadow-xs' },
        e('div', { className: 'text-right text-xs' },
          e('span', { className: 'text-[#8B98B2] text-[10px] uppercase font-bold block' }, 'Roadmap Completion'),
          e('span', { className: 'font-extrabold text-[#1A2338]' }, `${completedGoals} of ${totalGoals} Milestones`)
        ),
        e('div', {
          className: 'w-10 h-10 rounded-full bg-blue-50 text-[#1E60F2] flex items-center justify-center font-extrabold text-xs'
        }, `${progressPercent}%`)
      )
    ),

    // Progress Bar
    e('div', { className: 'w-full bg-slate-200 h-2 rounded-full overflow-hidden' },
      e('div', {
        className: 'bg-gradient-to-r from-[#1E60F2] to-[#00C5BA] h-full rounded-full transition-all duration-300',
        style: { width: `${progressPercent}%` }
      })
    ),

    // Three Interval Milestones (Next 3, Next 6, Next 12 Months)
    e(
      'div',
      { className: 'space-y-6' },
      roadmap.map((stage, sIdx) => {
        const stageCompleted = stage.goals.filter(g => g.done).length;

        return e(
          'div',
          {
            key: sIdx,
            className: 'bg-white rounded-2xl p-6 border border-[#EDF1F7] shadow-card space-y-4 relative overflow-hidden'
          },
          // Accent colored bar
          e('div', {
            className: `absolute top-0 left-0 right-0 h-1 ${
              sIdx === 0 ? 'bg-[#1E60F2]' : sIdx === 1 ? 'bg-[#00C5BA]' : 'bg-[#7C3AED]'
            }`
          }),

          // Milestone header
          e('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2' },
            e('div', { className: 'flex items-center gap-3' },
              e('div', {
                className: `w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                  sIdx === 0 ? 'bg-blue-50 text-[#1E60F2]' : sIdx === 1 ? 'bg-teal-50 text-[#00C5BA]' : 'bg-purple-50 text-[#7C3AED]'
                }`
              }, `0${sIdx + 1}`),
              e('div', null,
                e('h2', { className: 'text-base font-bold text-[#1A2338]' }, stage.milestone),
                e('span', { className: 'text-xs text-[#8B98B2]' }, stage.timeframe)
              )
            ),
            e(StatusBadge, { status: `${stageCompleted}/${stage.goals.length} Completed` })
          ),

          // Goals Checklist
          e(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-2 gap-3 my-2' },
            stage.goals.map(goal =>
              e(
                'div',
                {
                  key: goal.id,
                  onClick: () => toggleRoadmapGoal(sIdx, goal.id),
                  className: `p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none text-xs ${
                    goal.done
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : 'bg-[#F8FAFD] border-[#EDF1F7] hover:border-blue-200 text-[#1A2338]'
                  }`
                },
                e('div', { className: 'mt-0.5 flex-shrink-0' },
                  goal.done
                    ? e(CheckCircle2, { className: 'w-4 h-4 text-emerald-600' })
                    : e(Circle, { className: 'w-4 h-4 text-slate-300' })
                ),
                e('span', { className: `flex-1 leading-relaxed ${goal.done ? 'line-through text-slate-400' : 'text-[#334155] font-semibold'}` },
                  goal.text
                )
              )
            )
          ),

          // Physician Advice note
          stage.clinicalAdvice
            ? e('div', { className: 'p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2 text-[#6B7A99]' },
                e(Stethoscope, { className: 'w-4 h-4 text-[#1E60F2] flex-shrink-0 mt-0.5' }),
                e('div', null,
                  e('strong', { className: 'text-[#1A2338]' }, 'Clinical Focus: '),
                  stage.clinicalAdvice
                )
              )
            : null
        );
      })
    )
  );
};
