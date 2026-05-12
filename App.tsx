/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Activity, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DocumentIntake from './components/DocumentIntake';
import PipelineFlow from './components/PipelineFlow';
import NeuralChat from './components/NeuralChat';
import IntelligenceMetrics from './components/IntelligenceMetrics';
import InferenceChart from './components/InferenceChart';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setShowNotification('Agent deployed successfully to Production!');
      setTimeout(() => setShowNotification(null), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen mesh-gradient overflow-x-hidden selection:bg-primary/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header onDeploy={handleDeploy} isDeploying={isDeploying} />
      
      <main className="pl-64 pt-16 min-h-screen bg-background">
        <div className="p-6 max-w-[1600px] mx-auto grid grid-cols-12 gap-4 auto-rows-min">
          
          {/* Notification Toast */}
          <AnimatePresence>
            {showNotification && (
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 right-8 z-[100] bg-secondary text-white px-6 py-3 rounded-2xl shadow-xl shadow-secondary/20 flex items-center gap-3 font-bold text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                {showNotification}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Row 1: Hero & Metrics */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 lg:col-span-8 bento-card p-10 flex flex-col justify-center relative overflow-hidden group min-h-[320px]"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Neural Core Online
                </span>
                <span className="text-xs text-slate-500 font-mono">Build v2.4.0</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-3 tracking-tight">Agentic RAG System</h2>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                  Enterprise-grade neural retrieval and grounded generation platform for high-performance knowledge retrieval.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button className="px-6 py-2 bg-primary hover:bg-primary-soft text-white rounded-full text-xs font-bold transition-all shadow-lg shadow-primary/20">
                  Documentation
                </button>
                <div className="h-10 w-[1px] bg-slate-800" />
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 42}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
            <IntelligenceMetrics isProcessing={isProcessing} />
          </div>

          {/* Row 2: Intake & Performance */}
          <div className="col-span-12 lg:col-span-5">
            <DocumentIntake onProcessingChange={setIsProcessing} />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <InferenceChart />
          </div>

          {/* Row 3: Pipeline & Chat */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <PipelineFlow activeStep={isProcessing ? 2 : 3} />
            <div className="bento-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#10b981]" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Engine Health</p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                RAG pipeline is currently optimized for <span className="text-primary font-bold">Low Latency Retrieval</span>.
              </p>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[98%]" />
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <NeuralChat />
          </div>

        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center z-50 shadow-primary/30"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

