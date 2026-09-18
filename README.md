# Bilingual Machine Learning Learning Interactive Portal 🚀
### Designed for Students & Engineers • ఇంటరాక్టివ్ మెషిన్ లెర్నింగ్ పోర్టల్

A production-grade, bilingual (English & Telugu) interactive web application built to master Machine Learning foundations, live algorithm simulations, and high-performance FastAPI backend deployments.

---

## 🌟 Key Features

1. **Dual Persona Modes**:
   - 🎓 **Student Mode**: Simple analogies, visual intuition, and interactive simulators.
   - 🛠️ **Engineer Mode**: Mathematical formulas, loss functions (MSE, Cross-Entropy), Scikit-Learn pipelines, and FastAPI REST endpoints.

2. **🌐 Comprehensive Bilingual Support**:
   - Instant toggle between **English** and **Telugu (తెలుగు)** across every module, question, label, and explanation.

3. **🧪 Live Interactive Simulators**:
   - **Linear Regression Lab**: Drag slope ($w$) and intercept ($b$) sliders or click on the 2D canvas to add custom student data points. Watch real-time MSE and $R^2$ fit scores update live.
   - **Decision Tree & Random Forest Voting**: Visualize tree splits and aggregate predictions across an ensemble with real-time confidence scores.
   - **Train/Test Split & Overfitting Simulator**: Interactive ratio slider demonstrating underfitting, overfitting, and balanced generalization.

4. **⚡ Live FastAPI Inference Testbench**:
   - Test a simulated production inference endpoint (`POST /api/v1/predict-performance`) with live latency and confidence calculation.
   - Tabbed copyable code for `train_model.py`, `main.py` (FastAPI), `Dockerfile`, and `requirements.txt`.

5. **🧠 Interactive Knowledge Quiz**:
   - 5 bilingual questions with immediate score tracking, in-depth explanations, and celebratory confetti.

6. **📚 ML Glossary & Cheat Sheet**:
   - Instant search across key ML concepts with both Student and Engineer explanations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/siliconbrainsai/AI-Odyssey-Mechine-Learning-Explorer.git
cd AI-Odyssey-Mechine-Learning-Explorer
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
