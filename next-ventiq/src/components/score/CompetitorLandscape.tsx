'use client';

interface Competitor {
 name: string;
 description: string;
 threatLevel: 'low' | 'medium' | 'high';
}

interface CompetitorLandscapeProps {
 competitors: Competitor[];
}

const THREAT_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
 low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', label: 'Low Threat' },
 medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', label: 'Medium Threat' },
 high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', label: 'High Threat' },
};

export function CompetitorLandscape({ competitors }: CompetitorLandscapeProps) {
 if (!competitors || competitors.length === 0) {
 return (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2 mb-4">
 <span>⚔️</span> Competitor Landscape
 </h3>
 <p className="text-fg-faint text-sm italic">No competitor data available.</p>
 </div>
 );
 }

 return (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2 mb-5">
 <span>⚔️</span> Competitor Landscape
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {competitors.map((comp, i) => {
 const threat = THREAT_STYLES[comp.threatLevel] || THREAT_STYLES.medium;
 return (
 <div
 key={i}
 className={`rounded-xl border ${threat.border} ${threat.bg} p-4 transition-all hover:scale-[1.02]`}
 >
 <div className="flex items-start justify-between mb-2">
 <h4 className="font-semibold text-fg text-sm">{comp.name}</h4>
 <span className={`text-[10px] font-medium uppercase tracking-wider ${threat.text} whitespace-nowrap`}>
 {threat.label}
 </span>
 </div>
 <p className="text-white/55 text-xs leading-relaxed">{comp.description}</p>
 </div>
 );
 })}
 </div>
 </div>
 );
}
