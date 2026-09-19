import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Sparkles, TrendingDown, TrendingUp, Zap, Play, RotateCcw } from 'lucide-react';

export default function StatusMonitor({ t, lang, audience }) {
  const landingT = t.landing || {};

  // Interactive Live Training Telemetry State
  const [epoch, setEpoch] = useState(18);
  const [loss, setLoss] = useState(0.042);
  const [acc, setAcc] = useState(94.6);
  const [isSimulating, setIsSimulating] = useState(true);

  // Auto-pulse telemetry simulation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setEpoch((prev) => {
        const nextEpoch = prev >= 50 ? 1 : prev + 1;
        // recalculate realistic decreasing loss and increasing accuracy
        const calculatedLoss = Math.max(0.015, +(0.8 * Math.exp(-nextEpoch * 0.07) + 0.02 + (Math.random() * 0.006 - 0.003)).toFixed(4));
        const calculatedAcc = Math.min(99.2, +(70 + 29 * (1 - Math.exp(-nextEpoch * 0.06)) + (Math.random() * 0.4 - 0.2)).toFixed(1));
        setLoss(calculatedLoss);
        setAcc(calculatedAcc);
        return nextEpoch;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const resetTelemetry = () => {
    setEpoch(1);
    setLoss(0.724);
    setAcc(71.5);
  };

  return (
    <div className="relative rounded-3xl bg-slate-900/75 border border-cyan-500/30 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden group">
      
      {/* Ambient background glow accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Telemetry Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 tracking-wide font-mono uppercase">
              {landingT.monitorHeader || "LIVE ML MODEL TRAINING MONITOR"}
            </h3>
            <p className="text-[11px] font-mono text-cyan-400/80">
              {landingT.monitorSubtitle || "Telemetry: ai-odyssey-student-classifier • Active Run #104"}
            </p>
          </div>
        </div>

        {/* Sim Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center space-x-1.5 transition-all ${
              isSimulating 
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            <Play className={`w-3 h-3 ${isSimulating ? 'animate-pulse text-cyan-400' : ''}`} />
            <span>{isSimulating ? (lang === 'en' ? 'LIVE PULSE' : 'లైవ్') : (lang === 'en' ? 'PAUSED' : 'ఆపబడింది')}</span>
          </button>
          
          <button
            type="button"
            onClick={resetTelemetry}
            title="Reset Epochs"
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Central Interactive Block: Pulsing Brain-Neuron Core + Orbital Rings */}
      <div className="my-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Pulsing Central Brain-Neuron Core with Orbital Rings */}
        <div className="relative flex items-center justify-center w-44 h-44 shrink-0">
          
          {/* Outer Rotating Dashed Orbital Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
          
          {/* Mid Reverse Rotating Orbital Ring with Coordinate Nodes */}
          <div className="absolute inset-3 rounded-full border border-indigo-500/25 border-dotted animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400" />
          </div>

          {/* Inner Glowing Ring */}
          <div className="absolute inset-7 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/20 border border-cyan-400/40 animate-pulse" />

          {/* Central Pulsing Brain/Neuron Icon */}
          <div className="w-16 h-16 rounded-2xl bg-slate-950/90 border border-cyan-400/60 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
            <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-cyan-400 tracking-tighter mt-0.5">
              NEURON
            </span>
          </div>

          {/* Radar Scanner Sweep Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Real-time Loss Sparkline & Training Statistics */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-300 uppercase flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>OPTIMIZER: ADAM (η = 0.001)</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{landingT.coreStatus || "NEURON CORE ACTIVE"}</span>
            </span>
          </div>

          {/* Mini Loss Descent SVG Visualization */}
          <div className="h-16 w-full bg-slate-950/70 border border-slate-800 rounded-xl p-2 relative overflow-hidden flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Target Curve */}
              <path
                d="M 0 5 Q 25 22, 50 28 T 100 34 L 100 40 L 0 40 Z"
                fill="url(#lossGradient)"
              />
              <path
                d="M 0 5 Q 25 22, 50 28 T 100 34"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="2 1"
              />
              {/* Dynamic current marker */}
              <circle
                cx={Math.min(98, 10 + (epoch / 50) * 85)}
                cy={35 - (loss * 30)}
                r="3"
                fill="#38bdf8"
                className="animate-pulse"
              />
            </svg>
            <div className="absolute top-1.5 right-2 text-[9px] font-mono text-slate-400">
              Loss Curve (MSE ↓)
            </div>
          </div>

          {/* Progress Bar for Epochs */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>{landingT.metricEpoch || "Epoch Progress"}</span>
              <span className="text-cyan-300 font-bold">{epoch} / 50 ({Math.round((epoch / 50) * 100)}%)</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500 shadow-sm shadow-cyan-500"
                style={{ width: `${(epoch / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* 4 Metric Telemetry Readout Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 relative z-10">
        
        {/* Metric 1: Loss */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/90">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{landingT.metricLoss || "Training Loss"}</span>
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-mono font-black text-emerald-400 tracking-tight">
            {loss}
          </div>
          <span className="text-[10px] text-emerald-500 font-mono">-14.2% descent</span>
        </div>

        {/* Metric 2: Accuracy */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/90">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{landingT.metricAcc || "Val Accuracy"}</span>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-mono font-black text-cyan-300 tracking-tight">
            {acc}%
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">Top-1 Score</span>
        </div>

        {/* Metric 3: Latency */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/90">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{landingT.metricLatency || "Batch Latency"}</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-mono font-black text-amber-300 tracking-tight">
            1.2ms
          </div>
          <span className="text-[10px] text-slate-500 font-mono">P99: 1.4ms</span>
        </div>

        {/* Metric 4: Throughput */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/90">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>Throughput</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg font-mono font-black text-indigo-300 tracking-tight">
            1.28k
          </div>
          <span className="text-[10px] text-indigo-400 font-mono">Req/sec served</span>
        </div>

      </div>

    </div>
  );
}
