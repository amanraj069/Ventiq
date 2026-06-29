'use client';

import { ScoreRing } from './ScoreRing';
import { IconRefresh } from '@tabler/icons-react';

interface EvaluationHistoryEntry {
  evaluationId: string;
  version: number;
  overallScore: number;
  createdAt: string;
  supersededAt?: string;
}

interface ScoreHistoryProps {
  history: EvaluationHistoryEntry[];
  currentVersion: number;
  onReEvaluate?: () => void;
  isReEvaluating?: boolean;
}

export function ScoreHistory({ history, currentVersion, onReEvaluate, isReEvaluating }: ScoreHistoryProps) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>📜</span> Evaluation History
        </h3>
        {onReEvaluate && (
          <button
            onClick={onReEvaluate}
            disabled={isReEvaluating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/20 hover:bg-purple-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <IconRefresh className={`w-3.5 h-3.5 ${isReEvaluating ? 'animate-spin' : ''}`} />
            {isReEvaluating ? 'Re-evaluating...' : 'Re-evaluate'}
          </button>
        )}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-4">
          {history.map((entry) => {
            const isCurrent = entry.version === currentVersion && !entry.supersededAt;
            return (
              <div key={entry.evaluationId} className="relative flex items-center gap-4 pl-10">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                    isCurrent
                      ? 'bg-purple-500 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                      : 'bg-zinc-800 border-white/20'
                  }`}
                />

                <div
                  className={`flex-1 flex items-center justify-between rounded-xl p-3 transition-colors ${
                    isCurrent
                      ? 'bg-purple-500/10 border border-purple-500/20'
                      : 'bg-white/[0.03] border border-white/5'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        Version {entry.version}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/40">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <ScoreRing score={entry.overallScore} size={40} strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
