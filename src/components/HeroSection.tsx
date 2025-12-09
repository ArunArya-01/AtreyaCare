// File: src/components/HeroSection.tsx (Updated with AtreyaCare)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgentStatus from "@/components/AgentStatus";
import { ArrowLeft } from "lucide-react";
import neuralBg from "../assests/neural-network-bg.jpg";

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
      setAgents(prev =>
        prev.map((agent, index) =>
          index === i ? { ...agent, status: "running" } : agent
        )
      );

      await delay(1000 + Math.random() * 1000);

      setAgents(prev =>
        prev.map((agent, index) =>
          index === i ? { ...agent, status: "completed" } : agent
        )
      );
    }
  };

  const handleBeginAnalysis = () => {
    if (query.trim() === "") return;
    setIsProcessing(true);
    runAgentSimulation();
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
      {/* Background */}
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

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">

        {!isProcessing ? (
          // ============================
          // PART 1: QUERY INPUT UI
          // ============================
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gradient-teal animate-float">
              AtreyaCare Master Agent is Online
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Enter any healthcare, pharmaceutical, or research query to begin analysis.
            </p>

            <div className="flex gap-3 max-w-xl mx-auto mb-6">
              <Input
                placeholder="Enter your query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button onClick={handleBeginAnalysis}>Analyze</Button>
            </div>

            <Button variant="outline" onClick={handleExampleQuery}>
              Try Example Query
            </Button>
          </div>

        ) : (
          // ============================
          // PART 2: PROCESSING VIEW
          // ============================
          <div className="animate-fade-in w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                New Query
              </Button>

              <h2 className="text-3xl font-bold text-gradient-teal animate-float">
                Processing Request...
              </h2>

              <div className="w-24" />
            </div>

            {/* Agent list */}
            <div className="flex flex-col gap-3">
              {agents.map(agent => (
                <AgentStatus key={agent.name} agentName={agent.name} status={agent.status} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default HeroSection;
