import React, { useState, useMemo } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { AvailabilityBadge } from '../common/AvailabilityBadge';
import { CATEGORIES, getAvailabilityStatus } from '../../data/mockLibrary';
import { 
  Library, Plus, Minus, Search, Filter, RotateCcw, 
  MapPin, BookOpen, LayoutGrid, Table as TableIcon, Bookmark, CheckCircle2 
} from 'lucide-react';

export function InventoryView() {
  const { 
    catalog, 
    borrowBook, 
    returnBook, 
    resetInventory, 
    openBookModal, 
    stats 
  } = useLibrary();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  const filteredCatalog = useMemo(() => {
    return catalog.filter(book => {
      // Category
      if (categoryFilter !== 'All Categories' && book.category !== categoryFilter) {
        return false;
      }

      // Status
      const status = getAvailabilityStatus(book.availableCopies);
      if (statusFilter !== 'ALL' && status !== statusFilter) {
        return false;
      }

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        return book.title.toLowerCase().includes(q) ||
               book.author.toLowerCase().includes(q) ||
               book.bookId.toLowerCase().includes(q) ||
               book.shelfLocation.toLowerCase().includes(q);
      }

      return true;
    });
  }, [catalog, search, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Management Actions */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Library className="w-5 h-5 text-emerald-400" />
                Campus Inventory & Availability Management
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Simulation
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time physical copy counters, floor shelf mappings, and interactive checkout simulation
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={resetInventory}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Reset inventory counts to initial state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Inventory</span>
            </button>

            {/* View Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-slate-800 text-brand-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards' ? 'bg-slate-800 text-brand-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by title, author, ID, or shelf..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-400"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-400"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-400"
            >
              <option value="ALL">All Statuses ({stats.totalTitles})</option>
              <option value="AVAILABLE">AVAILABLE (&gt;3 copies)</option>
              <option value="LIMITED">LIMITED (1-3 copies)</option>
              <option value="BORROWED">BORROWED (0 copies)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Display: Table or Cards */}
      {viewMode === 'table' ? (
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Book ID</th>
                  <th className="py-3.5 px-4">Title & Author</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Shelf Location</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-center">Interactive Borrow / Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCatalog.map((book) => {
                  const isAvailable = book.availableCopies > 0;
                  const canReturn = book.availableCopies < book.totalCopies;

                  return (
                    <tr 
                      key={book.bookId}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-400 whitespace-nowrap">
                        {book.bookId}
                      </td>

                      {/* Title & Author */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div 
                          onClick={() => openBookModal(book)}
                          className="font-bold text-slate-200 hover:text-brand-400 cursor-pointer line-clamp-1 text-xs"
                          title={book.title}
                        >
                          {book.title}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          {book.author} ({book.year})
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium text-[11px]">
                          {book.category}
                        </span>
                      </td>

                      {/* Shelf Location */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                          <span>{book.shelfLocation}</span>
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <AvailabilityBadge
                          availableCopies={book.availableCopies}
                          totalCopies={book.totalCopies}
                          isExternal={false}
                          size="sm"
                        />
                      </td>

                      {/* Interactive Controls */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Borrow Button */}
                          <button
                            onClick={() => borrowBook(book.bookId)}
                            disabled={!isAvailable}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                              isAvailable
                                ? 'bg-brand-500/20 hover:bg-brand-500 text-brand-300 hover:text-white border border-brand-500/30'
                                : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                            }`}
                            title={isAvailable ? "Simulate borrowing 1 copy" : "No copies available"}
                          >
                            <Minus className="w-3 h-3" />
                            <span>Borrow</span>
                          </button>

                          {/* Return Button */}
                          <button
                            onClick={() => returnBook(book.bookId)}
                            disabled={!canReturn}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                              canReturn
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                            }`}
                            title={canReturn ? "Simulate returning 1 copy" : "All copies in library"}
                          >
                            <Plus className="w-3 h-3" />
                            <span>Return</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCatalog.map(book => {
            const isAvailable = book.availableCopies > 0;
            const canReturn = book.availableCopies < book.totalCopies;

            return (
              <div 
                key={book.bookId}
                className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-brand-400 px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">
                      {book.bookId}
                    </span>
                    <AvailabilityBadge
                      availableCopies={book.availableCopies}
                      totalCopies={book.totalCopies}
                      size="sm"
                    />
                  </div>

                  <h4 
                    onClick={() => openBookModal(book)}
                    className="font-bold text-sm text-slate-100 hover:text-brand-400 cursor-pointer line-clamp-2 leading-tight"
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {book.author}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <MapPin className="w-3 h-3 text-brand-400" />
                    <span className="truncate">{book.shelfLocation}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-300">
                    Copies: <strong className="text-white">{book.availableCopies}</strong> / {book.totalCopies}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => borrowBook(book.bookId)}
                      disabled={!isAvailable}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isAvailable
                          ? 'bg-brand-500 hover:bg-brand-400 text-white'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Borrow
                    </button>
                    <button
                      onClick={() => returnBook(book.bookId)}
                      disabled={!canReturn}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        canReturn ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      Return
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
