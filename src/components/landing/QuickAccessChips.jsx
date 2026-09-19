import React from 'react';
import { TrendingUp, Terminal, Network, GitFork, CheckCircle, ArrowRight } from 'lucide-react';

export default function QuickAccessChips({ t, onSelectModule }) {
  const landingT = t.landing || {};

  const chips = [
    {
      id: 'algorithms',
      label: landingT.chipLinReg || "Linear Regression Playground",
      icon: <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />,
      tag: "Regression",
      glowColor: "hover:border-cyan-400/60 hover:shadow-cyan-500/20"
    },
    {
      id: 'engineering',
      label: landingT.chipFastAPI || "FastAPI ASGI Inference",
      icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" />,
      tag: "Microservice",
      glowColor: "hover:border-emerald-400/60 hover:shadow-emerald-500/20"
    },
    {
      id: 'algorithms',
      label: landingT.chipKMeans || "K-Means & Elbow Method",
      icon: <Network className="w-3.5 h-3.5 text-indigo-400" />,
      tag: "Unsupervised",
      glowColor: "hover:border-indigo-400/60 hover:shadow-indigo-500/20"
    },
    {
      id: 'algorithms',
      label: landingT.chipRandomForest || "Random Forest Ensembles",
      icon: <GitFork className="w-3.5 h-3.5 text-teal-400" />,
      tag: "Ensemble",
      glowColor: "hover:border-teal-400/60 hover:shadow-teal-500/20"
    },
    {
      id: 'quiz',
      label: landingT.chipQuiz || "Knowledge Assessment Quiz",
      icon: <CheckCircle className="w-3.5 h-3.5 text-amber-400" />,
      tag: "Self-Test",
      glowColor: "hover:border-amber-400/60 hover:shadow-amber-500/20"
    }
  ];

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-xs font-mono font-bold text-slate-300 tracking-wider uppercase">
          {landingT.quickAccessTitle || "QUICK ACCESS TOPICS // INTERACTIVE DIRECT JUMP"}
        </span>
        <span className="text-[10px] font-mono text-cyan-400">
          5 Topics Online
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectModule(chip.id)}
            className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 font-semibold transition-all duration-200 hover:scale-[1.02] shadow-sm ${chip.glowColor} group active:scale-95`}
          >
            {chip.icon}
            <span>{chip.label}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
              {chip.tag}
            </span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
