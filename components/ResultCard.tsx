
import React, { useRef, useState } from 'react';
import { TestResults, DISCDimension } from '../types';
import { ANALYSIS_DATA } from '../constants';
import RadarChart from './RadarChart';

interface ResultCardProps {
  results: TestResults;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ results, onReset }) => {
  const analysis = ANALYSIS_DATA[results.dominantType];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate generation time
    setTimeout(() => {
      setIsDownloading(false);
      alert('您的專屬測評卡片已生成！在真實環境中，這將會保存為高清 PNG 圖片。');
    }, 1500);
  };

  return (
    <div className="animate-fade-in space-y-12 pb-24">
      {/* High-End Result Card */}
      <div 
        ref={cardRef}
        className="relative bg-white rounded-[3rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100"
      >
        {/* Abstract Background Decoration */}
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${analysis.gradient}`} />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] blur-[100px] opacity-[0.08] rounded-full pointer-events-none" 
             style={{ backgroundColor: analysis.color }} />
        
        <div className="p-10 sm:p-16 space-y-12">
          {/* Header Info */}
          <div className="flex flex-col items-center text-center space-y-6">
             <div className="space-y-3">
                <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-white shadow-lg bg-gradient-to-br ${analysis.gradient}`}>
                  {analysis.animal} 型人格
                </span>
                <h1 className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight">
                  {analysis.title}
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-gray-200" />
                  <span className="text-sm font-medium text-gray-400 tracking-widest uppercase">
                    {analysis.type}
                  </span>
                  <div className="h-[1px] w-8 bg-gray-200" />
                </div>
             </div>

             <div className="flex flex-wrap justify-center gap-3">
                {analysis.keywords.map((kw, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 border border-gray-100">
                    #{kw}
                  </span>
                ))}
             </div>
          </div>

          {/* Main Visual: Radar Chart */}
          <div className="bg-gray-50/50 rounded-[2.5rem] p-4 sm:p-10 border border-white">
            <RadarChart 
              percentages={results.percentages} 
              dominantColor={analysis.color}
            />
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">特質深度解析</h3>
                <p className="text-lg text-gray-800 font-light leading-relaxed italic">
                  「{analysis.description}」
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">理想職業領域</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.jobs.map(job => (
                    <span key={job} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-500">
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-3xl space-y-6 border border-white">
               <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase text-center">緯度百分比分析</h3>
               <div className="space-y-4">
                 {Object.entries(results.percentages).map(([dim, val]) => (
                   <div key={dim} className="space-y-1.5">
                     <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
                       <span className="text-gray-400">{dim === 'D' ? '掌控' : dim === 'I' ? '影響' : dim === 'S' ? '穩定' : '分析'} ({dim})</span>
                       <span className="text-gray-900">{val as number}%</span>
                     </div>
                     <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         // Fix: Cast 'val' to number as Object.entries on a Record may infer 'unknown' in some TS environments
                         className={`h-full transition-all duration-1000 ${(val as number) > 70 ? 'bg-gray-900' : 'bg-gray-300'}`}
                         style={{ width: `${val}%` }}
                       />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Card Footer Brand */}
        <div className="bg-gray-900 p-8 text-center">
            <span className="text-white font-bold tracking-[0.4em] text-[10px] uppercase opacity-40">
              Generated by DISC Pro Insights Intelligence
            </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="group w-full sm:w-auto px-10 py-5 bg-black text-white rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          {isDownloading ? '正在生成...' : '保存高清結果卡片'}
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 text-gray-500 rounded-full font-bold hover:text-black hover:border-black transition-all active:scale-95"
        >
          重新開始測試
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
