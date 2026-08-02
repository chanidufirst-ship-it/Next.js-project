'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, UserPlus, LogOut, GraduationCap, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  onOpenAddModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAddModal }) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Students List',
      href: '/students',
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between select-none shadow-sm z-30 transition-all duration-300">
      <div>
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-imperial-800 to-imperial-600 flex items-center justify-center text-white shadow-imperial">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
              Smart<span className="text-imperial-700">Campus</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Student Management</p>
          </div>
        </div>

        {/* Quick Action Button */}
        {onOpenAddModal && (
          <div className="px-4 pt-5 pb-2">
            <button
              onClick={onOpenAddModal}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-imperial-700 hover:bg-imperial-800 text-white font-medium text-sm transition-all duration-200 shadow-imperial imperial-glow"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Student</span>
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="px-4 py-4 space-y-1.5">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-imperial-50 text-imperial-700 font-semibold border-l-4 border-imperial-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-imperial-700' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-imperial-700" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer & Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-white border border-slate-100 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-imperial-100 text-imperial-800 font-bold flex items-center justify-center text-sm border border-imperial-200">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">{user?.fullName || 'Administrator'}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@campus.edu'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-slate-600 hover:bg-red-50 hover:text-imperial-700 text-xs font-semibold transition-colors duration-200 border border-transparent hover:border-imperial-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
