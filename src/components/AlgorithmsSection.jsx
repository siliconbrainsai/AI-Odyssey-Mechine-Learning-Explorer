import React, { useState, useMemo } from 'react';
import { Cpu, GitBranch, Play, RotateCcw, TrendingUp, CheckCircle, Award, BarChart3, Layers } from 'lucide-react';

const INITIAL_POINTS = [
  { x: 2, y: 32 },
  { x: 3.5, y: 45 },
  { x: 5, y: 55 },
  { x: 6.5, y: 68 },
  { x: 8, y: 79 },
  { x: 9.5, y: 92 },
  { x: 4, y: 40 },
  { x: 7, y: 72 }
];

export default function AlgorithmsSection({ t, audience }) {
  // Linear Regression Interactive State
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [slope, setSlope] = useState(7.5);
  const [intercept, setIntercept] = useState(18);

  // Ensemble Voting Simulator State
  const [votingActive, setVotingActive] = useState(false);
  const [ensembleResult, setEnsembleResult] = useState(null);

  const a = t.algorithms;

  // Calculate MSE and R^2
  const { mse, r2 } = useMemo(() => {
    if (points.length === 0) return { mse: 0, r2: 0 };
    
    let sumSquaredResiduals = 0;
    let sumY = 0;
    
    points.forEach(p => {
      const pred = slope * p.x + intercept;
      const res = p.y - pred;
      sumSquaredResiduals += res * res;
      sumY += p.y;
    });

    const meanY = sumY / points.length;
    let totalSumSquares = 0;
    points.forEach(p => {
      totalSumSquares += (p.y - meanY) * (p.y - meanY);
    });

    const calculatedMse = sumSquaredResiduals / points.length;
    const calculatedR2 = totalSumSquares > 0 ? Math.max(0, 1 - (sumSquaredResiduals / totalSumSquares)) : 1;

    return {
      mse: calculatedMse.toFixed(1),
      r2: (calculatedR2 * 100).toFixed(1)
    };
  }, [points, slope, intercept]);

  // Click on SVG to add new points
  const handleGraphClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // SVG viewBox is 0 0 500 300
    // X goes 0 to 12 hrs (mapping 40px to 460px)
    // Y goes 0 to 100 score (mapping 260px down to 30px)
    const normX = Math.max(0, Math.min(12, ((clickX - 40) / 420) * 12));
    const normY = Math.max(0, Math.min(100, 100 - ((clickY - 30) / 230) * 100));

    setPoints([...points, { x: parseFloat(normX.toFixed(1)), y: Math.round(normY) }]);
  };

  const resetPoints = () => {
    setPoints(INITIAL_POINTS);
    setSlope(7.5);
    setIntercept(18);
  };

  // Run Ensemble Vote Simulation
  const runEnsembleVote = () => {
    setVotingActive(true);
    setEnsembleResult(null);

    setTimeout(() => {
      setEnsembleResult({
        trees: [
          { id: 1, vote: 'PASS', score: 94, reason: 'Hours > 6.0 (High study intensity)' },
          { id: 2, vote: 'PASS', score: 88, reason: 'Attendance > 90% (Consistent)' },
          { id: 3, vote: 'FAIL', score: 48, reason: 'Split on strict attendance boundary' },
          { id: 4, vote: 'PASS', score: 91, reason: 'Hours > 5.5 & Attendance > 85%' },
          { id: 5, vote: 'PASS', score: 96, reason: 'Ensemble high probability tree' }
        ],
        finalDecision: 'PASS (ఉత్తీర్ణత)',
        confidence: '80% Majority Consensus (4 of 5 Trees Agree)'
      });
      setVotingActive(false);
    }, 600);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/50 border border-teal-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-500/15 border border-teal-500/30 rounded-2xl text-teal-400">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
              Module 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {a.header}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {a.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Linear Regression Playground */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>{a.linearTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {a.linearDesc}
            </p>
          </div>

          {/* Persona Formula Badge */}
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-300 self-start md:self-auto">
            <span className="text-slate-400 mr-2 text-[10px] uppercase font-bold">Formula:</span>
            {audience === 'student' ? a.formulaStudent : a.formulaEngineer}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-6">
          
          {/* Interactive Graph Canvas (SVG) */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 px-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping mr-1"></span>
                <span>Y: Exam Score (%) vs X: Study Hours</span>
              </span>
              <span>{points.length} Data Points</span>
            </div>

            <div className="relative cursor-crosshair select-none bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
              <svg
                viewBox="0 0 500 300"
                className="w-full h-64 sm:h-72"
                onClick={handleGraphClick}
              >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((score) => {
                  const y = 260 - (score / 100) * 230;
                  return (
                    <g key={score}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {score}
                      </text>
                    </g>
                  );
                })}

                {[0, 3, 6, 9, 12].map((hr) => {
                  const x = 40 + (hr / 12) * 440;
                  return (
                    <g key={hr}>
                      <line x1={x} y1="30" x2={x} y2="260" stroke="#1e293b" strokeDasharray="3 3" />
                      <text x={x} y="278" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        {hr}h
                      </text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1="40" y1="260" x2="480" y2="260" stroke="#475569" strokeWidth="1.5" />
                <line x1="40" y1="30" x2="40" y2="260" stroke="#475569" strokeWidth="1.5" />

                {/* Best Fit Line: from x=0 to x=12 */}
                {(() => {
                  const yStart = 260 - (Math.min(100, Math.max(0, intercept)) / 100) * 230;
                  const yEndVal = slope * 12 + intercept;
                  const yEnd = 260 - (Math.min(100, Math.max(0, yEndVal)) / 100) * 230;
                  return (
                    <line
                      x1="40"
                      y1={yStart}
                      x2="480"
                      y2={yEnd}
                      stroke="#06b6d4"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="transition-all duration-150 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  );
                })()}

                {/* Residual Lines & Data Points */}
                {points.map((p, idx) => {
                  const px = 40 + (p.x / 12) * 440;
                  const py = 260 - (p.y / 100) * 230;
                  const predY = slope * p.x + intercept;
                  const lineY = 260 - (Math.min(100, Math.max(0, predY)) / 100) * 230;

                  return (
                    <g key={idx} className="group">
                      {/* Residual vertical line */}
                      <line
                        x1={px}
                        y1={py}
                        x2={px}
                        y2={lineY}
                        stroke="#f43f5e"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        opacity="0.6"
                      />
                      {/* Point dot */}
                      <circle
                        cx={px}
                        cy={py}
                        r="5"
                        fill="#38bdf8"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="transition-transform group-hover:scale-125"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-slate-400 italic">
                {a.addPointHint}
              </span>
              <button
                type="button"
                onClick={resetPoints}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{a.resetPoints}</span>
              </button>
            </div>
          </div>

          {/* Controls & Metrics Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Sliders */}
            <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{a.slopeLabel}</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{slope}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{a.biasLabel}</span>
                  <span className="text-indigo-400 font-mono font-bold text-sm">{intercept}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="50"
                  step="1"
                  value={intercept}
                  onChange={(e) => setIntercept(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-400"
                />
              </div>
            </div>

            {/* Real-time Loss Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.mseLabel}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-rose-400">
                  {mse}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Lower is better (Loss)</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.r2Label}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                  {r2}%
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Higher is better (Variance explained)</div>
              </div>
            </div>

            {/* Intuition Box */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="text-cyan-300 font-bold">💡 Intuition: </span>
              As you adjust the slope $w$ and intercept $b$ to pass cleanly through the center of the dots, the dashed red error lines shrink, minimizing the MSE loss!
            </div>

          </div>

        </div>
      </div>

      {/* 2. Decision Tree & Random Forest Visualizer */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2 mb-2">
          <GitBranch className="w-5 h-5 text-teal-400" />
          <span>{a.treeTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-3xl">
          {a.treeDesc}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Decision Tree Card */}
          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center space-x-2 text-teal-300 font-bold mb-3">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">🌲</span>
              <h4>{a.treeCardTitle}</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {a.treeCardPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Mini visual tree */}
            <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-[11px] space-y-2">
              <div className="inline-block px-3 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                [Study Hours &gt; 5.5]
              </div>
              <div className="flex justify-around text-slate-500 text-[10px]">
                <span>↙ YES</span>
                <span>NO ↘</span>
              </div>
              <div className="flex justify-around">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Pass (92%)
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Need Help (35%)
                </span>
              </div>
            </div>
          </div>

          {/* Random Forest Card */}
          <div className="bg-gradient-to-br from-indigo-950/30 to-slate-900/70 border border-indigo-500/30 p-6 rounded-2xl">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">🌲🌲🌲</span>
              <h4>{a.forestCardTitle}</h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {a.forestCardPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-indigo-400 font-bold mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Interactive Simulation Launcher */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 flex flex-col justify-between space-y-3">
              <div className="text-[11px] text-slate-300 font-semibold">
                {a.votePrompt}
              </div>
              <button
                type="button"
                onClick={runEnsembleVote}
                disabled={votingActive}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 active:scale-98 transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{votingActive ? 'Aggregating Trees...' : a.runVoteBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Ensemble Simulation Results */}
        {ensembleResult && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 animate-fadeIn shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {a.interactiveVoteTitle}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                {ensembleResult.confidence}
              </span>
            </div>

            {/* Individual Tree Decisions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {ensembleResult.trees.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border text-center font-mono ${
                    t.vote === 'PASS'
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Tree #{t.id}</div>
                  <div className="text-xs font-black my-1">{t.vote}</div>
                  <div className="text-[9px] text-slate-400">{t.score}% prob</div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                <span className="font-bold text-cyan-300">{a.voteResult}</span> {ensembleResult.finalDecision}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Ensemble Mode: Soft Voting Average
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. The End-to-End Production ML Workflow */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2 mb-6">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>{a.workflowTitle}</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {a.steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-5 rounded-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                  Step {step.num}
                </span>
                <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">→</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-cyan-300 transition-colors">
                {step.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
