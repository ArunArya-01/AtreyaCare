import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Assuming HeroSection.tsx is in src/components/
import neuralBg from '../assests/neural-network-bg.jpg';

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const handleBeginAnalysis = () => {
    // Add your analysis logic here
    console.log("Analysis started with query:", query);
  };

  const handleExampleQuery = () => {
    setQuery("Analyze repurposing options for Molecule X");
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background with Video-like Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-float"
          style={{
            backgroundImage: `url(${neuralBg})`,
            filter: "brightness(0.5) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
        
        {/* Animated particles overlay */}
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
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gradient-teal animate-float">
          CogniCore AI Master Agent is Online
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
    </section>
  );
};

export default HeroSection;
