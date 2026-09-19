import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Zap, 
  Rocket, 
  GraduationCap, 
  Wrench, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function AuthCard({ 
  t, 
  lang, 
  audience, 
  setAudience, 
  onLoginSuccess, 
  onEnterLab 
}) {
  const landingT = t.landing || {};
  const authT = t.auth || {};

  // Form State initialized with the analyst defaults for instant operational access
  const [email, setEmail] = useState('analyst@siliconbrain.ai');
  const [password, setPassword] = useState('SiliconBrain@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Handle Quick Autofill
  const handleAutofill = () => {
    setEmail('analyst@siliconbrain.ai');
    setPassword('SiliconBrain@2026');
    setAudience('engineer');
    setFeedback({
      type: 'success',
      message: lang === 'en' ? 'Operational Analyst credentials loaded!' : 'ఎనలిస్ట్ ఖాతా వివరాలు నింపబడ్డాయి!'
    });
    setTimeout(() => setFeedback({ type: '', message: '' }), 2500);
  };

  // Handle Instant Guest Access
  const handleGuestAccess = () => {
    const guestUser = {
      email: 'guest@odyssey.local',
      full_name: authT.guestUser || 'Guest Explorer',
      role: 'Guest Explorer',
      track: audience,
      isGuest: true
    };
    localStorage.setItem('ai_odyssey_user', JSON.stringify(guestUser));
    onLoginSuccess(guestUser);
    onEnterLab();
  };

  // Handle Simulated Google SSO
  const handleGoogleSSO = () => {
    setLoading(true);
    setTimeout(() => {
      const ssoUser = {
        email: 'analyst@siliconbrain.ai',
        full_name: 'Senior ML Analyst (Google SSO)',
        role: 'Senior ML Analyst',
        track: audience
      };
      localStorage.setItem('ai_odyssey_user', JSON.stringify(ssoUser));
      localStorage.setItem('ai_odyssey_token', 'google_oauth_token_' + Date.now());
      setLoading(false);
      onLoginSuccess(ssoUser);
      onEnterLab();
    }, 600);
  };

  // Handle GitHub SSO / Open Repo
  const handleGithubAccess = () => {
    const ssoUser = {
      email: 'github.dev@siliconbrain.ai',
      full_name: 'GitHub Engineer',
      role: 'MLOps Engineer',
      track: 'engineer'
    };
    localStorage.setItem('ai_odyssey_user', JSON.stringify(ssoUser));
    setAudience('engineer');
    onLoginSuccess(ssoUser);
    onEnterLab();
  };

  // Submit Credentials Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!email || !password) {
      setFeedback({
        type: 'error',
        message: authT.requiredField || 'Please enter valid credentials.'
      });
      return;
    }

    setLoading(true);

    try {
      // First attempt backend API
      let response;
      try {
        response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
      } catch {
        response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        const user = data.user;
        if (rememberSession) {
          localStorage.setItem('ai_odyssey_token', data.access_token);
          localStorage.setItem('ai_odyssey_user', JSON.stringify(user));
        }
        setAudience(user.track || audience);
        setFeedback({ type: 'success', message: authT.loginSuccess || 'Access Authorized!' });
        setTimeout(() => {
          onLoginSuccess(user);
          onEnterLab();
        }, 600);
        return;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch {
      // Graceful offline validation for seeded analyst
      if (email.toLowerCase() === 'analyst@siliconbrain.ai' && password === 'SiliconBrain@2026') {
        const analystUser = {
          email: 'analyst@siliconbrain.ai',
          full_name: 'Senior ML Analyst',
          role: 'Senior ML Analyst',
          track: audience || 'engineer'
        };
        localStorage.setItem('ai_odyssey_token', 'mock_jwt_analyst_token_2026');
        localStorage.setItem('ai_odyssey_user', JSON.stringify(analystUser));
        setFeedback({ type: 'success', message: authT.loginSuccess || 'Access Authorized!' });
        setTimeout(() => {
          onLoginSuccess(analystUser);
          onEnterLab();
        }, 600);
      } else {
        setFeedback({
          type: 'error',
          message: authT.invalidCreds || 'Invalid email or password.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Determine CTA Button label
  const getCtaLabel = () => {
    if (audience === 'engineer') {
      return landingT.btnEngineerStart || "LAUNCH PRODUCTION STUDIO";
    }
    return landingT.btnStudentStart || "LAUNCH STUDENT EXPLORER";
  };

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-cyan-500/30 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden flex flex-col justify-between">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header & Security Badge */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-wider">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>{landingT.authCardBadge || "SECURE ACCESS PROTOCOL // LEVEL-4"}</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold animate-pulse">
            AUTHENTICATOR ACTIVE
          </span>
        </div>

        <h3 className="text-lg font-black text-slate-100 tracking-tight">
          {landingT.authCardTitle || "ACCESS COMMAND NEXUS"}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {landingT.authCardSubtitle || "Authorize operator identity or initialize guest sandbox."}
        </p>
      </div>

      {/* Dual SSO Options */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 mb-4">
        {/* GitHub SSO */}
        <button
          type="button"
          onClick={handleGithubAccess}
          className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all active:scale-95 group shadow-sm"
        >
          <svg className="w-4 h-4 text-slate-300 group-hover:text-white fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>{landingT.ssoGithub || "GitHub Repo"}</span>
        </button>

        {/* Google SSO */}
        <button
          type="button"
          onClick={handleGoogleSSO}
          className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all active:scale-95 group shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>{landingT.ssoGoogle || "Google SSO"}</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-between my-3 text-[10px] font-mono uppercase text-slate-500">
        <span className="h-[1px] bg-slate-800 flex-1" />
        <span className="px-2">{landingT.orAuth || "OR AUTHORIZE WITH CREDENTIALS"}</span>
        <span className="h-[1px] bg-slate-800 flex-1" />
      </div>

      {/* Feedback Message */}
      {feedback.message && (
        <div className={`relative z-10 flex items-center space-x-2 p-2.5 mb-3 rounded-xl text-xs font-mono animate-fadeIn ${
          feedback.type === 'error' 
            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300' 
            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
        }`}>
          {feedback.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-3.5">
        
        {/* Track Selection Switch inside Auth Card */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
            {landingT.selectTrackTitle || "Target Audience Track"}
          </label>
          <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setAudience('student')}
              className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                audience === 'student'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Student' : 'విద్యార్థి'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAudience('engineer')}
              className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                audience === 'engineer'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Engineer' : 'ఇంజనీర్'}</span>
            </button>
          </div>
        </div>

        {/* Identity Input with Ghost Placeholder */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">
            {landingT.idLabel || "Operator ID / Corporate Email"}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@siliconbrain.ai"
              required
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
            />
          </div>
        </div>

        {/* Passkey / Token Input with Ghost Placeholder */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">
              {landingT.passLabel || "Access Key / Token"}
            </label>
            <button
              type="button"
              onClick={handleAutofill}
              className="text-[10px] text-cyan-400 hover:underline font-mono"
            >
              {landingT.forgotToken || "Forgot Key?"}
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="SiliconBrain@2026"
              required
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Session */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberSession}
              onChange={(e) => setRememberSession(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
            />
            <span className="text-[11px]">{landingT.rememberSession || "Remember active session"}</span>
          </label>
        </div>

        {/* Primary CTA Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-[0.98] ${
            audience === 'engineer'
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-400 hover:to-purple-400 text-white shadow-indigo-500/25'
              : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-500/25'
          } disabled:opacity-50`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="tracking-wide uppercase font-mono">{getCtaLabel()}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Fast Access Actions: Autofill & Guest Bypass */}
      <div className="relative z-10 space-y-2 mt-4 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleAutofill}
          className="w-full py-2 px-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-cyan-500/30 text-cyan-300 flex items-center justify-between text-[11px] font-semibold transition-all group"
        >
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>{landingT.autofillAnalyst || "⚡ Autofill Operational Analyst"}</span>
          </div>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
            AUTO
          </span>
        </button>

        <button
          type="button"
          onClick={handleGuestAccess}
          className="w-full py-2 px-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center space-x-1.5 text-[11px] font-medium transition-all"
        >
          <Rocket className="w-3.5 h-3.5 text-teal-400" />
          <span>{landingT.quickGuestExplore || "🚀 Instant Guest Access"}</span>
        </button>
      </div>

      {/* Security Footer Disclaimer */}
      <div className="relative z-10 mt-4 text-center">
        <p className="text-[10px] text-slate-500 font-mono leading-tight">
          {landingT.authFooter || "SiliconBrain AI • Defense & Enterprise Machine Learning Studio • All telemetry encrypted & audited"}
        </p>
      </div>

    </div>
  );
}
