import React, { useState } from 'react';
import { AvailabilityBadge } from './AvailabilityBadge';
import { useLibrary } from '../../context/LibraryContext';
import { BookOpen, MapPin, Star, Sparkles, Check, ArrowRight } from 'lucide-react';

export function BookCard({ book, showBorrowAction = true, highlightReason = null }) {
  const { openBookModal, borrowBook } = useLibrary();
  const [imgError, setImgError] = useState(false);

  const isLocal = !book.isExternal;
  const isAvailable = (book.availableCopies || 0) > 0;

  // Category Color Scheme
  const categoryColors = {
    'Programming': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'AI/ML': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Electronics': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    'Embedded Systems': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Communication': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Mathematics': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    'Fiction': 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const badgeClass = categoryColors[book.category] || 'bg-slate-700/50 text-slate-300 border-slate-600';

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl glass-panel glass-panel-hover overflow-hidden transition-all duration-300 p-4 sm:p-5">
      {/* Top Banner for AI Recommendation Reason if provided */}
      {highlightReason && (
        <div className="mb-3.5 -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 px-4 py-2.5 bg-gradient-to-r from-brand-600/20 via-brand-500/15 to-transparent border-b border-brand-500/20 flex items-start gap-2 text-xs text-brand-200">
          <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
          <span className="leading-snug font-medium">
            <strong className="text-brand-300">Why recommended:</strong> {highlightReason}
          </span>
        </div>
      )}

      <div>
        {/* Book Header: Cover & Main Meta */}
        <div className="flex gap-4">
          {/* Cover Art */}
          <div 
            onClick={() => openBookModal(book)}
            className="w-20 h-28 sm:w-24 sm:h-34 flex-shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative cursor-pointer group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all duration-300"
          >
            {book.cover && !imgError ? (
              <img
                src={book.cover}
                alt={book.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-400">
                <BookOpen className="w-7 h-7 text-brand-400 mb-1 opacity-75" />
                <span className="text-[10px] font-bold line-clamp-2 leading-tight text-slate-300">
                  {book.title}
                </span>
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-start">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${badgeClass}`}>
                {book.category}
              </span>
              {book.difficulty && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                  {book.difficulty}
                </span>
              )}
            </div>

            <h3 
              onClick={() => openBookModal(book)}
              title={book.title} 
              className="font-bold text-sm sm:text-base text-slate-100 hover:text-brand-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
            >
              {book.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1 line-clamp-1">
              By <span className="text-slate-300 font-medium">{book.author}</span>
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span>{book.year}</span>
              {book.rating && (
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {book.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          {book.description || "Comprehensive campus reference covering core engineering fundamentals and practical implementations."}
        </p>

        {/* Shelf location if local */}
        {isLocal && book.shelfLocation && (
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-slate-400 font-mono bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800/80">
            <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
            <span className="truncate">{book.shelfLocation}</span>
          </div>
        )}
      </div>

      {/* Footer / Availability & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <AvailabilityBadge 
          availableCopies={book.availableCopies} 
          totalCopies={book.totalCopies} 
          isExternal={book.isExternal} 
          size="sm"
        />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openBookModal(book)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {isLocal && showBorrowAction && (
            <button
              onClick={() => borrowBook(book.bookId)}
              disabled={!isAvailable}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                isAvailable
                  ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-sm hover:shadow-brand-500/20 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Borrow' : 'Waitlist'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
