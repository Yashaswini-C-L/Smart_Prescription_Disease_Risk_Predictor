import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  Pill,
  Plus,
  Upload,
  Calendar,
  Clock,
  User,
  Trash2,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const Prescriptions = () => {
  const { prescriptions, addPrescription, deletePrescription, addToast } = useHealth();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Active' | 'Completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form inputs
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState('Manual'); // 'Manual' or 'Upload'
  const [uploadFileName, setUploadFileName] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!medicineName || !dosage) {
      addToast('Please enter medicine name and dosage.', 'error');
      return;
    }

    addPrescription({
      medicineName,
      dosage,
      frequency: frequency || 'Once daily',
      duration: duration || '30 days',
      startDate,
      endDate: endDate || '',
      doctor: doctor || 'Primary Physician',
      prescriptionDate: startDate,
      diagnosis: diagnosis || 'General Health',
      notes,
      source,
      fileName: source === 'Upload' ? (uploadFileName || 'Prescription_Document.pdf') : null
    });

    setIsModalOpen(false);
    setMedicineName('');
    setDosage('');
    setFrequency('');
    setNotes('');
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    if (filterStatus !== 'all' && rx.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        rx.medicineName.toLowerCase().includes(q) ||
        rx.doctor?.toLowerCase().includes(q) ||
        rx.diagnosis?.toLowerCase().includes(q)
      );
    }
    return true;
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
          e(Pill, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'My Prescriptions')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Manage active medication courses, dosages, instructions and archival prescription history.'
        )
      ),

      e(
        'button',
        {
          onClick: () => setIsModalOpen(true),
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
        },
        e(Plus, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'Add Prescription')
      )
    ),

    // Filter toolbar
    e(
      'div',
      { className: 'bg-white p-4 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col sm:flex-row items-center justify-between gap-4' },
      e(
        'div',
        { className: 'flex items-center gap-2 w-full sm:w-auto' },
        e(
          'button',
          {
            onClick: () => setFilterStatus('all'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all' ? 'bg-[#1E60F2] text-white' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `All (${prescriptions.length})`
        ),
        e(
          'button',
          {
            onClick: () => setFilterStatus('Active'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `Active (${prescriptions.filter(p => p.status === 'Active').length})`
        ),
        e(
          'button',
          {
            onClick: () => setFilterStatus('Completed'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'Completed' ? 'bg-slate-200 text-slate-800' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `Completed (${prescriptions.filter(p => p.status === 'Completed').length})`
        )
      ),

      e(
        'div',
        { className: 'relative w-full sm:w-64' },
        e(Search, { className: 'w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
        e('input', {
          type: 'text',
          value: searchQuery,
          onChange: (ev) => setSearchQuery(ev.target.value),
          placeholder: 'Search medicine or diagnosis...',
          className: 'w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
        })
      )
    ),

    // Prescriptions List
    e(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 gap-5' },
      filteredPrescriptions.map(rx =>
        e(
          'div',
          {
            key: rx.id,
            className: 'bg-white rounded-2xl p-6 border border-[#EDF1F7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between'
          },
          e('div', null,
            e('div', { className: 'flex items-start justify-between gap-2 mb-3' },
              e('div', null,
                e('div', { className: 'flex items-center gap-2' },
                  e('h3', { className: 'text-base font-extrabold text-[#1A2338]' }, rx.medicineName),
                  e('span', { className: 'px-2 py-0.5 rounded-md bg-blue-50 text-[#1E60F2] font-bold text-xs' }, rx.dosage)
                ),
                e('div', { className: 'text-xs text-[#6B7A99] mt-0.5' }, rx.diagnosis || 'Therapeutic treatment')
              ),
              e(StatusBadge, { status: rx.status })
            ),

            // Metadata card
            e('div', { className: 'p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] grid grid-cols-2 gap-2 text-xs mb-3' },
              e('div', null,
                e('span', { className: 'text-[10px] text-[#8B98B2] block' }, 'Frequency & Timing'),
                e('span', { className: 'font-semibold text-[#1A2338]' }, rx.frequency)
              ),
              e('div', null,
                e('span', { className: 'text-[10px] text-[#8B98B2] block' }, 'Duration Course'),
                e('span', { className: 'font-semibold text-[#1A2338]' }, rx.duration || 'Ongoing')
              ),
              e('div', null,
                e('span', { className: 'text-[10px] text-[#8B98B2] block' }, 'Start Date'),
                e('span', { className: 'font-semibold text-[#1A2338]' }, formatDate(rx.startDate))
              ),
              e('div', null,
                e('span', { className: 'text-[10px] text-[#8B98B2] block' }, 'Prescribed By'),
                e('span', { className: 'font-semibold text-[#1A2338]' }, rx.doctor || 'Physician')
              )
            ),

            rx.notes
              ? e('div', { className: 'text-xs text-[#475569] mb-3 leading-relaxed' },
                  e('strong', { className: 'text-[#1A2338]' }, 'Instructions: '),
                  rx.notes
                )
              : null
          ),

          e('div', { className: 'pt-3 border-t border-[#EDF1F7] flex items-center justify-between text-xs' },
            e('span', { className: 'text-[11px] text-[#8B98B2]' },
              rx.source === 'Upload' ? `Document: ${rx.fileName || 'Scanned File'}` : 'Manual Entry'
            ),
            e(
              'button',
              {
                onClick: () => deletePrescription(rx.id),
                className: 'text-slate-400 hover:text-red-500 p-1 transition-colors'
              },
              e(Trash2, { className: 'w-4 h-4' })
            )
          )
        )
      )
    ),

    // Add Prescription Modal (Supports Manual Entry & Document Upload)
    e(
      Modal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        title: 'Add Prescription Record',
        subtitle: 'Enter medication details manually or link with a prescription scan'
      },
      e(
        'form',
        { onSubmit: handleSubmit, className: 'space-y-4' },
        e('div', { className: 'flex border-b border-[#EDF1F7] pb-2 text-xs font-bold gap-4' },
          e('button', {
            type: 'button',
            onClick: () => setSource('Manual'),
            className: `pb-1 ${source === 'Manual' ? 'text-[#1E60F2] border-b-2 border-[#1E60F2]' : 'text-slate-400'}`
          }, 'Manual Entry'),
          e('button', {
            type: 'button',
            onClick: () => setSource('Upload'),
            className: `pb-1 ${source === 'Upload' ? 'text-[#1E60F2] border-b-2 border-[#1E60F2]' : 'text-slate-400'}`
          }, 'Attach Scanned Document')
        ),

        source === 'Upload'
          ? e('div', { className: 'p-3 bg-blue-50/40 rounded-xl border border-blue-200 text-xs' },
              e('label', { className: 'font-bold text-blue-900 block mb-1' }, 'Select Prescription File (PDF/Image)'),
              e('input', {
                type: 'file',
                onChange: (ev) => setUploadFileName(ev.target.files[0]?.name || '')
              })
            )
          : null,

        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Medicine Name *'),
            e('input', {
              type: 'text',
              required: true,
              value: medicineName,
              onChange: (ev) => setMedicineName(ev.target.value),
              placeholder: 'e.g. Metformin',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Dosage (mg, ml) *'),
            e('input', {
              type: 'text',
              required: true,
              value: dosage,
              onChange: (ev) => setDosage(ev.target.value),
              placeholder: 'e.g. 500mg',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),

        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Frequency'),
            e('input', {
              type: 'text',
              value: frequency,
              onChange: (ev) => setFrequency(ev.target.value),
              placeholder: 'e.g. Twice daily with meals',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Duration'),
            e('input', {
              type: 'text',
              value: duration,
              onChange: (ev) => setDuration(ev.target.value),
              placeholder: 'e.g. 90 days',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),

        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Start Date'),
            e('input', {
              type: 'date',
              value: startDate,
              onChange: (ev) => setStartDate(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Doctor Name (Optional)'),
            e('input', {
              type: 'text',
              value: doctor,
              onChange: (ev) => setDoctor(ev.target.value),
              placeholder: 'e.g. Dr. Vance',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Condition / Diagnosis'),
          e('input', {
            type: 'text',
            value: diagnosis,
            onChange: (ev) => setDiagnosis(ev.target.value),
            placeholder: 'e.g. Hypertension, Diabetes',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),

        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Doctor Instructions & Notes'),
          e('textarea', {
            rows: 2,
            value: notes,
            onChange: (ev) => setNotes(ev.target.value),
            placeholder: 'Take after breakfast, drink plenty of water...',
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
          }, 'Save Prescription')
        )
      )
    )
  );
};
