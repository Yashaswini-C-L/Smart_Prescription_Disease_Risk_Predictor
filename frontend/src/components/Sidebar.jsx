import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Activity,
  CalendarCheck,
  User,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

const Sidebar = ({
  mobileOpen = false,
  onCloseMobile = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {}
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Medical Timeline', path: '/timeline', icon: FileText },
    { name: 'Drug Interaction', path: '/interactions', icon: AlertTriangle },
    { name: 'Risk Assessment', path: '/risk-assessment', icon: Activity },
    { name: 'Health Roadmap', path: '/roadmap', icon: CalendarCheck },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* ============================================================== */}
      {/* 1. Mobile Navigation Drawer (Backdrop + Off-canvas Sidebar)   */}
      {/* ============================================================== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-forest-dark text-white flex flex-col border-r border-forest-light/40 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile Navigation"
      >
        {/* Brand Header with Close Button */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-forest-light/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center text-forest-dark font-bold text-lg shadow-sm">
              SP
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-ivory">Prescription AI</h1>
              <p className="text-[11px] text-sage">Risk & Safety Hub</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-lg text-sage hover:text-white hover:bg-forest-light/40 transition-colors focus:outline-none focus:ring-2 focus:ring-sage"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sage/70">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest text-ivory border-l-4 border-sage shadow-sm font-semibold'
                      : 'text-sage-light/80 hover:bg-forest-light/40 hover:text-ivory'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Current User Card & Logout (Mobile) */}
        <div className="p-4 border-t border-forest-light/30 bg-forest/30">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center text-ivory text-xs font-semibold shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-ivory truncate">{user?.name || 'Patient'}</p>
              <p className="text-[11px] text-sage truncate">{user?.email || 'patient@example.com'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onCloseMobile();
              handleLogout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-red-200 hover:text-white hover:bg-red-900/40 rounded-lg transition-colors border border-red-900/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. Desktop / Tablet Sidebar (Collapsible & Persistent)        */}
      {/* ============================================================== */}
      <aside
        className={`hidden md:flex flex-col h-screen bg-forest-dark text-white border-r border-forest-light/40 select-none transition-all duration-300 shrink-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        aria-label="Desktop Navigation"
      >
        {/* Brand Header */}
        <div
          className={`h-16 flex items-center border-b border-forest-light/30 transition-all ${
            isCollapsed ? 'justify-center px-2' : 'justify-between px-6'
          }`}
        >
          {isCollapsed ? (
            <button
              onClick={onToggleCollapse}
              className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center text-forest-dark font-bold text-lg shadow-sm hover:scale-105 transition-transform"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              SP
            </button>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center text-forest-dark font-bold text-lg shadow-sm">
                  SP
                </div>
                <div>
                  <h1 className="text-sm font-semibold tracking-wide text-ivory">Prescription AI</h1>
                  <p className="text-[11px] text-sage">Risk & Safety Hub</p>
                </div>
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg text-sage hover:text-white hover:bg-forest-light/40 transition-colors"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sage/70">
              Main Navigation
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isCollapsed
                    ? `group relative flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-forest text-ivory shadow-sm ring-1 ring-sage'
                          : 'text-sage-light/80 hover:bg-forest-light/40 hover:text-ivory'
                      }`
                    : `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-forest text-ivory border-l-4 border-sage shadow-sm font-semibold'
                          : 'text-sage-light/80 hover:bg-forest-light/40 hover:text-ivory'
                      }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={isCollapsed ? 'w-5 h-5 shrink-0' : 'w-4 h-4 shrink-0'} />
                {!isCollapsed && <span>{item.name}</span>}

                {/* Floating tooltip for collapsed tablet view */}
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-forest-dark text-ivory text-xs font-medium rounded-md shadow-lg border border-forest-light/50 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Current User Card & Logout (Desktop / Tablet) */}
        {isCollapsed ? (
          <div className="p-3 border-t border-forest-light/30 bg-forest/30 flex flex-col items-center gap-3">
            <div
              className="w-9 h-9 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center text-ivory text-xs font-semibold shrink-0 cursor-default"
              title={`${user?.name || 'Patient'} (${user?.email || ''})`}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center text-red-200 hover:text-white hover:bg-red-900/30 rounded-lg transition-colors group relative"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-forest-dark text-red-200 text-xs font-medium rounded-md shadow-lg border border-forest-light/50 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Sign Out
              </span>
            </button>
            <button
              onClick={onToggleCollapse}
              className="w-8 h-6 flex items-center justify-center text-sage hover:text-white rounded transition-colors"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-4 border-t border-forest-light/30 bg-forest/30">
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="w-8 h-8 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center text-ivory text-xs font-semibold shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ivory truncate">{user?.name || 'Patient'}</p>
                <p className="text-[11px] text-sage truncate">{user?.email || 'patient@example.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-red-200 hover:text-white hover:bg-red-900/30 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
