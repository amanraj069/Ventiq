import { Input, Textarea, Select } from '@/components/ui';
import { usePitchStore } from '@/stores/usePitchStore';
import { motion } from 'framer-motion';

const TECHNICAL_OPTIONS = [
 { label: 'Select...', value: '' },
 { label: 'Yes, fully technical', value: 'yes' },
 { label: 'Partially technical', value: 'partially' },
 { label: 'No, non-technical', value: 'no' },
];

export function Step2Team() {
 const { teamData, setTeamData } = usePitchStore();

 return (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="space-y-6"
 >
 <div className="space-y-1">
 <h2 className="text-2xl font-semibold text-fg">Team</h2>
 <p className="text-sm text-fg-muted">Who is building this?</p>
 </div>

 <div className="space-y-5">
 <div className="grid sm:grid-cols-2 gap-5">
 <Input
 label="Number of Co-founders"
 type="number"
 min="1"
 required
 placeholder="e.g. 2"
 value={teamData.coFoundersCount}
 onChange={(e) => setTeamData({ coFoundersCount: e.target.value === '' ? '' : parseInt(e.target.value) })}
 />

 <Select
 label="Are founders technical?"
 required
 options={TECHNICAL_OPTIONS}
 value={teamData.hasTechnicalFounder || ''}
 onChange={(e) => setTeamData({ hasTechnicalFounder: e.target.value as any })}
 />
 </div>

 <Textarea
 label="Prior Relevant Experience (Optional)"
 rows={3}
 placeholder="Briefly describe the team's background and why you are the right people to build this."
 value={teamData.priorExperience}
 onChange={(e) => setTeamData({ priorExperience: e.target.value })}
 />

 <Input
 label="Total Team Size"
 type="number"
 min="1"
 placeholder="Including non-founders"
 value={teamData.totalTeamSize}
 onChange={(e) => setTeamData({ totalTeamSize: e.target.value === '' ? '' : parseInt(e.target.value) })}
 />
 <p className="text-xs text-fg-muted mt-1">
 This doesn't penalize size directly, but unlocks more accurate scoring context.
 </p>
 </div>
 </motion.div>
 );
}
