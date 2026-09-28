import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toastMessage } = useLibrary();

  if (!toastMessage) return null;

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  const Icon = icons[toastMessage.type] || Info;

  const styles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
    info: 'bg-brand-950/90 border-brand-500/50 text-brand-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short max-w-sm">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 ${styles[toastMessage.type] || styles.info}`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-xs font-semibold leading-snug">
          {toastMessage.message}
        </p>
      </div>
    </div>
  );
}
