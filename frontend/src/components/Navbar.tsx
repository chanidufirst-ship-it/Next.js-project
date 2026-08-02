'use client';

import React from 'react';
import { Bell, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  title?: string;
  subtitle?: string;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = 'Student Management Dashboard',
  subtitle = 'Welcome back to the Admin Portal',
  onSearchChange,
  searchValue = '',
}) => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20 transition-all">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Optional Live Search Input */}
        {onSearchChange !== undefined && (
          <div className="relative w-64 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-imperial-700/30 focus:border-imperial-700 transition-all"
            />
          </div>
        )}

        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-imperial-50 border border-imperial-100 text-imperial-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-imperial-600 animate-pulse"></span>
          <ShieldCheck className="w-3.5 h-3.5 text-imperial-700" />
          <span>Admin Access Active</span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-imperial-700 hover:bg-imperial-50 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-imperial-600 ring-2 ring-white"></span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-imperial-700 to-imperial-900 text-white font-bold flex items-center justify-center text-base shadow-sm">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};
