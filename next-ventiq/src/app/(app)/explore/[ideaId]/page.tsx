'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { BackButton } from '@/components/ui/BackButton';
import toast from 'react-hot-toast';
import { ScoreRing } from '@/components/score/ScoreRing';
import { RadarChart } from '@/components/score/RadarChart';
import { AgentCard } from '@/components/score/AgentCard';
import { CompetitorLandscape } from '@/components/score/CompetitorLandscape';
import { FinancialProjection } from '@/components/score/FinancialProjection';
import { RedTeamCritique } from '@/components/score/RedTeamCritique';

export default function ExploreIdeaPage({ params }: { params: Promise<{ ideaId: string }> }) {
 const router = useRouter();
 const { ideaId } = use(params);
 const [data, setData] = useState<any>(null);
 const [loading, setLoading] = useState(true);
 const [expressing, setExpressing] = useState(false);
 const [message, setMessage] = useState('');

 useEffect(() => {
 loadIdea();
 }, [ideaId]);

 async function loadIdea() {
 try {
 const result = await apiFetch<any>(`/api/ideas/explore/${ideaId}`);
 setData(result);
 } catch (error) {
 toast.error('Failed to load idea');
 } finally {
 setLoading(false);
 }
 }

 async function handleExpressInterest() {
 setExpressing(true);
 try {
 await apiFetch(`/api/interests/${ideaId}`, {
 method: 'POST',
 body: JSON.stringify({ message: message || undefined }),
 });
 toast.success('Interest expressed successfully!');
 loadIdea(); // Refresh to get updated status
 } catch (error: any) {
 toast.error(error?.message || 'Failed to express interest');
 } finally {
 setExpressing(false);
 }
 }

 if (loading) {
 return (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!data) return null;

 const evaluation = data.evaluation;
 const isUnlocked = data.isBreakdownUnlocked;

 return (
 <>
 {/* Header */}
 <div className="flex items-center gap-4 mb-8">
 <BackButton />
 <div className="flex-1 min-w-0">
 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate">
 {data.title}
 </h1>
 {data.oneLinePitch && (
 <p className="text-fg-muted mt-1 text-sm truncate">{data.oneLinePitch}</p>
 )}
 </div>
 </div>

 {/* Basic Info Card */}
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-8 mb-6 relative overflow-hidden">
 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
 {data.overallScore !== null && (
 <ScoreRing score={data.overallScore} size={140} strokeWidth={7} label="AI Score" />
 )}
 <div className="flex-1 text-center md:text-left">
 <p className="text-fg-secondary leading-relaxed text-sm mb-4">
 {data.description}
 </p>
 <div className="flex flex-wrap gap-2">
 {data.domain && (
 <span className="text-xs font-medium text-fg-secondary bg-bg-elevated px-3 py-1.5 rounded-full border border-border">
 {data.domain}
 </span>
 )}
 {data.targetMarket && (
 <span className="text-xs font-medium text-fg-secondary bg-bg-elevated px-3 py-1.5 rounded-full border border-border">
 {data.targetMarket}
 </span>
 )}
 </div>
 </div>
 </div>
 </div>

 {/* Interest Status / CTA */}
 {data.interestStatus === 'approved' ? (
 <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
 <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <span className="text-green-400 text-sm font-medium">Interest approved — full breakdown unlocked below.</span>
 </div>
 ) : data.interestStatus === 'pending' ? (
 <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
 <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <span className="text-yellow-400 text-sm font-medium">Your interest is pending founder approval.</span>
 </div>
 ) : data.interestStatus === 'declined' ? (
 <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
 <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <span className="text-red-400 text-sm font-medium">Your interest was declined by the founder.</span>
 </div>
 ) : (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6 mb-6">
 <h3 className="text-lg font-semibold text-fg mb-3">Express Interest</h3>
 <p className="text-fg-muted text-sm mb-4">
 Send a message to the founder. Once approved, you'll unlock the full AI-powered breakdown.
 </p>
 <textarea
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 placeholder="Optional: Tell the founder why you're interested..."
 rows={3}
 className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-fg placeholder-white/30 focus:outline-none focus:border-border transition-colors resize-none mb-4"
 />
 <button
 onClick={handleExpressInterest}
 disabled={expressing}
 className="px-6 py-2.5 text-sm font-medium rounded-xl bg-fg text-bg hover:opacity-90 transition-colors disabled:opacity-50 cursor-pointer"
 >
 {expressing ? 'Sending...' : '🤝 Express Interest'}
 </button>
 </div>
 )}

 {/* Breakdown Section — gated or unlocked */}
 {isUnlocked && evaluation ? (
 <div className="space-y-6">
 {/* Radar + Dimension Bars */}
 {evaluation.scoreBreakdown && (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2 mb-2">
 <span>📡</span> Score Breakdown
 </h3>
 <RadarChart scoreBreakdown={evaluation.scoreBreakdown} />
 </div>
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2 mb-5">
 <span>📏</span> Dimension Scores
 </h3>
 <div className="space-y-4">
 {Object.entries(evaluation.scoreBreakdown).map(([key, value]) => {
 const score = value as number;
 const label = key.charAt(0).toUpperCase() + key.slice(1);
 const barColor = score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div key={key}>
 <div className="flex items-center justify-between mb-1.5">
 <span className="text-sm font-medium text-fg-secondary">{label}</span>
 <span className="text-sm font-bold text-white/90" style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</span>
 </div>
 <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
 <div className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`} style={{ width: `${score}%` }} />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 )}

 {/* Strengths & Weaknesses */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
 Strengths
 </h3>
 <ul className="space-y-3">
 {(evaluation.strengths || []).map((s: string, i: number) => (
 <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
 <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span><span>{s}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6">
 <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2 mb-4">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
 Areas for Improvement
 </h3>
 <ul className="space-y-3">
 {(evaluation.weaknesses || []).map((w: string, i: number) => (
 <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
 <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span><span>{w}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Agent Cards */}
 {evaluation.agentOutputs?.length > 0 && (
 <div>
 <h3 className="text-lg font-semibold text-fg flex items-center gap-2 mb-4"><span>🤖</span> Agent Analysis</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {evaluation.agentOutputs.map((agent: any, i: number) => (
 <AgentCard key={i} agentName={agent.agentName} score={agent.score} reasoning={agent.reasoning} strengths={agent.strengths} weaknesses={agent.weaknesses} completedAt={agent.completedAt} />
 ))}
 </div>
 </div>
 )}

 {evaluation.competitorLandscape?.length > 0 && <CompetitorLandscape competitors={evaluation.competitorLandscape} />}
 {evaluation.financialProjection && <FinancialProjection financialProjection={evaluation.financialProjection} />}
 {evaluation.redTeamCritique && <RedTeamCritique redTeamCritique={evaluation.redTeamCritique} />}
 </div>
 ) : !data.interestStatus ? (
 /* Not yet expressed interest — show blurred placeholder */
 <div className="relative">
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-12 text-center">
 <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
 </svg>
 </div>
 <h3 className="text-xl font-medium text-fg mb-2">Full Breakdown Locked</h3>
 <p className="text-fg-muted text-sm max-w-md mx-auto">
 Express interest above to request access. The founder will review your request, and once approved, you'll see the complete AI-powered evaluation including agent analysis, competitor landscape, and financial projections.
 </p>
 </div>
 </div>
 ) : null}
 </>
 );
}
