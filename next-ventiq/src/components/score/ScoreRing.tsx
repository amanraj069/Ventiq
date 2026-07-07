'use client';

import { useEffect, useState } from 'react';

interface ScoreRingProps {
 score: number;
 size?: number;
 strokeWidth?: number;
 label?: string;
 className?: string;
}

export function ScoreRing({ score, size = 140, strokeWidth = 6, label, className = '' }: ScoreRingProps) {
 const [animatedScore, setAnimatedScore] = useState(0);
 const radius = (size - strokeWidth) / 2;
 const circumference = 2 * Math.PI * radius;
 const offset = circumference - (animatedScore / 100) * circumference;

 // Animate on mount
 useEffect(() => {
 const timer = setTimeout(() => setAnimatedScore(score), 100);
 return () => clearTimeout(timer);
 }, [score]);

 const getScoreColor = (s: number) => {
 if (s >= 70) return { stroke: '#22c55e', glow: 'rgba(34, 197, 94, 0.3)', text: 'text-green-400' };
 if (s >= 40) return { stroke: '#eab308', glow: 'rgba(234, 179, 8, 0.3)', text: 'text-yellow-400' };
 return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)', text: 'text-red-400' };
 };

 const colors = getScoreColor(score);

 return (
 <div className={`flex flex-col items-center gap-2 ${className}`}>
 <div className="relative" style={{ width: size, height: size }}>
 <svg
 className="transform -rotate-90"
 width={size}
 height={size}
 viewBox={`0 0 ${size} ${size}`}
 >
 {/* Background track */}
 <circle
 cx={size / 2}
 cy={size / 2}
 r={radius}
 fill="transparent"
 stroke="rgba(255, 255, 255, 0.08)"
 strokeWidth={strokeWidth}
 />
 {/* Score arc */}
 <circle
 cx={size / 2}
 cy={size / 2}
 r={radius}
 fill="transparent"
 stroke={colors.stroke}
 strokeWidth={strokeWidth}
 strokeLinecap="round"
 strokeDasharray={circumference}
 strokeDashoffset={offset}
 style={{
 transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
 filter: `drop-shadow(0 0 8px ${colors.glow})`,
 }}
 />
 </svg>
 {/* Center text */}
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className={`text-3xl font-bold ${colors.text}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
 {animatedScore}
 </span>
 <span className="text-[10px] uppercase tracking-wider text-fg-faint font-medium">/ 100</span>
 </div>
 </div>
 {label && (
 <span className="text-xs font-medium text-fg-muted uppercase tracking-wider">{label}</span>
 )}
 </div>
 );
}
