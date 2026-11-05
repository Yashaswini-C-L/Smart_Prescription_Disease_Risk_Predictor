import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  FlaskConical,
  Plus,
  Upload,
  Calendar,
  Activity,
  Trash2,
  Search,
  LineChart as LineChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const LabReports = () => {
  const { labReports, addLabReport, deleteLabReport, historicalVitalsTrends, addToast } = useHealth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [source, setSource] = useState('Manual'); // 'Manual' or 'Upload'
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  // Biomarkers manual array
  const [biomarkers, setBiomarkers] = useState([
    { name: 'Fasting Blood Glucose', value: '', unit: 'mg/dL', reference: '70 - 99', status: 'Normal' },
    { name: 'HbA1c', value: '', unit: '%', reference: '< 5.7', status: 'Normal' },
    { name: 'Total Cholesterol', value: '', unit: 'mg/dL', reference: '< 200', status: 'Normal' }
  ]);

  const handleBiomarkerChange = (idx, field, val) => {
    setBiomarkers(prev => {
      const copy = [...prev];
      copy[idx][field] = val;
      // Auto-assign sample status if number
      if (field === 'value' && val) {
        const num = parseFloat(val);
        if (copy[idx].name.includes('Glucose')) {
          copy[idx].status = num >= 126 ? 'High' : num >= 100 ? 'Elevated' : 'Normal';
        } else if (copy[idx].name.includes('HbA1c')) {
          copy[idx].status = num >= 6.5 ? 'High' : num >= 5.7 ? 'Pre-diabetic' : 'Normal';
        } else if (copy[idx].name.includes('Cholesterol')) {
          copy[idx].status = num >= 200 ? 'Borderline High' : 'Normal';
        }
      }
      return copy;
    });
  };

  const handleAddBiomarkerRow = () => {
    setBiomarkers(prev => [
      ...prev,
      { name: '', value: '', unit: '', reference: '', status: 'Normal' }
    ]);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!title) {
      addToast('Please provide a report title.', 'error');
      return;
    }

    const validBiomarkers = biomarkers.filter(b => b.name && b.value);

    addLabReport({
      title,
      testName: title,
      date: testDate,
      source,
      description: description || 'Routine laboratory investigation record.',
      fileName: source === 'Upload' ? (uploadFileName || 'Lab_Results_Document.pdf') : null,
      biomarkers: validBiomarkers
    });

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setUploadFileName('');
  };

  const filteredReports = labReports.filter(lab => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (lab.title && lab.title.toLowerCase().includes(q)) ||
      (lab.description && lab.description.toLowerCase().includes(q))
    );
  });

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
          e(FlaskConical, { className: 'w-6 h-6 text-[#00C5BA]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'My Lab Reports')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Archive blood chemistry panels, metabolic markers, and track biomarker changes over time.'
        )
      ),

      e(
        'button',
        {
          onClick: () => setIsModalOpen(true),
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-[#00C5BA] hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
        },
        e(Plus, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'Add Lab Report')
      )
    ),

    // Visual Trends Section (Requirement 9)
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card' },
      e('div', { className: 'flex items-center justify-between mb-4' },
        e('div', null,
          e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Historical Fasting Blood Glucose Trend'),
          e('span', { className: 'text-xs text-[#8B98B2]' }, '6-Month Glycemic Monitoring (mg/dL)')
        ),
        e('span', { className: 'text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200' },
          'Personal Biomarker Curve'
        )
      ),
      e(
        'div',
        { className: 'h-48 w-full' },
        e(
          ResponsiveContainer,
          { width: '100%', height: '100%' },
          e(
            LineChart,
            { data: historicalVitalsTrends },
            e(XAxis, { dataKey: 'month', stroke: '#94A3B8', fontSize: 11, tickLine: false }),
            e(YAxis, { domain: [90, 130], stroke: '#94A3B8', fontSize: 11, tickLine: false }),
            e(Tooltip, {
              contentStyle: {
                backgroundColor: '#FFF',
                borderRadius: '12px',
                border: '1px solid #EDF1F7',
                fontSize: '12px'
              }
            }),
            e(Line, {
              type: 'monotone',
              dataKey: 'fastingGlucose',
              name: 'Fasting Glucose (mg/dL)',
              stroke: '#00C5BA',
              strokeWidth: 2.5,
              dot: { r: 4, fill: '#00C5BA' }
            })
          )
        )
      ),
      e('div', { className: 'text-[11px] text-[#8B98B2] mt-3 italic' },
        '* Note: Isolated laboratory values reflect point-in-time measurements and should be discussed with a doctor before altering diets or medications.'
      )
    ),

    // Filter bar
    e(
      'div',
      { className: 'bg-white p-4 rounded-2xl border border-[#EDF1F7] shadow-card flex justify-between items-center' },
      e('span', { className: 'text-xs font-bold text-[#1A2338]' }, `Total Reports (${filteredReports.length})`),
      e(
        'div',
        { className: 'relative w-64' },
        e(Search, { className: 'w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
        e('input', {
          type: 'text',
          value: searchQuery,
          onChange: (ev) => setSearchQuery(ev.target.value),
          placeholder: 'Search reports...',
          className: 'w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
        })
      )
    ),

    // Reports Grid
    e(
      'div',
      { className: 'space-y-4' },
      filteredReports.map(lab =>
        e(
          'div',
          {
            key: lab.id,
            className: 'bg-white rounded-2xl p-6 border border-[#EDF1F7] shadow-card space-y-4'
          },
          e('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDF1F7] pb-3' },
            e('div', null,
              e('div', { className: 'flex items-center gap-2' },
                e('span', { className: 'text-xs font-bold text-teal-600' }, formatDate(lab.date)),
                e('span', { className: 'text-slate-300' }, '•'),
                e('span', { className: 'text-xs text-[#8B98B2]' }, lab.source === 'Upload' ? 'Document Upload' : 'Manual Entry')
              ),
              e('h3', { className: 'text-base font-bold text-[#1A2338] mt-0.5' }, lab.title || lab.testName)
            ),
            e(
              'button',
              {
                onClick: () => deleteLabReport(lab.id),
                className: 'text-slate-400 hover:text-red-500 p-1 self-start sm:self-center'
              },
              e(Trash2, { className: 'w-4 h-4' })
            )
          ),

          lab.biomarkers && lab.biomarkers.length > 0
            ? e('div', { className: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3' },
                lab.biomarkers.map((bio, bIdx) =>
                  e(
                    'div',
                    { key: bIdx, className: 'p-3 rounded-xl bg-[#F8FAFD] border border-[#EDF1F7] text-xs' },
                    e('span', { className: 'text-[10px] text-[#8B98B2] block truncate' }, bio.name),
                    e('div', { className: 'text-base font-extrabold text-[#1A2338] mt-0.5' },
                      `${bio.value} `,
                      e('span', { className: 'text-[10px] font-normal text-[#8B98B2]' }, bio.unit)
                    ),
                    e('div', { className: 'flex items-center justify-between mt-1' },
                      e('span', { className: 'text-[9px] text-slate-400' }, `Ref: ${bio.reference || 'N/A'}`),
                      e(StatusBadge, { status: bio.status, size: 'xs' })
                    )
                  )
                )
              )
            : null,

          lab.description
            ? e('p', { className: 'text-xs text-[#475569] bg-slate-50 p-3 rounded-xl border border-slate-100' },
                lab.description
              )
            : null
        )
      )
    ),

    // Modal: Add Lab Report
    e(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        title: 'Record Laboratory Report',
        subtitle: 'Enter numerical test values manually or attach lab document'
      },
      e(
        'form',
        { onSubmit: handleSubmit, className: 'space-y-4' },
        e('div', { className: 'flex border-b border-[#EDF1F7] pb-2 text-xs font-bold gap-4' },
          e('button', {
            type: 'button',
            onClick: () => setSource('Manual'),
            className: `pb-1 ${source === 'Manual' ? 'text-[#00C5BA] border-b-2 border-[#00C5BA]' : 'text-slate-400'}`
          }, 'Manual Entry'),
          e('button', {
            type: 'button',
            onClick: () => setSource('Upload'),
            className: `pb-1 ${source === 'Upload' ? 'text-[#00C5BA] border-b-2 border-[#00C5BA]' : 'text-slate-400'}`
          }, 'Attach Lab PDF/Image')
        ),

        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Report Title *'),
            e('input', {
              type: 'text',
              required: true,
              value: title,
              onChange: (ev) => setTitle(ev.target.value),
              placeholder: 'e.g. Metabolic Blood Chemistry',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Test Date *'),
            e('input', {
              type: 'date',
              required: true,
              value: testDate,
              onChange: (ev) => setTestDate(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),

        source === 'Upload'
          ? e('div', { className: 'p-3 bg-teal-50/40 rounded-xl border border-teal-200 text-xs' },
              e('label', { className: 'font-bold text-teal-900 block mb-1' }, 'Select Lab File (PDF/Image)'),
              e('input', {
                type: 'file',
                onChange: (ev) => setUploadFileName(ev.target.files[0]?.name || '')
              })
            )
          : null,

        // Biomarkers Manual entry rows
        e('div', { className: 'space-y-2' },
          e('div', { className: 'flex justify-between items-center' },
            e('label', { className: 'text-xs font-bold text-[#1A2338]' }, 'Biomarker Values (Manual Entry)'),
            e('button', {
              type: 'button',
              onClick: handleAddBiomarkerRow,
              className: 'text-xs text-teal-600 font-bold hover:underline'
            }, '+ Add Test Metric')
          ),
          biomarkers.map((b, idx) =>
            e(
              'div',
              { key: idx, className: 'grid grid-cols-12 gap-2 items-center p-2.5 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] text-xs' },
              e('input', {
                type: 'text',
                placeholder: 'Test Name (e.g. Glucose)',
                value: b.name,
                onChange: (ev) => handleBiomarkerChange(idx, 'name', ev.target.value),
                className: 'col-span-5 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg'
              }),
              e('input', {
                type: 'text',
                placeholder: 'Result Value',
                value: b.value,
                onChange: (ev) => handleBiomarkerChange(idx, 'value', ev.target.value),
                className: 'col-span-4 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg'
              }),
              e('input', {
                type: 'text',
                placeholder: 'Unit',
                value: b.unit,
                onChange: (ev) => handleBiomarkerChange(idx, 'unit', ev.target.value),
                className: 'col-span-3 px-2 py-1 bg-white border border-[#E2E8F0] rounded-lg'
              })
            )
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Notes & Observations'),
          e('textarea', {
            rows: 2,
            value: description,
            onChange: (ev) => setDescription(ev.target.value),
            placeholder: 'Fasting specimen, physician review notes...',
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
            className: 'px-4 py-2 bg-[#00C5BA] text-white font-bold text-xs rounded-xl'
          }, 'Save Lab Report')
        )
      )
    )
  );
};
