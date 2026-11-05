import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';
import {
  Menu,
  Search,
  FileDown,
  Plus,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';

const e = React.createElement;

export const Header = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { downloadConsolidatedPdf } = useHealth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (ev) => {
    ev.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/records?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return e(
    'header',
    {
      className: 'h-20 bg-white border-b border-[#EDF1F7] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30'
    },
    // Left: Menu button for mobile + Search bar
    e(
      'div',
      { className: 'flex items-center gap-3 flex-1 max-w-lg' },
      e(
        'button',
        {
          onClick: onOpenSidebar,
          className: 'lg:hidden p-2 rounded-xl bg-[#F8FAFD] border border-[#EDF1F7] text-slate-600 hover:text-blue-600'
        },
        e(Menu, { className: 'w-5 h-5' })
      ),
      e(
        'form',
        {
          onSubmit: handleSearchSubmit,
          className: 'relative w-full max-w-xs sm:max-w-md'
        },
        e(Search, {
          className: 'w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none'
        }),
        e('input', {
          type: 'text',
          value: searchTerm,
          onChange: (ev) => setSearchTerm(ev.target.value),
          placeholder: 'Search prescriptions, lab tests, records...',
          className: 'w-full pl-10 pr-4 py-2 text-xs bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl text-[#1A2338] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all'
        })
      )
    ),

    // Right: Download Health Report PDF + Upload Record + Profile
    e(
      'div',
      { className: 'flex items-center gap-2 sm:gap-3' },
      // Download My Health Report (Requirement 18)
      e(
        'button',
        {
          onClick: downloadConsolidatedPdf,
          className: 'flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-[#1E60F2] font-bold text-xs rounded-xl border border-blue-200/80 transition-colors shadow-xs'
        },
        e(FileDown, { className: 'w-3.5 h-3.5' }),
        e('span', { className: 'hidden sm:inline' }, 'Download My Health Report')
      ),

      // Quick Upload Record
      e(
        'button',
        {
          onClick: () => navigate('/records'),
          className: 'flex items-center gap-1.5 bg-[#1E60F2] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors'
        },
        e(Plus, { className: 'w-3.5 h-3.5 stroke-[2.5]' }),
        e('span', { className: 'hidden md:inline' }, 'Add Medical Record')
      ),

      // User Avatar
      e(
        'button',
        {
          onClick: () => navigate('/profile'),
          className: 'w-9 h-9 rounded-full bg-blue-100 text-[#1E60F2] font-extrabold flex items-center justify-center ring-2 ring-[#E2E8F0] hover:ring-blue-400 transition-all text-xs ml-1'
        },
        (user.name || 'P').charAt(0)
      )
    )
  );
};
