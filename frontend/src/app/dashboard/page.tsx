'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { StudentModal } from '@/components/StudentModal';
import { studentApi } from '@/lib/api';
import { DashboardStats, Student, StudentFormData } from '@/types';
import {
  Users,
  BookOpen,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);
      setError('Could not connect to backend server. Make sure Spring Boot is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedStudent(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (student: Student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleAddStudentSubmit = async (formData: StudentFormData) => {
    await studentApi.create(formData);
    await fetchDashboardData();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar onOpenAddModal={handleOpenAddModal} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar title="Dashboard Summary" subtitle="Overview of student enrollment & campus statistics" />

        <main className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
          {error && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchDashboardData}
                className="px-3 py-1 bg-amber-700 text-white rounded-lg text-xs hover:bg-amber-800 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Banner Hero */}
          <div className="relative rounded-3xl bg-gradient-to-r from-imperial-900 via-imperial-700 to-imperial-800 text-white p-8 overflow-hidden shadow-imperial-lg">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-imperial-100 text-xs font-semibold mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-imperial-200" />
                Smart Campus Portal
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight mb-2">
                Administrator Overview & Control
              </h2>
              <p className="text-sm text-imperial-100/90 leading-relaxed mb-6">
                Manage all student records, view real-time course analytics, update profile details, and maintain security directly from your admin panel.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOpenAddModal}
                  className="px-5 py-2.5 rounded-xl bg-white text-imperial-800 font-bold text-sm hover:bg-imperial-50 shadow-md transition-all flex items-center gap-2 imperial-glow"
                >
                  <UserPlus className="w-4 h-4 text-imperial-700" />
                  <span>Add New Student</span>
                </button>
                <Link
                  href="/students"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2"
                >
                  <span>View All Students</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Students Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-imperial-50 border border-imperial-100 text-imperial-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                {loading ? '...' : stats?.totalStudents ?? 0}
              </h3>
              <p className="text-xs text-imperial-700 font-medium mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Active Registered Records
              </p>
            </div>

            {/* Total Courses Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-imperial-50 border border-imperial-100 text-imperial-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Courses</p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                {loading ? '...' : stats?.totalCourses ?? 0}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-2">Specializations & Faculties</p>
            </div>

            {/* System Status Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">System Database</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">MongoDB Atlas</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cloud Cluster Connected
              </p>
            </div>
          </div>

          {/* Section: Course Breakdown & Recent Students */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Distribution Bars */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900">Enrolled Courses</h3>
                <span className="text-xs font-semibold text-imperial-700 bg-imperial-50 px-2.5 py-1 rounded-full border border-imperial-100">
                  {stats ? Object.keys(stats.studentsByCourse).length : 0} Streams
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {stats && Object.keys(stats.studentsByCourse).length > 0 ? (
                  Object.entries(stats.studentsByCourse).map(([courseName, count]) => {
                    const percentage = Math.round((count / (stats.totalStudents || 1)) * 100);
                    return (
                      <div key={courseName} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-700">
                          <span className="truncate max-w-[180px]">{courseName}</span>
                          <span className="font-bold text-imperial-700">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-imperial-700 to-imperial-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">No course statistics available yet.</p>
                )}
              </div>
            </div>

            {/* Recently Registered Students Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900">Recently Registered Students</h3>
                  <p className="text-xs text-slate-500">Latest student records added</p>
                </div>
                <Link
                  href="/students"
                  className="text-xs font-bold text-imperial-700 hover:text-imperial-900 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                      <th className="py-3 px-4 rounded-l-xl">Student ID</th>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          Loading recent students...
                        </td>
                      </tr>
                    ) : stats?.recentStudents && stats.recentStudents.length > 0 ? (
                      stats.recentStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-imperial-700">{st.studentId}</td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{st.fullName}</td>
                          <td className="py-3 px-4 text-slate-600">{st.course}</td>
                          <td className="py-3 px-4 text-slate-500">{st.registrationDate}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleOpenViewModal(st)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-imperial-700 hover:bg-imperial-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No student records available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudentSubmit}
        student={selectedStudent}
        mode={modalMode}
      />
    </div>
  );
}
