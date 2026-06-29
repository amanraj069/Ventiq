'use client';

import { useEffect, useState, use, useCallback } from 'react';
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
import { ScoreHistory } from '@/components/score/ScoreHistory';

export default function IdeaDetailsPage({ params }: { params: Promise<{ ideaId: string }> }) {
  const router = useRouter();
  const { ideaId } = use(params);
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reEvaluating, setReEvaluating] = useState(false);

  const fetchIdea = useCallback(async () => {
    try {
      const data = await apiFetch<any>(`/api/ideas/${ideaId}`);
      setIdea(data);
    } catch (error) {
      toast.error('Failed to load idea details');
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  // Poll while evaluating
  useEffect(() => {
    if (!idea) return;
    if (idea.status !== 'submitted' && idea.status !== 'evaluating') return;

    const intervalId = setInterval(() => {
      fetchIdea();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [idea?.status, fetchIdea]);

  const handleReEvaluate = async () => {
    setReEvaluating(true);
    try {
      await apiFetch(`/api/ideas/${ideaId}/re-evaluate`, { method: 'POST' });
      toast.success('Re-evaluation started!');
      // Wait a moment then start polling
      setTimeout(() => {
        fetchIdea();
        setReEvaluating(false);
      }, 1500);
    } catch (error) {
      toast.error('Failed to start re-evaluation');
      setReEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!idea) return null;

  const isEvaluating = idea.status === 'submitted' || idea.status === 'evaluating';
  const evaluation = idea.evaluation;
  const history = idea.evaluationHistory || [];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 pt-12 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate">
              {idea.title}
            </h1>
            {idea.oneLinePitch && (
              <p className="text-white/50 mt-1 text-sm truncate">{idea.oneLinePitch}</p>
            )}
          </div>
        </div>

        {/* Evaluating State */}
        {isEvaluating ? (
          <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold mb-2">AI is Evaluating Your Pitch</h2>
            <p className="text-white/50 max-w-md mx-auto text-sm">
              Our AI agent is analyzing your idea across multiple dimensions — market potential, team, traction, differentiation, financials, and more. This usually takes 15-30 seconds.
            </p>
          </div>
        ) : evaluation ? (
          <div className="space-y-6">

            {/* ── Hero: Overall Score + Summary ── */}
            <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 filter blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={evaluation.overallScore || 0} size={160} strokeWidth={8} label="Overall Score" />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-semibold mb-3 text-white">Evaluation Summary</h2>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {evaluation.summary}
                  </p>
                  {evaluation.version && (
                    <span className="inline-block mt-3 text-[11px] font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      Version {evaluation.version}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Radar Chart + Dimension Scores ── */}
            {evaluation.scoreBreakdown && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar */}
                <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                    <span>📡</span> Score Breakdown
                  </h3>
                  <RadarChart scoreBreakdown={evaluation.scoreBreakdown} />
                </div>

                {/* Dimension bars */}
                <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                    <span>📏</span> Dimension Scores
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(evaluation.scoreBreakdown).map(([key, value]) => {
                      const score = value as number;
                      const label = key.charAt(0).toUpperCase() + key.slice(1);
                      const barColor =
                        score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500';
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-white/80">{label}</span>
                            <span className="text-sm font-bold text-white/90" style={{ fontVariantNumeric: 'tabular-nums' }}>
                              {score}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Strengths & Weaknesses ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {(evaluation.strengths || []).map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                  {(!evaluation.strengths || evaluation.strengths.length === 0) && (
                    <li className="text-white/30 italic text-sm">No strengths identified.</li>
                  )}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {(evaluation.weaknesses || []).map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>
                      <span>{w}</span>
                    </li>
                  ))}
                  {(!evaluation.weaknesses || evaluation.weaknesses.length === 0) && (
                    <li className="text-white/30 italic text-sm">No weaknesses identified.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* ── Agent Output Cards ── */}
            {evaluation.agentOutputs && evaluation.agentOutputs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <span>🤖</span> Agent Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {evaluation.agentOutputs.map((agent: any, i: number) => (
                    <AgentCard
                      key={i}
                      agentName={agent.agentName}
                      score={agent.score}
                      reasoning={agent.reasoning}
                      strengths={agent.strengths}
                      weaknesses={agent.weaknesses}
                      completedAt={agent.completedAt}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Competitor Landscape ── */}
            {evaluation.competitorLandscape && evaluation.competitorLandscape.length > 0 && (
              <CompetitorLandscape competitors={evaluation.competitorLandscape} />
            )}

            {/* ── Financial Projection ── */}
            {evaluation.financialProjection && (
              <FinancialProjection financialProjection={evaluation.financialProjection} />
            )}

            {/* ── Red-Team Critique ── */}
            {evaluation.redTeamCritique && (
              <RedTeamCritique redTeamCritique={evaluation.redTeamCritique} />
            )}

            {/* ── Score History ── */}
            <ScoreHistory
              history={history}
              currentVersion={evaluation.version || 1}
              onReEvaluate={handleReEvaluate}
              isReEvaluating={reEvaluating}
            />

          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <p className="text-white/50">Evaluation data not found. It might have failed.</p>
            <button
              onClick={handleReEvaluate}
              disabled={reEvaluating}
              className="mt-4 px-6 py-2.5 text-sm font-medium rounded-xl bg-purple-500 text-white hover:bg-purple-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {reEvaluating ? 'Starting...' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
