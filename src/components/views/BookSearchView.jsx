import React, { useState, useEffect, useMemo } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { searchOpenLibrary } from '../../services/openLibraryService';
import { CATEGORIES } from '../../data/mockLibrary';
import { BookCard } from '../common/BookCard';
import { 
  Search, Filter, Globe, Library, BookOpen, 
  RefreshCw, CheckCircle2, SlidersHorizontal, Sparkles 
} from 'lucide-react';

export function BookSearchView() {
  const { catalog } = useLibrary();

  // Search Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all'); // 'all' | 'title' | 'author' | 'subject'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSource, setSelectedSource] = useState('all'); // 'all' | 'local' | 'openlibrary'
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available' | 'limited' | 'borrowed'
  
  // Open Library Async State
  const [openLibraryResults, setOpenLibraryResults] = useState([]);
  const [isSearchingOL, setIsSearchingOL] = useState(false);

  // Debounced Open Library Search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setOpenLibraryResults([]);
      setIsSearchingOL(false);
      return;
    }

    if (selectedSource === 'local') {
      setOpenLibraryResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingOL(true);
      try {
        const results = await searchOpenLibrary({
          query: searchQuery,
          type: searchType,
          limit: 10
        });
        setOpenLibraryResults(results);
      } catch (err) {
        console.error("Open Library error:", err);
      } finally {
        setIsSearchingOL(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [searchQuery, searchType, selectedSource]);

  // Local Catalog Filtered Results
  const localFilteredResults = useMemo(() => {
    if (selectedSource === 'openlibrary') return [];

    return catalog.filter(book => {
      // Category filter
      if (selectedCategory !== 'All Categories' && book.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'available' && book.availableCopies <= 3) return false;
      if (availabilityFilter === 'limited' && (book.availableCopies === 0 || book.availableCopies > 3)) return false;
      if (availabilityFilter === 'borrowed' && book.availableCopies > 0) return false;

      // Text query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      if (searchType === 'title') {
        return book.title.toLowerCase().includes(q);
      } else if (searchType === 'author') {
        return book.author.toLowerCase().includes(q);
      } else if (searchType === 'subject') {
        return book.category.toLowerCase().includes(q) || 
               book.subCategory.toLowerCase().includes(q) || 
               book.tags.some(t => t.toLowerCase().includes(q));
      } else {
        // 'all' keyword search
        return book.title.toLowerCase().includes(q) ||
               book.author.toLowerCase().includes(q) ||
               book.category.toLowerCase().includes(q) ||
               book.subCategory.toLowerCase().includes(q) ||
               book.description.toLowerCase().includes(q) ||
               book.isbn.toLowerCase().includes(q) ||
               book.tags.some(t => t.toLowerCase().includes(q));
      }
    });
  }, [catalog, searchQuery, searchType, selectedCategory, selectedSource, availabilityFilter]);

  // Combined Results
  const combinedResults = useMemo(() => {
    if (selectedSource === 'local') return localFilteredResults;
    if (selectedSource === 'openlibrary') return openLibraryResults;
    return [...localFilteredResults, ...openLibraryResults];
  }, [selectedSource, localFilteredResults, openLibraryResults]);

  return (
    <div className="space-y-6">
      {/* Top Search Controls Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-brand-400" />
              Unified Book Search & Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live index of campus library stock + global Open Library bibliography
            </p>
          </div>

          {/* Source Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start">
            <button
              onClick={() => setSelectedSource('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSource === 'all'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Sources ({combinedResults.length})
            </button>
            <button
              onClick={() => setSelectedSource('local')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedSource === 'local'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              Campus Stock ({localFilteredResults.length})
            </button>
            <button
              onClick={() => setSelectedSource('openlibrary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedSource === 'openlibrary'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Open Library ({openLibraryResults.length})
            </button>
          </div>
        </div>

        {/* Search Input Bar + Type Filter */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, subject, or ISBN (e.g. 'Electronics', 'Sedra', 'Python', '978...')"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {isSearchingOL && (
              <RefreshCw className="w-4 h-4 text-brand-400 animate-spin absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3.5 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-400"
            >
              <option value="all">Search: All Fields</option>
              <option value="title">By Title</option>
              <option value="author">By Author</option>
              <option value="subject">By Subject / Topic</option>
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3.5 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-400"
            >
              <option value="all">Availability: Any</option>
              <option value="available">Available (&gt;3 copies)</option>
              <option value="limited">Limited (1-3 copies)</option>
              <option value="borrowed">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="pt-2 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex-shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-brand-400" />
            Subject:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-xl transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-200">
              Showing {combinedResults.length} Books
            </h3>
            {searchQuery && (
              <span className="text-xs text-brand-400 font-mono">
                matching "{searchQuery}"
              </span>
            )}
          </div>

          <div className="text-xs text-slate-400">
            {localFilteredResults.length} in Campus Library • {openLibraryResults.length} Open Library
          </div>
        </div>

        {combinedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combinedResults.map((book) => (
              <BookCard key={book.bookId} book={book} showBorrowAction={true} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 flex flex-col items-center justify-center">
            <BookOpen className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-200">No matching books found</h3>
            <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
              Try adjusting your search terms, clearing filters, or switching to the Open Library tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setAvailabilityFilter('all');
                setSelectedSource('all');
              }}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold transition-all shadow-md"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
