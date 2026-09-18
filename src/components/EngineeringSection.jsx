import React, { useState } from 'react';
import { Terminal, Send, Copy, Check, Server, ShieldCheck, Box, Clock, Zap } from 'lucide-react';
import { codeSnippets } from '../data/translations';

export default function EngineeringSection({ t, audience }) {
  // FastAPI Playground Inputs
  const [hours, setHours] = useState(7.5);
  const [attendance, setAttendance] = useState(88);
  const [prepTests, setPrepTests] = useState(4);

  // Response state
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Code tab state
  const [activeCodeTab, setActiveCodeTab] = useState('api');
  const [copied, setCopied] = useState(false);

  const e = t.engineering;

  const handleSendRequest = () => {
    setLoading(true);
    setResponse(null);

    const startTime = performance.now();

    setTimeout(() => {
      // Realistic ML decision logic
      const rawScore = 0.5 * hours + 0.04 * attendance + 0.3 * prepTests;
      const prob = 1 / (1 + Math.exp(-(rawScore - 7.0)));
      const pred = prob > 0.5 ? 1 : 0;
      const confidence = pred === 1 ? prob : 1 - prob;
      const latency = (performance.now() - startTime).toFixed(2);

      setResponse({
        prediction: pred,
        decision_label: pred === 1 ? 'Pass / High-Performance (ఉత్తీర్ణత)' : 'Needs Academic Intervention (మద్దతు అవసరం)',
        confidence: Number((confidence * 100).toFixed(1)),
        latency_ms: Math.max(8.5, parseFloat(latency)),
        timestamp: new Date().toISOString(),
        model_version: 'v1.0.0-rf100-prod'
      });
      setLoading(false);
    }, 450);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/50 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500/15 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Module 03
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {e.header}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {e.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Live FastAPI Testbench */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>{e.apiTesterTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {e.apiTesterDesc}
            </p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 font-mono text-xs text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FastAPI Server: ONLINE</span>
          </div>
        </div>

        {/* REST Request Bar */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold">
              POST
            </span>
            <span className="text-cyan-300 font-semibold">{e.endpoint}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Content-Type: application/json
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls / Inputs */}
          <div className="lg:col-span-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-5">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              Request Payload Parameters
            </h4>

            {/* Feature 1: Study Hours */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="hours-slider" className="text-slate-300">{e.feature1}</label>
                <span className="text-cyan-400 font-mono font-bold">{hours} hrs</span>
              </div>
              <input
                id="hours-slider"
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Feature 2: Attendance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="attendance-slider" className="text-slate-300">{e.feature2}</label>
                <span className="text-teal-400 font-mono font-bold">{attendance}%</span>
              </div>
              <input
                id="attendance-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={attendance}
                onChange={(e) => setAttendance(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
              />
            </div>

            {/* Feature 3: Prep Tests */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="prep-tests-slider" className="text-slate-300">{e.feature3}</label>
                <span className="text-indigo-400 font-mono font-bold">{prepTests} exams</span>
              </div>
              <input
                id="prep-tests-slider"
                type="range"
                min="0"
                max="10"
                step="1"
                value={prepTests}
                onChange={(e) => setPrepTests(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSendRequest}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-98 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? e.sending : e.sendReqBtn}</span>
            </button>
          </div>

          {/* Real-time Response Output */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {e.responseHeader}
                </span>
                {response && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{response.latency_ms} ms</span>
                  </span>
                )}
              </div>

              {response ? (
                <div className="space-y-4">
                  {/* Status & Prediction Banner */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    response.prediction === 1
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                  }`}>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
                        Inference Result
                      </div>
                      <div className="text-base sm:text-lg font-bold mt-0.5">
                        {response.decision_label}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xl sm:text-2xl font-black">
                        {response.confidence}%
                      </div>
                      <div className="text-[10px] opacity-75">Confidence</div>
                    </div>
                  </div>

                  {/* Raw JSON viewer */}
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 font-mono text-xs overflow-x-auto">
                    <pre className="text-cyan-300">
                      {JSON.stringify(
                        {
                          status: "success",
                          model_version: response.model_version,
                          inputs: {
                            hours_studied: hours,
                            attendance_pct: attendance,
                            prep_tests: prepTests
                          },
                          prediction: response.prediction,
                          probability: `${response.confidence}%`,
                          latency_ms: `${response.latency_ms}ms`
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs font-mono text-center">
                  <Terminal className="w-8 h-8 mb-2 opacity-40 text-cyan-400" />
                  <span>Awaiting inference request...</span>
                  <span className="text-[11px] text-slate-600 mt-1">
                    Adjust parameters on the left and click "{e.sendReqBtn}"
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>{e.modelMeta}</span>
              <span>ASGI: Uvicorn</span>
            </div>
          </div>

        </div>
      </div>

      {/* Production Code Viewer with Tabs */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Production Code Artifacts
            </h3>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={() => handleCopyCode(codeSnippets[activeCodeTab])}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{e.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{e.copyBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(e.codeTabs).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCodeTab(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCodeTab === key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Code Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-5 overflow-x-auto shadow-2xl">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>
        </div>
      </div>

      {/* Production MLOps Serving Architecture */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>{e.architectureTitle}</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {e.archSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs mb-3">
                0{idx + 1}
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
