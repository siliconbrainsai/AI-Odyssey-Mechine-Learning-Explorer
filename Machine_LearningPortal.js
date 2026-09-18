import React, { useState } from 'react';

// --- BILINGUAL TRANSLATIONS & ML CURRICULUM ---
const mlTranslations = {
  en: {
    appTitle: "ML Mastery Portal",
    subtitle: "Interactive Machine Learning & API Deployment Academy 🚀",
    toggleText: "తెలుగు",
    navTabs: [
      { id: "foundations", label: "1. Foundations" },
      { id: "algorithms", label: "2. Key Algorithms" },
      { id: "code", label: "3. Python & FastAPI" }
    ],
    foundationsHeader: "Machine Learning Fundamentals",
    foundationsDesc: "Understand how computers learn patterns from historical data instead of hardcoded rules.",
    definitionTitle: "What is Machine Learning?",
    definitionText: "Unlike traditional programming where you write explicit rules, ML uses data and algorithms to let systems learn autonomously. From email spam filters to music recommendations, ML powers daily tech.",
    typesTitle: "Core Learning Types",
    types: [
      { name: "Supervised Learning", desc: "Training models with labeled data (e.g., house price prediction, classification)." },
      { name: "Unsupervised Learning", desc: "Finding hidden structures in unlabeled data (e.g., customer clustering)." },
      { name: "Reinforcement Learning", desc: "Learning optimal actions via trial, error, and rewards (e.g., autonomous agents)." }
    ],
    algoHeader: "Core ML Algorithms & Workflow",
    algoDesc: "Explore how models like Decision Trees and Random Forests make predictions.",
    algorithms: [
      { 
        name: "Linear Regression", 
        desc: "Predicts continuous numerical values (e.g., forecasting network traffic or exam scores based on hours studied)." 
      },
      { 
        name: "Decision Tree Classifier", 
        desc: "Breaks down decisions using tree-like branching questions to classify data points cleanly." 
      },
      { 
        name: "Random Forest Ensemble", 
        desc: "Combines multiple decision trees together to boost prediction accuracy and forecast anomalies." 
      }
    ],
    workflowTitle: "The End-to-End ML Workflow",
    workflowSteps: [
      "1. Data Collection", 
      "2. Data Preprocessing & Cleaning", 
      "3. Model Training (Scikit-learn)", 
      "4. API Deployment (FastAPI)"
    ],
    codeHeader: "Python & FastAPI Implementation",
    codeDesc: "Write clean, production-ready code using scikit-learn and build zero-touch self-healing backend inference APIs.",
    codeSnippet: `from fastapi import FastAPI
from sklearn.ensemble import RandomForestClassifier
import joblib

app = FastAPI(title="ML Inference Engine")

# Load pre-trained Random Forest model
model = joblib.load("model.pkl")

@app.post("/predict")
def predict_anomaly(features: list):
    prediction = model.predict([features])
    return {"prediction": int(prediction[0]), "status": "Success"}`,
    footerText: "Designed for ML Enthusiasts • Bilingual Portal"
  },
  te: {
    appTitle: "ఎంఎల్ మాస్టరీ పోర్టల్",
    subtitle: "ఇంటరాక్టివ్ మెషిన్ లెర్నింగ్ & ఏపీఐ డిప్లాయ్‌మెంట్ అకాడమీ 🚀",
    toggleText: "English",
    navTabs: [
      { id: "foundations", label: "1. ప్రాథమిక అంశాలు" },
      { id: "algorithms", label: "2. ముఖ్యమైన అల్గారిథమ్స్" },
      { id: "code", label: "3. పైథాన్ & FastAPI" }
    ],
    foundationsHeader: "మెషిన్ లెర్నింగ్ ప్రాథమిక భావనలు",
    foundationsDesc: "కంప్యూటర్లు రూల్స్ రాయకుండా డేటా నుండి స్వయంగా ఎలా నేర్చుకుంటాయో తెలుసుకోండి.",
    definitionTitle: "మెషిన్ లెర్నింగ్ అంటే ఏమిటి?",
    definitionText: "సాధారణ ప్రోగ్రామింగ్ లా కాకుండా, మెషిన్ లెర్నింగ్ ద్వారా కంప్యూటర్లు పాత డేటాను విశ్లేషించి తమంతట తామే నిర్ణయాలు తీసుకోవడం నేర్చుకుంటాయి. (ఉదా: స్పామ్ మెయిల్స్ గుర్తించడం).",
    typesTitle: "ప్రధాన లెర్నింగ్ రకాలు",
    types: [
      { name: "సూపర్వైజ్డ్ లెర్నింగ్", desc: "లేబుల్డ్ డేటా ద్వారా మోడల్‌కు శిక్షణ ఇవ్వడం (ఉదా: ఇంటి ధరల అంచనా)." },
      { name: "అన్-సూపర్వైజ్డ్ లెర్నింగ్", desc: "లేబుల్ లేని డేటాలోని నమూనాలను గుర్తించడం (ఉదా: కస్టమర్ గ్రూపింగ్)." },
      { name: "రీన్‌ఫోర్స్‌మెంట్ లెర్నింగ్", desc: "తప్పుల ద్వారా మరియు రివార్డుల ద్వారా నేర్చుకోవడం." }
    ],
    algoHeader: "ముఖ్యమైన అల్గారిథమ్స్ & వర్క్‌ఫ్లో",
    algoDesc: "డిసిషన్ ట్రీస్ మరియు రాండమ్ ఫారెస్ట్ మోడల్స్ ఎలా పనిచేస్తాయో పరిశీలిద్దాం.",
    algorithms: [
      { 
        name: "లీనియర్ రిగ్రెషన్", 
        desc: "సంఖ్యాపరమైన విలువలను కచ్చితంగా అంచనా వేయడానికి వాడతారు." 
      },
      { 
        name: "డిసిషన్ ట్రీ క్లాసిఫైయర్", 
        desc: "చెట్టు లాంటి బ్రాంచింగ్ ప్రశ్నల ద్వారా డేటాను వర్గీకరిస్తుంది." 
      },
      { 
        name: "రాండమ్ ఫారెస్ట్ ఎన్‌సెంబుల్", 
        desc: "అన్ని ట్రీల ఫలితాలను కలిపి అత్యంత కచ్చితమైన అంచనాలు మరియు అనామలీలను గుర్తిస్తుంది." 
      }
    ],
    workflowTitle: "పూర్తి స్థాయి ML వర్క్‌ఫ్లో",
    workflowSteps: [
      "1. డేటా సేకరణ (Collection)", 
      "2. డేటా శుభ్రపరచడం (Cleaning)", 
      "3. మోడల్ ట్రైనింగ్ (Scikit-learn)", 
      "4. ఏపీఐ డిప్లాయ్‌మెంట్ (FastAPI)"
    ],
    codeHeader: "పైథాన్ & FastAPI కోడింగ్",
    codeDesc: "scikit-learn తో మోడల్స్ తయారు చేసి, FastAPI ద్వారా రియల్-టైమ్ బ్యాకెండ్ ఇన్ఫరెన్స్ ఏపీఐలను నిర్మించడం.",
    codeSnippet: `from fastapi import FastAPI
from sklearn.ensemble import RandomForestClassifier
import joblib

app = FastAPI(title="ML Inference Engine")

# ప్రీ-ట్రైన్డ్ మోడల్ లోడ్ చేయడం
model = joblib.load("model.pkl")

@app.post("/predict")
def predict_anomaly(features: list):
    prediction = model.predict([features])
    return {"prediction": int(prediction[0]), "status": "Success"}`,
    footerText: "మెషిన్ లెర్నింగ్ అభ్యాసకుల కోసం • ద్విభాషా పోర్టల్"
  }
};

export default function MachineLearningPortal() {
  const [lang, setLang] = useState('te'); // Default to Telugu as preferred
  const [activeTab, setActiveTab] = useState('foundations');

  const t = mlTranslations[lang];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-16">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-600 p-2 rounded-xl text-white font-bold text-xl shadow-lg shadow-cyan-500/30">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
            <p className="text-xs text-slate-400">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Toggle Button */}
        <button
          onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
          className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          <span>🌐</span>
          <span>{t.toggleText}</span>
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {t.navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                activeTab === tab.id
                  ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-600/10'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-sm sm:text-base">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* TAB 1: FOUNDATIONS */}
        {activeTab === 'foundations' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-cyan-900/40 to-slate-800/60 border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-cyan-300 mb-2">{t.foundationsHeader}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.foundationsDesc}</p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="text-lg font-bold text-teal-300 mb-2">{t.definitionTitle}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{t.definitionText}</p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-cyan-200 mb-4">🧩 {t.typesTitle}</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {t.types.map((type, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-cyan-300 text-sm">{type.name}</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALGORITHMS & WORKFLOW */}
        {activeTab === 'algorithms' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-teal-900/40 to-slate-800/60 border border-teal-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-teal-300 mb-2">{t.algoHeader}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.algoDesc}</p>
            </div>

            <div className="space-y-4">
              {t.algorithms.map((algo, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg flex items-start space-x-4">
                  <span className="text-2xl bg-teal-600/20 p-3 rounded-2xl border border-teal-500/30">
                    🌲
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-teal-200 mb-1">{algo.name}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{algo.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
              <h3 className="text-lg font-bold text-cyan-300 mb-4">⚙️ {t.workflowTitle}</h3>
              <div className="grid sm:grid-cols-4 gap-3">
                {t.workflowSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 text-center">
                    <span className="text-xs font-bold text-cyan-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE & API */}
        {activeTab === 'code' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/60 border border-indigo-500/30 p-6 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-indigo-300 mb-2">{t.codeHeader}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t.codeDesc}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400">api_inference.py</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-lg font-semibold">FastAPI + Scikit-Learn</span>
              </div>
              <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                <code>{t.codeSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p>{t.footerText}</p>
        </footer>

      </main>
    </div>
  );
}