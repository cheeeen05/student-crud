import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, RotateCcw, XCircle, AlertCircle } from 'lucide-react';

export default function StudentForm({ editingStudent, onSave, onCancelEdit, submitting }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      id="student-form-section"
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
        isEditing
          ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-indigo-100'
          : 'border-slate-200'
      } p-6`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center space-x-2.5">
          <div
            className={`p-2 rounded-xl text-white ${
              isEditing ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            {isEditing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? `Edit Student (ID: ${editingStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update student information below'
                : 'Fill in the student details to register'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Edit Mode
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. John"
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition ${
                errors.firstname ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.firstname}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastname" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Doe"
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition ${
                errors.lastname ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="course" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT / BSCS"
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition ${
                errors.course ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.course}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="section" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A / 4B"
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition ${
                errors.section ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 sm:flex-none flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 shadow-sm transition"
          >
            {submitting ? (
              <span className="flex items-center">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </span>
            ) : isEditing ? (
              'Update Student'
            ) : (
              'Add Student'
            )}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="flex items-center px-4 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 transition"
            >
              <XCircle className="w-4 h-4 mr-1.5 text-slate-500" />
              Cancel Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="flex items-center px-4 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-50 transition"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
