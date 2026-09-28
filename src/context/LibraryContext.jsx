import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_LIBRARY_CATALOG, getAvailabilityStatus } from '../data/mockLibrary';
import { getAiRecommendations } from '../services/aiService';

const LibraryContext = createContext(null);

const STORAGE_KEYS = {
  CATALOG: 'libra_ai_catalog_v1',
  CHAT: 'libra_ai_chat_history_v1',
  API_KEY: 'libra_ai_api_key_v1',
  QUERIES_COUNT: 'libra_ai_queries_count_v1'
};

export function LibraryProvider({ children }) {
  // 1. Inventory Catalog State with LocalStorage persistence
  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATALOG);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load catalog from storage:", e);
    }
    return INITIAL_LIBRARY_CATALOG;
  });

  // 2. Active Tab State
  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant' | 'search' | 'inventory' | 'studio' | 'settings'

  // 3. Book Details Modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // 4. API Key Configuration
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.API_KEY) || "";
    } catch (e) {
      return "";
    }
  });

  // 5. Query Counter
  const [aiQueriesCount, setAiQueriesCount] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEYS.QUERIES_COUNT) || 12);
    } catch (e) {
      return 12;
    }
  });

  // 6. Chat Messages History with initial welcome message
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `👋 Hello! I'm **LibraAI**, your intelligent university library assistant.\n\nI can help you:\n- 🎯 Discover books tailored to your coursework & branch (e.g. *ECE, CS, AI/ML, Math*)\n- 📍 Check real-time shelf locations and availability\n- 💡 Explain *why* a book fits your current learning goals\n\nHow can I help you today? Try typing a query or click one of the quick suggestions below!`,
        recommendations: [],
        source: "LibraAI System"
      }
    ];
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalog));
    } catch (e) {}
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chatMessages));
    } catch (e) {}
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    } catch (e) {}
  }, [apiKey]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUERIES_COUNT, aiQueriesCount.toString());
    } catch (e) {}
  }, [aiQueriesCount]);

  // Toast Notification Trigger
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 7. Computed Metrics for Dashboard Cards
  const stats = useMemo(() => {
    const totalTitles = catalog.length;
    let totalCopiesSum = 0;
    let availableCopiesSum = 0;
    let availableTitlesCount = 0;
    let borrowedTitlesCount = 0;
    let limitedTitlesCount = 0;

    catalog.forEach(book => {
      totalCopiesSum += (book.totalCopies || 0);
      availableCopiesSum += (book.availableCopies || 0);
      const status = getAvailabilityStatus(book.availableCopies);
      if (status === 'AVAILABLE') availableTitlesCount++;
      else if (status === 'LIMITED') limitedTitlesCount++;
      else borrowedTitlesCount++;
    });

    const borrowedCopiesSum = totalCopiesSum - availableCopiesSum;

    return {
      totalTitles,
      totalCopiesSum,
      availableCopiesSum,
      borrowedCopiesSum,
      availableTitlesCount,
      limitedTitlesCount,
      borrowedTitlesCount,
      aiQueriesCount
    };
  }, [catalog, aiQueriesCount]);

  // 8. Borrow Book Action
  const borrowBook = (bookId) => {
    let bookTitle = "";
    let canBorrow = false;

    setCatalog(prev => prev.map(b => {
      if (b.bookId === bookId) {
        bookTitle = b.title;
        if (b.availableCopies > 0) {
          canBorrow = true;
          return {
            ...b,
            availableCopies: b.availableCopies - 1
          };
        }
      }
      return b;
    }));

    if (canBorrow) {
      showToast(`Borrowed 1 copy of "${bookTitle.substring(0, 30)}..."`, 'success');
      // If modal is open for this book, update selectedBook
      if (selectedBook && selectedBook.bookId === bookId) {
        setSelectedBook(prev => ({
          ...prev,
          availableCopies: Math.max(0, prev.availableCopies - 1)
        }));
      }
    } else {
      showToast(`Sorry, all copies of "${bookTitle.substring(0, 30)}..." are currently checked out!`, 'error');
    }
  };

  // 9. Return Book Action
  const returnBook = (bookId) => {
    let bookTitle = "";
    let canReturn = false;

    setCatalog(prev => prev.map(b => {
      if (b.bookId === bookId) {
        bookTitle = b.title;
        if (b.availableCopies < b.totalCopies) {
          canReturn = true;
          return {
            ...b,
            availableCopies: b.availableCopies + 1
          };
        }
      }
      return b;
    }));

    if (canReturn) {
      showToast(`Returned 1 copy of "${bookTitle.substring(0, 30)}..."`, 'success');
      if (selectedBook && selectedBook.bookId === bookId) {
        setSelectedBook(prev => ({
          ...prev,
          availableCopies: Math.min(prev.totalCopies, prev.availableCopies + 1)
        }));
      }
    } else {
      showToast(`All copies for this title are already in library inventory.`, 'info');
    }
  };

  // 10. Reset Demo Data
  const resetInventory = () => {
    setCatalog(INITIAL_LIBRARY_CATALOG);
    showToast("Reset campus inventory to default hackathon dataset.", "info");
  };

  // 11. Send Chat Message to AI Assistant
  const sendChatMessage = async (userText) => {
    if (!userText || !userText.trim()) return;
    const cleanText = userText.trim();

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: cleanText
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiLoading(true);
    setAiQueriesCount(prev => prev + 1);

    try {
      const response = await getAiRecommendations({
        query: cleanText,
        catalog,
        apiKey
      });

      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.summary,
        recommendations: response.recommendations || [],
        source: response.source,
        detectedDiscipline: response.detectedDiscipline,
        targetDifficulty: response.targetDifficulty
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      // Fallback message
      const fallbackMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "I experienced a temporary communication hiccup, but here are the closest matches from our library catalog:",
        recommendations: [],
        source: "Fallback"
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const clearChatHistory = () => {
    setChatMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Chat cleared. Ask me anything about finding books, study materials, or checking shelf availability!`,
        recommendations: [],
        source: "LibraAI System"
      }
    ]);
    showToast("Chat history cleared.", "info");
  };

  // 12. Open Book Modal
  const openBookModal = (book) => {
    // If book is from catalog, look up latest copies count
    const latest = catalog.find(b => b.bookId === book.bookId) || book;
    setSelectedBook(latest);
    setIsDetailsOpen(true);
  };

  const closeBookModal = () => {
    setIsDetailsOpen(false);
    setSelectedBook(null);
  };

  const value = {
    catalog,
    stats,
    activeTab,
    setActiveTab,
    selectedBook,
    isDetailsOpen,
    openBookModal,
    closeBookModal,
    chatMessages,
    isAiLoading,
    sendChatMessage,
    clearChatHistory,
    borrowBook,
    returnBook,
    resetInventory,
    apiKey,
    setApiKey,
    toastMessage,
    showToast
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
