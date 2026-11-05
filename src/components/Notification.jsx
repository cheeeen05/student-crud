import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Notification({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md w-full shadow-lg rounded-xl border p-4 flex items-start space-x-3 transition-all duration-300 animate-slide-in ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600" />
        )}
      </div>
      <div className="flex-1 text-sm">
        <p className="font-semibold">{isSuccess ? 'Success' : 'Error'}</p>
        <p className="mt-0.5 text-xs text-opacity-90">{notification.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 text-slate-400 hover:text-slate-600 rounded-md p-1 transition"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
