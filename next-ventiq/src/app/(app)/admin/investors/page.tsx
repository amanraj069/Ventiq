'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { BackButton } from '@/components/ui/BackButton';

interface PendingInvestor {
 userId: string;
 name: string;
 email: string;
 picture?: string;
 investorVerificationStatus: string;
 createdAt: string;
 investorProfile?: {
 investorType?: string;
 checkSizeMin?: number;
 checkSizeMax?: number;
 sectors?: string[];
 linkedinUrl?: string;
 accreditationDeclared?: boolean;
 };
}

export default function AdminInvestorsPage() {
 const [investors, setInvestors] = useState<PendingInvestor[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 loadPending();
 }, []);

 async function loadPending() {
 try {
 const data = await apiFetch<PendingInvestor[]>('/api/users/admin/pending-investors');
 setInvestors(data);
 } catch (error: any) {
 if (error?.message?.includes('403') || error?.message?.includes('admin')) {
 toast.error('Access Denied. Only administrators can view this page.');
 } else {
 toast.error('Failed to load pending investors');
 }
 } finally {
 setLoading(false);
 }
 }

 async function handleVerification(userId: string, approved: boolean) {
 try {
 await apiFetch(`/api/users/admin/verify-investor/${userId}`, {
 method: 'PATCH',
 body: JSON.stringify({ approved }),
 });
 toast.success(`Investor ${approved ? 'verified' : 'rejected'} successfully`);
 loadPending(); // reload list
 } catch (error: any) {
 toast.error(error?.message || 'Failed to update verification status');
 }
 }

 const formatCurrency = (val?: number) => {
 if (!val) return 'N/A';
 return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
 };

 return (
 <>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-fg mb-2">
 Investor Verification
 </h1>
 <p className="text-fg-muted text-sm">
 Review and approve pending investor profiles. (Admin only)
 </p>
 </div>

 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 ) : investors.length === 0 ? (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl p-12 text-center">
 <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-fg-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 </div>
 <h3 className="text-xl font-medium text-fg mb-2">All caught up!</h3>
 <p className="text-fg-muted text-sm max-w-md mx-auto">
 There are no pending investor verification requests at this time.
 </p>
 </div>
 ) : (
 <div className="bg-card border border-border backdrop-blur-sm rounded-2xl overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm">
 <thead className="bg-bg-elevated border-b border-border text-fg-muted">
 <tr>
 <th className="px-6 py-4 font-medium">Investor</th>
 <th className="px-6 py-4 font-medium">Profile Info</th>
 <th className="px-6 py-4 font-medium">Sectors & Check Size</th>
 <th className="px-6 py-4 font-medium text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {investors.map((investor) => (
 <tr key={investor.userId} className="hover:bg-bg-elevated transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 {investor.picture ? (
 <img src={investor.picture} alt="" className="w-10 h-10 rounded-full border border-border" />
 ) : (
 <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center font-medium">
 {investor.name.charAt(0)}
 </div>
 )}
 <div>
 <div className="font-medium text-fg">{investor.name}</div>
 <div className="text-fg-muted text-xs">{investor.email}</div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="space-y-1">
 <div className="capitalize text-white/90">
 {investor.investorProfile?.investorType || 'Unknown'}
 </div>
 {investor.investorProfile?.accreditationDeclared && (
 <div className="text-xs text-green-400 font-medium">✓ Accredited</div>
 )}
 {investor.investorProfile?.linkedinUrl && (
 <a href={investor.investorProfile.linkedinUrl} target="_blank" rel="noreferrer" className="text-fg-secondary hover:underline text-xs flex items-center gap-1">
 LinkedIn <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
 </a>
 )}
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="space-y-1">
 <div className="text-white/90 text-xs bg-bg-elevated px-2 py-1 rounded inline-block mb-1">
 {formatCurrency(investor.investorProfile?.checkSizeMin)} - {formatCurrency(investor.investorProfile?.checkSizeMax)}
 </div>
 <div className="text-fg-muted text-xs truncate max-w-[200px]">
 {(investor.investorProfile?.sectors || []).join(', ') || 'Any Sector'}
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex justify-end gap-2">
 <button
 onClick={() => handleVerification(investor.userId, true)}
 className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-fg transition-colors text-sm font-medium border border-green-500/20 hover:border-green-500 cursor-pointer"
 >
 Approve
 </button>
 <button
 onClick={() => handleVerification(investor.userId, false)}
 className="px-4 py-2 rounded-lg bg-bg-elevated text-fg-secondary hover:bg-red-500 hover:text-fg transition-colors text-sm font-medium border border-border hover:border-red-500 cursor-pointer"
 >
 Reject
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}
 </>
 );
}
