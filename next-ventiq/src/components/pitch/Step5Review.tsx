import { usePitchStore } from '@/stores/usePitchStore';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function Step5Review() {
 const { ideaData, teamData, tractionData, fundingData } = usePitchStore();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const router = useRouter();

 const handleSubmit = async () => {
 setIsSubmitting(true);
 try {
 const payload = {
 ...ideaData,
 ...teamData,
 ...tractionData,
 ...fundingData,
 };

 const result = await apiFetch('/ideas', {
 method: 'POST',
 body: JSON.stringify(payload),
 });

 if (result) {
 toast.success('Idea submitted successfully!');
 // Ideally go to /ideas/[ideaId] once we build it, but /ideas works for now
 router.push('/ideas');
 }
 } catch (error: any) {
 console.error(error);
 if (error.message === 'UPGRADE_REQUIRED') {
 toast(
 (t) => (
 <div className="flex flex-col gap-2">
 <span className="font-medium text-fg">Free Limit Reached</span>
 <span className="text-sm text-fg-muted">You have reached your 1 evaluation per month limit on the Free plan.</span>
 <Button size="sm" onClick={() => { toast.dismiss(t.id); router.push('/upgrade'); }}>
 Upgrade to Pro
 </Button>
 </div>
 ),
 { duration: 8000 }
 );
 } else {
 toast.error('Failed to submit idea. Please try again.');
 }
 } finally {
 setIsSubmitting(false);
 }
 };

 const renderField = (label: string, value: string | number | null | undefined) => (
 <div className="py-2 border-b border-border last:border-0">
 <dt className="text-xs font-medium text-fg-muted uppercase tracking-wider mb-1">{label}</dt>
 <dd className="text-sm text-fg">{value || '-'}</dd>
 </div>
 );

 return (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="space-y-6"
 >
 <div className="space-y-1">
 <h2 className="text-2xl font-semibold text-fg">Review & Submit</h2>
 <p className="text-sm text-fg-muted">Please review your pitch details before submission.</p>
 </div>

 <div className="space-y-6 bg-bg-elevated p-6 rounded-xl border border-border">
 <div>
 <h3 className="font-semibold text-fg mb-3">Idea Details</h3>
 <dl className="grid sm:grid-cols-2 gap-x-6">
 {renderField('Startup Name', ideaData.title)}
 {renderField('Domain', ideaData.domain)}
 {renderField('One-line Pitch', ideaData.oneLinePitch)}
 {renderField('Target Market', ideaData.targetMarket)}
 </dl>
 <dl className="mt-2">
 {renderField('Full Description', ideaData.description)}
 {renderField('Differentiation', ideaData.differentiation)}
 </dl>
 </div>

 <div>
 <h3 className="font-semibold text-fg mb-3">Team</h3>
 <dl className="grid sm:grid-cols-2 gap-x-6">
 {renderField('Co-founders', teamData.coFoundersCount)}
 {renderField('Technical Founder', teamData.hasTechnicalFounder)}
 {renderField('Team Size', teamData.totalTeamSize)}
 </dl>
 </div>

 <div>
 <h3 className="font-semibold text-fg mb-3">Traction</h3>
 <dl className="grid sm:grid-cols-2 gap-x-6">
 {renderField('Status', tractionData.tractionStatus)}
 {tractionData.tractionStatus === 'Launched' || tractionData.tractionStatus === 'Generating Revenue' ? (
 <>
 {renderField('Users', tractionData.userCount)}
 {renderField('MRR', tractionData.mrr)}
 </>
 ) : null}
 </dl>
 </div>

 <div>
 <h3 className="font-semibold text-fg mb-3">Funding</h3>
 <dl className="grid sm:grid-cols-2 gap-x-6">
 {renderField('Stage', fundingData.fundingStage)}
 {fundingData.fundingStage !== 'Not raising' ? (
 <>
 {renderField('Amount Seeking', `${fundingData.fundingAskCurrency} ${fundingData.fundingAsk}`)}
 </>
 ) : null}
 </dl>
 </div>
 </div>

 <Button
 className="w-full"
 size="lg"
 onClick={handleSubmit}
 disabled={isSubmitting}
 >
 {isSubmitting ? 'Submitting...' : 'Submit Pitch for AI Evaluation'}
 </Button>
 </motion.div>
 );
}
