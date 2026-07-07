'use client';

import { useState } from 'react';
import { ScoreRing } from './ScoreRing';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface AgentCardProps {
 agentName: string;
 score: number;
 reasoning: string;
 strengths?: string[];
 weaknesses?: string[];
 completedAt?: string;
}

const AGENT_DISPLAY: Record<string, { label: string; icon: string }> = {
 MarketResearch: { label: 'Market Research', icon: '📊' },
 Differentiation: { label: 'Differentiation', icon: '💎' },
 FinancialModel: { label: 'Financial Model', icon: '💰' },
 TeamFit: { label: 'Team Fit', icon: '👥' },
 Traction: { label: 'Traction', icon: '🚀' },
 Clarity: { label: 'Clarity', icon: '🎯' },
 Regulatory: { label: 'Regulatory', icon: '⚖️' },
 RedTeam: { label: 'Red-Team', icon: '🔴' },
};

export function AgentCard({ agentName, score, reasoning, strengths = [], weaknesses = [], completedAt }: AgentCardProps) {
 const [expanded, setExpanded] = useState(false);
 const display = AGENT_DISPLAY[agentName] || { label: agentName, icon: '🤖' };

 return (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl overflow-hidden hover:border-border transition-colors">
 {/* Header */}
 <div className="bg-bg-elevated p-5 border-b border-border">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <span className="text-2xl">{display.icon}</span>
 <div>
 <h3 className="text-lg font-semibold text-fg">{display.label}</h3>
 {completedAt && (
 <span className="text-xs text-fg-faint">
 {new Date(completedAt).toLocaleString()}
 </span>
 )}
 </div>
 </div>
 <ScoreRing score={score} size={56} strokeWidth={4} />
 </div>
 </div>

 {/* Reasoning */}
 <div className="p-5">
 <p className="text-fg-secondary text-sm leading-relaxed">{reasoning}</p>

 {/* Expandable section */}
 {(strengths.length > 0 || weaknesses.length > 0) && (
 <>
 <button
 onClick={() => setExpanded(!expanded)}
 className="flex items-center gap-1 mt-4 text-xs font-medium text-fg-secondary hover:text-fg-secondary transition-colors cursor-pointer"
 >
 {expanded ? 'Show less' : 'Show details'}
 {expanded ? (
 <IconChevronUp className="w-3.5 h-3.5" />
 ) : (
 <IconChevronDown className="w-3.5 h-3.5" />
 )}
 </button>

 {expanded && (
 <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
 {strengths.length > 0 && (
 <div>
 <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Strengths</h4>
 <ul className="space-y-1.5">
 {strengths.map((s, i) => (
 <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
 <span className="text-green-500 mt-0.5">✓</span>
 <span>{s}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 {weaknesses.length > 0 && (
 <div>
 <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Weaknesses</h4>
 <ul className="space-y-1.5">
 {weaknesses.map((w, i) => (
 <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
 <span className="text-red-500 mt-0.5">✗</span>
 <span>{w}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}
 </>
 )}
 </div>
 </div>
 );
}
