import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Library, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

// Types for Chat
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Array<{
    name: string;
    score: number;
    text: string;
  }>;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function NeuralChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'user',
      content: 'What is the secret codeword?',
      timestamp: '14:02 PM',
    },
    {
      role: 'assistant',
      content: 'The secret codeword retrieved from the secure knowledge vault is ZEBRA-774.',
      timestamp: '14:02 PM',
      sources: [
        { name: 'sample.txt', score: 0.91, text: '...the authorization protocols utilize the ZEBRA-774 pass-key for initial handshakes...' },
        { name: 'sample.pdf', score: 0.88, text: '...codeword allocation for project Aether is documented as ZEBRA-774...' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: "You are Aether AI, an Enterprise Agentic RAG system. Be concise and professional. Since you are a sim, you can generate some facts if you don't have access to documents, but add a warning if it is not from document.",
        }
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bento-card overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-sm text-white">Neural Chat Agent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Live Engine</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto mesh-gradient opacity-95 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end ml-auto max-w-[85%]" : "items-start max-w-[85%]")}>
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "px-5 py-3 rounded-2xl shadow-xl relative",
                msg.role === 'user' 
                  ? "bg-primary text-white rounded-tr-none shadow-primary/10" 
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-black/40"
              )}
            >
              {msg.role === 'assistant' && (
                <div className="flex gap-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-150" />
                </div>
              )}
              <div className="prose prose-invert prose-sm max-w-none">
                 <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-2 px-2 text-[9px] text-slate-500 uppercase font-bold tracking-widest">
              {msg.role === 'user' ? 'Local Terminal' : 'AI Node'} • {msg.timestamp}
            </div>

            {/* Sources */}
            {msg.sources && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pl-4 border-l-2 border-primary/20 space-y-3 mt-4 w-full"
              >
                <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                  <Library className="w-3 h-3" /> Source Context
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {msg.sources.map((source, sIdx) => (
                    <motion.div 
                      key={sIdx}
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex flex-col gap-1.5 hover:border-primary/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-primary font-bold">{source.name}</span>
                        <span className="text-[8px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-bold">
                          {(source.score * 100).toFixed(0)}% MATCH
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 group-hover:text-slate-300 transition-colors italic leading-relaxed">
                        "{source.text}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start gap-2 max-w-[85%]">
            <div className="bg-slate-900 border border-slate-800 text-slate-200 px-5 py-3 rounded-2xl rounded-tl-none shadow-xl flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-950/50 border-t border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 pl-4 transition-all focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/5">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query knowledge engine..." 
            className="bg-transparent border-none focus:ring-0 flex-1 text-white text-xs placeholder:text-slate-600"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-all disabled:opacity-20 disabled:grayscale"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
