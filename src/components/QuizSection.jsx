import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizSection({ t, lang }) {
  const q = t.quiz;
  const questions = q.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (optionIndex) => {
    if (isAnswered) return; // Prevent changing after answered

    const newAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex
    };
    setSelectedAnswers(newAnswers);

    // Check if this was the last question
    if (Object.keys(newAnswers).length === questions.length) {
      setIsCompleted(true);
      // Trigger festive celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Calculate score
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const questionObj = questions.find((item) => item.id === parseInt(qId, 10));
    return questionObj && questionObj.correct === ansIdx ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/50 border border-purple-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-500/15 border border-purple-500/30 rounded-2xl text-purple-400">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                Module 04
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {q.header}
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {q.desc}
              </p>
            </div>
          </div>

          {/* Score Counter */}
          <div className="bg-slate-900/90 border border-purple-500/30 px-5 py-3 rounded-2xl text-center shadow-lg">
            <div className="text-xs text-slate-400 font-semibold">{q.scoreLabel}</div>
            <div className="text-2xl font-black font-mono text-purple-300">
              {score} / {questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
        
        {/* Progress tracker */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="text-xs font-mono text-cyan-400">
            {q.questionOf} {currentIndex + 1} / {questions.length}
          </div>
          <div className="flex space-x-1.5">
            {questions.map((ques, idx) => {
              const ans = selectedAnswers[ques.id];
              const isCorrect = ans !== undefined && ans === ques.correct;
              const isWrong = ans !== undefined && ans !== ques.correct;

              return (
                <button
                  key={ques.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                    idx === currentIndex
                      ? 'ring-2 ring-cyan-400 scale-110'
                      : ''
                  } ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : isWrong
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQuestion.q}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let optionStyles = 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

            if (isAnswered) {
              if (idx === currentQuestion.correct) {
                optionStyles = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/40';
              } else if (idx === selectedOption) {
                optionStyles = 'bg-rose-950/40 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/40';
              } else {
                optionStyles = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-xs sm:text-sm leading-relaxed ${optionStyles}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && idx === currentQuestion.correct && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correct && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card when Answered */}
        {isAnswered && (
          <div className={`p-5 rounded-2xl border animate-fadeIn mb-6 ${
            selectedOption === currentQuestion.correct
              ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-200'
              : 'bg-indigo-950/25 border-indigo-500/30 text-indigo-200'
          }`}>
            <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider mb-1.5">
              <span>
                {selectedOption === currentQuestion.correct ? q.feedbackCorrect : q.feedbackIncorrect}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-semibold text-white">Explanation: </span>
              {currentQuestion.expl}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold disabled:opacity-40 transition-colors"
          >
            {q.prevBtn}
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <span>{q.nextBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{q.restartBtn}</span>
            </button>
          )}
        </div>

      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center animate-fadeIn shadow-2xl">
          <Award className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {q.congratsTitle}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-5 leading-relaxed">
            {q.congratsDesc}
          </p>
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm">
            <span>Final Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</span>
          </div>
        </div>
      )}

    </div>
  );
}
