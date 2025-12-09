import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface AgentChecklistProps {
  currentStep: number; // 0 to 7
}

const AGENTS = [
  "IQVIA Insights Agent",
  "EXIM Trade Agent",
  "Patent Landscape Agent",
  "Clinical Trials Agent",
  "Internal Insights Agent",
  "Web Intelligence Agent",
  "Report Generator Agent"
];

const AgentChecklist = ({ currentStep }: AgentChecklistProps) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800 p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        Processing Request...
      </h3>
      
      <div className="space-y-3">
        {AGENTS.map((agent, index) => {
          // Status Logic
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div 
              key={agent}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 ${
                isCurrent 
                  ? "bg-blue-900/20 border-blue-500/50 scale-105" 
                  : isCompleted 
                    ? "bg-slate-800/50 border-green-900/30" 
                    : "bg-transparent border-slate-800 opacity-50"
              }`}
            >
              <span className={`font-medium ${isCurrent ? "text-blue-300" : "text-white"}`}>
                {agent}
              </span>

              <div>
                {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in spin-in-12" />}
                {isCurrent && <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />}
                {isPending && <Circle className="w-6 h-6 text-slate-700" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentChecklist;