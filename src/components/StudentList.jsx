import React, { useState } from 'react';
import { Search, Edit3, Trash2, Check, X, Users, AlertTriangle } from 'lucide-react';

export default function StudentList({
  students,
  onEdit,
  onDelete,
  selectedId,
  deletingId,
  loading,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    const idMatch = String(student.id).includes(term);
    const fnameMatch = (student.firstname || '').toLowerCase().includes(term);
    const lnameMatch = (student.lastname || '').toLowerCase().includes(term);
    const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
    const fullNameMatch = fullName.includes(term);
    const courseMatch = (student.course || '').toLowerCase().includes(term);
    const sectionMatch = (student.section || '').toLowerCase().includes(term);
    return idMatch || fnameMatch || lnameMatch || fullNameMatch || courseMatch || sectionMatch;
  });

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDeleteId(null);
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Student Directory</h2>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} of {students.length} recorded students
            </p>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, course, section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
            <tr>
              <th className="py-3.5 px-5">ID</th>
              <th className="py-3.5 px-5">Full Name</th>
              <th className="py-3.5 px-5">Course</th>
              <th className="py-3.5 px-5">Section</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2" />
                  <p className="text-xs">Loading students from database...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto">
                    <p className="text-sm font-medium text-slate-600">
                      {searchTerm ? 'No matching students found' : 'No students found'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchTerm
                        ? 'Try refining your search keyword.'
                        : 'Add your first student using the form.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isSelected = selectedId === student.id;
                const isConfirmingDelete = confirmDeleteId === student.id;
                const isDeleting = deletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isSelected ? 'bg-indigo-50/60 font-medium' : ''
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-5 font-mono text-xs text-slate-500">
                      #{student.id}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-5 text-slate-900 font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {(student.firstname?.[0] || 'S').toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm text-slate-900">
                            {student.firstname} {student.lastname}
                          </p>
                          <p className="text-xs text-slate-400 sm:hidden">
                            {student.course} &bull; {student.section}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {student.course}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {student.section}
                      </span>
                    </td>

                    {/* Inline Actions (No modal) */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      {isConfirmingDelete ? (
                        <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 rounded-lg p-1 animate-fade-in">
                          <span className="text-xs text-rose-700 font-semibold px-1.5 flex items-center">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                            Delete?
                          </span>
                          <button
                            type="button"
                            onClick={() => handleConfirmDelete(student.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-2 py-1 rounded shadow-sm transition"
                            title="Confirm delete"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelDelete}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-2 py-1 rounded transition"
                            title="Cancel delete"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => onEdit(student)}
                            disabled={isDeleting}
                            className={`p-1.5 rounded-lg transition ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                            title="Edit student"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(student.id)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Delete student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
