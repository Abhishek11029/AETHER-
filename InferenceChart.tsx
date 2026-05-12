import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { time: '00:00', latency: 120 },
  { time: '00:05', latency: 180 },
  { time: '00:10', latency: 150 },
  { time: '00:15', latency: 250 },
  { time: '00:20', latency: 110 },
  { time: '00:25', latency: 190 },
  { time: '00:30', latency: 140 },
  { time: '00:35', latency: 175 },
];

export default function InferenceChart() {
  return (
    <div className="bento-card p-8 space-y-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-sm font-bold tracking-tight">Inference Performance</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-400">Week</span>
          <span className="text-[10px] text-slate-600 px-2 py-1">Month</span>
        </div>
      </div>
      
      <div className="flex-1 min-h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <Bar dataKey="latency" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 3 === 0 ? '#6366f1' : '#1e293b'} 
                  className="transition-all duration-300 hover:fill-primary-soft"
                />
              ))}
            </Bar>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#020617', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest pt-2 border-t border-slate-800/50">
        <span>00:00</span>
        <span>Avg Response Latency (ms)</span>
        <span>Active Node</span>
      </div>
    </div>
  );
}
