import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  BellRing,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Pill,
  FlaskConical,
  User
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';

const e = React.createElement;

export const Reminders = () => {
  const { reminders, toggleReminder, addReminder, deleteReminder, addToast } = useHealth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Medication'); // 'Medication' | 'Lab Test' | 'Follow-up'
  const [dueTime, setDueTime] = useState('08:00 AM');
  const [recurring, setRecurring] = useState('Daily');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!title) {
      addToast('Please enter a reminder title.', 'error');
      return;
    }

    addReminder({
      title,
      details,
      category,
      dueTime,
      recurring
    });

    setIsModalOpen(false);
    setTitle('');
    setDetails('');
  };

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
          e(BellRing, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Health Reminders')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Schedule medication timings, lab test appointments, and routine doctor follow-ups.'
        )
      ),

      e(
        'button',
        {
          onClick: () => setIsModalOpen(true),
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
        },
        e(Plus, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'New Reminder')
      )
    ),

    // Reminders List
    e(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
      reminders.map(rem => {
        const isMed = rem.category === 'Medication';
        const isLab = rem.category === 'Lab Test';

        let icon = e(User, { className: 'w-4 h-4 text-blue-600' });
        if (isMed) icon = e(Pill, { className: 'w-4 h-4 text-indigo-600' });
        if (isLab) icon = e(FlaskConical, { className: 'w-4 h-4 text-teal-600' });

        return e(
          'div',
          {
            key: rem.id,
            className: `p-5 rounded-2xl border transition-all flex items-start gap-4 ${
              rem.completed
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-white border-[#EDF1F7] shadow-card'
            }`
          },
          e(
            'button',
            {
              onClick: () => toggleReminder(rem.id),
              className: 'mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors'
            },
            rem.completed
              ? e(CheckCircle2, { className: 'w-5 h-5 text-emerald-600' })
              : e(Circle, { className: 'w-5 h-5' })
          ),

          e(
            'div',
            { className: 'flex-1' },
            e('div', { className: 'flex justify-between items-start gap-2 mb-1' },
              e('h3', { className: `text-sm font-bold ${rem.completed ? 'line-through text-slate-400' : 'text-[#1A2338]'}` }, rem.title),
              e(StatusBadge, { status: rem.category, size: 'xs' })
            ),
            e('p', { className: 'text-xs text-[#6B7A99] mb-2' }, rem.details),
            e('div', { className: 'flex items-center gap-3 text-[11px] font-semibold text-[#8B98B2]' },
              e('span', { className: 'flex items-center gap-1 text-[#1E60F2]' },
                e(Clock, { className: 'w-3 h-3' }),
                rem.dueTime
              ),
              e('span', null, `• ${rem.recurring}`)
            )
          ),

          e(
            'button',
            {
              onClick: () => deleteReminder(rem.id),
              className: 'text-slate-400 hover:text-red-500 p-1'
            },
            e(Trash2, { className: 'w-4 h-4' })
          )
        );
      })
    ),

    // Modal Add Reminder
    e(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        title: 'Create Personal Health Reminder',
        subtitle: 'Never miss medication dosages, laboratory draws or follow-ups'
      },
      e(
        'form',
        { onSubmit: handleSubmit, className: 'space-y-4' },
        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Reminder Title *'),
          e('input', {
            type: 'text',
            required: true,
            value: title,
            onChange: (ev) => setTitle(ev.target.value),
            placeholder: 'e.g. Take evening Metformin dose',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),

        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Category'),
            e('select', {
              value: category,
              onChange: (ev) => setCategory(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            },
              e('option', { value: 'Medication' }, 'Medication'),
              e('option', { value: 'Lab Test' }, 'Lab Test'),
              e('option', { value: 'Follow-up' }, 'Doctor Follow-up')
            )
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Timing / Due Time'),
            e('input', {
              type: 'text',
              value: dueTime,
              onChange: (ev) => setDueTime(ev.target.value),
              placeholder: 'e.g. 08:00 AM or Jan 15, 2027',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Recurrence Frequency'),
          e('select', {
            value: recurring,
            onChange: (ev) => setRecurring(ev.target.value),
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          },
            e('option', { value: 'Daily' }, 'Daily'),
            e('option', { value: 'Twice daily' }, 'Twice daily'),
            e('option', { value: 'Weekly' }, 'Weekly'),
            e('option', { value: 'One-time' }, 'One-time')
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Details & Instructions'),
          e('textarea', {
            rows: 2,
            value: details,
            onChange: (ev) => setDetails(ev.target.value),
            placeholder: 'e.g. 1 tablet with meal and water...',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),

        e('div', { className: 'flex justify-end gap-2 pt-2' },
          e('button', {
            type: 'button',
            onClick: () => setIsModalOpen(false),
            className: 'px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl'
          }, 'Cancel'),
          e('button', {
            type: 'submit',
            className: 'px-4 py-2 bg-[#1E60F2] text-white font-bold text-xs rounded-xl'
          }, 'Save Reminder')
        )
      )
    )
  );
};
