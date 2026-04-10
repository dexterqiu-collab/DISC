
import React, { useState } from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  answers: Record<number, number>;
  onAnswer: (questionId: number, score: number) => void;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, answers, onAnswer, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const options = [
    { label: "非常不符合", value: 1 },
    { label: "不符合", value: 2 },
    { label: "中立", value: 3 },
    { label: "符合", value: 4 },
    { label: "非常符合", value: 5 },
  ];

  const handleSelect = (val: number) => {
    onAnswer(currentQuestion.id, val);
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 350);
    } else {
      setTimeout(() => onComplete(), 600);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto space-y-16 py-12">
      {/* Premium Header Progress */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full h-[2px] bg-gray-100 rounded-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Question Text */}
      <div className="text-center space-y-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-snug px-4">
          {currentQuestion.text}
        </h2>

        {/* Rating Scale - Apple Style */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 px-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="group flex flex-col items-center gap-4 transition-all outline-none"
            >
              <div className={`
                w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-all duration-300
                ${answers[currentQuestion.id] === opt.value 
                  ? 'bg-black border-black text-white scale-110 shadow-xl' 
                  : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-900'}
              `}>
                <span className="text-lg font-medium">{opt.value}</span>
              </div>
              <span className={`text-[11px] font-semibold tracking-widest transition-opacity duration-300 ${
                answers[currentQuestion.id] === opt.value ? 'opacity-100 text-black' : 'opacity-40 group-hover:opacity-100'
              }`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-50">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
            currentIndex === 0 
              ? 'text-gray-200 cursor-not-allowed' 
              : 'text-gray-400 hover:text-black hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        {currentIndex > 0 && (
          <div className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            {Math.round(progress)}% Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
