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
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <div className="flex items-center justify-between mb-5">
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
 <span>📜</span> Evaluation History
 </h3>
 {onReEvaluate && (
 <button
 onClick={onReEvaluate}
 disabled={isReEvaluating}
 className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-bg-elevated text-fg-secondary border border-border hover:bg-bg-elevated transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
 >
 <IconRefresh className={`w-3.5 h-3.5 ${isReEvaluating ? 'animate-spin' : ''}`} />
 {isReEvaluating ? 'Re-evaluating...' : 'Re-evaluate'}
 </button>
 )}
 </div>

 <div className="relative">
 {/* Timeline line */}
 <div className="absolute left-[18px] top-0 bottom-0 w-px bg-bg-elevated" />

 <div className="space-y-4">
 {history.map((entry) => {
 const isCurrent = entry.version === currentVersion && !entry.supersededAt;
 return (
 <div key={entry.evaluationId} className="relative flex items-center gap-4 pl-10">
 {/* Timeline dot */}
 <div
 className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
 isCurrent
 ? 'bg-purple-500 border-border shadow-md'
 : 'bg-zinc-800 border-border'
 }`}
 />

 <div
 className={`flex-1 flex items-center justify-between rounded-xl p-3 transition-colors ${
 isCurrent
 ? 'bg-bg-elevated border border-border'
 : 'bg-bg-elevated border border-border'
 }`}
 >
 <div>
 <div className="flex items-center gap-2">
 <span className="text-sm font-medium text-fg">
 Version {entry.version}
 </span>
 {isCurrent && (
 <span className="text-[10px] font-medium uppercase tracking-wider text-fg-secondary bg-bg-elevated px-2 py-0.5 rounded-full">
 Current
 </span>
 )}
 </div>
 <span className="text-xs text-fg-faint">
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
