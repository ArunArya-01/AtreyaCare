import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// Make sure this filename matches exactly what is in your folder (AgentTerminal.tsx)
import AgentTerminal from '../components/LiveTerminal'; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Index = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [molecule, setMolecule] = useState("");
const [disease, setDisease] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startAnalysis = () => {
    if(!molecule || !disease) return;
    
    setIsLoading(true);
    setLogs(["Initializing secure connection to AtreyaCore..."]);
    setResult(null);
    
    // Connect to Backend WebSocket
    const ws = new WebSocket("ws://localhost:8000/ws/analyze");

    ws.onopen = () => {
      ws.send(JSON.stringify({ molecule, disease }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "log") {
        setLogs((prev) => [...prev, data.message]);
      } else if (data.type === "result") {
        setResult(data.data);
        ws.close();
        setIsLoading(false);
      } else if (data.type === "error") {
        setLogs((prev) => [...prev, `❌ ERROR: ${data.message}`]);
        setIsLoading(false);
      }
    };
    
    ws.onerror = () => {
        setLogs(prev => [...prev, "ERROR: Connection failed. Is the backend running?"]);
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AtreyaCare AI
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Autonomous Agentic System for Drug Repurposing & Strategic Intelligence
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 p-6 bg-slate-900 rounded-xl border border-slate-800">
          <Input 
            placeholder="Enter Molecule (e.g., Metformin)" 
            value={molecule}
            onChange={(e) => setMolecule(e.target.value)}
            className="bg-slate-950 border-slate-700 text-white"
          />
          <Input 
            placeholder="Target Indication (e.g., Anti-Aging)" 
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="bg-slate-950 border-slate-700 text-white"
          />
          <Button 
            onClick={startAnalysis}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold"
          >
            {isLoading ? "Processing..." : "Launch Agents"}
          </Button>
        </div>

        {/* Main Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {/* Left: The Terminal */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Live Agent Operations</h3>
                <AgentTerminal logs={logs} />
            </div>

            {/* Right: The Report */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Strategic Output</h3>
                
                <div className="flex-1 bg-white text-slate-900 p-8 rounded-lg overflow-y-auto shadow-xl border-l-4 border-blue-500 leading-relaxed">
                    {result ? (
                        <article className="prose lg:prose-xl max-w-none prose-headings:text-blue-900 prose-strong:text-blue-700 prose-p:text-slate-700">
                            {/* This converts the AI text into Headers, Bullet Points, and Bold text */}
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </article>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 flex-col gap-4">
                            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin opacity-50"></div>
                            <p>Awaiting Analysis Results...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Index;