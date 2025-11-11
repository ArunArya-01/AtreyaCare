// File: src/components/HeroSection.tsx (Updated with AtreyaCare)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentStatus from "@/components/AgentStatus";
import { ArrowLeft } from "lucide-react";

// Assuming HeroSection.tsx is in src/components/
import neuralBg from '../assests/neural-network-bg.jpg';

// --- Our Multi-Agent Setup ---
const AGENT_LIST = [
  "IQVIA Insights Agent",
  "EXIM Trade Agent",
  "Patent Landscape Agent",
  "Clinical Trials Agent",
  "Internal Insights Agent",
  "Web Intelligence Agent",
  "Report Generator Agent",
];

type AgentStatusState = "pending" | "running" | "completed";
interface Agent {
  name: string;
  status: AgentStatusState;
}
// ------------------------------

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  const runAgentSimulation = async () => {
    let initialAgents = AGENT_LIST.map(name => ({ name, status: "pending" as AgentStatusState }));
    setAgents(initialAgents);

    await delay(500);

    for (let i = 0; i < AGENT_LIST.length; i++) {
      setAgents(currentAgents => 
        currentAgents.map((agent, index) => 
          index === i ? { ...agent, status: "running" } : agent
        )
      );
      
      await delay(1000 + Math.random() * 1000);

      setAgents(currentAgents => 
        currentAgents.map((agent, index) => 
          index === i ? { ...agent, status: "completed" } : agent
        )
      );
    }
  };

  const handleBeginAnalysis = () => {
    if (query.trim() === "") return;
    setIsProcessing(true);
    runAgentSimulation();
    console.log("Analysis started with query:", query);
  };

  const handleExampleQuery = () => {
    setQuery("Analyze repurposing options for Molecule X");
  };

  const handleReset = () => {
    setIsProcessing(false);
    setQuery("");
    setAgents([]);
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background (Unchanged from your code) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-float"
          style={{
            backgroundImage: `url(${neuralBg})`,
            filter: "brightness(0.5) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content - This is now conditional! */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
        
        {!isProcessing ? (
          // === PART 1: The Query UI ===
          <div className="animate-fade-in">
            {/* *
              * THE CHANGE IS HERE 
              *
            */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gradient-teal animate-float">
              AtreyaCare Master Agent is Online
            </h1>
            
            <div className="glass rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Awaiting complex query... (e.g., Analyze repurposing options for Molecule X)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 bg-transparent border-none text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="glow" 
                size="xl"
                onClick={handleBeginAnalysis}
                className="min-w-[200px]"
                disabled={query.trim() === ""}
              >
                Begin Analysis
              </Button>
              
              <Button 
                variant="glass" 
                size="xl"
                onClick={handleExampleQuery}
                className="min-w-[280px]"
              >
                Click to try: "Repurposing options for Molecule X"
              </Button>
            </div>
          </div>

        ) : (

          // === PART 2: The Processing UI (New) ===
          <div className="animate-fade-in w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                New Query
              </Button>
              <h2 className="text-3xl font-bold text-gradient-teal animate-float">
                Processing Request...
              </h2>
              <div className="w-24"></div> {/* Spacer */}
            </div>

            {/* The list of agents */}
            <div className="flex flex-col gap-3">
              {agents.map((agent, index) => (
                <AgentStatus
                  key={agent.name}
                  agentName={agent.name}
                  status={agent.status}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;