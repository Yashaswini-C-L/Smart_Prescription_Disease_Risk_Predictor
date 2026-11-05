import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  CalendarDays,
  Pill,
  FlaskConical,
  BrainCircuit,
  FileText,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const MedicalTimeline = () => {
  const { records, prescriptions, labReports, riskAssessments } = useHealth();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'prescription' | 'lab_report' | 'assessment' | 'history'
  const [searchQuery, setSearchQuery] = useState('');

  // Assemble unified chronological timeline entries
  const timelineItems = [
    ...prescriptions.map(rx => ({
      id: rx.id,
      date: rx.prescriptionDate || rx.startDate,
      type: 'prescription',
      title: `${rx.medicineName} (${rx.dosage})`,
      subtitle: `Prescribed by ${rx.doctor || 'Physician'} • ${rx.frequency}`,
      status: rx.status || 'Active',
      details: rx.diagnosis || rx.notes || 'Prescription medication order'
    })),
    ...labReports.map(lab => ({
      id: lab.id,
      date: lab.date,
      type: 'lab_report',
      title: lab.title || lab.testName,
      subtitle: 'Diagnostic Laboratory Panel',
      status: 'Recorded',
      details: lab.description || 'Biochemical test results archived'
    })),
    ...riskAssessments.map(rsk => ({
      id: rsk.id,
      date: rsk.assessmentDate,
      type: 'assessment',
      title: `${rsk.disease} Assessment`,
      subtitle: `Estimated Probability: ${rsk.riskScore}%`,
      status: `${rsk.riskLevel} Risk`,
      details: rsk.recommendationsSummary
    })),
    ...records.filter(r => r.type === 'history').map(h => ({
      id: h.id,
      date: h.date,
      type: 'history',
      title: h.title,
      subtitle: h.doctor || 'Personal Record',
      status: 'Documented',
      details: h.summary
    }))
  ];

  // Sort newest first
  const sortedItems = timelineItems
    .filter(item => {
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
          e(CalendarDays, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Medical Timeline')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Chronological visual history of your prescriptions, laboratory test reports, and risk assessments.'
        )
      )
    ),

    // Filter toolbar
    e(
      'div',
      { className: 'bg-white p-4 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col md:flex-row items-center justify-between gap-4' },
      e(
        'div',
        { className: 'flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0' },
        [
          { id: 'all', label: 'All Events' },
          { id: 'prescription', label: 'Prescriptions' },
          { id: 'lab_report', label: 'Lab Reports' },
          { id: 'assessment', label: 'AI Risk Assessments' },
          { id: 'history', label: 'Clinical History' }
        ].map(tab =>
          e(
            'button',
            {
              key: tab.id,
              onClick: () => setFilterType(tab.id),
              className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-[#1E60F2] text-white shadow-xs'
                  : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
              }`
            },
            tab.label
          )
        )
      ),

      e(
        'div',
        { className: 'relative w-full md:w-64' },
        e(Search, { className: 'w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
        e('input', {
          type: 'text',
          value: searchQuery,
          onChange: (ev) => setSearchQuery(ev.target.value),
          placeholder: 'Search timeline...',
          className: 'w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
        })
      )
    ),

    // Chronological Stream
    sortedItems.length === 0
      ? e(
          'div',
          { className: 'bg-white p-12 rounded-2xl border border-[#EDF1F7] text-center shadow-card' },
          e(AlertCircle, { className: 'w-10 h-10 text-slate-300 mx-auto mb-2' }),
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'No events found'),
          e('p', { className: 'text-xs text-[#6B7A99]' }, 'Try broadening your search or filter options.')
        )
      : e(
          'div',
          { className: 'relative pl-6 sm:pl-8 border-l-2 border-blue-200 ml-4 space-y-6' },
          sortedItems.map(item => {
            const isRx = item.type === 'prescription';
            const isLab = item.type === 'lab_report';
            const isRisk = item.type === 'assessment';

            let nodeIcon = e(FileText, { className: 'w-4 h-4' });
            let nodeBg = 'bg-[#1E60F2] text-white';

            if (isRx) {
              nodeIcon = e(Pill, { className: 'w-4 h-4' });
              nodeBg = 'bg-[#1E60F2] text-white';
            } else if (isLab) {
              nodeIcon = e(FlaskConical, { className: 'w-4 h-4' });
              nodeBg = 'bg-[#00C5BA] text-white';
            } else if (isRisk) {
              nodeIcon = e(BrainCircuit, { className: 'w-4 h-4' });
              nodeBg = 'bg-[#7C3AED] text-white';
            }

            return e(
              'div',
              { key: item.id, className: 'relative group' },
              // Circular timeline node
              e(
                'div',
                {
                  className: `absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#F5F7FB] shadow-xs ${nodeBg}`
                },
                nodeIcon
              ),

              // Event Card
              e(
                'div',
                {
                  className: 'bg-white p-5 rounded-2xl border border-[#EDF1F7] shadow-card hover:shadow-card-hover transition-all'
                },
                e(
                  'div',
                  { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2' },
                  e('div', null,
                    e('span', { className: 'text-[11px] font-semibold text-[#8B98B2] flex items-center gap-1' },
                      e(Calendar, { className: 'w-3 h-3 text-[#1E60F2]' }),
                      formatDate(item.date)
                    ),
                    e('h3', { className: 'text-sm font-bold text-[#1A2338] mt-0.5' }, item.title)
                  ),
                  e(StatusBadge, { status: item.status, size: 'xs' })
                ),
                e('div', { className: 'text-xs text-[#6B7A99] font-medium mb-2' }, item.subtitle),
                item.details
                  ? e('p', { className: 'text-xs text-[#334155] leading-relaxed bg-[#F8FAFD] p-2.5 rounded-xl border border-[#EDF1F7]' },
                      item.details
                    )
                  : null
              )
            );
          })
        )
  );
};
