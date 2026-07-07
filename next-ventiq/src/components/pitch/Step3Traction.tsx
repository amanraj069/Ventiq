import { Input, Textarea, Select } from '@/components/ui';
import { usePitchStore } from '@/stores/usePitchStore';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_OPTIONS = [
 { label: 'Select...', value: '' },
 { label: 'Idea-only', value: 'Idea-only' },
 { label: 'Building (Pre-launch)', value: 'Building' },
 { label: 'Launched (Pre-revenue)', value: 'Launched' },
 { label: 'Generating Revenue', value: 'Generating Revenue' },
];

export function Step3Traction() {
 const { tractionData, setTractionData } = usePitchStore();

 const isLaunched = tractionData.tractionStatus === 'Launched' || tractionData.tractionStatus === 'Generating Revenue';

 return (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="space-y-6"
 >
 <div className="space-y-1">
 <h2 className="text-2xl font-semibold text-fg">Traction</h2>
 <p className="text-sm text-fg-muted">Where are you currently at?</p>
 </div>

 <div className="space-y-5">
 <Select
 label="Current Status"
 required
 options={STATUS_OPTIONS}
 value={tractionData.tractionStatus || ''}
 onChange={(e) => setTractionData({ tractionStatus: e.target.value as any })}
 />

 <AnimatePresence>
 {isLaunched && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="space-y-5 overflow-hidden"
 >
 <div className="grid sm:grid-cols-2 gap-5 mt-5">
 <Input
 label="User Count"
 type="number"
 placeholder="e.g. 1000"
 value={tractionData.userCount}
 onChange={(e) => setTractionData({ userCount: e.target.value === '' ? '' : parseInt(e.target.value) })}
 />
 
 <Input
 label="MRR ($) (Optional)"
 type="number"
 placeholder="e.g. 5000"
 value={tractionData.mrr}
 onChange={(e) => setTractionData({ mrr: e.target.value === '' ? '' : parseInt(e.target.value) })}
 />
 </div>

 <Input
 label="Retention Rate (Optional)"
 placeholder="e.g. 45% MoM"
 value={tractionData.retentionRate}
 onChange={(e) => setTractionData({ retentionRate: e.target.value })}
 />

 <Textarea
 label="Growth Trend (Optional)"
 rows={3}
 placeholder="How are you acquiring users and growing?"
 value={tractionData.growthTrend}
 onChange={(e) => setTractionData({ growthTrend: e.target.value })}
 />
 
 <p className="text-xs text-fg-muted">Skip any metrics that aren't applicable to your business yet.</p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </motion.div>
 );
}
