import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { 
  MessageSquareText, Search, Library, Sparkles, Settings, 
  BookMarked, BarChart3, HelpCircle 
} from 'lucide-react';

export function Sidebar() {
  const { activeTab, setActiveTab, stats } = useLibrary();

  const navItems = [
    {
      id: 'assistant',
      label: 'AI Assistant',
      description: 'Natural language discovery',
      icon: MessageSquareText,
      badge: 'Core'
    },
    {
      id: 'search',
      label: 'Book Search',
      description: 'Catalog & Open Library',
      icon: Search,
      badge: null
    },
    {
      id: 'inventory',
      label: 'Inventory & Stock',
      description: 'Campus real-time status',
      icon: Library,
      badge: `${stats.totalTitles}`
    },
    {
      id: 'studio',
      label: 'Rec Studio',
      description: 'Branch & level filters',
      icon: Sparkles,
      badge: 'Smart'
    },
    {
      id: 'settings',
      label: 'Demo Config',
      description: 'API & Fallback modes',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="glass-panel rounded-3xl p-4 sticky top-20">
        <div className="px-3 py-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600/30 to-brand-500/15 text-white border border-brand-500/40 shadow-lg shadow-brand-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-brand-500 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className={`text-xs font-bold leading-tight ${isActive ? 'text-brand-300' : 'text-slate-200'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {item.description}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-brand-400/20 text-brand-300 border border-brand-400/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Tips Box */}
        <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-brand-400 font-bold mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hackathon Tip</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Test real-time availability by borrowing or returning copies in the <strong className="text-slate-300">Inventory</strong> tab!
          </p>
        </div>
      </div>
    </aside>
  );
}
