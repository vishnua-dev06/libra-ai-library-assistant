import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { AvailabilityBadge } from './AvailabilityBadge';
import { 
  X, BookOpen, MapPin, Calendar, Star, Sparkles, 
  Layers, CheckCircle2, Bookmark, ArrowUpRight, MessageSquare 
} from 'lucide-react';

export function BookDetailsModal() {
  const { selectedBook, isDetailsOpen, closeBookModal, borrowBook, returnBook, setActiveTab, sendChatMessage } = useLibrary();
  const [imgError, setImgError] = useState(false);

  if (!isDetailsOpen || !selectedBook) return null;

  const isLocal = !selectedBook.isExternal;
  const isAvailable = (selectedBook.availableCopies || 0) > 0;
  const canReturn = (selectedBook.availableCopies || 0) < (selectedBook.totalCopies || 0);

  const handleAskAssistant = () => {
    closeBookModal();
    setActiveTab('assistant');
    sendChatMessage(`Can you tell me more about "${selectedBook.title}" by ${selectedBook.author} and what prerequisites I need before reading it?`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={closeBookModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* High-res Cover Image */}
            <div className="w-32 h-44 sm:w-36 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-xl relative mx-auto sm:mx-0">
              {selectedBook.cover && !imgError ? (
                <img
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
                  <BookOpen className="w-10 h-10 text-brand-400 mb-2 opacity-80" />
                  <span className="text-xs font-bold line-clamp-3">{selectedBook.title}</span>
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/30">
                  {selectedBook.category || "General"}
                </span>
                {selectedBook.difficulty && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    Level: {selectedBook.difficulty}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-400">
                  ID: {selectedBook.bookId}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {selectedBook.title}
              </h2>

              <p className="text-sm text-slate-300 font-medium">
                By <span className="text-brand-400 font-semibold">{selectedBook.author}</span>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedBook.year} ({selectedBook.edition || 'Standard'})
                </span>
                {selectedBook.rating && (
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {selectedBook.rating} / 5.0
                  </span>
                )}
                {selectedBook.isbn && selectedBook.isbn !== 'N/A' && (
                  <span className="font-mono text-slate-400">
                    ISBN: {selectedBook.isbn}
                  </span>
                )}
              </div>

              {/* Status & Location Pill */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <AvailabilityBadge
                  availableCopies={selectedBook.availableCopies}
                  totalCopies={selectedBook.totalCopies}
                  isExternal={selectedBook.isExternal}
                  showCount={true}
                />
              </div>
            </div>
          </div>

          {/* Campus Shelf Location Box */}
          {isLocal && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Shelf Placement: </span>
                  <span className="font-mono font-semibold text-white">{selectedBook.shelfLocation}</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium whitespace-nowrap">
                Campus Library Main Block
              </span>
            </div>
          )}

          {/* AI Synopsis & Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-400" />
              Synopsis & Coursework Relevance
            </h4>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              {selectedBook.description}
            </div>
          </div>

          {/* Key Topics & Syllabus Coverage */}
          {selectedBook.keyTopics && selectedBook.keyTopics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Topics Covered
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedBook.keyTopics.map((topic, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/60"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Target Audience / AI Relevance */}
          {selectedBook.targetAudience && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-950/40 via-sky-950/30 to-transparent border border-brand-500/20 flex items-start gap-2.5 text-xs text-brand-200">
              <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-300">Target Learning Profile: </span>
                <span>{selectedBook.targetAudience}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleAskAssistant}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <span>Ask AI About This Book</span>
          </button>

          {isLocal && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => returnBook(selectedBook.bookId)}
                disabled={!canReturn}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  canReturn
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                }`}
              >
                Return 1 Copy
              </button>

              <button
                onClick={() => borrowBook(selectedBook.bookId)}
                disabled={!isAvailable}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                  isAvailable
                    ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-brand-500/20 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isAvailable ? 'Borrow This Book' : 'All Copies Borrowed'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
