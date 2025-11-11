import { CheckCircle, Loader2, CircleDashed } from "lucide-react";

// We define the possible statuses an agent can be in
type AgentStatus = "pending" | "running" | "completed";

interface AgentStatusProps {
  agentName: string;
  status: AgentStatus;
}

// A small helper component to show the right icon
const StatusIcon = ({ status }: { status: AgentStatus }) => {
  switch (status) {
    case "running":
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending":
    default:
      return <CircleDashed className="h-5 w-5 text-gray-500" />;
  }
};

const AgentStatus = ({ agentName, status }: AgentStatusProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
      <span className="text-lg font-medium text-gray-200">{agentName}</span>
      <StatusIcon status={status} />
    </div>
  );
};

export default AgentStatus;