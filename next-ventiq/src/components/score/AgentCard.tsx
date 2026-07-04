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

const AGENT_DISPLAY: Record<string, { label: string; icon: string; color: string }> = {
  MarketResearch: { label: 'Market Research', icon: '📊', color: 'from-purple-500/20 to-blue-500/20' },
  Differentiation: { label: 'Differentiation', icon: '💎', color: 'from-cyan-500/20 to-teal-500/20' },
  FinancialModel: { label: 'Financial Model', icon: '💰', color: 'from-green-500/20 to-emerald-500/20' },
  TeamFit: { label: 'Team Fit', icon: '👥', color: 'from-orange-500/20 to-amber-500/20' },
  Traction: { label: 'Traction', icon: '🚀', color: 'from-pink-500/20 to-rose-500/20' },
  Clarity: { label: 'Clarity', icon: '🎯', color: 'from-indigo-500/20 to-violet-500/20' },
  Regulatory: { label: 'Regulatory', icon: '⚖️', color: 'from-slate-500/20 to-zinc-500/20' },
  RedTeam: { label: 'Red-Team', icon: '🔴', color: 'from-red-500/20 to-orange-500/20' },
};

export function AgentCard({ agentName, score, reasoning, strengths = [], weaknesses = [], completedAt }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const display = AGENT_DISPLAY[agentName] || { label: agentName, icon: '🤖', color: 'from-gray-500/20 to-gray-600/20' };

  return (
    <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-white/15 transition-colors">
      {/* Header */}
      <div className={`bg-gradient-to-r ${display.color} p-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{display.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{display.label}</h3>
              {completedAt && (
                <span className="text-xs text-white/40">
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
        <p className="text-white/70 text-sm leading-relaxed">{reasoning}</p>

        {/* Expandable section */}
        {(strengths.length > 0 || weaknesses.length > 0) && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-4 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
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
                        <li key={i} className="flex items-start gap-2 text-xs text-white/60">
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
                        <li key={i} className="flex items-start gap-2 text-xs text-white/60">
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
