import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const metrics = [
  { label: 'Documents', value: 12, progress: 50, color: 'bg-primary' },
  { label: 'Chunks', value: 248, progress: 75, color: 'bg-secondary' },
  { label: 'Embeddings', value: 248, progress: 75, color: 'bg-tertiary' },
  { label: 'Accuracy', value: '96%', progress: 96, color: 'bg-secondary' },
];

interface IntelligenceMetricsProps {
  isProcessing: boolean;
}

export default function IntelligenceMetrics({ isProcessing }: IntelligenceMetricsProps) {
  return (
    <>
      {metrics.map((m) => (
        <motion.div 
          key={m.label}
          animate={{ scale: isProcessing ? [1, 1.02, 1] : 1 }}
          transition={{ repeat: isProcessing ? Infinity : 0, duration: 1.5 }}
          className="bento-card p-5 flex flex-col justify-between"
        >
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {m.label}
          </p>
          <motion.p 
            animate={{ opacity: isProcessing ? [0.6, 1, 0.6] : 1 }}
            className={cn(
              "text-2xl font-bold font-mono py-2",
              m.label === 'Accuracy' ? "text-secondary" : "text-white"
            )}>
            {m.value}
          </motion.p>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${m.progress}%` }}
              className={cn("h-full", m.color === 'bg-primary' ? 'bg-primary' : m.color === 'bg-secondary' ? 'bg-secondary' : 'bg-accent')}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}
