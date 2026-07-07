'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { ScoreRing } from '@/components/score/ScoreRing';

interface ExploreIdea {
 ideaId: string;
 title: string;
 oneLinePitch: string;
 domain: string;
 targetMarket: string;
 overallScore: number | null;
 createdAt: string;
}

const DOMAIN_OPTIONS = [
 'All Domains',
 'FinTech',
 'HealthTech',
 'EdTech',
 'SaaS',
 'E-commerce',
 'AI/ML',
 'CleanTech',
 'Social',
 'Gaming',
 'Marketplace',
 'Developer Tools',
 'Other',
];

export default function ExplorePage() {
 const router = useRouter();
 const [ideas, setIdeas] = useState<ExploreIdea[]>([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState('');
 const [domain, setDomain] = useState('');
 const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
 const [minScore, setMinScore] = useState(0);

 useEffect(() => {
 loadIdeas();
 }, [domain, sortBy, minScore]);

 async function loadIdeas() {
 setLoading(true);
 try {
 const params = new URLSearchParams();
 if (domain && domain !== 'All Domains') params.set('domain', domain);
 if (minScore > 0) params.set('minScore', String(minScore));
 if (sortBy === 'score') params.set('sort', 'score');
 const data = await apiFetch<ExploreIdea[]>(`/api/ideas/explore?${params.toString()}`);
 setIdeas(data);
 } catch (error: any) {
 if (error?.message?.includes('403') || error?.message?.includes('investor')) {
 toast.error('Only verified investors can access the Explore feed.');
 } else {
 toast.error('Failed to load explore feed');
 }
 } finally {
 setLoading(false);
 }
 }

 const filtered = search
 ? ideas.filter(
 (i) =>
 i.title.toLowerCase().includes(search.toLowerCase()) ||
 i.oneLinePitch?.toLowerCase().includes(search.toLowerCase()),
 )
 : ideas;

 return (
 <>
 {/* Header */}
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-fg mb-2">Explore Ideas</h1>
 <p className="text-fg-muted text-sm">
 Discover AI-evaluated startup ideas and express your interest.
 </p>
 </div>

 {/* Filters Bar */}
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-4 mb-8">
 <div className="flex flex-col md:flex-row gap-4">
 {/* Search */}
 <div className="flex-1 relative">
 <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
 </svg>
 <input
 type="text"
 placeholder="Search ideas..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full bg-bg-elevated border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-fg placeholder-white/30 focus:outline-none focus:border-border transition-colors"
 />
 </div>

 {/* Domain Filter */}
 <select
 value={domain}
 onChange={(e) => setDomain(e.target.value)}
 className="bg-bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-border transition-colors cursor-pointer appearance-none"
 >
 {DOMAIN_OPTIONS.map((d) => (
 <option key={d} value={d === 'All Domains' ? '' : d} className="bg-bg-elevated text-fg">
 {d}
 </option>
 ))}
 </select>

 {/* Sort */}
 <select
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
 className="bg-bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-border transition-colors cursor-pointer appearance-none"
 >
 <option value="date" className="bg-bg-elevated text-fg">Newest First</option>
 <option value="score" className="bg-bg-elevated text-fg">Highest Score</option>
 </select>

 {/* Min Score */}
 <div className="flex items-center gap-2">
 <span className="text-fg-faint text-xs whitespace-nowrap">Min: {minScore}</span>
 <input
 type="range"
 min="0"
 max="90"
 step="10"
 value={minScore}
 onChange={(e) => setMinScore(parseInt(e.target.value))}
 className="w-20 accent-fg"
 />
 </div>
 </div>
 </div>

 {/* Results */}
 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 ) : filtered.length === 0 ? (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-12 text-center">
 <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
 </svg>
 </div>
 <h3 className="text-xl font-medium text-fg mb-2">No ideas found</h3>
 <p className="text-fg-muted text-sm">Try adjusting your filters to see more results.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {filtered.map((idea) => (
 <div
 key={idea.ideaId}
 onClick={() => router.push(`/explore/${idea.ideaId}`)}
 className="bg-card border border-border backdrop-blur-sm rounded-2xl overflow-hidden hover:border-border transition-all cursor-pointer group"
 >
 <div className="p-6">
 <div className="flex items-start gap-4">
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold text-fg group-hover:text-fg-secondary transition-colors truncate">
 {idea.title}
 </h3>
 <p className="text-fg-muted text-sm mt-1 line-clamp-2">
 {idea.oneLinePitch || 'No pitch provided.'}
 </p>
 </div>
 {idea.overallScore !== null && (
 <ScoreRing score={idea.overallScore} size={52} strokeWidth={4} />
 )}
 </div>

 <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
 {idea.domain && (
 <span className="text-xs font-medium text-fg-secondary bg-bg-elevated px-2.5 py-1 rounded-full border border-border">
 {idea.domain}
 </span>
 )}
 <span className="text-fg-faint text-xs ml-auto">
 {new Date(idea.createdAt).toLocaleDateString()}
 </span>
 <span className="flex items-center gap-1 text-fg-faint text-xs group-hover:text-fg transition-colors">
 View
 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </>
 );
}
