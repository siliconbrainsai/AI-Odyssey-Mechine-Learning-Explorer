import React, { useState } from 'react';
import { BookOpen, Layers, CheckCircle2, AlertTriangle, ArrowRight, Activity, Tag, Network, Trophy, Cpu, Code2 } from 'lucide-react';

export default function FoundationsSection({ t, audience }) {
  const [splitRatio, setSplitRatio] = useState(80);
  const [activeParadigm, setActiveParadigm] = useState('supervised');

  const f = t.foundations;

  // Determine split assessment
  let splitStatus = 'balanced';
  let splitMessage = f.balancedExpl;
  if (splitRatio > 88) {
    splitStatus = 'overfit';
    splitMessage = f.overfitExpl;
  } else if (splitRatio < 65) {
    splitStatus = 'underfit';
    splitMessage = f.underfitExpl;
  }

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/50 border border-cyan-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-2xl text-cyan-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              Module 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {f.header}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {f.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Paradigm Comparison: Traditional Programming vs ML */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg sm:text-xl font-bold text-cyan-200 mb-6 flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>{f.comparisonTitle}</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Traditional Programming Card */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Legacy / Rule-Based
                </span>
                <span className="text-slate-500 text-sm">Classic Software</span>
              </div>
              <h4 className="text-base font-bold text-slate-200 mb-2">{f.tradTitle}</h4>
              
              {/* Flow diagram */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 my-4 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-cyan-300">
                  <span>Input:</span>
                  <span className="text-slate-300">{f.tradInput}</span>
                </div>
                <div className="flex justify-center text-slate-500">↓ Algorithm Processing</div>
                <div className="flex items-center justify-between text-teal-300">
                  <span>Output:</span>
                  <span className="text-slate-200 font-semibold">{f.tradOutput}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic mb-3">
                {f.tradExample}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start space-x-2 text-xs text-amber-400/90">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{f.tradLimitation}</span>
            </div>
          </div>

          {/* Machine Learning Card */}
          <div className="bg-gradient-to-br from-cyan-950/30 to-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl p-6 transition-all duration-300 shadow-lg shadow-cyan-950/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Modern / Data-Driven
                </span>
                <span className="text-cyan-400 text-sm font-semibold">Self-Learning</span>
              </div>
              <h4 className="text-base font-bold text-cyan-200 mb-2">{f.mlTitle}</h4>

              {/* Flow diagram */}
              <div className="bg-slate-950/90 p-4 rounded-xl border border-cyan-500/20 my-4 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-cyan-300">
                  <span>Input:</span>
                  <span className="text-slate-300">{f.mlInput}</span>
                </div>
                <div className="flex justify-center text-cyan-400">↓ Optimization & Statistical Fit</div>
                <div className="flex items-center justify-between text-emerald-300">
                  <span>Learned Output:</span>
                  <span className="text-cyan-200 font-semibold">{f.mlOutput}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic mb-3">
                {f.mlExample}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-start space-x-2 text-xs text-cyan-300">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{f.mlAdvantage}</span>
            </div>
          </div>

        </div>
      </div>

      {/* The 3 Core Learning Paradigms */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>{f.corePillarsTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select any paradigm to inspect analogies, engineering mathematical notes, and real applications.
            </p>
          </div>

          <div className="flex space-x-2 mt-4 sm:mt-0">
            {f.pillars.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveParadigm(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeParadigm === p.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {f.pillars.map((pillar) => {
            const isSelected = activeParadigm === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setActiveParadigm(pillar.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/50 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-cyan-400">
                      {pillar.id === 'supervised' && <Tag className="w-5 h-5" />}
                      {pillar.id === 'unsupervised' && <Network className="w-5 h-5" />}
                      {pillar.id === 'reinforcement' && <Trophy className="w-5 h-5" />}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>

                  {/* Dual Mode View */}
                  {audience === 'student' ? (
                    <div className="p-3.5 bg-cyan-950/30 border border-cyan-500/20 rounded-xl mb-4">
                      <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <span>💡 Student Analogy</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pillar.studentAnalogy}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mb-4 font-mono">
                      <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <span>⚙️ Engineering Details</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {pillar.engineerDetails}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Real-world Examples:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.examples.map((ex, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dataset Splitting & Overfitting Simulator */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {f.trainTestTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {f.trainTestDesc}
          </p>
        </div>

        {/* Split Slider */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label htmlFor="split-slider" className="text-sm font-semibold text-slate-200">
              {f.splitRatioLabel}{' '}
              <span className="text-cyan-400 font-bold font-mono">
                {splitRatio}% Train / {100 - splitRatio}% Test
              </span>
            </label>

            {/* Split status badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
              splitStatus === 'balanced'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : splitStatus === 'overfit'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
            }`}>
              {splitStatus === 'balanced' && '✓ ' + f.balancedSplit}
              {splitStatus === 'overfit' && '⚠️ ' + f.overfittingRisk}
              {splitStatus === 'underfit' && '⚠️ ' + f.underfittingRisk}
            </span>
          </div>

          <input
            id="split-slider"
            type="range"
            min="50"
            max="95"
            step="1"
            value={splitRatio}
            onChange={(e) => setSplitRatio(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg cursor-pointer accent-cyan-400"
          />

          {/* Visual Proportion Bar */}
          <div className="space-y-2">
            <div className="w-full h-8 rounded-xl overflow-hidden flex font-mono text-xs font-bold text-slate-950 shadow-inner">
              <div
                style={{ width: `${splitRatio}%` }}
                className="bg-gradient-to-r from-cyan-500 to-teal-400 flex items-center justify-center transition-all duration-300 px-2"
              >
                {f.trainLabel} ({splitRatio}%)
              </div>
              <div
                style={{ width: `${100 - splitRatio}%` }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white transition-all duration-300 px-2"
              >
                {f.testLabel} ({100 - splitRatio}%)
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 px-1 font-mono">
              <span>50% (Equal Split)</span>
              <span className="text-cyan-400 font-semibold">80% (Industry Standard)</span>
              <span>95% (Extreme Train)</span>
            </div>
          </div>

          {/* Real-time Insight explanation */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
            <div className="mt-0.5">
              {splitStatus === 'balanced' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {splitStatus === 'overfit' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {splitStatus === 'underfit' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {splitMessage}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
