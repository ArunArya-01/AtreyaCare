import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gradient-teal">
            CogniCore AI
          </div>
          <div className="flex gap-6 items-center">
            <a 
              href="#home" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
