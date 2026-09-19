import React from 'react';
import { ShieldAlert, Lock, ArrowRight, Home, Zap, Globe, CheckCircle } from 'lucide-react';

export default function AccessRestrictedCard({
  t,
  lang,
  setLang,
  onAutofillAnalyst,
  onGoHome,
  attemptedEmail
}) {
  const securityT = t.security || {};

  return (
    <div className="relative max-w-2xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-rose-500/40 backdrop-blur-2xl shadow-2xl shadow-rose-950/40 overflow-hidden text-center animate-fadeIn">
      
      {/* Background ambient security lighting */}
      <div className="absolute -top-24 -left-24 w-56 h-56 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 tracking-widest uppercase">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>{securityT.restrictedBadge || "ACCESS CONTROL // LEVEL-4 CLASSIFIED"}</span>
        </span>

        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
        </button>
      </div>

      {/* Pulsing Lock / Shield Icon */}
      <div className="relative z-10 mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-rose-500/10 border border-rose-500/40 flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20">
        <Lock className="w-10 h-10 text-rose-400 animate-bounce" style={{ animationDuration: '2s' }} />
      </div>

      {/* Main Warning Title */}
      <h2 className="relative z-10 text-xl sm:text-2xl font-black text-slate-100 tracking-tight mb-3">
        {securityT.restrictedTitle || "Access Restricted: Corporate Operator ID Required"}
      </h2>

      {/* Description */}
      <p className="relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-6">
        {securityT.restrictedDesc || "The AI Odyssey Machine Learning Laboratory and internal execution modules are restricted to authorized Siliconbrainsai personnel. Only verified corporate accounts ending in @siliconbrain.ai are granted operational clearance."}
      </p>

      {/* Attempted Identity Alert (if provided) */}
      {attemptedEmail && (
        <div className="relative z-10 mb-6 p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center justify-center space-x-2">
          <span>Attempted Account:</span>
          <span className="font-bold underline text-slate-200">{attemptedEmail}</span>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] uppercase font-bold">
            {securityT.statusBlocked || "BLOCKED // 403 FORBIDDEN"}
          </span>
        </div>
      )}

      {/* Policy Directive Card */}
      <div className="relative z-10 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left mb-6 space-y-2">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400 font-bold uppercase">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{securityT.authorizedDomainOnly || "Corporate Domain Whitelist Enforced: *@siliconbrain.ai"}</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          {securityT.policyNote || "Security Directive: Public registrations, external domains (@gmail, @yahoo, etc.), and unverified direct links are strictly blocked under corporate compliance standards."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onAutofillAnalyst}
          className="w-full sm:w-auto py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
        >
          <Zap className="w-4 h-4 text-slate-950" />
          <span>{securityT.btnAutofillAuthorized || "Authenticate as Authorized Analyst (analyst@siliconbrain.ai)"}</span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-all active:scale-95"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>{securityT.btnReturnToNexus || "Return to Command Nexus"}</span>
        </button>
      </div>

    </div>
  );
}
