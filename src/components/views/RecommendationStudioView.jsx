import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { getAiRecommendations } from '../../services/aiService';
import { BookCard } from '../common/BookCard';
import { 
  Sparkles, GraduationCap, Compass, BrainCircuit, 
  Send, RefreshCw, Layers, CheckCircle2, Bookmark, Flame 
} from 'lucide-react';

export function RecommendationStudioView() {
  const { catalog, apiKey } = useLibrary();

  const [studentBranch, setStudentBranch] = useState('Electronics & Communication (ECE)');
  const [learningGoal, setLearningGoal] = useState('Embedded Systems & Microcontroller Interfacing');
  const [experienceLevel, setExperienceLevel] = useState('Beginner to Intermediate');
  const [customPrompt, setCustomPrompt] = useState('I am an ECE student and want to learn embedded systems and microcontroller interfacing with practical projects.');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Quick Preset Profiles
  const sampleProfiles = [
    {
      label: "ECE – Embedded Systems",
      branch: "Electronics & Communication (ECE)",
      goal: "Embedded Systems & Microcontroller Interfacing",
      level: "Beginner to Intermediate",
      prompt: "I am an ECE student and want to learn embedded systems, microcontrollers, and register level coding."
    },
    {
      label: "CSE – Python Foundations",
      branch: "Computer Science (CSE)",
      goal: "Python Programming & Project Building",
      level: "Beginner",
      prompt: "I want to learn Python for complete beginners from scratch with real project examples."
    },
    {
      label: "AI/DS – Machine Learning & Math",
      branch: "Artificial Intelligence & Data Science",
      goal: "Practical ML with Linear Algebra Foundations",
      level: "Intermediate",
      prompt: "I need recommended books for practical machine learning along with linear algebra foundations."
    },
    {
      label: "ECE – Hardware Circuits",
      branch: "Electronics & Communication (ECE)",
      goal: "Analog Circuit Design & Microelectronics",
      level: "Intermediate",
      prompt: "Suggest the best hardware circuit design and analog electronics textbooks for engineering."
    }
  ];

  const handleApplyPreset = (profile) => {
    setStudentBranch(profile.branch);
    setLearningGoal(profile.goal);
    setExperienceLevel(profile.level);
    setCustomPrompt(profile.prompt);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getAiRecommendations({
        query: `${customPrompt} (Student profile: ${studentBranch}, Goal: ${learningGoal}, Level: ${experienceLevel})`,
        catalog,
        apiKey
      });
      setResult(response);
    } catch (err) {
      console.error("Studio Rec error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                AI Recommendation Studio
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Coursework Matcher
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Configure student profile parameters or type custom natural language inquiries for syllabus-ranked reading plans.
            </p>
          </div>
        </div>

        {/* Quick Profile Chips */}
        <div className="pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Preset Academic Personas:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleProfiles.map((p, i) => (
              <button
                key={i}
                onClick={() => handleApplyPreset(p)}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Builder & Query Box */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Degree / Branch */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Student Department / Branch
              </label>
              <select
                value={studentBranch}
                onChange={(e) => setStudentBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-purple-400"
              >
                <option value="Electronics & Communication (ECE)">Electronics & Comm (ECE)</option>
                <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                <option value="Mathematics & Computing">Mathematics & Computing</option>
                <option value="General Engineering">General Engineering</option>
              </select>
            </div>

            {/* Target Learning Goal */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Primary Learning Goal
              </label>
              <input
                type="text"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                placeholder="E.g. Embedded Systems, Deep Learning, Linear Algebra..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Level of Rigor */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Desired Rigor Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none focus:border-purple-400"
              >
                <option value="Beginner (Foundations / Freshmen)">Beginner (Foundations / Freshmen)</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Intermediate (Hands-on & Projects)">Intermediate (Hands-on & Projects)</option>
                <option value="Advanced (Math Rigor / Research)">Advanced (Math Rigor / Research)</option>
              </select>
            </div>
          </div>

          {/* Natural Language Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              Natural Language Inquiry
            </label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe your learning goals in your own words..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !customPrompt.trim()}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                !isLoading && customPrompt.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-brand-500 hover:from-purple-500 hover:to-brand-400 text-white shadow-lg shadow-purple-500/25 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Recommendations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Syllabus-Ranked Reading Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Matrix */}
      {result && (
        <div className="space-y-4 animate-fadeIn">
          {/* Executive Summary Card */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-purple-500/30 text-slate-200">
            <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Pedagogical Analysis</span>
              <span className="text-[10px] ml-auto px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Source: {result.source}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">
              {result.summary}
            </p>
          </div>

          {/* Recommended Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((rec, idx) => (
              <BookCard
                key={idx}
                book={rec.book}
                highlightReason={rec.reason}
                showBorrowAction={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
