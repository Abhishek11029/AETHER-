import { CloudUpload, FileText, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentIntakeProps {
  onProcessingChange: (isProcessing: boolean) => void;
}

export default function DocumentIntake({ onProcessingChange }: DocumentIntakeProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      onProcessingChange(true);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsProcessing(false);
              onProcessingChange(false);
            }, 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <section className="bento-card p-6 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> Document Intake
        </h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">4 files queued</span>
      </div>

      <div 
        onClick={() => setIsProcessing(true)}
        className="flex-1 border border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-900/30 hover:border-primary/50 transition-all cursor-pointer group"
      >
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
          <CloudUpload className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-xs font-semibold text-white mb-1">Drag and drop assets</p>
        <p className="text-[10px] text-slate-600 font-mono tracking-tight text-center">PDF, TXT, DOCX, MD (Max 50MB)</p>
      </div>

      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-primary font-bold">
                <span>{progress < 100 ? `Processing...` : 'Success'}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsProcessing(true)}
        disabled={isProcessing}
        className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-bold rounded-xl transition-all disabled:opacity-50 text-[10px] uppercase tracking-widest"
      >
        {isProcessing ? 'System Working...' : 'Process Assets'}
      </motion.button>
    </section>
  );
}
