import React from 'react';
import { GraduationCap, Database, RefreshCw } from 'lucide-react';

export default function Navbar({ onRefresh, loading }) {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Student Information System</h1>
            <p className="text-xs text-slate-400">Spring Boot REST API &bull; Vite React Frontend</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            <Database className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>API: /mandap/students</span>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center text-xs font-medium bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-50 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition"
            title="Refresh student records"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
