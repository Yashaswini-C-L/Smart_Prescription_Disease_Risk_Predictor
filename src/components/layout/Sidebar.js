import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderArchive,
  CalendarDays,
  Pill,
  FlaskConical,
  ShieldAlert,
  BrainCircuit,
  BarChart3,
  Milestone,
  ClipboardList,
  BellRing,
  User,
  Settings,
  HelpCircle,
  Activity,
  LogOut,
  X
} from 'lucide-react';

const e = React.createElement;

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const sections = [
    {
      group: 'MY HEALTH',
      items: [
        { to: '/', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/records', label: 'My Medical Records', icon: FolderArchive },
        { to: '/timeline', label: 'Medical Timeline', icon: CalendarDays },
        { to: '/prescriptions', label: 'My Prescriptions', icon: Pill },
        { to: '/lab-reports', label: 'My Lab Reports', icon: FlaskConical }
      ]
    },
    {
      group: 'HEALTH INTELLIGENCE',
      items: [
        { to: '/medicine-safety', label: 'Medicine Safety Checker', icon: ShieldAlert, badge: 'Safety' },
        { to: '/disease-risk', label: 'Disease Risk Assessment', icon: BrainCircuit, badge: 'AI' },
        { to: '/health-insights', label: 'Health Insights', icon: BarChart3 }
      ]
    },
    {
      group: 'PREVENTIVE CARE',
      items: [
        { to: '/roadmap', label: 'Health Roadmap', icon: Milestone },
        { to: '/suggested-tests', label: 'Suggested Lab Tests', icon: ClipboardList },
        { to: '/reminders', label: 'Reminders', icon: BellRing }
      ]
    },
    {
      group: 'ACCOUNT',
      items: [
        { to: '/profile', label: 'My Health Profile', icon: User },
        { to: '/settings', label: 'Settings', icon: Settings },
        { to: '/help', label: 'Help & Support', icon: HelpCircle }
      ]
    }
  ];

  return e(
    'aside',
    {
      className: `fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#EDF1F7] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    },
    // Top Brand & Nav container
    e(
      'div',
      { className: 'p-5 flex-1 overflow-y-auto' },
      // Mobile close button
      e(
        'div',
        { className: 'flex justify-end lg:hidden mb-3 px-1' },
        e(
          'button',
          {
            onClick: onClose,
            className: 'p-1 text-slate-400 hover:text-slate-600 rounded-lg'
          },
          e(X, { className: 'w-5 h-5' })
        )
      ),

      // Personal Profile Badge Card
      e(
        NavLink,
        {
          to: '/profile',
          onClick: onClose,
          className: 'flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8FAFD] border border-[#E9EFF7] mb-6 hover:bg-blue-50/50 hover:border-blue-200 transition-all block'
        },
        e(
          'div',
          { className: 'w-10 h-10 rounded-full bg-blue-100 text-[#1E60F2] font-extrabold flex items-center justify-center ring-2 ring-white shadow-xs text-sm' },
          (user.name || 'P').charAt(0)
        ),
        e(
          'div',
          { className: 'flex-1 min-w-0' },
          e('div', { className: 'font-bold text-sm text-[#1A2338] truncate' }, user.name || 'Personal User'),
          e(
            'div',
            { className: 'text-xs text-[#8B98B2] flex items-center gap-1.5 font-medium' },
            e('span', { className: 'w-1.5 h-1.5 rounded-full bg-emerald-500' }),
            'Personal Account'
          )
        )
      ),

      // Navigation groups
      sections.map((sec, sIdx) =>
        e(
          'div',
          { key: sIdx, className: 'mb-5' },
          e(
            'div',
            { className: 'text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] px-3.5 mb-2' },
            sec.group
          ),
          e(
            'div',
            { className: 'space-y-1' },
            sec.items.map((item, iIdx) =>
              e(
                NavLink,
                {
                  key: iIdx,
                  to: item.to,
                  onClick: onClose,
                  className: ({ isActive }) =>
                    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50/90 text-[#1E60F2] font-bold'
                        : 'text-[#5A6A85] hover:bg-[#F5F7FB] hover:text-[#1A2338]'
                    }`
                },
                e(
                  'div',
                  { className: 'flex items-center gap-3' },
                  e(item.icon, { className: 'w-4 h-4' }),
                  e('span', null, item.label)
                ),
                item.badge
                  ? e(
                      'span',
                      { className: 'text-[9px] px-1.5 py-0.5 rounded font-bold bg-blue-100 text-blue-700' },
                      item.badge
                    )
                  : null
              )
            )
          )
        )
      )
    ),

    // Footer Logout action
    e(
      'div',
      { className: 'p-4 border-t border-[#EDF1F7] bg-white' },
      e(
        'button',
        {
          onClick: logout,
          className: 'w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors'
        },
        e(LogOut, { className: 'w-3.5 h-3.5' }),
        e('span', null, 'Sign Out')
      )
    )
  );
};
