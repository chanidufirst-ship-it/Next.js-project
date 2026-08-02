'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, BookOpen, Calendar, MapPin, Hash, Sparkles } from 'lucide-react';
import { Student, StudentFormData } from '@/types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: StudentFormData) => Promise<void>;
  student?: Student | null;
  mode: 'add' | 'edit' | 'view';
}

const COURSES = [
  'Computer Science',
  'Software Engineering',
  'Data Science',
  'Cyber Security',
  'Information Technology',
  'Artificial Intelligence',
  'Business Information Systems',
];

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  mode,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    course: 'Computer Science',
    age: 20,
    gender: 'Male',
    address: '',
    registrationDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (student && (mode === 'edit' || mode === 'view')) {
      setFormData({
        studentId: student.studentId || '',
        fullName: student.fullName || '',
        email: student.email || '',
        phone: student.phone || '',
        course: student.course || 'Computer Science',
        age: student.age || 20,
        gender: student.gender || 'Male',
        address: student.address || '',
        registrationDate: student.registrationDate || new Date().toISOString().split('T')[0],
      });
    } else if (mode === 'add') {
      const randomId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData({
        studentId: randomId,
        fullName: '',
        email: '',
        phone: '',
        course: 'Computer Science',
        age: 20,
        gender: 'Male',
        address: '',
        registrationDate: new Date().toISOString().split('T')[0],
      });
    }
    setError(null);
  }, [student, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to save student record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden animate-slide-up transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-imperial-900 via-imperial-700 to-imperial-800 text-white p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-white" />
          </div>
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {mode === 'add' && 'Register New Student'}
                {mode === 'edit' && 'Edit Student Information'}
                {mode === 'view' && 'Student Profile Details'}
              </h3>
              <p className="text-xs text-imperial-100 font-medium">
                {mode === 'view' ? 'Complete student record summary' : 'Fill in the official details below'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {mode === 'view' ? (
          /* VIEW MODE DETAILS */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Student ID & Name Header Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-imperial-50 to-white border border-imperial-100 flex items-center justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-imperial-700 text-white text-xs font-bold tracking-wide mb-1.5">
                  ID: {formData.studentId}
                </span>
                <h4 className="text-2xl font-bold text-slate-900">{formData.fullName}</h4>
                <p className="text-sm font-semibold text-imperial-700">{formData.course}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-imperial-100 border-2 border-imperial-300 text-imperial-800 font-bold flex items-center justify-center text-2xl shadow-inner">
                {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'S'}
              </div>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Mail className="w-5 h-5 text-imperial-700 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Email Address</p>
                  <p className="text-sm font-medium text-slate-800">{formData.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-imperial-700 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Phone Number</p>
                  <p className="text-sm font-medium text-slate-800">{formData.phone}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <User className="w-5 h-5 text-imperial-700 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Age & Gender</p>
                  <p className="text-sm font-medium text-slate-800">
                    {formData.age} Years Old • {formData.gender}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-imperial-700 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Registration Date</p>
                  <p className="text-sm font-medium text-slate-800">{formData.registrationDate}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-imperial-700 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Residential Address</p>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">{formData.address}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-sm transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        ) : (
          /* ADD / EDIT FORM MODE */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Student ID <span className="text-imperial-700">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                    placeholder="e.g. STU-1001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name <span className="text-imperial-700">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address <span className="text-imperial-700">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                    placeholder="student@campus.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number <span className="text-imperial-700">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Course <span className="text-imperial-700">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 bg-white font-medium"
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Age <span className="text-imperial-700">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={16}
                  max={80}
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : '' })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Gender <span className="text-imperial-700">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 bg-white font-medium"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Residential Address <span className="text-imperial-700">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
                placeholder="Full address details..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Registration Date
              </label>
              <input
                type="date"
                value={formData.registrationDate}
                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-imperial-700/20 focus:border-imperial-700 font-medium"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-imperial-700 hover:bg-imperial-800 text-white font-semibold text-sm shadow-imperial flex items-center gap-2 transition-all imperial-glow disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : mode === 'add' ? 'Create Student' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
