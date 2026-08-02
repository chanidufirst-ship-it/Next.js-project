'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Invalid email or password. Please verify your admin credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('chanindufirst@gmail.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Background Imperial Red Radiant Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-imperial-700/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-imperial-900/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Top Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-imperial-900 via-imperial-700 to-imperial-600 text-white shadow-imperial-lg mb-4 transform hover:scale-105 transition-transform duration-300">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Smart<span className="text-imperial-500">Campus</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">
            Student Management System
          </p>
        </div>

        {/* Card Surface */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100/20 relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admin Sign In</h2>
              <p className="text-xs text-slate-500 font-medium">Access your administrative portal</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-imperial-50 border border-imperial-100 text-imperial-700 text-[11px] font-bold">
              <Shield className="w-3 h-3 text-imperial-700" />
              JWT Secure
            </span>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold flex items-start gap-2 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email <span className="text-imperial-700">*</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@campus.edu"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-imperial-700">*</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-imperial-800 via-imperial-700 to-imperial-800 hover:from-imperial-900 hover:to-imperial-700 text-white font-bold text-sm tracking-wide shadow-imperial flex items-center justify-center gap-2 transition-all duration-200 imperial-glow disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-imperial-700 hover:text-imperial-900 bg-imperial-50 hover:bg-imperial-100 px-3 py-1.5 rounded-lg border border-imperial-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-imperial-700" />
              <span>Fill Default Credentials</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              Default Admin: <span className="font-mono text-slate-600">chanindufirst@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Smart Campus System &bull; Spring Boot + MongoDB + Next.js
        </p>
      </div>
    </main>
  );
}
