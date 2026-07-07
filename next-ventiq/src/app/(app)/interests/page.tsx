'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';

interface Interest {
 interestId: string;
 ideaId: string;
 status: 'pending' | 'approved' | 'declined';
 message?: string;
 createdAt: string;
 idea: {
 ideaId: string;
 title: string;
 oneLinePitch: string;
 domain: string;
 status: string;
 };
}

export default function InterestsPage() {
 const router = useRouter();
 const [interests, setInterests] = useState<Interest[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 async function loadInterests() {
 try {
 const data = await apiFetch<Interest[]>('/api/interests/mine');
 setInterests(data);
 } catch (error) {
 toast.error('Failed to load interests');
 } finally {
 setLoading(false);
 }
 }
 loadInterests();
 }, []);

 const getStatusBadge = (status: string) => {
 switch (status) {
 case 'approved':
 return <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Approved</span>;
 case 'pending':
 return <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Pending</span>;
 case 'declined':
 return <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Declined</span>;
 default:
 return null;
 }
 };

 return (
 <>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-fg mb-2">
 My Interests
 </h1>
 <p className="text-fg-muted text-sm">
 Track the ideas you've expressed interest in and their approval status.
 </p>
 </div>

 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 ) : interests.length === 0 ? (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-12 text-center">
 <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
 </svg>
 </div>
 <h3 className="text-xl font-medium text-fg mb-2">No interests yet</h3>
 <p className="text-fg-muted text-sm max-w-md mx-auto mb-6">
 You haven't expressed interest in any ideas yet. Head over to the Explore feed to find exciting startups.
 </p>
 <button
 onClick={() => router.push('/explore')}
 className="px-6 py-2.5 text-sm font-medium rounded-xl bg-fg text-bg hover:bg-gray-100 transition-colors"
 >
 Explore Ideas
 </button>
 </div>
 ) : (
 <div className="space-y-4">
 {interests.map((interest) => (
 <div
 key={interest.interestId}
 onClick={() => router.push(`/explore/${interest.ideaId}`)}
 className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6 hover:border-border transition-all cursor-pointer group"
 >
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-3 mb-2">
 <h3 className="text-lg font-semibold text-fg group-hover:text-fg-secondary transition-colors truncate">
 {interest.idea.title}
 </h3>
 {getStatusBadge(interest.status)}
 </div>
 <p className="text-fg-muted text-sm truncate mb-2">
 {interest.idea.oneLinePitch || 'No pitch provided.'}
 </p>
 {interest.message && (
 <div className="bg-bg-elevated rounded-lg p-3 text-sm text-fg-secondary italic border-l-2 border-border">
 "{interest.message}"
 </div>
 )}
 </div>
 <div className="text-right">
 <div className="text-fg-faint text-xs mb-1">
 {new Date(interest.createdAt).toLocaleDateString()}
 </div>
 <div className="flex items-center justify-end gap-1 text-fg-faint text-xs group-hover:text-fg transition-colors">
 View Idea
 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </>
 );
}
