import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BookOpenCheck, Sparkles, BookMarked, Cpu, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { stats, apiKey, activeTab, setActiveTab } = useLibrary();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div 
          onClick={() => setActiveTab('assistant')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BookOpenCheck className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                Libra<span className="text-brand-400">AI</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                CAMPUS MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              AI-Powered University Library Management
            </p>
          </div>
        </div>

        {/* Center Live Inventory & AI Status Badges */}
        <div className="hidden md:flex items-center gap-3">
          {/* Real-time Campus Availability Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Campus Stock:</span>
            <span className="font-mono font-bold text-emerald-400">
              {stats.availableCopiesSum} / {stats.totalCopiesSum} copies
            </span>
          </div>

          {/* AI Mode Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-950/50 border border-brand-500/30 text-xs text-brand-300">
            {apiKey ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Gemini Pro Connected</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Demo Engine Active (100% Reliable)</span>
              </>
            )}
          </div>
        </div>

        {/* Right Quick Nav Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-brand-400 border border-brand-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
            title="System Settings & API Key"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
