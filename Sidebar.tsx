import { 
  LayoutDashboard, 
  CloudUpload, 
  Database, 
  History, 
  Settings, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: CloudUpload, label: 'Upload' },
  { icon: Database, label: 'Vector DB' },
  { icon: History, label: 'History' },
  { icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-800/60 bg-background/50 backdrop-blur-xl flex flex-col py-8 px-4 z-50 transition-all duration-300">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">A</div>
          Aether AI
        </h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">
          Enterprise Agentic RAG
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            whileHover={{ x: 4 }}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group",
              activeTab === item.label 
                ? "bg-slate-900 border border-slate-800 text-primary" 
                : "text-slate-400 hover:text-white hover:bg-slate-900/50"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.label ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-primary hover:bg-primary-soft rounded-xl text-white text-xs font-bold transition-colors shadow-lg shadow-primary/20"
        >
          Upgrade to Pro
        </motion.button>
        
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
            AR
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold truncate text-xs">Alex Rivera</p>
            <p className="text-slate-500 text-[10px] truncate leading-none mt-0.5">Lead Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
