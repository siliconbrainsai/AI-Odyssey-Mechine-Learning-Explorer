import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import LandingPage from './components/landing/LandingPage';
import ProtectedRoute from './components/security/ProtectedRoute';
import FoundationsSection from './components/FoundationsSection';
import AlgorithmsSection from './components/AlgorithmsSection';
import EngineeringSection from './components/EngineeringSection';
import QuizSection from './components/QuizSection';
import GlossarySection from './components/GlossarySection';
import { mlTranslations } from './data/translations';
import { BookOpen, Cpu, Terminal, CheckCircle, Layers, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te'); // Default to Telugu as in original project
  const [view, setView] = useState('landing'); // 'landing' (Home Command Nexus) or 'lab' (Interactive 5 Modules)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ai_odyssey_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [audience, setAudience] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ai_odyssey_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.track) return parsed.track;
      }
    } catch {}
    return 'student'; // 'student' or 'engineer'
  });

  const [activeTab, setActiveTab] = useState('foundations');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = mlTranslations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.track) {
      setAudience(user.track);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ai_odyssey_user');
    localStorage.removeItem('ai_odyssey_token');
    setCurrentUser(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (moduleId) => {
    setActiveTab(moduleId);
    setView('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTabIcon = (id) => {
    switch (id) {
      case 'foundations':
        return <BookOpen className="w-4 h-4 shrink-0" />;
      case 'algorithms':
        return <Cpu className="w-4 h-4 shrink-0" />;
      case 'engineering':
        return <Terminal className="w-4 h-4 shrink-0" />;
      case 'quiz':
        return <CheckCircle className="w-4 h-4 shrink-0" />;
      case 'glossary':
        return <Layers className="w-4 h-4 shrink-0" />;
      default:
        return null;
    }
  };

  // If in Landing / Command Nexus View
  if (view === 'landing') {
    return (
      <LandingPage
        lang={lang}
        setLang={setLang}
        audience={audience}
        setAudience={setAudience}
        t={t}
        onEnterLab={() => setView('lab')}
        onSelectModule={handleSelectModule}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Interactive 5-Module Lab View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col justify-between">
      
      {/* Navbar with Language & Audience controls, Auth, and Command Hub return */}
      <Navbar
        lang={lang}
        setLang={setLang}
        audience={audience}
        setAudience={setAudience}
        t={t}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onGoHome={() => setView('landing')}
      />

      {/* Glassmorphic Authentication & Track Selection Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        lang={lang}
        setLang={setLang}
        audience={audience}
        setAudience={setAudience}
        t={t}
      />

      {/* Main Container Protected by Corporate Access Guard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full flex-1">
        
        <ProtectedRoute
          currentUser={currentUser}
          t={t}
          lang={lang}
          setLang={setLang}
          onGoHome={() => setView('landing')}
          onAutofillAnalyst={() => {
            const analystUser = {
              email: 'analyst@siliconbrain.ai',
              full_name: 'Senior ML Analyst',
              role: 'Senior ML Analyst',
              track: 'engineer'
            };
            localStorage.setItem('ai_odyssey_user', JSON.stringify(analystUser));
            localStorage.setItem('ai_odyssey_token', 'mock_jwt_analyst_token_2026');
            setCurrentUser(analystUser);
            setAudience('engineer');
          }}
        >
          {/* Navigation Tabs Bar */}
          <div className="sticky top-20 z-40 backdrop-blur-md bg-slate-950/80 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8 border-b border-slate-800/60 overflow-x-auto scrollbar-none">
            <div className="flex space-x-2 min-w-max">
              {t.navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {getTabIcon(tab.id)}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="transition-all duration-300">
            {activeTab === 'foundations' && (
              <FoundationsSection t={t} audience={audience} />
            )}

            {activeTab === 'algorithms' && (
              <AlgorithmsSection t={t} audience={audience} />
            )}

            {activeTab === 'engineering' && (
              <EngineeringSection t={t} audience={audience} />
            )}

            {activeTab === 'quiz' && (
              <QuizSection t={t} lang={lang} />
            )}

            {activeTab === 'glossary' && (
              <GlossarySection t={t} audience={audience} />
            )}
          </div>
        </ProtectedRoute>

      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-xl shadow-cyan-500/30 transition-all active:scale-95 animate-fadeIn"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-10 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300">
              {t.footer.text}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {t.footer.rights}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[11px]">
              {t.footer.techBadge}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-teal-400 font-mono text-[11px]">
              FastAPI + Scikit-Learn
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
