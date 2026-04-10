
import React from 'react';
import {
  Radar, RadarChart as RechartsRadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { DISCDimension } from '../types';

interface RadarChartProps {
  percentages: Record<DISCDimension, number>;
  dominantColor: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ percentages, dominantColor }) => {
  const data = [
    { subject: '掌控 (D)', A: percentages[DISCDimension.D], fullMark: 100 },
    { subject: '影響 (I)', A: percentages[DISCDimension.I], fullMark: 100 },
    { subject: '穩定 (S)', A: percentages[DISCDimension.S], fullMark: 100 },
    { subject: '分析 (C)', A: percentages[DISCDimension.C], fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="DISC"
            dataKey="A"
            stroke={dominantColor}
            fill={dominantColor}
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
