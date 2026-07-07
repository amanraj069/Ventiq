'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { BackButton } from '@/components/ui/BackButton';
import toast from 'react-hot-toast';

interface InterestInboxItem {
 interestId: string;
 status: 'pending' | 'approved' | 'declined';
 message?: string;
 createdAt: string;
 investor: {
 userId: string;
 name: string;
 email: string;
 picture?: string;
 investorProfile?: {
 investorType?: string;
 checkSizeMin?: number;
 checkSizeMax?: number;
 sectors?: string[];
 linkedinUrl?: string;
 };
 };
}

export default function InterestInboxPage({ params }: { params: Promise<{ ideaId: string }> }) {
 const router = useRouter();
 const { ideaId } = use(params);
 const [interests, setInterests] = useState<InterestInboxItem[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 loadInbox();
 }, [ideaId]);

 async function loadInbox() {
 try {
 const data = await apiFetch<InterestInboxItem[]>(`/api/interests/inbox/${ideaId}`);
 setInterests(data);
 } catch (error) {
 toast.error('Failed to load interest inbox');
 } finally {
 setLoading(false);
 }
 }

 async function handleAction(interestId: string, action: 'approve' | 'decline') {
 try {
 await apiFetch(`/api/interests/${interestId}/${action}`, { method: 'PATCH' });
 toast.success(`Interest ${action}d successfully`);
 loadInbox();
 } catch (error: any) {
 toast.error(error.message || `Failed to ${action} interest`);
 }
 }

 const formatCurrency = (val?: number) => {
 if (!val) return 'N/A';
 return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
 };

 return (
 <>
 <div className="flex items-center gap-4 mb-8">
 <BackButton />
 <div>
 <h1 className="text-3xl font-bold text-fg">
 Investor Interest Inbox
 </h1>
 <p className="text-fg-muted text-sm mt-1">Review and approve investors who want to see your full breakdown.</p>
 </div>
 </div>

 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 ) : interests.length === 0 ? (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-12 text-center">
 <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
 </div>
 <h3 className="text-xl font-medium text-fg mb-2">Inbox Empty</h3>
 <p className="text-fg-muted text-sm">No investors have expressed interest in this idea yet.</p>
 </div>
 ) : (
 <div className="space-y-6">
 {interests.map((interest) => (
 <div key={interest.interestId} className="bg-card border border-border backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
 <div className="flex flex-col md:flex-row gap-6">
 {/* Investor Info */}
 <div className="flex-1">
 <div className="flex items-center gap-4 mb-4">
 {interest.investor.picture ? (
 <img src={interest.investor.picture} alt="" className="w-12 h-12 rounded-full object-cover border border-border" />
 ) : (
 <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center text-fg-muted font-medium">
 {interest.investor.name.charAt(0)}
 </div>
 )}
 <div>
 <h3 className="text-lg font-semibold text-fg">{interest.investor.name}</h3>
 <p className="text-fg-muted text-sm">{interest.investor.email}</p>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-bg-elevated p-4 rounded-xl">
 <div>
 <span className="text-fg-faint block mb-1">Type</span>
 <span className="text-fg capitalize">{interest.investor.investorProfile?.investorType || 'Unknown'}</span>
 </div>
 <div>
 <span className="text-fg-faint block mb-1">Check Size</span>
 <span className="text-fg">
 {formatCurrency(interest.investor.investorProfile?.checkSizeMin)} - {formatCurrency(interest.investor.investorProfile?.checkSizeMax)}
 </span>
 </div>
 <div className="col-span-2">
 <span className="text-fg-faint block mb-1">Sectors</span>
 <span className="text-fg">{(interest.investor.investorProfile?.sectors || []).join(', ') || 'Any'}</span>
 </div>
 {interest.investor.investorProfile?.linkedinUrl && (
 <div className="col-span-2">
 <a href={interest.investor.investorProfile.linkedinUrl} target="_blank" rel="noreferrer" className="text-fg-secondary hover:underline inline-flex items-center gap-1">
 LinkedIn Profile
 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
 </a>
 </div>
 )}
 </div>

 {interest.message && (
 <div className="bg-bg-elevated border border-border rounded-xl p-4 text-sm text-fg-secondary italic">
 <span className="text-fg-secondary not-italic font-semibold block mb-1">Message from investor:</span>
 "{interest.message}"
 </div>
 )}
 </div>

 {/* Actions / Status */}
 <div className="md:w-48 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
 {interest.status === 'pending' ? (
 <>
 <button
 onClick={() => handleAction(interest.interestId, 'approve')}
 className="w-full py-2.5 rounded-xl bg-green-500 text-fg font-medium hover:bg-green-400 transition-colors cursor-pointer text-sm"
 >
 Approve
 </button>
 <button
 onClick={() => handleAction(interest.interestId, 'decline')}
 className="w-full py-2.5 rounded-xl bg-bg-elevated text-fg font-medium hover:bg-bg-elevated transition-colors cursor-pointer text-sm border border-border"
 >
 Decline
 </button>
 </>
 ) : interest.status === 'approved' ? (
 <div className="text-center py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
 <span className="text-green-400 font-semibold block mb-1">Approved</span>
 <span className="text-green-400/70 text-xs">Full breakdown unlocked</span>
 </div>
 ) : (
 <div className="text-center py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
 <span className="text-red-400 font-semibold block">Declined</span>
 </div>
 )}
 <span className="text-fg-faint text-xs text-center mt-2">
 {new Date(interest.createdAt).toLocaleDateString()}
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
