import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  Search,
  Sparkles,
  Info,
  Pill,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

const e = React.createElement;

export const MedicineSafety = () => {
  const {
    referenceDrugLibrary,
    checkDrugInteractions,
    prescriptions,
    addToast
  } = useHealth();

  // Selected tray for interaction scanning
  const [selectedMeds, setSelectedMeds] = useState(() => {
    const rxMeds = prescriptions.filter(p => p.status === 'Active').map(p => p.medicineName);
    return rxMeds.length > 0 ? rxMeds : ['Warfarin', 'Aspirin'];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [customDrugInput, setCustomDrugInput] = useState('');

  // Check detected interactions
  const detectedInteractions = checkDrugInteractions(selectedMeds);

  const handleAddDrug = (name) => {
    if (!name) return;
    if (selectedMeds.some(m => m.toLowerCase() === name.toLowerCase())) {
      addToast(`${name} is already in the check tray.`, 'info');
      return;
    }
    setSelectedMeds(prev => [...prev, name]);
    setSearchTerm('');
    setCustomDrugInput('');
    addToast(`Added ${name} to analysis tray.`, 'success');
  };

  const handleRemoveDrug = (name) => {
    setSelectedMeds(prev => prev.filter(m => m !== name));
  };

  const handleLoadPrescribedMeds = () => {
    const rxNames = prescriptions.filter(p => p.status === 'Active').map(p => p.medicineName);
    if (rxNames.length === 0) {
      addToast('No active medications found in prescriptions.', 'info');
      return;
    }
    setSelectedMeds(rxNames);
    addToast(`Loaded ${rxNames.length} active prescriptions.`, 'success');
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
          e(ShieldAlert, { className: 'w-6 h-6 text-[#1E60F2]' }),
          e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Medicine Safety Checker')
        ),
        e(
          'p',
          { className: 'text-xs text-[#6B7A99] mt-1' },
          'Check potential drug interactions between your prescribed and over-the-counter medications.'
        )
      ),

      e(
        'button',
        {
          onClick: handleLoadPrescribedMeds,
          className: 'flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#1E60F2] font-bold text-xs rounded-xl border border-blue-200 transition-colors'
        },
        e(RefreshCw, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'Sync Active Prescriptions')
      )
    ),

    // Demonstration Data Disclaimer (Requirement 11)
    e(
      'div',
      { className: 'p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3' },
      e(AlertTriangle, { className: 'w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' }),
      e('div', null,
        e('span', { className: 'font-bold block' }, 'Demonstration Dataset Notice:'),
        e('span', { className: 'text-[11px] text-amber-800 leading-relaxed' },
          'This interaction checker uses a demonstration reference dataset based on research matrices (such as DDInter and TWOSIDES). It is designed to assist personal awareness and doctor discussions, and should never be used as clinically certified advice or a reason to self-discontinue prescribed therapies.'
        )
      )
    ),

    // Main 2-column layout
    e(
      'div',
      { className: 'grid grid-cols-1 lg:grid-cols-3 gap-6' },

      // Left Column: Medicine Selection Tray (1 Col)
      e(
        'div',
        { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-5' },
        e('div', null,
          e('h2', { className: 'text-sm font-bold text-[#1A2338]' }, 'Medication Analysis Tray'),
          e('p', { className: 'text-xs text-[#6B7A99] mt-0.5' }, 'Select or search medicines to cross-reference combinations.')
        ),

        // Quick Demonstration Pairs
        e('div', { className: 'p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] space-y-2' },
          e('span', { className: 'text-[10px] font-bold uppercase tracking-wider text-[#8B98B2] block' },
            'Try Known Clinical Test Pairs:'
          ),
          e('div', { className: 'flex flex-wrap gap-1.5' },
            e(
              'button',
              {
                onClick: () => setSelectedMeds(['Warfarin', 'Aspirin']),
                className: 'text-[11px] px-2 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200'
              },
              'Warfarin + Aspirin'
            ),
            e(
              'button',
              {
                onClick: () => setSelectedMeds(['Lisinopril', 'Spironolactone']),
                className: 'text-[11px] px-2 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold border border-amber-200'
              },
              'Lisinopril + Spironolactone'
            ),
            e(
              'button',
              {
                onClick: () => setSelectedMeds(['Clopidogrel', 'Omeprazole']),
                className: 'text-[11px] px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200'
              },
              'Clopidogrel + Omeprazole'
            )
          )
        ),

        // Search & Add
        e('div', { className: 'space-y-2' },
          e('label', { className: 'text-xs font-bold text-[#334155]' }, 'Search Medicine Library'),
          e('div', { className: 'relative' },
            e(Search, { className: 'w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' }),
            e('input', {
              type: 'text',
              value: searchTerm,
              onChange: (ev) => setSearchTerm(ev.target.value),
              placeholder: 'e.g. Metformin, Lisinopril...',
              className: 'w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338]'
            })
          ),

          // Search Dropdown List
          searchTerm
            ? e(
                'div',
                { className: 'max-h-40 overflow-y-auto bg-white border border-[#EDF1F7] rounded-xl shadow-lg divide-y divide-slate-50' },
                referenceDrugLibrary
                  .filter(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((drug, dIdx) =>
                    e(
                      'div',
                      {
                        key: dIdx,
                        onClick: () => handleAddDrug(drug),
                        className: 'p-2 text-xs hover:bg-blue-50 cursor-pointer flex justify-between items-center'
                      },
                      e('span', { className: 'font-semibold text-[#1A2338]' }, drug),
                      e(Plus, { className: 'w-3.5 h-3.5 text-blue-600' })
                    )
                  )
              )
            : null
        ),

        // Manual Add input
        e('div', { className: 'space-y-1.5 pt-2' },
          e('label', { className: 'text-xs font-bold text-[#334155]' }, 'Or Add Custom Medicine Name'),
          e('div', { className: 'flex gap-2' },
            e('input', {
              type: 'text',
              value: customDrugInput,
              onChange: (ev) => setCustomDrugInput(ev.target.value),
              onKeyDown: (ev) => {
                if (ev.key === 'Enter') handleAddDrug(customDrugInput);
              },
              placeholder: 'Type name...',
              className: 'flex-1 px-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl'
            }),
            e(
              'button',
              {
                type: 'button',
                onClick: () => handleAddDrug(customDrugInput),
                className: 'px-3 py-1.5 bg-[#1E60F2] text-white font-bold text-xs rounded-xl'
              },
              'Add'
            )
          )
        ),

        // Selected list
        e('div', { className: 'space-y-2 pt-2 border-t border-[#EDF1F7]' },
          e('div', { className: 'flex justify-between items-center text-xs font-bold text-[#1A2338]' },
            e('span', null, `Active Analysis Tray (${selectedMeds.length})`),
            e('button', {
              type: 'button',
              onClick: () => setSelectedMeds([]),
              className: 'text-[11px] text-slate-400 hover:text-red-500'
            }, 'Clear All')
          ),

          selectedMeds.length === 0
            ? e('div', { className: 'p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-[#8B98B2]' },
                'Select at least 2 medicines to perform an interaction safety check.'
              )
            : e('div', { className: 'space-y-1.5' },
                selectedMeds.map((med, idx) =>
                  e(
                    'div',
                    { key: idx, className: 'flex items-center justify-between p-2.5 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] text-xs' },
                    e('div', { className: 'flex items-center gap-2' },
                      e(Pill, { className: 'w-3.5 h-3.5 text-[#1E60F2]' }),
                      e('span', { className: 'font-semibold text-[#1A2338]' }, med)
                    ),
                    e(
                      'button',
                      {
                        onClick: () => handleRemoveDrug(med),
                        className: 'text-slate-400 hover:text-rose-500'
                      },
                      e(Trash2, { className: 'w-3.5 h-3.5' })
                    )
                  )
                )
              )
        )
      ),

      // Right Column: Safety Analysis Findings (2 Cols)
      e(
        'div',
        { className: 'lg:col-span-2 space-y-5' },

        // Top Status Card
        e(
          'div',
          {
            className: `p-6 rounded-2xl border shadow-card ${
              selectedMeds.length < 2
                ? 'bg-white border-[#EDF1F7]'
                : detectedInteractions.length > 0
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-emerald-50/70 border-emerald-200'
            }`
          },
          e('div', { className: 'flex items-start gap-4' },
            e('div', {
              className: `w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                selectedMeds.length < 2
                  ? 'bg-slate-100 text-slate-500'
                  : detectedInteractions.length > 0
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
              }`
            },
              selectedMeds.length < 2
                ? e(Info, { className: 'w-6 h-6' })
                : detectedInteractions.length > 0
                  ? e(AlertTriangle, { className: 'w-6 h-6' })
                  : e(CheckCircle2, { className: 'w-6 h-6' })
            ),
            e('div', { className: 'flex-1' },
              e('h2', { className: 'text-base font-extrabold text-[#1A2338]' },
                selectedMeds.length < 2
                  ? 'Add at least 2 medications'
                  : detectedInteractions.length > 0
                    ? `${detectedInteractions.length} Potential Medicine Interaction(s) Found`
                    : 'No Known Interactions Found'
              ),
              e('p', { className: 'text-xs text-[#6B7A99] mt-1 leading-relaxed' },
                selectedMeds.length < 2
                  ? 'Select or add medications from your prescription history or the drug search to scan for potential pharmacological conflicts.'
                  : detectedInteractions.length > 0
                    ? 'Clinical interactions were flagged in the demonstration reference database. Please review the specific mechanisms, precautions and discussion notes below.'
                    : 'The selected combination has no documented severe interactions in the demonstration dataset. Always follow physician dosing guidelines.'
              )
            )
          )
        ),

        // Specific findings list
        detectedInteractions.length > 0
          ? e('div', { className: 'space-y-4' },
              e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Interaction Details & Explanations'),
              detectedInteractions.map((item, idx) =>
                e(
                  'div',
                  {
                    key: idx,
                    className: 'bg-white rounded-2xl p-6 border border-[#EDF1F7] shadow-card space-y-4'
                  },
                  e('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDF1F7] pb-3' },
                    e('div', { className: 'font-extrabold text-sm text-[#1A2338]' },
                      `${item.pair[0]} `,
                      e('span', { className: 'text-slate-400 font-normal' }, 'interacts with'),
                      ` ${item.pair[1]}`
                    ),
                    e(StatusBadge, { status: `${item.severity} Severity` })
                  ),

                  // Adverse Effect
                  e('div', null,
                    e('span', { className: 'text-xs font-bold text-[#1A2338] block mb-1' }, 'Adverse Effect / Health Impact:'),
                    e('p', { className: 'text-xs text-[#334155] bg-[#F8FAFD] p-3 rounded-xl border border-[#EDF1F7] leading-relaxed' },
                      item.effect
                    )
                  ),

                  // Mechanism
                  e('div', null,
                    e('span', { className: 'text-xs font-bold text-[#1A2338] block mb-1' }, 'Biological Mechanism:'),
                    e('p', { className: 'text-xs text-[#6B7A99] leading-relaxed' }, item.mechanism)
                  ),

                  // Precaution / Recommendation
                  e('div', { className: 'p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs' },
                    e('span', { className: 'font-bold text-blue-900 block mb-0.5' }, 'Precautions & Doctor Consultation Point:'),
                    e('p', { className: 'text-blue-800 text-[11px] leading-relaxed' }, item.recommendation)
                  )
                )
              )
            )
          : null
      )
    )
  );
};
