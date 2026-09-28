import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BookOpen, CheckCircle2, BookmarkX, Sparkles, TrendingUp } from 'lucide-react';

export function StatsOverview() {
  const { stats, setActiveTab } = useLibrary();

  const cards = [
    {
      title: 'Total Books',
      value: `${stats.totalTitles} Titles`,
      subValue: `${stats.totalCopiesSum} total copies in stock`,
      icon: BookOpen,
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/10 border-brand-500/20',
      glow: 'glow-brand',
      actionTab: 'inventory'
    },
    {
      title: 'Available Now',
      value: `${stats.availableCopiesSum} Copies`,
      subValue: `${stats.availableTitlesCount} ready for immediate checkout`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'glow-emerald',
      actionTab: 'inventory'
    },
    {
      title: 'Currently Borrowed',
      value: `${stats.borrowedCopiesSum} Copies`,
      subValue: `${stats.borrowedTitlesCount} titles out of stock`,
      icon: BookmarkX,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/20',
      glow: '',
      actionTab: 'inventory'
    },
    {
      title: 'AI Recommendations',
      value: `${stats.aiQueriesCount} Generated`,
      subValue: 'Natural language queries solved',
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      glow: '',
      actionTab: 'assistant'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={() => card.actionTab && setActiveTab(card.actionTab)}
            className={`glass-panel glass-panel-hover p-4 sm:p-5 rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-300 border border-slate-800`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {card.value}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  {card.subValue}
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${card.bgColor} ${card.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom accent glow */}
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <TrendingUp className="w-3 h-3 text-brand-400" />
                Live Campus Telemetry
              </span>
              <span className="text-brand-400 hover:underline">View →</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
