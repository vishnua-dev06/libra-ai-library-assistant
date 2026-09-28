import React from 'react';
import { getAvailabilityStatus } from '../../data/mockLibrary';
import { CheckCircle2, AlertTriangle, XCircle, Globe } from 'lucide-react';

export function AvailabilityBadge({ availableCopies, totalCopies, isExternal = false, showCount = true, size = 'md' }) {
  if (isExternal) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700 ${
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-xs px-3 py-1'
      }`}>
        <Globe className="w-3.5 h-3.5 text-sky-400" />
        <span>Open Library Global</span>
      </span>
    );
  }

  const status = getAvailabilityStatus(availableCopies);

  const configs = {
    AVAILABLE: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 glow-emerald',
      icon: CheckCircle2,
      label: 'AVAILABLE',
      color: 'text-emerald-400'
    },
    LIMITED: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30 glow-amber',
      icon: AlertTriangle,
      label: 'LIMITED',
      color: 'text-amber-400'
    },
    BORROWED: {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: XCircle,
      label: 'BORROWED',
      color: 'text-rose-400'
    }
  };

  const current = configs[status] || configs.AVAILABLE;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${current.bg} ${
      size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
    }`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{current.label}</span>
      {showCount && typeof totalCopies === 'number' && (
        <span className="opacity-80 font-mono text-[11px] ml-0.5">
          ({availableCopies}/{totalCopies})
        </span>
      )}
    </span>
  );
}
