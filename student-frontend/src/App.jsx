import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { studentApi } from './api/studentApi';
import { Users, BookOpen, Layers, Server } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAll();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotification(
        'error',
        `Unable to connect to Student API (${err.message || 'Network error'}). Please verify the backend is online.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Save (Create or Update)
  const handleSaveStudent = async (studentData) => {
    setSubmitting(true);
    try {
      if (editingStudent) {
        // Update
        const updated = await studentApi.update(editingStudent.id, studentData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showNotification(
          'success',
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`
        );
        setEditingStudent(null);
      } else {
        // Create
        const created = await studentApi.create(studentData);
        setStudents((prev) => [...prev, created]);
        showNotification(
          'success',
          `Student "${created.firstname} ${created.lastname}" created successfully!`
        );
      }
    } catch (err) {
      showNotification('error', err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete (Inline, no modal)
  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      await studentApi.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showNotification('success', `Student #${id} deleted successfully.`);
    } catch (err) {
      showNotification('error', err.message || `Failed to delete student #${id}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Edit selection
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    const formElement = document.getElementById('student-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Metric computations
  const totalStudents = students.length;
  const uniqueCourses = new Set(students.map((s) => (s.course || '').trim().toUpperCase()).filter(Boolean)).size;
  const uniqueSections = new Set(students.map((s) => (s.section || '').trim().toUpperCase()).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-sans">
      {/* Toast Notification */}
      <Notification notification={notification} onDismiss={() => setNotification(null)} />

      {/* Top Navigation */}
      <Navbar onRefresh={loadStudents} loading={loading} />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards Banner */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Students</p>
              <h3 className="text-xl font-bold text-slate-900">{totalStudents}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Unique Courses</p>
              <h3 className="text-xl font-bold text-slate-900">{uniqueCourses}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Sections</p>
              <h3 className="text-xl font-bold text-slate-900">{uniqueSections}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Backend Status</p>
              <h3 className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Proxy Connected
              </h3>
            </div>
          </div>
        </section>

        {/* Two-Column Responsive Layout (No Modals) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Inline Form */}
          <div className="lg:col-span-5 w-full">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              submitting={submitting}
            />
          </div>

          {/* Right Column: Student Table */}
          <div className="lg:col-span-7 w-full">
            <StudentList
              students={students}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              selectedId={editingStudent?.id}
              deletingId={deletingId}
              loading={loading}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Student CRUD Management System &bull; Vite + React + Tailwind CSS
      </footer>
    </div>
  );
}
