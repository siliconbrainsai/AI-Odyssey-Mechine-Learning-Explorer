import React from 'react';
import { Globe, Shield, Activity, Cpu, LogOut, ArrowRight, User } from 'lucide-react';

export default function Header({ 
  lang, 
  setLang, 
  t, 
  onEnterLab, 
  currentUser, 
  onLogout,
  currentView,
  onSwitchView
}) {
  const landingT = t.landing || {};
  const authT = t.auth || {};

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Top-Left: Brand & Defense Portal Tagline */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group cursor-pointer" onClick={() => onSwitchView && onSwitchView('landing')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-200 bg-clip-text text-transparent uppercase">
                  {landingT.brand || "SILICONBRAIN AI"}
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 tracking-wider">
                  NEXUS // V2
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase">
                {landingT.tagline || "DEFENSE & GEOSPATIAL LABS • SECURE PORTAL"}
              </p>
            </div>
          </div>

          {/* Top-Right: Engine Status + Language Toggle + Lab Navigation / User */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Real-Time Engine Status Pill */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">{landingT.engineStatus || "ML EXPLORER ENGINE STATUS: V.2.0"}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300 uppercase">
                {landingT.statusOnline || "ONLINE"}
              </span>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:border-cyan-500/50 shadow-sm active:scale-95 group"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-cyan-300">{t.toggleLang}</span>
            </button>

            {/* Authenticated User pill OR Enter Interactive Lab CTA */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-xl p-1 pl-2.5">
                <div className="flex items-center space-x-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentUser.track === 'engineer' 
                      ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300' 
                      : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  }`}>
                    {currentUser.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-200 leading-none truncate max-w-[110px]">
                      {currentUser.full_name || currentUser.email}
                    </p>
                    <span className="text-[10px] text-cyan-400 font-medium">
                      {currentUser.role || (currentUser.track === 'engineer' ? authT.roleEngineer : authT.roleStudent)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  title={authT.logout || 'Sign Out'}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onEnterLab}
                className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>{landingT.enterLabDirectly || "Open Full Interactive Lab"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
