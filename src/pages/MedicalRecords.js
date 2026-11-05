import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  FolderArchive,
  Upload,
  Plus,
  FileText,
  FlaskConical,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Search,
  Filter,
  CheckCircle2,
  Download
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const e = React.createElement;

export const MedicalRecords = () => {
  const { records, addMedicalRecord, deleteMedicalRecord, addToast } = useHealth();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'document_upload' | 'manual_entry'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState(null);

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('prescription');
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadDoctor, setUploadDoctor] = useState('');
  const [uploadFacility, setUploadFacility] = useState('');
  const [uploadSummary, setUploadSummary] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  // Manual Form state
  const [manualTitle, setManualTitle] = useState('');
  const [manualType, setManualType] = useState('prescription');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualDoctor, setManualDoctor] = useState('');
  const [manualFacility, setManualFacility] = useState('');
  const [manualSummary, setManualSummary] = useState('');
  const [manualTags, setManualTags] = useState('');

  const handleUploadSubmit = (ev) => {
    ev.preventDefault();
    if (!uploadTitle || !uploadDate) {
      addToast('Please provide a title and date.', 'error');
      return;
    }

    addMedicalRecord({
      type: uploadType,
      title: uploadTitle,
      date: uploadDate,
      entryMethod: 'document_upload',
      doctor: uploadDoctor || 'Primary Care Physician',
      facility: uploadFacility || 'Community Health Clinic',
      summary: uploadSummary || 'Document uploaded by patient.',
      fileName: uploadFile ? uploadFile.name : 'Uploaded_Health_Document.pdf',
      tags: [uploadType === 'prescription' ? 'Prescription' : uploadType === 'lab_report' ? 'Lab Report' : 'Medical Document']
    });

    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadSummary('');
    setUploadFile(null);
  };

  const handleManualSubmit = (ev) => {
    ev.preventDefault();
    if (!manualTitle || !manualDate) {
      addToast('Please provide a title and date.', 'error');
      return;
    }

    addMedicalRecord({
      type: manualType,
      title: manualTitle,
      date: manualDate,
      entryMethod: 'manual_entry',
      doctor: manualDoctor || 'Personal Record Entry',
      facility: manualFacility || 'Personal Health Journal',
      summary: manualSummary || 'Manually entered health history entry.',
      fileName: null,
      tags: manualTags ? manualTags.split(',').map(t => t.trim()) : ['Manual Entry']
    });

    setIsManualModalOpen(false);
    setManualTitle('');
    setManualSummary('');
    setManualTags('');
  };

  // Filter records
  const filteredRecords = records.filter(r => {
    if (activeTab !== 'all' && r.entryMethod !== activeTab) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        r.title?.toLowerCase().includes(q) ||
        r.doctor?.toLowerCase().includes(q) ||
        r.summary?.toLowerCase().includes(q)
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
          e(FolderArchive, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'My Medical Records')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Manage all personal prescriptions, laboratory diagnostics, and clinical summaries in one portfolio.'
        )
      ),

      // Two Entry Action Buttons (Requirement 7)
      e(
        'div',
        { className: 'flex items-center gap-2' },
        e(
          'button',
          {
            onClick: () => setIsUploadModalOpen(true),
            className: 'flex items-center gap-1.5 px-3.5 py-2 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors'
          },
          e(Upload, { className: 'w-3.5 h-3.5' }),
          e('span', null, 'A. Document Upload')
        ),
        e(
          'button',
          {
            onClick: () => setIsManualModalOpen(true),
            className: 'flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#EDF1F7] text-[#1A2338] font-bold text-xs rounded-xl shadow-xs transition-colors'
          },
          e(Plus, { className: 'w-3.5 h-3.5 text-blue-600' }),
          e('span', null, 'B. Manual Entry')
        )
      )
    ),

    // Method Explanation Banner (Requirement 7)
    e(
      'div',
      { className: 'p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 text-xs text-blue-900 grid grid-cols-1 md:grid-cols-2 gap-4' },
      e('div', { className: 'flex items-start gap-2.5' },
        e(Upload, { className: 'w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5' }),
        e('div', null,
          e('span', { className: 'font-bold block' }, 'Method A: Document Upload'),
          e('span', { className: 'text-[11px] text-blue-800' }, 'Attach physical doctor prescription scans, lab slips, or PDF reports for secure personal digital archival.')
        )
      ),
      e('div', { className: 'flex items-start gap-2.5' },
        e(Plus, { className: 'w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5' }),
        e('div', null,
          e('span', { className: 'font-bold block' }, 'Method B: Manual Entry'),
          e('span', { className: 'text-[11px] text-blue-800' }, 'Directly input specific medicine names, dosages, laboratory measurements, and medical history notes.')
        )
      )
    ),

    // Filter bar
    e(
      'div',
      { className: 'bg-white p-4 rounded-2xl border border-[#EDF1F7] shadow-card flex flex-col md:flex-row items-center justify-between gap-4' },
      e(
        'div',
        { className: 'flex items-center gap-2 w-full md:w-auto' },
        e(
          'button',
          {
            onClick: () => setActiveTab('all'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-[#1E60F2] text-white shadow-xs' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `All Records (${records.length})`
        ),
        e(
          'button',
          {
            onClick: () => setActiveTab('document_upload'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'document_upload' ? 'bg-blue-50 text-[#1E60F2] border border-blue-200' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `Document Uploads (${records.filter(r => r.entryMethod === 'document_upload').length})`
        ),
        e(
          'button',
          {
            onClick: () => setActiveTab('manual_entry'),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'manual_entry' ? 'bg-teal-50 text-[#00C5BA] border border-teal-200' : 'bg-[#F8FAFD] text-[#6B7A99] hover:bg-slate-100'
            }`
          },
          `Manual Entries (${records.filter(r => r.entryMethod === 'manual_entry').length})`
        )
      ),

      e(
        'div',
        { className: 'relative w-full md:w-72' },
        e(Search, { className: 'w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
        e('input', {
          type: 'text',
          value: searchTerm,
          onChange: (ev) => setSearchTerm(ev.target.value),
          placeholder: 'Search by title, doctor, condition...',
          className: 'w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
        })
      )
    ),

    // Records Grid
    e(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' },
      filteredRecords.map((rec) =>
        e(
          'div',
          {
            key: rec.id,
            className: 'bg-white rounded-2xl p-5 border border-[#EDF1F7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between'
          },
          e('div', null,
            e('div', { className: 'flex items-center justify-between mb-2' },
              e(StatusBadge, {
                status: rec.type === 'prescription' ? 'Prescription' : rec.type === 'lab_report' ? 'Lab Diagnostic' : 'Medical History',
                size: 'xs'
              }),
              e('span', { className: 'text-[10px] text-[#8B98B2] font-semibold' }, formatDate(rec.date))
            ),
            e('h3', { className: 'text-sm font-bold text-[#1A2338] mb-1' }, rec.title),
            e('div', { className: 'text-[11px] text-[#6B7A99] mb-3' },
              rec.doctor ? `Provider: ${rec.doctor}` : 'Personal Entry'
            ),
            e('p', { className: 'text-xs text-[#334155] leading-relaxed line-clamp-3 mb-4 bg-[#F8FAFD] p-2.5 rounded-xl border border-[#EDF1F7]' },
              rec.summary
            ),
            rec.fileName
              ? e('div', { className: 'text-[11px] text-blue-600 font-semibold flex items-center gap-1 mb-3' },
                  e(FileText, { className: 'w-3.5 h-3.5' }),
                  e('span', { className: 'truncate' }, rec.fileName)
                )
              : null
          ),

          e('div', { className: 'pt-3 border-t border-[#EDF1F7] flex items-center justify-between text-xs' },
            e(
              'button',
              {
                onClick: () => setSelectedRecordForView(rec),
                className: 'text-blue-600 font-bold hover:underline flex items-center gap-1'
              },
              e(Eye, { className: 'w-3.5 h-3.5' }),
              e('span', null, 'View Details')
            ),
            e(
              'button',
              {
                onClick: () => deleteMedicalRecord(rec.id),
                className: 'text-slate-400 hover:text-red-500 p-1'
              },
              e(Trash2, { className: 'w-4 h-4' })
            )
          )
        )
      )
    ),

    // Modal A: Document Upload
    e(
      Modal,
      {
        isOpen: isUploadModalOpen,
        onClose: () => setIsUploadModalOpen(false),
        title: 'Method A: Document Upload',
        subtitle: 'Upload scanned prescriptions, lab results or doctor documents (PDF, JPG, PNG)'
      },
      e(
        'form',
        { onSubmit: handleUploadSubmit, className: 'space-y-4' },
        e('div', { className: 'p-4 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/30 text-center' },
          e(Upload, { className: 'w-8 h-8 text-[#1E60F2] mx-auto mb-2' }),
          e('div', { className: 'text-xs font-bold text-[#1A2338]' },
            uploadFile ? uploadFile.name : 'Choose file to upload'
          ),
          e('input', {
            type: 'file',
            required: true,
            onChange: (ev) => setUploadFile(ev.target.files[0]),
            className: 'mt-2 text-xs text-slate-500'
          })
        ),
        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Document Title *'),
            e('input', {
              type: 'text',
              required: true,
              value: uploadTitle,
              onChange: (ev) => setUploadTitle(ev.target.value),
              placeholder: 'e.g. Cardiology Prescription',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Record Type'),
            e('select', {
              value: uploadType,
              onChange: (ev) => setUploadType(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            },
              e('option', { value: 'prescription' }, 'Prescription'),
              e('option', { value: 'lab_report' }, 'Laboratory Report'),
              e('option', { value: 'history' }, 'Other Medical Document')
            )
          )
        ),
        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Date of Document *'),
            e('input', {
              type: 'date',
              required: true,
              value: uploadDate,
              onChange: (ev) => setUploadDate(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Doctor / Facility Name'),
            e('input', {
              type: 'text',
              value: uploadDoctor,
              onChange: (ev) => setUploadDoctor(ev.target.value),
              placeholder: 'e.g. Dr. Rachel Vance',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),
        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Document Summary & Key Findings'),
          e('textarea', {
            rows: 2,
            value: uploadSummary,
            onChange: (ev) => setUploadSummary(ev.target.value),
            placeholder: 'Brief summary of medications or diagnostic findings...',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),
        e('div', { className: 'flex justify-end gap-2 pt-2' },
          e('button', {
            type: 'button',
            onClick: () => setIsUploadModalOpen(false),
            className: 'px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl'
          }, 'Cancel'),
          e('button', {
            type: 'submit',
            className: 'px-4 py-2 bg-[#1E60F2] text-white font-bold text-xs rounded-xl'
          }, 'Save Uploaded Record')
        )
      )
    ),

    // Modal B: Manual Entry
    e(
      Modal,
      {
        isOpen: isManualModalOpen,
        onClose: () => setIsManualModalOpen(false),
        title: 'Method B: Manual Entry',
        subtitle: 'Enter medical history, prescription details or test outcomes without uploading files'
      },
      e(
        'form',
        { onSubmit: handleManualSubmit, className: 'space-y-4' },
        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Entry Title *'),
            e('input', {
              type: 'text',
              required: true,
              value: manualTitle,
              onChange: (ev) => setManualTitle(ev.target.value),
              placeholder: 'e.g. Blood Pressure Checkup',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Category'),
            e('select', {
              value: manualType,
              onChange: (ev) => setManualType(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            },
              e('option', { value: 'prescription' }, 'Prescription'),
              e('option', { value: 'lab_report' }, 'Laboratory Measurement'),
              e('option', { value: 'history' }, 'Medical History Note')
            )
          )
        ),
        e('div', { className: 'grid grid-cols-2 gap-3' },
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Date of Observation *'),
            e('input', {
              type: 'date',
              required: true,
              value: manualDate,
              onChange: (ev) => setManualDate(ev.target.value),
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          ),
          e('div', null,
            e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Associated Doctor / Source'),
            e('input', {
              type: 'text',
              value: manualDoctor,
              onChange: (ev) => setManualDoctor(ev.target.value),
              placeholder: 'e.g. Dr. Vance or Home Measurement',
              className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            })
          )
        ),
        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Clinical Details & Observations'),
          e('textarea', {
            rows: 3,
            value: manualSummary,
            onChange: (ev) => setManualSummary(ev.target.value),
            placeholder: 'Record medicine dosage, test numbers, or physician advice...',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),
        e('div', null,
          e('label', { className: 'text-xs font-bold text-[#334155] block mb-1' }, 'Tags (Comma separated)'),
          e('input', {
            type: 'text',
            value: manualTags,
            onChange: (ev) => setManualTags(ev.target.value),
            placeholder: 'e.g. Hypertension, Morning, Fasting',
            className: 'w-full px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
          })
        ),
        e('div', { className: 'flex justify-end gap-2 pt-2' },
          e('button', {
            type: 'button',
            onClick: () => setIsManualModalOpen(false),
            className: 'px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl'
          }, 'Cancel'),
          e('button', {
            type: 'submit',
            className: 'px-4 py-2 bg-[#1E60F2] text-white font-bold text-xs rounded-xl'
          }, 'Save Manual Entry')
        )
      )
    ),

    // Modal: Record Details View
    selectedRecordForView
      ? e(
          Modal,
          {
            isOpen: Boolean(selectedRecordForView),
            onClose: () => setSelectedRecordForView(null),
            title: selectedRecordForView.title,
            subtitle: `Recorded on ${formatDate(selectedRecordForView.date)}`
          },
          e('div', { className: 'space-y-4 text-xs text-[#334155]' },
            e('div', { className: 'p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] grid grid-cols-2 gap-2' },
              e('div', null,
                e('span', { className: 'text-[#8B98B2] block' }, 'Entry Method'),
                e('span', { className: 'font-bold text-[#1A2338]' },
                  selectedRecordForView.entryMethod === 'document_upload' ? 'Document Upload' : 'Manual Entry'
                )
              ),
              e('div', null,
                e('span', { className: 'text-[#8B98B2] block' }, 'Provider'),
                e('span', { className: 'font-bold text-[#1A2338]' }, selectedRecordForView.doctor || 'Self')
              )
            ),
            e('div', null,
              e('span', { className: 'font-bold text-[#1A2338] block mb-1' }, 'Details & Clinical Summary:'),
              e('p', { className: 'p-3 bg-white border border-[#EDF1F7] rounded-xl leading-relaxed' },
                selectedRecordForView.summary
              )
            ),
            selectedRecordForView.fileName
              ? e('div', { className: 'p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between' },
                  e('div', { className: 'flex items-center gap-2' },
                    e(FileText, { className: 'w-4 h-4 text-blue-600' }),
                    e('span', { className: 'font-bold text-blue-900' }, selectedRecordForView.fileName)
                  ),
                  e('button', {
                    onClick: () => addToast(`Opening preview for ${selectedRecordForView.fileName}`, 'info'),
                    className: 'text-xs font-bold text-blue-700 hover:underline'
                  }, 'Preview Document')
                )
              : null
          )
        )
      : null
  );
};
