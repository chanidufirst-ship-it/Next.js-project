'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { StudentModal } from '@/components/StudentModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { studentApi } from '@/lib/api';
import { Student, StudentFormData } from '@/types';
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAll(searchQuery);
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  useEffect(() => {
    let result = [...students];

    if (selectedCourse !== 'All') {
      result = result.filter((s) => s.course === selectedCourse);
    }

    if (selectedGender !== 'All') {
      result = result.filter((s) => s.gender === selectedGender);
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [students, selectedCourse, selectedGender]);

  // Modals Handlers
  const handleOpenAddModal = () => {
    setActiveStudent(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (student: Student) => {
    setActiveStudent(student);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setActiveStudent(student);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData: StudentFormData) => {
    if (modalMode === 'add') {
      await studentApi.create(formData);
    } else if (modalMode === 'edit' && activeStudent) {
      await studentApi.update(activeStudent.id, formData);
    }
    await fetchStudents();
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setDeleteLoading(true);
    try {
      await studentApi.delete(studentToDelete.id);
      setIsDeleteOpen(false);
      setStudentToDelete(null);
      await fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const coursesList = Array.from(new Set(students.map((s) => s.course))).filter(Boolean);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar onOpenAddModal={handleOpenAddModal} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar
          title="Student Records Directory"
          subtitle="Manage, search, edit and register student profiles"
          onSearchChange={setSearchQuery}
          searchValue={searchQuery}
        />

        <main className="p-8 space-y-6 max-w-7xl mx-auto w-full animate-fade-in">
          {/* Header Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-imperial-50 text-imperial-700 flex items-center justify-center border border-imperial-100">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Student Roster</h3>
                <p className="text-xs text-slate-500">
                  Showing {filteredStudents.length} student records
                </p>
              </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Course Filter */}
              <div className="relative">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-imperial-700"
                >
                  <option value="All">All Courses</option>
                  {coursesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="relative">
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-imperial-700"
                >
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                onClick={fetchStudents}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                title="Refresh Table"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-imperial-700 hover:bg-imperial-800 text-white font-bold text-xs shadow-imperial flex items-center gap-2 transition-all imperial-glow"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-6">Student ID</th>
                    <th className="py-3.5 px-6">Full Name</th>
                    <th className="py-3.5 px-6">Email Address</th>
                    <th className="py-3.5 px-6">Course</th>
                    <th className="py-3.5 px-6">Age / Gender</th>
                    <th className="py-3.5 px-6">Reg. Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-8 h-8 border-3 border-imperial-700 border-t-transparent rounded-full animate-spin"></div>
                          <span>Fetching student directory...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-imperial-50/40 transition-colors group"
                      >
                        <td className="py-4 px-6 font-bold text-imperial-700 whitespace-nowrap">
                          {student.studentId}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-imperial-100 text-imperial-800 font-bold flex items-center justify-center text-xs">
                              {student.fullName ? student.fullName.charAt(0) : 'S'}
                            </div>
                            <span>{student.fullName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">
                          {student.email}
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                            {student.course}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                          {student.age} yrs • {student.gender}
                        </td>
                        <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                          {student.registrationDate}
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenViewModal(student)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-imperial-700 hover:bg-imperial-50 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(student)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit Record"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(student)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No students found matching the selected filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Page <strong className="text-slate-800">{currentPage}</strong> of{' '}
                <strong className="text-slate-800">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        student={activeStudent}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
