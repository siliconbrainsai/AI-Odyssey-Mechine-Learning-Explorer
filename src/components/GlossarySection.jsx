import React, { useState } from 'react';
import { Layers, Search, BookOpen, Wrench, Sparkles } from 'lucide-react';

export default function GlossarySection({ t, audience }) {
  const [searchTerm, setSearchTerm] = useState('');
  const g = t.glossary;

  const filteredTerms = g.terms.filter((item) => {
    const termLower = item.term.toLowerCase();
    const catLower = item.category.toLowerCase();
    const search = searchTerm.toLowerCase();
    return termLower.includes(search) || catLower.includes(search);
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-teal-950/50 border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-400">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              Module 05
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {g.header}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {g.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center space-x-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={g.searchPlaceholder}
          className="w-full bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Terms Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                  {item.category}
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400/60" />
              </div>

              <h3 className="text-lg font-bold text-white mb-4">
                {item.term}
              </h3>

              {/* Student View Card */}
              <div className="mb-3.5 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{g.studentView}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.student}
                </p>
              </div>

              {/* Engineer View Card */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{g.engineerView}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono text-[11px]">
                  {item.engineer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-xs">
          No concepts found matching "{searchTerm}". Try searching for another term!
        </div>
      )}

    </div>
  );
}
