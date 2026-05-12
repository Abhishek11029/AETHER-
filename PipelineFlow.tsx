import { 
  FileText, 
  Scissors, 
  Layers, 
  Database, 
  Search, 
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const steps = [
  { icon: FileText, label: 'Documents', status: 'completed' },
  { icon: Scissors, label: 'Chunking', status: 'completed' },
  { icon: Layers, label: 'Embeddings', status: 'completed' },
  { icon: Database, label: 'ChromaDB', status: 'active' },
  { icon: Search, label: 'Retriever', status: 'pending' },
  { icon: BrainCircuit, label: 'LLM', status: 'pending' },
];

interface PipelineFlowProps {
  activeStep: number;
}

export default function PipelineFlow({ activeStep }: PipelineFlowProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-[10px] text-slate-500 uppercase tracking-widest px-2 font-bold">
        Pipeline Execution Flow
      </h3>
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {steps.map((step, idx) => {
          const status = idx < activeStep ? 'completed' : idx === activeStep ? 'active' : 'pending';
          return (
            <div key={step.label} className="flex items-center shrink-0">
              <motion.div 
                whileHover={{ y: -2 }}
                className={cn(
                  "w-32 bg-slate-900 border p-4 rounded-3xl text-center relative transition-all cursor-default",
                  status === 'completed' && "border-primary/40",
                  status === 'active' && "border-indigo-500 shadow-lg shadow-primary/20",
                  status === 'pending' && "opacity-40 border-slate-800"
                )}
              >
                <step.icon className={cn(
                  "w-5 h-5 mx-auto mb-2",
                  status === 'completed' || status === 'active' ? "text-primary" : "text-slate-500"
                )} />
                <p className="text-[10px] font-bold uppercase tracking-tight">{step.label}</p>
                
                {status === 'completed' && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-secondary rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-2 h-2 text-white" />
                  </div>
                )}
                {status === 'active' && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse absolute top-2 right-2 shadow-[0_0_8px_#6366f1]" />
                )}
              </motion.div>
              
              {idx < steps.length - 1 && (
                <div className="w-4 h-[1px] bg-slate-800 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
