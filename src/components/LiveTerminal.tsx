import React, { useEffect, useRef } from 'react';

interface AgentTerminalProps {
  logs: string[];
}

const AgentTerminal: React.FC<AgentTerminalProps> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="w-full bg-slate-950 text-green-400 p-4 rounded-lg font-mono h-96 overflow-y-auto border border-green-900/50 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-green-900/30 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
        <span className="text-xs text-green-600 ml-auto tracking-widest">ATREYA_CORE // SYSTEM_ACTIVE</span>
      </div>
      
      <div className="space-y-2 text-sm">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="opacity-40 text-xs shrink-0 mt-1">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes("Thinking") ? "text-yellow-400" : "text-green-300"}>
              {log.replace("[0m", "").replace("[1m", "")} {/* Basic ANSI strip */}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-600 italic text-center mt-20">Waiting for mission parameters...</div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default AgentTerminal;