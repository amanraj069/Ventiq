'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { BackButton } from '@/components/ui/BackButton';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function IdeaDetailsPage({ params }: { params: Promise<{ ideaId: string }> }) {
  const router = useRouter();
  const { ideaId } = use(params);
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchIdea = async () => {
    try {
      const data = await apiFetch<any>(`/api/ideas/${ideaId}`);
      setIdea(data);
    } catch (error) {
      toast.error('Failed to load idea details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();

    // Poll if evaluating or submitted
    let intervalId: NodeJS.Timeout;
    if (idea && (idea.status === 'submitted' || idea.status === 'evaluating')) {
      intervalId = setInterval(() => {
        fetchIdea();
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [idea?.status]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!idea) return null;

  const isEvaluating = idea.status === 'submitted' || idea.status === 'evaluating';
  const score = idea.evaluation?.overallScore || 0;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-12 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {idea.title}
            </h1>
            <p className="text-white/60 mt-1">{idea.oneLinePitch}</p>
          </div>
        </div>

        {isEvaluating ? (
          <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold mb-2">AI is Evaluating Your Pitch</h2>
            <p className="text-white/60 max-w-md mx-auto">
              Our market research agent is currently analyzing your idea, target market, and competition. This usually takes 15-30 seconds.
            </p>
          </Card>
        ) : idea.evaluation ? (
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 filter blur-[100px] rounded-full"></div>
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full border-4 border-green-500/30 flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-green-500"
                        strokeDasharray={`${score * 3.01} 301`}
                      />
                    </svg>
                    <span className="text-4xl font-bold text-white">{score}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Market Research Score</h3>
                  <p className="text-white/80 leading-relaxed">
                    {idea.evaluation.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {idea.evaluation.strengths?.map((strength: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-white/80">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                    {(!idea.evaluation.strengths || idea.evaluation.strengths.length === 0) && (
                      <li className="text-white/40 italic">No specific strengths identified.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {idea.evaluation.weaknesses?.map((weakness: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-white/80">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                    {(!idea.evaluation.weaknesses || idea.evaluation.weaknesses.length === 0) && (
                      <li className="text-white/40 italic">No specific weaknesses identified.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm p-8 text-center">
            <p className="text-white/60">Evaluation data not found. It might have failed.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
