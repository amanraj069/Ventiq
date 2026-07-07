'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
 IconBulb,
 IconSend,
 IconCompass,
 IconHeart,
 IconShieldCheck,
 IconArrowRight,
 IconSparkles,
 IconChartBar,
} from '@tabler/icons-react';

interface UserInfo {
 userId: string;
 name: string;
 role: 'founder' | 'investor' | 'admin';
}

interface Idea {
 ideaId: string;
 title: string;
 oneLinePitch: string;
 status: string;
 createdAt: string;
}

interface Interest {
 interestId: string;
 ideaId: string;
 status: string;
 createdAt: string;
 idea: { title: string; oneLinePitch: string };
}

const fadeUp = {
 hidden: { opacity: 0, y: 16 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
 }),
};

export default function DashboardPage() {
 const router = useRouter();
 const [user, setUser] = useState<UserInfo | null>(null);
 const [ideas, setIdeas] = useState<Idea[]>([]);
 const [interests, setInterests] = useState<Interest[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 async function load() {
 try {
 const me = await apiFetch<UserInfo>('/api/users/me');
 setUser(me);

 if (me.role === 'founder') {
 const myIdeas = await apiFetch<Idea[]>('/api/ideas');
 setIdeas(myIdeas);
 } else if (me.role === 'investor') {
 try {
 const myInterests = await apiFetch<Interest[]>('/api/interests/mine');
 setInterests(myInterests);
 } catch { /* investor may not be verified yet */ }
 }
 } catch (error) {
 toast.error('Failed to load dashboard');
 } finally {
 setLoading(false);
 }
 }
 load();
 }, []);

 if (loading) {
 return (
 <div className="flex justify-center items-center py-20">
 <div className="w-8 h-8 border-4 border-border border-t-fg rounded-full animate-spin"></div>
 </div>
 );
 }

 if (!user) return null;

 // ── Founder Dashboard ──
 if (user.role === 'founder') {
 const evaluated = ideas.filter((i) => i.status === 'evaluated');
 const pending = ideas.filter((i) => i.status === 'submitted' || i.status === 'evaluating');

 return (
 <>
 {/* Greeting */}
 <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
 <h1 className="text-3xl font-bold text-fg">
 Welcome back, {user.name?.split(' ')[0] || 'Founder'} 👋
 </h1>
 <p className="text-fg-muted text-sm mt-1">Here's an overview of your startup pitches.</p>
 </motion.div>

 {/* Stat Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
 {[
 { label: 'Total Pitches', value: ideas.length, icon: <IconBulb size={20} /> },
 { label: 'Evaluated', value: evaluated.length, icon: <IconChartBar size={20} /> },
 { label: 'In Progress', value: pending.length, icon: <IconSparkles size={20} /> },
 ].map((stat, i) => (
 <motion.div
 key={stat.label}
 custom={i + 1}
 variants={fadeUp}
 initial="hidden"
 animate="visible"
 className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4"
 >
 <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-bg-elevated border border-border text-fg">
 {stat.icon}
 </div>
 <div>
 <p className="text-2xl font-bold text-fg font-tabular">{stat.value}</p>
 <p className="text-fg-faint text-xs">{stat.label}</p>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Quick Actions */}
 <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
 <button
 onClick={() => router.push('/submit')}
 className="w-full bg-fg text-bg rounded-2xl p-5 flex items-center justify-between hover:opacity-90 transition-all cursor-pointer group"
 >
 <div className="flex items-center gap-3">
 <IconSend size={20} />
 <div className="text-left">
 <p className="font-semibold">Submit a New Pitch</p>
 <p className="text-fg-secondary text-sm">Get AI-powered feedback on your startup idea.</p>
 </div>
 </div>
 <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
 </button>
 </motion.div>

 {/* Recent Ideas */}
 {ideas.length > 0 && (
 <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-fg">Recent Pitches</h2>
 <button
 onClick={() => router.push('/ideas')}
 className="text-fg-faint text-sm hover:text-fg flex items-center gap-1 cursor-pointer transition-colors"
 >
 View all <IconArrowRight size={14} />
 </button>
 </div>
 <div className="space-y-3">
 {ideas.slice(0, 5).map((idea, i) => (
 <motion.div
 key={idea.ideaId}
 custom={i + 6}
 variants={fadeUp}
 initial="hidden"
 animate="visible"
 onClick={() => router.push(`/ideas/${idea.ideaId}`)}
 className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-border transition-all cursor-pointer group"
 >
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-fg truncate group-hover:text-fg-secondary transition-colors">
 {idea.title}
 </p>
 <p className="text-fg-faint text-xs truncate mt-0.5">{idea.oneLinePitch}</p>
 </div>
 <span className={`ml-3 px-2.5 py-1 text-[10px] font-medium rounded-full border flex-shrink-0 ${
 idea.status === 'evaluated'
 ? 'bg-green-500/10 text-green-400 border-green-500/20'
 : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
 }`}>
 {idea.status === 'evaluated' ? 'Evaluated' : 'Processing'}
 </span>
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}
 </>
 );
 }

 // ── Investor Dashboard ──
 if (user.role === 'investor') {
 const approved = interests.filter((i) => i.status === 'approved');
 const pending = interests.filter((i) => i.status === 'pending');

 return (
 <>
 <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
 <h1 className="text-3xl font-bold text-fg">
 Welcome back, {user.name?.split(' ')[0] || 'Investor'} 👋
 </h1>
 <p className="text-fg-muted text-sm mt-1">Discover and connect with promising startups.</p>
 </motion.div>

 {/* Stat Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
 {[
 { label: 'Total Interests', value: interests.length, icon: <IconHeart size={20} /> },
 { label: 'Approved', value: approved.length, icon: <IconChartBar size={20} /> },
 { label: 'Pending', value: pending.length, icon: <IconSparkles size={20} /> },
 ].map((stat, i) => (
 <motion.div
 key={stat.label}
 custom={i + 1}
 variants={fadeUp}
 initial="hidden"
 animate="visible"
 className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4"
 >
 <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-bg-elevated border border-border text-fg">
 {stat.icon}
 </div>
 <div>
 <p className="text-2xl font-bold text-fg font-tabular">{stat.value}</p>
 <p className="text-fg-faint text-xs">{stat.label}</p>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Explore CTA */}
 <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
 <button
 onClick={() => router.push('/explore')}
 className="w-full bg-fg text-bg rounded-2xl p-5 flex items-center justify-between hover:opacity-90 transition-all cursor-pointer group"
 >
 <div className="flex items-center gap-3">
 <IconCompass size={20} />
 <div className="text-left">
 <p className="font-semibold">Explore Ideas</p>
 <p className="text-fg-secondary text-sm">Browse AI-evaluated startup pitches.</p>
 </div>
 </div>
 <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
 </button>
 </motion.div>

 {/* Recent Interests */}
 {interests.length > 0 && (
 <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-fg">Recent Interests</h2>
 <button
 onClick={() => router.push('/interests')}
 className="text-fg-faint text-sm hover:text-fg flex items-center gap-1 cursor-pointer transition-colors"
 >
 View all <IconArrowRight size={14} />
 </button>
 </div>
 <div className="space-y-3">
 {interests.slice(0, 5).map((interest, i) => (
 <motion.div
 key={interest.interestId}
 custom={i + 6}
 variants={fadeUp}
 initial="hidden"
 animate="visible"
 onClick={() => router.push(`/explore/${interest.ideaId}`)}
 className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-border transition-all cursor-pointer group"
 >
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-fg truncate group-hover:text-fg-secondary transition-colors">
 {interest.idea.title}
 </p>
 <p className="text-fg-faint text-xs truncate mt-0.5">{interest.idea.oneLinePitch}</p>
 </div>
 <span className={`ml-3 px-2.5 py-1 text-[10px] font-medium rounded-full border flex-shrink-0 ${
 interest.status === 'approved'
 ? 'bg-green-500/10 text-green-400 border-green-500/20'
 : interest.status === 'pending'
 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
 : 'bg-red-500/10 text-red-400 border-red-500/20'
 }`}>
 {interest.status.charAt(0).toUpperCase() + interest.status.slice(1)}
 </span>
 </motion.div>
 ))}
 </div>
 </motion.div>
 )}
 </>
 );
 }

 // ── Admin Dashboard ──
 return (
 <>
 <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
 <h1 className="text-3xl font-bold text-fg">
 Admin Dashboard
 </h1>
 <p className="text-fg-muted text-sm mt-1">Platform management tools.</p>
 </motion.div>

 <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
 <button
 onClick={() => router.push('/admin/investors')}
 className="w-full bg-card border border-border rounded-2xl p-6 flex items-center justify-between hover:border-border transition-all cursor-pointer group"
 >
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center text-fg-secondary">
 <IconShieldCheck size={24} />
 </div>
 <div className="text-left">
 <p className="font-semibold text-fg group-hover:text-fg-secondary transition-colors">Investor Verification</p>
 <p className="text-fg-muted text-sm">Review and approve pending investor accounts.</p>
 </div>
 </div>
 <IconArrowRight size={20} className="text-fg-faint group-hover:text-fg group-hover:translate-x-1 transition-all" />
 </button>
 </motion.div>
 </>
 );
}
