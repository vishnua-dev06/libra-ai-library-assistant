import React, { useState, useRef, useEffect } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { PRESET_PROMPTS } from '../../data/mockLibrary';
import { BookCard } from '../common/BookCard';
import { 
  Send, Sparkles, Bot, User, Trash2, ArrowRight, 
  Lightbulb, BookOpen, Layers, CheckCircle2, RefreshCw 
} from 'lucide-react';

export function ChatAssistantView() {
  const { 
    chatMessages, 
    isAiLoading, 
    sendChatMessage, 
    clearChatHistory, 
    apiKey 
  } = useLibrary();

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || isAiLoading) return;
    sendChatMessage(inputQuery);
    setInputQuery('');
  };

  const handlePromptClick = (promptText) => {
    if (isAiLoading) return;
    sendChatMessage(promptText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[850px] min-h-[580px] glass-panel rounded-3xl overflow-hidden border border-slate-800 relative">
      {/* Assistant Header */}
      <div className="p-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">LibraAI Research Assistant</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live AI Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Natural-language book discovery, shelf availability & syllabus matching
            </p>
          </div>
        </div>

        <button
          onClick={clearChatHistory}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700 text-xs flex items-center gap-1.5"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Preset Prompts Pill Bar */}
      <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto flex items-center gap-2">
        <div className="flex items-center gap-1 text-[11px] text-brand-400 font-semibold uppercase tracking-wider flex-shrink-0 mr-1">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Try asking:</span>
        </div>
        {PRESET_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(preset.prompt)}
            disabled={isAiLoading}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-brand-500/40 transition-all flex items-center gap-1.5 group"
          >
            <span className="text-brand-400 group-hover:scale-110 transition-transform">✦</span>
            <span>{preset.title}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center flex-shrink-0 text-brand-400 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[88%] sm:max-w-[80%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
              {/* Message Header */}
              <div className={`flex items-center gap-2 mb-1 text-[11px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="font-semibold text-slate-300">
                  {msg.sender === 'user' ? 'You (Student)' : 'LibraAI Assistant'}
                </span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.source && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {msg.source}
                  </span>
                )}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-tr-sm shadow-md shadow-brand-500/10 font-medium'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm shadow-lg'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">
                  {msg.text}
                </div>
              </div>

              {/* Embedded Recommendation Cards Grid */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-brand-400">
                      <Sparkles className="w-4 h-4" />
                      Recommended Campus Books ({msg.recommendations.length})
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Ranked by curriculum relevance & live availability
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {msg.recommendations.map((rec, rIdx) => (
                      <BookCard
                        key={rIdx}
                        book={rec.book}
                        highlightReason={rec.reason}
                        showBorrowAction={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300 mt-1 order-2">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Bubble */}
        {isAiLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start items-start">
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center flex-shrink-0 text-brand-400">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-sm text-xs text-slate-300 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-brand-400 animate-spin" />
              <span>Analyzing query, checking inventory stock & generating recommendation rationale...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="E.g., 'I am an ECE student and want to learn embedded systems' or 'Python for beginner'..."
              disabled={isAiLoading}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all pr-10"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isAiLoading}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 flex-shrink-0 ${
              inputQuery.trim() && !isAiLoading
                ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
