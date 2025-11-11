import { Button } from "@/components/ui/button";
import neuralBg from "@/assets/neural-network-bg.jpg";

const PitchSection = () => {
  const technologies = [
    "React & TypeScript",
    "Three.js & Framer Motion",
    "Agentic AI Architecture",
    "Real-time Data Synthesis"
  ];

  return (
    <section 
      id="pitch"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background continuation */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${neuralBg})`,
            filter: "brightness(0.4) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-purple">
            This is CogniCore AI
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            This entire workflow—from complex query to actionable insight—is what our project achieves. 
            We are <span className="text-primary font-semibold">Team Synapse</span>, and this is our solution for{" "}
            <span className="text-secondary font-semibold">Synergy Hack 2025</span>.
          </p>
        </div>

        {/* Built With Section */}
        <div className="glass rounded-2xl p-10 mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center text-foreground">
            Built With
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-lg font-semibold text-primary">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="glow-secondary" 
            size="xl"
            onClick={() => window.open("https://github.com", "_blank")}
            className="min-w-[220px]"
          >
            View on GitHub
          </Button>
          
          <Button 
            variant="glass" 
            size="xl"
            onClick={() => window.open("#", "_blank")}
            className="min-w-[220px]"
          >
            View Our Project PPT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PitchSection;
