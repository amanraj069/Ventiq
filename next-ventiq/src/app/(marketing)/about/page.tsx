'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

export default function AboutPage() {
 return (
 <div className="relative overflow-hidden">
 <section className="py-20 sm:py-28 relative">
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 </div>
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
 <h1 className="text-4xl sm:text-5xl font-bold text-fg mb-8">About Ventiq</h1>

 <div className="prose-invert space-y-6 text-fg-muted leading-relaxed text-base">
 <p>
 Ventiq was born from a simple observation: <span className="text-fg font-medium">the early-stage fundraising process is broken</span>. Founders spend months crafting pitch decks, only to receive surface-level rejections. Investors drown in cold emails and unstructured pitches.
 </p>
 <p>
 We built Ventiq to bridge this gap with AI. Our multi-agent evaluation pipeline provides founders with <span className="text-fg font-medium">actionable, structured feedback</span> in minutes — the kind of analysis that typically requires weeks of advisory time.
 </p>

 <h2 className="text-2xl font-bold text-fg !mt-12 !mb-4">Our Mission</h2>
 <p>
 To democratize access to high-quality startup evaluation. Every founder, regardless of their network or background, deserves rigorous feedback on their idea. Every investor deserves a smarter way to discover promising ventures.
 </p>

 <h2 className="text-2xl font-bold text-fg !mt-12 !mb-4">How We're Different</h2>
 <ul className="space-y-3 list-none !pl-0">
 {[
 'Not a pitch deck builder — we evaluate ideas, not slides.',
 '8 specialized AI agents provide depth no single model can match.',
 'Rubric-based scoring ensures consistency and transparency.',
 'Investor matching is approval-gated, protecting both sides.',
 'Re-evaluation lets founders track improvement over time.',
 ].map((item) => (
 <li key={item} className="flex items-start gap-3">
 <span className="text-fg-secondary mt-1 flex-shrink-0">→</span>
 <span>{item}</span>
 </li>
 ))}
 </ul>

 <h2 className="text-2xl font-bold text-fg !mt-12 !mb-4">The Technology</h2>
 <p>
 Ventiq is powered by a pipeline of 8 specialized AI agents running on state-of-the-art language models. Each agent evaluates a specific dimension of a startup — market, team, traction, financials, differentiation, clarity, competition, and risk — producing independent assessments that are aggregated into a composite score.
 </p>
 <p>
 The system includes similarity detection via vector embeddings (preventing duplicate submissions), version-tracked evaluations (so founders can measure progress), and an approval-gated investor matching system.
 </p>
 </div>

 <div className="mt-12 flex flex-col sm:flex-row gap-3">
 <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-fg text-bg hover:bg-gray-100 transition-colors">
 See How It Works <IconArrowRight size={16} />
 </Link>
 <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-bg-elevated text-fg border border-border hover:bg-white/[0.1] transition-colors">
 Get Started
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 </div>
 );
}
