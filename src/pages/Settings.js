import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  LogOut,
  CheckCircle2,
  Download,
  RotateCcw
} from 'lucide-react';

const e = React.createElement;

export const Settings = () => {
  const { user, logout } = useAuth();
  const { downloadConsolidatedPdf, addToast } = useHealth();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [safetyWarnings, setSafetyWarnings] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleClearDemoData = () => {
    if (window.confirm('Reset all demonstration records to initial factory baseline?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return e(
    'div',
    { className: 'space-y-6 max-w-3xl animate-in fade-in duration-150' },

    // Header
    e(
      'div',
      null,
      e('div', { className: 'flex items-center gap-2' },
        e(SettingsIcon, { className: 'w-6 h-6 text-[#1E60F2]' }),
        e('h1', { className: 'text-2xl font-bold text-[#1A2338]' }, 'Account & Application Settings')
      ),
      e(
        'p',
        { className: 'text-xs text-[#6B7A99] mt-1' },
        'Manage your security credentials, notification alerts, and personal data archival.'
      )
    ),

    // Notifications Card
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
      e('div', { className: 'flex items-center gap-2 border-b border-[#EDF1F7] pb-3' },
        e(Bell, { className: 'w-4 h-4 text-blue-600' }),
        e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Notification Preferences')
      ),
      e('div', { className: 'space-y-3 text-xs' },
        e('label', { className: 'flex items-center justify-between p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer' },
          e('div', null,
            e('span', { className: 'font-bold text-[#1A2338] block' }, 'Critical Drug Interaction Alerts'),
            e('span', { className: 'text-[#6B7A99] text-[11px]' }, 'Immediately highlight potential contraindicated medication combinations.')
          ),
          e('input', {
            type: 'checkbox',
            checked: safetyWarnings,
            onChange: (ev) => {
              setSafetyWarnings(ev.target.checked);
              addToast('Preferences saved.', 'success');
            },
            className: 'accent-blue-600'
          })
        ),
        e('label', { className: 'flex items-center justify-between p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer' },
          e('div', null,
            e('span', { className: 'font-bold text-[#1A2338] block' }, 'Scheduled Milestone Reminders'),
            e('span', { className: 'text-[#6B7A99] text-[11px]' }, 'Receive timely alerts when 90-day lab tests or roadmap checkpoints approach.')
          ),
          e('input', {
            type: 'checkbox',
            checked: emailAlerts,
            onChange: (ev) => {
              setEmailAlerts(ev.target.checked);
              addToast('Preferences saved.', 'success');
            },
            className: 'accent-blue-600'
          })
        )
      )
    ),

    // Privacy & Security Card
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
      e('div', { className: 'flex items-center gap-2 border-b border-[#EDF1F7] pb-3' },
        e(Shield, { className: 'w-4 h-4 text-emerald-600' }),
        e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Privacy & Data Protection')
      ),
      e('div', { className: 'space-y-3 text-xs' },
        e('label', { className: 'flex items-center justify-between p-3 bg-[#F8FAFD] rounded-xl border border-[#EDF1F7] cursor-pointer' },
          e('div', null,
            e('span', { className: 'font-bold text-[#1A2338] block' }, 'Anonymous Health Data Insights'),
            e('span', { className: 'text-[#6B7A99] text-[11px]' }, 'Allow de-identified aggregate metrics to improve AI prediction models.')
          ),
          e('input', {
            type: 'checkbox',
            checked: dataSharing,
            onChange: (ev) => {
              setDataSharing(ev.target.checked);
              addToast('Privacy preferences updated.', 'info');
            },
            className: 'accent-blue-600'
          })
        )
      )
    ),

    // Data Management Card
    e(
      'div',
      { className: 'bg-white p-6 rounded-2xl border border-[#EDF1F7] shadow-card space-y-4' },
      e('div', { className: 'flex items-center gap-2 border-b border-[#EDF1F7] pb-3' },
        e(Database, { className: 'w-4 h-4 text-indigo-600' }),
        e('h3', { className: 'text-sm font-bold text-[#1A2338]' }, 'Personal Data Management')
      ),
      e('div', { className: 'flex flex-col sm:flex-row gap-3 text-xs' },
        e(
          'button',
          {
            onClick: downloadConsolidatedPdf,
            className: 'flex-1 py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-[#1E60F2] font-bold rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-2'
          },
          e(Download, { className: 'w-4 h-4' }),
          e('span', null, 'Export Full Medical Report (PDF)')
        ),
        e(
          'button',
          {
            onClick: handleClearDemoData,
            className: 'py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2'
          },
          e(RotateCcw, { className: 'w-4 h-4' }),
          e('span', null, 'Reset Demo Baseline')
        )
      )
    ),

    // Logout Action
    e(
      'div',
      { className: 'pt-2 flex justify-start' },
      e(
        'button',
        {
          onClick: logout,
          className: 'flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors'
        },
        e(LogOut, { className: 'w-4 h-4' }),
        e('span', null, 'Sign Out of Personal Portal')
      )
    )
  );
};
