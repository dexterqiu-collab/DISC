
import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS, ANALYSIS_DATA } from './constants';
import { DISCDimension, TestResults } from './types';
import Quiz from './components/Quiz';
import ResultCard from './components/ResultCard';

type AppState = 'INTRO' | 'QUIZ' | 'RESULT';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('INTRO');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const startQuiz = () => setState('QUIZ');

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateResults = useCallback((): TestResults => {
    const scores: Record<DISCDimension, number> = {
      [DISCDimension.D]: 0,
      [DISCDimension.I]: 0,
      [DISCDimension.S]: 0,
      [DISCDimension.C]: 0,
    };

    // 每題 1-5 分，各維度 5 題，滿分為 25 分
    QUESTIONS.forEach(q => {
      const score = answers[q.id] || 3;
      scores[q.dimension] += score;
    });

    const percentages: Record<DISCDimension, number> = {
      [DISCDimension.D]: Math.round((scores[DISCDimension.D] / 25) * 100),
      [DISCDimension.I]: Math.round((scores[DISCDimension.I] / 25) * 100),
      [DISCDimension.S]: Math.round((scores[DISCDimension.S] / 25) * 100),
      [DISCDimension.C]: Math.round((scores[DISCDimension.C] / 25) * 100),
    };

    const percentageValues = Object.values(percentages);
    const maxVal = Math.max(...percentageValues);
    const minVal = Math.min(...percentageValues);
    
    let dominantType: DISCDimension | 'Chameleon';
    // 變色龍判斷邏輯：如果最高與最低差異小於 15%，視為平衡發展型
    if (maxVal - minVal < 15) {
      dominantType = 'Chameleon';
    } else {
      dominantType = Object.keys(percentages).reduce((a, b) => 
        percentages[a as DISCDimension] > percentages[b as DISCDimension] ? a : b
      ) as DISCDimension;
    }

    return { scores, percentages, dominantType };
  }, [answers]);

  const results = useMemo(() => calculateResults(), [calculateResults]);

  const handleComplete = () => {
    setState('RESULT');
  };

  const resetTest = () => {
    setAnswers({});
    setState('INTRO');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-[#FBFBFD] transition-colors duration-1000">
      <main className="w-full max-w-3xl">
        {state === 'INTRO' && (
          <div className="text-center animate-fade-in space-y-16 py-12">
            <div className="space-y-6">
              <span className="text-blue-600 font-black tracking-[0.4em] text-[10px] uppercase">Scientific Assessment</span>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-gray-900">
                DISC <span className="font-light italic text-gray-400">Pro</span>
              </h1>
              <p className="text-xl text-gray-500 font-light max-w-lg mx-auto leading-relaxed px-4">
                基於經典人格行為心理學，深度解構你的職場所長與性格底色。
              </p>
            </div>
            
            <div className="flex flex-col gap-6 justify-center items-center">
              <button
                onClick={startQuiz}
                className="group relative px-14 py-5 bg-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              >
                <span className="relative z-10">開始深度測評</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Est. Time: 3 Minutes</span>
            </div>

            <div className="pt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto border-t border-gray-100">
              {['DOMINANCE', 'INFLUENCE', 'STEADINESS', 'COMPLIANCE'].map(d => (
                <div key={d} className="space-y-1">
                  <div className="text-[10px] font-black tracking-widest text-gray-400">{d}</div>
                  <div className="h-[2px] w-4 bg-gray-100 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        {state === 'QUIZ' && (
          <Quiz
            questions={QUESTIONS}
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
          />
        )}

        {state === 'RESULT' && (
          <ResultCard
            results={results}
            onReset={resetTest}
          />
        )}
      </main>

      <footer className="mt-16 mb-8 flex flex-col items-center gap-2">
        <div className="text-gray-300 text-[10px] tracking-[0.3em] font-black uppercase">
          © 2024 DISC Pro Insights
        </div>
        <div className="w-1 h-1 bg-gray-200 rounded-full" />
      </footer>
    </div>
  );
};

export default App;
