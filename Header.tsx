import { Search, Bell, HelpCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onDeploy: () => void;
  isDeploying: boolean;
}

export default function Header({ onDeploy, isDeploying }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 border-b border-slate-800/60 px-8 flex items-center justify-between bg-background/50 backdrop-blur-md z-40">
      <div className="flex items-center gap-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search pipelines..." 
            className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:border-primary/50 w-64 transition-all text-slate-300 placeholder:text-slate-600"
          />
        </div>
        <nav className="flex bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 gap-4 text-xs font-medium text-slate-400">
          <a href="#" className="text-primary hover:text-white transition-colors">Models</a>
          <a href="#" className="hover:text-white transition-colors">Pipelines</a>
          <a href="#" className="hover:text-white transition-colors">Logs</a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-1 text-slate-500 hover:text-primary transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-secondary rounded-full border-2 border-background" />
          </button>
          <button className="p-1 text-slate-500 hover:text-primary transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDeploy}
          disabled={isDeploying}
          className="bg-primary text-white px-5 py-1.5 font-bold rounded-full text-xs shadow-lg shadow-primary/20 flex items-center gap-2 min-w-[120px] justify-center disabled:opacity-50"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Deploying...
            </>
          ) : (
            'Deploy Agent'
          )}
        </motion.button>
      </div>
    </header>
  );
}
