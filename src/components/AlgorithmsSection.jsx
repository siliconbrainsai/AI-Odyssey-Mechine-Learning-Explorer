import React, { useState, useMemo } from 'react';
import { Cpu, GitBranch, Play, RotateCcw, TrendingUp, CheckCircle, Award, BarChart3, Layers, Target, ScatterChart, Compass } from 'lucide-react';

const INITIAL_REGRESSION_POINTS = [
  { x: 2, y: 32 },
  { x: 3.5, y: 45 },
  { x: 5, y: 55 },
  { x: 6.5, y: 68 },
  { x: 8, y: 79 },
  { x: 9.5, y: 92 },
  { x: 4, y: 40 },
  { x: 7, y: 72 }
];

// Initial 2D points for K-Means Clustering: [Study Hours (1-12), Practice Exams (1-10)]
const KMEANS_DATA = [
  // Cluster Group 1: High hours, High exams
  { id: 1, x: 8.5, y: 8.2 }, { id: 2, x: 9.0, y: 9.0 }, { id: 3, x: 10.2, y: 8.8 },
  { id: 4, x: 11.0, y: 9.5 }, { id: 5, x: 9.8, y: 7.9 }, { id: 6, x: 8.0, y: 7.5 },
  // Cluster Group 2: Moderate hours, Moderate exams
  { id: 7, x: 5.5, y: 5.2 }, { id: 8, x: 6.0, y: 5.8 }, { id: 9, x: 6.8, y: 4.9 },
  { id: 10, x: 5.0, y: 6.2 }, { id: 11, x: 7.2, y: 5.5 }, { id: 12, x: 5.8, y: 4.4 },
  // Cluster Group 3: Low hours, Low exams
  { id: 13, x: 2.0, y: 2.5 }, { id: 14, x: 2.8, y: 3.0 }, { id: 15, x: 1.5, y: 1.8 },
  { id: 16, x: 3.2, y: 2.2 }, { id: 17, x: 2.4, y: 3.8 }, { id: 18, x: 3.8, y: 2.9 },
  // Cluster Group 4: High hours, Low exams (Theory focused)
  { id: 19, x: 10.0, y: 2.8 }, { id: 20, x: 11.2, y: 3.4 }, { id: 21, x: 9.5, y: 3.8 },
  { id: 22, x: 10.5, y: 2.2 }
];

const INITIAL_CENTROIDS = [
  { k: 0, x: 3.0, y: 7.0, color: '#06b6d4' }, // Cyan
  { k: 1, x: 8.0, y: 3.0, color: '#a855f7' }, // Purple
  { k: 2, x: 6.0, y: 8.5, color: '#10b981' }, // Emerald
  { k: 3, x: 2.0, y: 4.0, color: '#f59e0b' }, // Amber
];

const CLUSTER_COLORS = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b'];

export default function AlgorithmsSection({ t, audience }) {
  // 1. Linear Regression Interactive State
  const [points, setPoints] = useState(INITIAL_REGRESSION_POINTS);
  const [slope, setSlope] = useState(7.5);
  const [intercept, setIntercept] = useState(18);

  // 2. Logistic Regression & Sigmoid Lab State
  const [logWeight, setLogWeight] = useState(1.3);
  const [logBias, setLogBias] = useState(-7.2);
  const [threshold, setThreshold] = useState(0.5);
  const [testHours, setTestHours] = useState(6.0);

  // 3. K-Means Clustering Lab State
  const [kCount, setKCount] = useState(3);
  const [centroids, setCentroids] = useState(INITIAL_CENTROIDS.slice(0, 3));
  const [kmeansIteration, setKmeansIteration] = useState(0);

  // 4. Ensemble Voting Simulator State
  const [votingActive, setVotingActive] = useState(false);
  const [ensembleResult, setEnsembleResult] = useState(null);

  const a = t.algorithms;

  // --- LINEAR REGRESSION CALCULATIONS ---
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

  const handleGraphClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const normX = Math.max(0, Math.min(12, ((clickX - 40) / 420) * 12));
    const normY = Math.max(0, Math.min(100, 100 - ((clickY - 30) / 230) * 100));
    setPoints([...points, { x: parseFloat(normX.toFixed(1)), y: Math.round(normY) }]);
  };

  const resetPoints = () => {
    setPoints(INITIAL_REGRESSION_POINTS);
    setSlope(7.5);
    setIntercept(18);
  };

  // --- LOGISTIC REGRESSION CALCULATIONS ---
  const { sigmoidProb, sigmoidDecision, bceLoss } = useMemo(() => {
    const z = logWeight * testHours + logBias;
    const prob = 1 / (1 + Math.exp(-z));
    const decision = prob >= threshold ? 1 : 0;
    // Compute representative binary cross-entropy loss against hypothetical ground truth (1)
    const loss = -(1 * Math.log(Math.max(0.0001, prob)) + 0 * Math.log(Math.max(0.0001, 1 - prob)));
    return {
      sigmoidProb: (prob * 100).toFixed(1),
      sigmoidDecision: decision === 1 ? 'PASS (ఉత్తీర్ణత)' : 'NEEDS SUPPORT (మద్దతు అవసరం)',
      bceLoss: loss.toFixed(3)
    };
  }, [logWeight, logBias, testHours, threshold]);

  // Generate smooth Sigmoid Curve Points for SVG
  const sigmoidCurvePath = useMemo(() => {
    const coords = [];
    for (let h = 0; h <= 12; h += 0.2) {
      const z = logWeight * h + logBias;
      const p = 1 / (1 + Math.exp(-z));
      const px = 40 + (h / 12) * 440;
      const py = 260 - p * 230;
      coords.push(`${px},${py}`);
    }
    return `M ${coords.join(' L ')}`;
  }, [logWeight, logBias]);

  // --- K-MEANS CALCULATIONS ---
  // Assign points to nearest centroid and compute inertia
  const { assignedData, currentInertia } = useMemo(() => {
    let totalInertia = 0;
    const activeCentroids = centroids.slice(0, kCount);

    const assigned = KMEANS_DATA.map(pt => {
      let minDist = Infinity;
      let closestCentroidIdx = 0;

      activeCentroids.forEach((c, idx) => {
        const distSq = (pt.x - c.x) ** 2 + (pt.y - c.y) ** 2;
        if (distSq < minDist) {
          minDist = distSq;
          closestCentroidIdx = idx;
        }
      });

      totalInertia += minDist;
      return {
        ...pt,
        cluster: closestCentroidIdx,
        color: CLUSTER_COLORS[closestCentroidIdx]
      };
    });

    return {
      assignedData: assigned,
      currentInertia: totalInertia.toFixed(1)
    };
  }, [kCount, centroids]);

  // Step Centroids (recompute mean position)
  const stepKmeans = () => {
    const newCentroids = centroids.slice(0, kCount).map((c, idx) => {
      const clusterPoints = assignedData.filter(pt => pt.cluster === idx);
      if (clusterPoints.length === 0) return c;
      const meanX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
      const meanY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;
      return {
        ...c,
        x: parseFloat(meanX.toFixed(2)),
        y: parseFloat(meanY.toFixed(2))
      };
    });
    setCentroids(newCentroids);
    setKmeansIteration(prev => prev + 1);
  };

  const handleKChange = (newK) => {
    setKCount(newK);
    setCentroids(INITIAL_CENTROIDS.slice(0, newK));
    setKmeansIteration(0);
  };

  const resetKmeans = () => {
    setCentroids(INITIAL_CENTROIDS.slice(0, kCount));
    setKmeansIteration(0);
  };

  // --- RANDOM FOREST ENSEMBLE SIMULATION ---
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
    <div className="space-y-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/50 border border-teal-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-500/15 border border-teal-500/30 rounded-2xl text-teal-400">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
              Module 02 • Interactive Visual Lab
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

      {/* ========================================================================= */}
      {/* 1. LINEAR REGRESSION PLAYGROUND */}
      {/* ========================================================================= */}
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
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-300 self-start md:self-auto">
            <span className="text-slate-400 mr-2 text-[10px] uppercase font-bold">Formula:</span>
            {audience === 'student' ? a.formulaStudent : a.formulaEngineer}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 px-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping mr-1"></span>
                <span>Y: Exam Score (%) vs X: Study Hours</span>
              </span>
              <span>{points.length} Data Points</span>
            </div>

            <div className="relative cursor-crosshair select-none bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 500 300" className="w-full h-64 sm:h-72" onClick={handleGraphClick}>
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
                <line x1="40" y1="260" x2="480" y2="260" stroke="#475569" strokeWidth="1.5" />
                <line x1="40" y1="30" x2="40" y2="260" stroke="#475569" strokeWidth="1.5" />

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

                {points.map((p, idx) => {
                  const px = 40 + (p.x / 12) * 440;
                  const py = 260 - (p.y / 100) * 230;
                  const predY = slope * p.x + intercept;
                  const lineY = 260 - (Math.min(100, Math.max(0, predY)) / 100) * 230;
                  return (
                    <g key={idx} className="group">
                      <line x1={px} y1={py} x2={px} y2={lineY} stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                      <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-slate-400 italic">{a.addPointHint}</span>
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

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.mseLabel}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-rose-400">{mse}</div>
                <div className="text-[10px] text-slate-500 mt-1">Lower is better (MSE)</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.r2Label}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">{r2}%</div>
                <div className="text-[10px] text-slate-500 mt-1">Variance explained (R²)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="text-cyan-300 font-bold">💡 Intuition: </span>
              Ordinary Least Squares (OLS) iteratively pulls the line toward the mean of points to collapse the residual red error lines.
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOGISTIC REGRESSION & SIGMOID CLASSIFICATION LAB */}
      {/* ========================================================================= */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <span>{a.logisticTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {a.logisticDesc}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/30 font-mono text-xs text-purple-300 self-start md:self-auto">
            <span className="text-slate-400 mr-2 text-[10px] uppercase font-bold">Sigmoid:</span>
            {audience === 'student' ? a.formulaStudentLog : a.formulaEngineerLog}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-6">
          {/* Sigmoid Graph */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 px-2 text-xs text-slate-400">
              <span className="font-mono text-purple-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block animate-ping mr-1"></span>
                <span>Y: P(Pass) [0.0 - 1.0] vs X: Study Hours (h)</span>
              </span>
              <span className="text-purple-400 font-mono">Threshold τ = {threshold}</span>
            </div>

            <div className="relative select-none bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 500 300" className="w-full h-64 sm:h-72">
                {/* Horizontal probability guides: 0.0, 0.25, 0.5, 0.75, 1.0 */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((prob) => {
                  const y = 260 - prob * 230;
                  return (
                    <g key={prob}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {prob.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical hour markers: 0 to 12 */}
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

                {/* Decision Threshold Line */}
                {(() => {
                  const threshY = 260 - threshold * 230;
                  return (
                    <g>
                      <line
                        x1="40"
                        y1={threshY}
                        x2="480"
                        y2={threshY}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <text x="475" y={threshY - 6} fill="#f59e0b" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">
                        τ = {threshold}
                      </text>
                    </g>
                  );
                })()}

                {/* Sigmoid S-Curve */}
                <path
                  d={sigmoidCurvePath}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                />

                {/* Active Test Point on the Sigmoid Curve */}
                {(() => {
                  const testPx = 40 + (testHours / 12) * 440;
                  const z = logWeight * testHours + logBias;
                  const prob = 1 / (1 + Math.exp(-z));
                  const testPy = 260 - prob * 230;
                  const isPass = prob >= threshold;

                  return (
                    <g>
                      <line x1={testPx} y1="260" x2={testPx} y2={testPy} stroke="#c084fc" strokeDasharray="2 2" />
                      <circle
                        cx={testPx}
                        cy={testPy}
                        r="8"
                        fill={isPass ? "#10b981" : "#f43f5e"}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="animate-pulse"
                      />
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span>Threshold τ separates Pass (P &ge; τ) and Intervention (P &lt; τ)</span>
              <span className="font-mono text-purple-300">σ(z) = 1 / (1 + e^-z)</span>
            </div>
          </div>

          {/* Interactive Controls & Classification Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Test Student Study Hours:</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">{testHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.2"
                  value={testHours}
                  onChange={(e) => setTestHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-purple-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{a.thresholdLabel}</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">{threshold}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-amber-400"
                />
              </div>
            </div>

            {/* Decision & Probability Output */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.probScoreLabel}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-purple-300">
                  {sigmoidProb}%
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Probability Scale (0 - 100%)</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.bceLossLabel}</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-rose-400">
                  {bceLoss}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Cross-Entropy Loss (BCE)</div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              parseFloat(sigmoidProb) >= threshold * 100
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}>
              <div>
                <div className="text-[10px] uppercase font-bold opacity-80">{a.classificationDecision}</div>
                <div className="text-sm sm:text-base font-black mt-0.5">{sigmoidDecision}</div>
              </div>
              <span className="text-2xl">
                {parseFloat(sigmoidProb) >= threshold * 100 ? '🎓' : '⚠️'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="text-purple-300 font-bold">💡 Threshold Tradeoff: </span>
              {a.thresholdIntuition}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. K-MEANS CLUSTERING & ELBOW METHOD SIMULATOR */}
      {/* ========================================================================= */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <span>{a.kmeansTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {a.kmeansDesc}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 font-mono text-xs text-emerald-300">
              Iteration: #{kmeansIteration}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-6">
          {/* 2D Cluster Canvas */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 px-2 text-xs text-slate-400">
              <span className="font-mono text-emerald-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping mr-1"></span>
                <span>Y: Practice Exams (1-10) vs X: Study Hours (1-12)</span>
              </span>
              <span>{assignedData.length} Unlabeled Profiles</span>
            </div>

            <div className="relative select-none bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 500 300" className="w-full h-64 sm:h-72">
                {/* Grid */}
                {[0, 2.5, 5, 7.5, 10].map((exam) => {
                  const y = 260 - (exam / 10) * 230;
                  return (
                    <g key={exam}>
                      <line x1="40" y1={y} x2="480" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {exam}
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

                <line x1="40" y1="260" x2="480" y2="260" stroke="#475569" strokeWidth="1.5" />
                <line x1="40" y1="30" x2="40" y2="260" stroke="#475569" strokeWidth="1.5" />

                {/* Distance Lines from points to their cluster centroid */}
                {assignedData.map((p) => {
                  const px = 40 + (p.x / 12) * 440;
                  const py = 260 - (p.y / 10) * 230;
                  const centroid = centroids[p.cluster];
                  const cx = 40 + (centroid.x / 12) * 440;
                  const cy = 260 - (centroid.y / 10) * 230;

                  return (
                    <line
                      key={`line-${p.id}`}
                      x1={px}
                      y1={py}
                      x2={cx}
                      y2={cy}
                      stroke={p.color}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.35"
                    />
                  );
                })}

                {/* Clustered Data Points */}
                {assignedData.map((p) => {
                  const px = 40 + (p.x / 12) * 440;
                  const py = 260 - (p.y / 10) * 230;
                  return (
                    <circle
                      key={`pt-${p.id}`}
                      cx={px}
                      cy={py}
                      r="5.5"
                      fill={p.color}
                      stroke="#0f172a"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Centroids (Rendered as pulsating diamonds) */}
                {centroids.slice(0, kCount).map((c, idx) => {
                  const cx = 40 + (c.x / 12) * 440;
                  const cy = 260 - (c.y / 10) * 230;

                  return (
                    <g key={`c-${idx}`} className="transition-all duration-500">
                      <polygon
                        points={`${cx},${cy - 9} ${cx + 9},${cy} ${cx},${cy + 9} ${cx - 9},${cy}`}
                        fill={c.color}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      />
                      <text x={cx + 12} y={cy + 4} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        C{idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-slate-400">Diamonds (C1-C{kCount}) represent iterative center-of-mass centroids</span>
              <button
                type="button"
                onClick={resetKmeans}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{a.resetClustersBtn}</span>
              </button>
            </div>
          </div>

          {/* Controls & Elbow Curve */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">{a.kSliderLabel}</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">k = {kCount}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKChange(num)}
                    className={`py-2 rounded-xl font-mono text-xs font-bold transition-all border ${
                      kCount === num
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-800/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    k = {num}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={stepKmeans}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{a.stepCentroidBtn}</span>
              </button>
            </div>

            {/* Inertia Metric */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <div className="text-[11px] text-slate-400 font-semibold mb-1">{a.inertiaLabel}</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                {currentInertia}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Within-Cluster Sum of Squares (WCSS)</div>
            </div>

            {/* Miniature Elbow Method SVG Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>{a.elbowTitle}</span>
                <span className="text-[10px] text-emerald-400 font-mono">Elbow: k=3</span>
              </div>
              <svg viewBox="0 0 300 80" className="w-full h-20 bg-slate-900/50 rounded-xl p-1">
                {/* WCSS line: (k=1: 420), (k=2: 180), (k=3: 55), (k=4: 38), (k=5: 25) */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  points="30,70 90,42 150,22 210,18 270,14"
                />
                {/* Markers */}
                <circle cx="30" cy="70" r="3.5" fill="#10b981" />
                <circle cx="90" cy="42" r="3.5" fill="#10b981" />
                {/* Elbow target point at k=3 */}
                <circle cx="150" cy="22" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <text x="150" y="12" fill="#f59e0b" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                  k=3
                </text>
                <circle cx="210" cy="18" r="3.5" fill="#10b981" />
                <circle cx="270" cy="14" r="3.5" fill="#10b981" />
              </svg>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {a.elbowDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DECISION TREE & RANDOM FOREST ENSEMBLE */}
      {/* ========================================================================= */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2 mb-2">
          <GitBranch className="w-5 h-5 text-teal-400" />
          <span>{a.treeTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-3xl">
          {a.treeDesc}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
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

      {/* ========================================================================= */}
      {/* 5. THE END-TO-END PRODUCTION ML WORKFLOW */}
      {/* ========================================================================= */}
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
