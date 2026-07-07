'use client';

import { IconAlertTriangle } from '@tabler/icons-react';

interface RedTeamCritiqueProps {
 redTeamCritique: {
 summary: string;
 criticalRisks: string[];
 };
}

export function RedTeamCritique({ redTeamCritique }: RedTeamCritiqueProps) {
 return (
 <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/40 via-zinc-900/60 to-orange-950/30 backdrop-blur-sm">
 {/* Subtle glow in background */}
 
 <div className="relative z-10 p-6">
 <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2 mb-4">
 <IconAlertTriangle className="w-5 h-5" />
 Red-Team Critique
 </h3>

 <p className="text-fg-secondary text-sm leading-relaxed mb-5 border-l-2 border-red-500/30 pl-4">
 {redTeamCritique.summary}
 </p>

 {redTeamCritique.criticalRisks && redTeamCritique.criticalRisks.length > 0 && (
 <div>
 <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400/80 mb-3">
 Critical Risks
 </h4>
 <ul className="space-y-2.5">
 {redTeamCritique.criticalRisks.map((risk, i) => (
 <li
 key={i}
 className="flex items-start gap-3 text-sm text-white/65 bg-red-500/5 rounded-lg p-3 border border-red-500/10"
 >
 <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
 {i + 1}
 </span>
 <span>{risk}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </div>
 );
}
