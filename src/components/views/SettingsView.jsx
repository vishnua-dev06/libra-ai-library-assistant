import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { 
  ShieldCheck, Cpu, Key, RotateCcw, Sparkles, 
  CheckCircle2, Info, BookOpen, Layers, Terminal 
} from 'lucide-react';

export function SettingsView() {
  const { apiKey, setApiKey, resetInventory, showToast } = useLibrary();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    setSavedSuccess(true);
    showToast("API Key preference updated successfully.", "success");
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleClearKey = () => {
    setInputKey('');
    setApiKey('');
    showToast("Switched back to Demo Mode (Local Intelligent Engine).", "info");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">System Settings & Demo Resilience</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure AI engines, inspect hackathon fallback layers, and manage demo datasets
            </p>
          </div>
        </div>
      </div>

      {/* Demo Mode & Resiliency Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Demo Mode: 100% Fail-Safe Architecture Active</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          LibraAI incorporates a dual-mode AI engine. Even if external network access or Gemini API quotas fail during the presentation, our built-in <strong>Intelligent Local Semantic Matcher</strong> instantly generates structured 3-5 book recommendations, explanations, difficulty ratings, and shelf checks with 0ms latency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 font-medium">NLP Tokenizer:</div>
            <div className="text-slate-100 font-bold mt-0.5">Active (Offline-Safe)</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 font-medium">Open Library Fallback:</div>
            <div className="text-slate-100 font-bold mt-0.5">Async Non-blocking</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 font-medium">Catalog Persistence:</div>
            <div className="text-slate-100 font-bold mt-0.5">Browser LocalStorage</div>
          </div>
        </div>
      </div>

      {/* Optional Gemini API Key Configuration */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Key className="w-4 h-4 text-brand-400" />
            <span>Optional: Google Gemini API Key</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {apiKey ? "Custom Key Active" : "Using Built-in Local Engine"}
          </span>
        </div>

        <p className="text-xs text-slate-400">
          If you want live Gemini 1.5 responses directly from Google's cloud model, enter your API key below. If left empty, LibraAI runs on the offline demo engine.
        </p>

        <form onSubmit={handleSaveKey} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold transition-all shadow-md"
            >
              {savedSuccess ? "Saved Successfully!" : "Save API Key"}
            </button>
            {apiKey && (
              <button
                type="button"
                onClick={handleClearKey}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Clear Key (Revert to Demo Engine)
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Dataset & Inventory Reset */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Demo Data Management</span>
        </div>
        <p className="text-xs text-slate-400">
          Reset all 20 campus library titles, borrowed status counts, and shelf locations to factory defaults.
        </p>
        <button
          onClick={resetInventory}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Inventory To Default (20 Books)</span>
        </button>
      </div>
    </div>
  );
}
