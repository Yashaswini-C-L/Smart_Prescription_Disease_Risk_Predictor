import React from 'react';
import { Bell, ShieldCheck, HeartPulse, Menu } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

const Navbar = ({ title = "Dashboard", onOpenMobileSidebar = () => {} }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-ivory-dark/60 px-4 sm:px-6 flex items-center justify-between shadow-subtle shrink-0">
      {/* Left: Mobile Menu Button + Page Title & Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 -ml-1 text-forest-dark hover:text-forest hover:bg-ivory rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-forest shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-forest" />
        </button>

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-forest-dark truncate">
            {title}
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 hidden sm:block truncate">
            Patient Health Management Portal
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        {/* System Status Pill (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light/30 border border-sage/40 text-forest text-xs font-medium">
          <HeartPulse className="w-3.5 h-3.5 text-forest" />
          <span>Health Monitoring Active</span>
        </div>

        {/* Security / Session Indicator (Tablet and Desktop) */}
        <div
          className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 bg-ivory px-2.5 py-1 rounded border border-ivory-dark"
          title="Protected with 256-bit encryption"
        >
          <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
          <span className="hidden md:inline">Encrypted Session</span>
        </div>

        {/* Notifications / Alerts Placeholder */}
        <button
          className="relative p-2 text-gray-600 hover:text-forest hover:bg-ivory rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-forest"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full"></span>
        </button>

        {/* User initials avatar */}
        <div
          className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center font-medium text-xs shadow-sm shrink-0"
          title={user?.name || 'Patient'}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
