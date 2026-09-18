import React from 'react';
import { Globe, GraduationCap, Wrench, Sparkles } from 'lucide-react';

export default function Navbar({ lang, setLang, audience, setAudience, t }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Controls: Persona Switcher + Bilingual Toggle */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Audience Track Switcher (Student / Engineer) */}
            <div className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => setAudience('student')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  audience === 'student'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={t.audienceToggle.studentDesc}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Student' : 'విద్యార్థి'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAudience('engineer')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  audience === 'engineer'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={t.audienceToggle.engineerDesc}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Engineer' : 'ఇంజనీర్'}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:border-cyan-500/50 shadow-sm active:scale-95 group"
            >
              <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-cyan-300">{t.toggleLang}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
