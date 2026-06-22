'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { BackButton } from '@/components/ui/BackButton';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';

interface Idea {
  ideaId: string;
  title: string;
  oneLinePitch: string;
  status: 'draft' | 'submitted' | 'evaluating' | 'evaluated';
  createdAt: string;
}

export default function IdeasPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIdeas() {
      try {
        const data = await apiFetch<Idea[]>('/api/ideas');
        setIdeas(data);
      } catch (error) {
        toast.error('Failed to load ideas');
      } finally {
        setLoading(false);
      }
    }
    loadIdeas();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'evaluating':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'evaluated':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'In Queue';
      case 'evaluating':
        return 'Evaluating...';
      case 'evaluated':
        return 'Evaluated';
      default:
        return 'Draft';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 pt-12">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            My Pitches
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : ideas.length === 0 ? (
          <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No pitches yet</h3>
              <p className="text-white/60 mb-6 max-w-md">
                Submit your first startup idea to get AI-powered feedback and connect with investors.
              </p>
              <button
                onClick={() => router.push('/submit')}
                className="px-6 py-3 rounded-xl font-medium bg-white text-black hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Submit an Idea
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <Card 
                key={idea.ideaId} 
                className="bg-zinc-900/50 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all cursor-pointer overflow-hidden group"
                onClick={() => router.push(`/ideas/${idea.ideaId}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
                      {idea.title}
                    </CardTitle>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(idea.status)}`}>
                      {getStatusLabel(idea.status)}
                    </span>
                  </div>
                  <CardDescription className="text-white/60 line-clamp-2 min-h-[40px]">
                    {idea.oneLinePitch || 'No one line pitch provided.'}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 text-white/40 text-sm flex justify-between items-center border-t border-white/5 mt-4 pt-4">
                  <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                    View Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
