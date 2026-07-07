'use client';

import {
 Radar,
 RadarChart as RechartsRadarChart,
 PolarGrid,
 PolarAngleAxis,
 PolarRadiusAxis,
 ResponsiveContainer,
 Tooltip,
} from 'recharts';

interface ScoreBreakdown {
 market?: number;
 team?: number;
 traction?: number;
 differentiation?: number;
 scalability?: number;
 clarity?: number;
}

interface RadarChartProps {
 scoreBreakdown: ScoreBreakdown;
 className?: string;
}

const DIMENSION_LABELS: Record<string, string> = {
 market: 'Market',
 team: 'Team',
 traction: 'Traction',
 differentiation: 'Differentiation',
 scalability: 'Scalability',
 clarity: 'Clarity',
};

export function RadarChart({ scoreBreakdown, className = '' }: RadarChartProps) {
 const data = Object.entries(DIMENSION_LABELS).map(([key, label]) => ({
 dimension: label,
 score: (scoreBreakdown as any)[key] ?? 0,
 fullMark: 100,
 }));

 return (
 <div className={`w-full ${className}`} style={{ minHeight: 320 }}>
 <ResponsiveContainer width="100%" height={320}>
 <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
 <PolarGrid
 stroke="rgba(255, 255, 255, 0.08)"
 strokeDasharray="3 3"
 />
 <PolarAngleAxis
 dataKey="dimension"
 tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: 500 }}
 />
 <PolarRadiusAxis
 angle={90}
 domain={[0, 100]}
 tick={{ fill: 'rgba(255, 255, 255, 0.3)', fontSize: 10 }}
 axisLine={false}
 />
 <Radar
 name="Score"
 dataKey="score"
 stroke="#a855f7"
 fill="url(#radarGradient)"
 fillOpacity={0.4}
 strokeWidth={2}
 dot={{
 r: 4,
 fill: '#a855f7',
 stroke: '#a855f7',
 strokeWidth: 2,
 }}
 />
 <Tooltip
 contentStyle={{
 backgroundColor: 'rgba(24, 24, 27, 0.95)',
 border: '1px solid rgba(255, 255, 255, 0.1)',
 borderRadius: '12px',
 color: '#fff',
 fontSize: '13px',
 padding: '8px 14px',
 backdropFilter: 'blur(12px)',
 }}
 formatter={(value: any) => [`${value}/100`, 'Score']}
 />
 <defs>
 <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6} />
 <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
 </linearGradient>
 </defs>
 </RechartsRadarChart>
 </ResponsiveContainer>
 </div>
 );
}
