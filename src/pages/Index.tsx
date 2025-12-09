import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AgentTerminal from '../components/LiveTerminal'; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Zap, Shield, Bot, FileText, Activity, Globe } from 'lucide-react';

// Import the image directly to ensure Vite bundles it correctly
// Make sure the path matches your folder structure exactly
import bgImage from '../assests/neural-network-bg.jpg'; 

const Index = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [molecule, setMolecule] = useState("");
  const [disease, setDisease] = useState("");

  const startAnalysis = () => {
    if(!molecule || !disease) return;
    setIsLoading(true);
    setLogs(["Initializing secure connection to AtreyaCore..."]);
    setResult(null);
    const ws = new WebSocket("ws://localhost:8000/ws/analyze");

    ws.onopen = () => ws.send(JSON.stringify({ molecule, disease }));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "log") setLogs((prev) => [...prev, data.message]);
      else if (data.type === "result") { setResult(data.data); ws.close(); setIsLoading(false); }
    };
    ws.onerror = () => { setLogs(prev => [...prev, "ERROR: Connection failed."]); setIsLoading(false); }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 text-white relative">
      
      {/* --- GLOBAL BACKGROUND (Fixed) --- */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }} 
        />
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* --- CONTENT WRAPPER (Sits on top of background) --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Navigation />
        
        {/* This HeroSection is now transparent, so the background image shows through! */}
        <HeroSection />

        {/* --- MAIN INTERFACE (Glass Effect) --- */}
        <div id="agent-interface" className="flex-1 py-10 px-8 backdrop-blur-sm bg-black/30 border-t border-white/10">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-blue-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Multi-Agent Swarm</h3>
                <p className="text-slate-300 text-sm">Orchestrates parallel tasks across IQVIA, EXIM, and Patent landscape agents.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-green-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-green-400 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Hyper-Speed Research</h3>
                <p className="text-slate-300 text-sm">Reduces research cycles from 3 months to 45 seconds using automated evaluation.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-xl hover:border-purple-500/50 transition-colors backdrop-blur-md">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-purple-400 w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Enterprise Secure</h3>
                <p className="text-slate-300 text-sm">Integrated RAG pipeline for secure analysis of proprietary documents.</p>
              </div>
            </div>

            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 p-6 bg-black/40 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
              <Input 
                placeholder="Enter Molecule (e.g., Metformin)" 
                value={molecule}
                onChange={(e) => setMolecule(e.target.value)}
                className="bg-black/50 border-white/20 text-white h-14 text-lg placeholder:text-slate-500"
              />
              <Input 
                placeholder="Target Indication (e.g., Anti-Aging)" 
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="bg-black/50 border-white/20 text-white h-14 text-lg placeholder:text-slate-500"
              />
              <Button 
                onClick={startAnalysis}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-14 font-bold text-lg shadow-lg hover:scale-105 border border-white/10"
              >
                {isLoading ? "Processing..." : "🚀 Launch Agents"}
              </Button>
            </div>

            {/* TERMINAL & REPORT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-500" />
                      Live Agent Operations
                    </h3>
                    <AgentTerminal logs={logs} />
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      Strategic Output
                    </h3>
                    
                    <div className="flex-1 bg-white text-slate-900 p-8 rounded-lg overflow-y-auto shadow-xl border-l-4 border-blue-500 leading-relaxed relative min-h-[500px]">
                        {result && (
                          <div className="mb-6 flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded flex items-center shadow-sm">
                              <span className="text-xl mr-2">⚡</span>
                              <div><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Time Saved</p><p className="font-bold text-sm">480 Hrs → 45 Sec</p></div>
                            </div>
                            <div className="bg-blue-100 border border-blue-300 text-blue-800 px-3 py-1 rounded flex items-center shadow-sm">
                              <span className="text-xl mr-2">💰</span>
                              <div><p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Cost Efficiency</p><p className="font-bold text-sm">~$12k Saved</p></div>
                            </div>
                          </div>
                        )}
                        {result ? (
                            <div className="animate-in fade-in duration-1000">
                              <article className="prose prose-sm lg:prose-base max-w-none prose-headings:text-blue-900 prose-strong:text-blue-700">
                                  <ReactMarkdown>{result}</ReactMarkdown>
                              </article>
                              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                                  <Button variant="outline" onClick={() => alert("⬇️ Downloading PDF...")} className="text-slate-600 hover:text-blue-600 border-slate-300 gap-2">
                                    <FileText className="w-4 h-4" /> Export PDF
                                  </Button>
                              </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
                                <Globe className="w-16 h-16 opacity-20 animate-pulse" />
                                <p className="text-sm uppercase tracking-widest opacity-50">System Standby</p>
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