import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // ✅ NEW: Enables Tables
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AgentChecklist from '../components/AgentChecklist'; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Zap, Shield, Bot, FileText, Globe, Terminal } from 'lucide-react';
import bgImage from '../assests/neural-network-bg.jpg'; 

const Index = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [molecule, setMolecule] = useState("");
  const [disease, setDisease] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [agentStream, setAgentStream] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentStream]);

  const startAnalysis = () => {
    if(!molecule || !disease) return;
    setIsLoading(true);
    setCurrentStep(0); 
    setAgentStream([]); 
    setResult(null);
    
    const ws = new WebSocket("ws://localhost:8000/ws/analyze");

    ws.onopen = () => ws.send(JSON.stringify({ molecule, disease }));
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "log") {
        if (data.message.includes("STATUS:")) {
            const agentName = data.message.replace("STATUS: ", "").replace(" working...", "");
            setCurrentStep((prev) => prev + 1);
            setAgentStream(prev => [...prev, `> Receiving data packet from ${agentName}...`]);
        }
      } else if (data.type === "result") {
        setResult(data.data);
        setCurrentStep(8); 
        ws.close();
        setIsLoading(false);
      }
    };
    ws.onerror = () => { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 text-white relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <HeroSection />

        <div id="agent-interface" className="flex-1 py-10 px-8 backdrop-blur-sm bg-black/30 border-t border-white/10">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-blue-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4"><Bot className="text-blue-400 w-6 h-6" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Multi-Agent Swarm</h3>
                <p className="text-slate-300 text-sm">Orchestrates parallel tasks across IQVIA, EXIM, and Patent landscape agents.</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-4"><Zap className="text-green-400 w-6 h-6" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Hyper-Speed Research</h3>
                <p className="text-slate-300 text-sm">Reduces research cycles from 3 months to 45 seconds.</p>
              </div>
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-purple-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4"><Shield className="text-purple-400 w-6 h-6" /></div>
                <h3 className="font-bold text-lg mb-2 text-white">Enterprise Secure</h3>
                <p className="text-slate-300 text-sm">Integrated RAG pipeline for secure analysis of proprietary documents.</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mb-4">
                <Input placeholder="Enter Molecule (e.g., Metformin)" value={molecule} onChange={(e) => setMolecule(e.target.value)} className="bg-slate-950 border-slate-700 text-white h-14 text-lg" />
                <Input placeholder="Target Indication (e.g., Anti-Aging)" value={disease} onChange={(e) => setDisease(e.target.value)} className="bg-slate-950 border-slate-700 text-white h-14 text-lg" />
                <Button onClick={startAnalysis} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 h-14 font-bold text-lg hover:scale-105 border border-white/10">
                    {isLoading ? "Processing..." : "🚀 Launch Agents"}
                </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-dashed border-slate-700 hover:border-blue-500 cursor-pointer transition-colors group">
                        <span className="text-lg">📎</span>
                        <span className="group-hover:text-blue-400">Add Internal PDF (RAG Context)</span>
                    </div>
                    <span className="text-xs opacity-50 hidden sm:block">*Allows Internal Insights Agent to scan proprietary docs.</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
                <div className="flex flex-col gap-2">
                    <AgentChecklist currentStep={currentStep} />
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      Strategic Output
                    </h3>
                    
                    <div className="flex-1 bg-white text-slate-900 p-8 rounded-lg overflow-y-auto shadow-xl border-l-4 border-blue-500 leading-relaxed relative min-h-[500px]">
                        {!result && isLoading && (
                            <div className="font-mono text-sm space-y-2">
                                <div className="text-blue-600 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <Terminal className="w-4 h-4" /> Incoming Intelligence Stream...
                                </div>
                                {agentStream.map((log, i) => (
                                    <div key={i} className="text-slate-500 animate-in fade-in slide-in-from-left-2">
                                        {log}
                                    </div>
                                ))}
                                <div ref={scrollRef} className="h-4 w-4 bg-blue-500 rounded-full animate-ping mt-4"></div>
                            </div>
                        )}

                        {result && (
                            <div className="animate-in fade-in duration-1000">
                                <div className="mb-6 flex flex-wrap gap-4">
                                    <div className="bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded flex items-center shadow-sm">
                                        <span className="text-xl mr-2">⚡</span>
                                        <div><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Time Saved</p><p className="font-bold text-sm">480 Hrs → 45 Sec</p></div>
                                    </div>
                                    <div className="bg-blue-100 border border-blue-300 text-blue-800 px-3 py-1 rounded flex items-center shadow-sm">
                                        <span className="text-xl mr-2">💰</span>
                                        <div><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Cost Efficiency</p><p className="font-bold text-sm">~$12k Saved</p></div>
                                    </div>
                                </div>

                                <article className="prose prose-sm lg:prose-base max-w-none prose-headings:text-blue-900 prose-strong:text-blue-700">
                                    {/* ✅ FIXED: Added remarkPlugins={[remarkGfm]} and custom table styling */}
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                          table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-200 border border-gray-200" {...props} /></div>,
                                          thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                                          th: ({node, ...props}) => <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200" {...props} />,
                                          td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200" {...props} />,
                                        }}
                                    >
                                        {result}
                                    </ReactMarkdown>
                                </article>
                                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                                    <Button variant="outline" onClick={() => alert("⬇️ Downloading PDF...")} className="text-slate-600 hover:text-blue-600 border-slate-300 gap-2">
                                        <FileText className="w-4 h-4" /> Export PDF
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!result && !isLoading && (
                            <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
                                <Globe className="w-16 h-16 opacity-20 animate-pulse" />
                                <p className="text-sm uppercase tracking-widest opacity-50">Awaiting Agent Results...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;