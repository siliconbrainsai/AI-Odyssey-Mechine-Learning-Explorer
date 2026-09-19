import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Globe, 
  Zap, 
  Rocket, 
  ShieldCheck 
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  lang, 
  setLang, 
  audience, 
  setAudience, 
  t 
}) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [selectedTrack, setSelectedTrack] = useState(audience || 'student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const authT = t.auth || {};

  // Password strength calculator
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0 to 4
  };

  const strengthScore = calculateStrength(password);

  const getStrengthText = () => {
    if (!password) return '';
    if (strengthScore <= 1) return authT.strengthWeak || 'Weak password';
    if (strengthScore <= 3) return authT.strengthMedium || 'Good password';
    return authT.strengthStrong || 'Strong & secure password';
  };

  const getStrengthColor = () => {
    if (strengthScore <= 1) return 'bg-rose-500';
    if (strengthScore <= 3) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

  // Quick fill default operational analyst credentials
  const handleQuickFillAnalyst = () => {
    setAuthMode('signin');
    setEmail('analyst@siliconbrain.ai');
    setPassword('SiliconBrain@2026');
    setSelectedTrack('engineer');
    setErrorMessage('');
    setSuccessMessage(lang === 'en' ? 'Operational credentials loaded!' : 'ఎనలిస్ట్ ఆధారాలు నింపబడ్డాయి!');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  // Quick guest bypass
  const handleGuestExplore = () => {
    const guestUser = {
      email: 'guest@odyssey.local',
      full_name: authT.guestUser || 'Guest Explorer',
      role: 'Guest Explorer',
      track: selectedTrack,
      isGuest: true
    };
    localStorage.setItem('ai_odyssey_user', JSON.stringify(guestUser));
    setAudience(selectedTrack);
    onLoginSuccess(guestUser);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage(authT.requiredField || 'Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup') {
      if (!fullName) {
        setErrorMessage(authT.requiredField || 'Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage(authT.passwordMismatch || 'Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage(lang === 'en' ? 'Password must be at least 6 characters.' : 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.');
        return;
      }
    }

    setLoading(true);

    const endpoint = authMode === 'signup' ? '/api/v1/auth/register' : '/api/v1/auth/login';
    const payload = authMode === 'signup' 
      ? { email, password, full_name: fullName, track: selectedTrack }
      : { email, password };

    try {
      // First attempt local API or proxied API
      let response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (networkErr) {
        // Fallback to direct backend port 8000 if proxy failed
        response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response && response.ok) {
        const data = await response.json();
        const user = data.user;
        if (rememberMe) {
          localStorage.setItem('ai_odyssey_token', data.access_token);
          localStorage.setItem('ai_odyssey_user', JSON.stringify(user));
        }
        setAudience(user.track || selectedTrack);
        setSuccessMessage(authMode === 'signup' ? authT.registerSuccess : authT.loginSuccess);
        setTimeout(() => {
          onLoginSuccess(user);
          onClose();
        }, 800);
        return;
      } else {
        const errData = response ? await response.json().catch(() => ({})) : {};
        throw new Error(errData.detail || authT.invalidCreds || 'Authentication failed');
      }
    } catch (err) {
      // Graceful local development fallback if backend is unreachable
      if (email.toLowerCase() === 'analyst@siliconbrain.ai' && password === 'SiliconBrain@2026') {
        const analystUser = {
          email: 'analyst@siliconbrain.ai',
          full_name: 'Senior ML Analyst',
          role: 'Senior ML Analyst',
          track: 'engineer'
        };
        localStorage.setItem('ai_odyssey_token', 'mock_jwt_analyst_token_2026');
        localStorage.setItem('ai_odyssey_user', JSON.stringify(analystUser));
        setAudience('engineer');
        setSuccessMessage(authT.loginSuccess || 'Signed in successfully!');
        setTimeout(() => {
          onLoginSuccess(analystUser);
          onClose();
        }, 800);
        return;
      }

      if (authMode === 'signup') {
        // Mock register for seamless offline experience
        const newUser = {
          email,
          full_name: fullName,
          role: selectedTrack === 'engineer' ? 'MLOps Engineer' : 'Student Explorer',
          track: selectedTrack
        };
        localStorage.setItem('ai_odyssey_token', 'mock_jwt_' + Date.now());
        localStorage.setItem('ai_odyssey_user', JSON.stringify(newUser));
        setAudience(selectedTrack);
        setSuccessMessage(authT.registerSuccess || 'Account registered successfully!');
        setTimeout(() => {
          onLoginSuccess(newUser);
          onClose();
        }, 800);
        return;
      }

      setErrorMessage(err.message || authT.invalidCreds || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close container */}
      <div className="relative w-full max-w-lg bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden backdrop-blur-2xl">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
                {authMode === 'signin' ? authT.modalTitleSignIn : authT.modalTitleSignUp}
              </h2>
              <p className="text-xs text-slate-400">
                Siliconbrainsai • Deep Space Portal
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bilingual Quick Toggle inside Modal Header */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 transition-all"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="relative px-6 py-5 max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Sign In vs Sign Up Tabs Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 border border-slate-800 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                authMode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {authT.tabSignIn || 'Sign In'}
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {authT.tabSignUp || 'Sign Up'}
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="flex items-center space-x-2.5 p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center space-x-2.5 p-3.5 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Track Selection Radios */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {authT.trackLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Student Track Option */}
              <div
                onClick={() => setSelectedTrack('student')}
                className={`cursor-pointer p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  selectedTrack === 'student'
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className={`w-4 h-4 ${selectedTrack === 'student' ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-200">
                      {authT.trackStudentTitle}
                    </span>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedTrack === 'student' ? 'border-cyan-400 bg-cyan-500' : 'border-slate-600'
                  }`}>
                    {selectedTrack === 'student' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {authT.trackStudentSubtitle}
                </p>
              </div>

              {/* Engineer Track Option */}
              <div
                onClick={() => setSelectedTrack('engineer')}
                className={`cursor-pointer p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  selectedTrack === 'engineer'
                    ? 'bg-indigo-500/10 border-indigo-500/50 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <Wrench className={`w-4 h-4 ${selectedTrack === 'engineer' ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-200">
                      {authT.trackEngineerTitle}
                    </span>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedTrack === 'engineer' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                  }`}>
                    {selectedTrack === 'engineer' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {authT.trackEngineerSubtitle}
                </p>
              </div>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up Only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {authT.fullNameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={authT.fullNamePlaceholder}
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {authT.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={authT.emailPlaceholder}
                  required
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {authT.passwordLabel}
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert(lang === 'en' ? 'To reset password, contact admin@siliconbrain.ai or use test credentials.' : 'పాస్‌వర్డ్ రీసెట్ చేయడానికి admin@siliconbrain.ai ని సంప్రదించండి లేదా టెస్ట్ క్రెడెన్షియల్స్ ఉపయోగించండి.')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    {authT.forgotPassword}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={authT.passwordPlaceholder}
                  required
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator (Sign Up Mode) */}
              {authMode === 'signup' && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{getStrengthText()}</span>
                    <span className="font-mono">{strengthScore * 25}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          strengthScore >= step ? getStrengthColor() : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {authT.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={authT.confirmPasswordPlaceholder}
                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 h-3.5 w-3.5"
                />
                <span>{authT.rememberMe}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg ${
                authMode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 shadow-cyan-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-indigo-500/20'
              } active:scale-[0.98] disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authMode === 'signin' ? authT.btnSignIn : authT.btnSignUp}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Access Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-slate-900 px-3 text-slate-500">
                {authT.orDivider}
              </span>
            </div>
          </div>

          {/* Seeded Analyst Autofill Button */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleQuickFillAnalyst}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 flex items-center justify-between text-xs font-semibold transition-all group shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold">{authT.quickFillAnalyst}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                Admin
              </span>
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              {authT.analystHint}
            </p>

            {/* Guest Explore Bypass Button */}
            <button
              type="button"
              onClick={handleGuestExplore}
              className="w-full py-2 px-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center space-x-1.5 text-xs font-medium transition-all"
            >
              <Rocket className="w-3.5 h-3.5 text-teal-400" />
              <span>{authT.guestExploreBtn}</span>
            </button>
          </div>

          {/* Bottom Switch between Sign In / Sign Up */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
            {authMode === 'signin' ? (
              <span>
                {authT.dontHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
                  className="font-bold text-cyan-400 hover:underline ml-1"
                >
                  {authT.signUpLink}
                </button>
              </span>
            ) : (
              <span>
                {authT.alreadyHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
                  className="font-bold text-indigo-400 hover:underline ml-1"
                >
                  {authT.signInLink}
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
