import React from 'react';
import Header from './Header';
import StatusMonitor from './StatusMonitor';
import QuickAccessChips from './QuickAccessChips';
import AuthCard from './AuthCard';
import { 
  BookOpen, 
  Cpu, 
  Terminal, 
  CheckCircle, 
  Layers, 
  GraduationCap, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  Shield 
} from 'lucide-react';

export default function LandingPage({
  lang,
  setLang,
  audience,
  setAudience,
  t,
  onEnterLab,
  onSelectModule,
  currentUser,
  onLogout,
  onLoginSuccess
}) {
  const landingT = t.landing || {};
  const audienceT = t.audienceToggle || {};

  const modules = [
    {
      id: 'foundations',
      num: '01',
      title: landingT.moduleFoundations || "1. Foundations",
      desc: landingT.moduleFoundationsDesc || "Rule-Based vs ML • 3 Pillars • Data Splitting",
      icon: <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />,
      tag: "Foundations",
      borderColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10"
    },
    {
      id: 'algorithms',
      num: '02',
      title: landingT.moduleAlgorithms || "2. Algorithm Lab",
      desc: landingT.moduleAlgorithmsDesc || "Linear & Logistic Regression • K-Means • Random Forest",
      icon: <Cpu className="w-4 h-4 text-teal-400 shrink-0" />,
      tag: "Algorithms",
      borderColor: "hover:border-teal-500/50 hover:shadow-teal-500/10"
    },
    {
      id: 'engineering',
      num: '03',
      title: landingT.moduleEngineering || "3. Python & FastAPI",
      desc: landingT.moduleEngineeringDesc || "MLflow Tracking • Containerization • Live Inference",
      icon: <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />,
      tag: "Production",
      borderColor: "hover:border-indigo-500/50 hover:shadow-indigo-500/10"
    },
    {
      id: 'quiz',
      num: '04',
      title: landingT.moduleQuiz || "4. Knowledge Quiz",
      desc: landingT.moduleQuizDesc || "Bilingual interactive assessment with instant explanations",
      icon: <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />,
      tag: "Self-Test",
      borderColor: "hover:border-amber-500/50 hover:shadow-amber-500/10"
    },
    {
      id: 'glossary',
      num: '05',
      title: landingT.moduleGlossary || "5. ML Glossary",
      desc: landingT.moduleGlossaryDesc || "Student analogies vs engineering mathematical definitions",
      icon: <Layers className="w-4 h-4 text-purple-400 shrink-0" />,
      tag: "Dictionary",
      borderColor: "hover:border-purple-500/50 hover:shadow-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Deep Space Star & Constellation Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep space cosmic radial gradients */}
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-2/3 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[120px]" />

        {/* Subtle Constellation Grid Lines */}
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="space-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(56, 189, 248, 0.4)" />
              <circle cx="80" cy="80" r="1" fill="rgba(99, 102, 241, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#space-grid)" />
        </svg>
      </div>

      {/* Global Command Header */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        onEnterLab={onEnterLab}
        currentUser={currentUser}
        onLogout={onLogout}
        currentView="landing"
        onSwitchView={() => {}}
      />

      {/* Master 3-Column Command Center Workspace */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SECTION (Col 1-4): Title, Tracks & 5 Core Modules Navigation */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Hero Branding & Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>SILICONBRAINSAI // DEFENSE & ACADEMIC LABS</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black leading-[1.15] tracking-tight bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.25)]">
                {landingT.heroTitle || "AI ODYSSEY: MACHINE LEARNING EXPLORER"}
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-cyan-400/90 font-mono leading-snug">
                {landingT.heroSubtitle || "AI-Powered Interactive Learning & Production Studio by Siliconbrainsai."}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {landingT.heroDesc || "Master machine learning concepts through intuitive visual examples and professional engineering workflows."}
              </p>
            </div>

            {/* Audience Track Switcher Prominent Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                  {landingT.selectTrackTitle || "Target Audience Track"}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {audience === 'student' ? 'Interactive Analogies' : 'FastAPI + Math Rigor'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAudience('student')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    audience === 'student'
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Student Mode' : 'విద్యార్థి మోడ్'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience('engineer')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    audience === 'engineer'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Engineer Mode' : 'ఇంజనీర్ మోడ్'}</span>
                </button>
              </div>
            </div>

            {/* 5 Core Exploration Module Buttons */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                  {landingT.modulesHeading || "CORE EXPLORATION MODULES"}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  5 Modules Ready
                </span>
              </div>

              {modules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 text-left transition-all duration-200 flex items-center justify-between group shadow-sm active:scale-[0.99] ${mod.borderColor}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                      {mod.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {mod.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 leading-tight">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 pl-2 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-800/80">
                      {mod.tag}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CENTER SECTION (Col 5-8): Live ML Model Training Monitor & Quick Chips */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Model Training Monitor */}
            <StatusMonitor t={t} lang={lang} audience={audience} />

            {/* Quick Access Topics Chips */}
            <QuickAccessChips t={t} onSelectModule={onSelectModule} />

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SECTION (Col 9-12): Access Command Nexus Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3">
            <AuthCard
              t={t}
              lang={lang}
              audience={audience}
              setAudience={setAudience}
              onLoginSuccess={onLoginSuccess}
              onEnterLab={onEnterLab}
            />
          </div>

        </div>
      </main>

      {/* Global Defense Portal Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 mt-10 text-xs text-slate-400 relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">
              Siliconbrainsai • AI Odyssey Command Nexus
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-500">
              Production ML Studio & Interactive Bilingual Lab
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[11px]">
              V.2.0 • Online
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-teal-400 font-mono text-[11px]">
              FastAPI + MLflow + Scikit-Learn
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
