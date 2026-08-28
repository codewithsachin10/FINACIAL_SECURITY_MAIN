export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';
export type DecisionStatus = 'EXECUTED' | 'HELD' | 'BLOCKED' | 'ESCALATED';
export type AgentStatus = 'Healthy' | 'Observing' | 'Restricted';

export interface Agent {
  id: string;
  name: string;
  role: string;
  risk: RiskLevel;
  status: AgentStatus;
  lastActivity: string; // ISO timestamp
  transactionCount: number;
}

export interface Transaction {
  id: string;
  time: string; // ISO timestamp
  agentId: string;
  agentName: string;
  action: string;
  amount: number;
  currency: string;
  counterparty: string;
  risk: RiskLevel;
  decision: DecisionStatus;
}

export interface SecurityEvent {
  id: string;
  type: 'BLOCKED' | 'HELD' | 'EXECUTED';
  agentName: string;
  description: string; // e.g. "attempted ₹4,50,000 transfer"
  reasons: string[];
  riskScore: number;
  riskLevel: RiskLevel;
  timestamp: string;
}

export interface ThreatAlert {
  id: string;
  title: string;
  agentName: string;
  status: string;
  severity: RiskLevel;
  timestamp: string;
}

export interface RiskSummary {
  lowPercentage: number;
  moderatePercentage: number;
  highPercentage: number;
}

export interface DashboardMetrics {
  activeAgents: { total: number; healthy: number; observing: number };
  transactionsToday: { total: number; trendPercentage: number };
  threatsDetected: { total: number; highSeverity: number };
  transactionsBlocked: { total: number; percentageOfTotal: number };
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: DecisionStatus;
  severity: RiskLevel;
  active: boolean;
  appliedAgents: number;
}

export type PipelineStep = 'OBSERVE' | 'INTENT' | 'AUTHORITY' | 'CONTEXT' | 'RISK' | 'POLICY' | 'DECISION';

export interface SimulationState {
  currentStep: PipelineStep | null;
  agentId: string;
  intent: string;
  amount: number;
  isComplete: boolean;
  decision: DecisionStatus | null;
  logs: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string; // e.g., 'SYSTEM', 'ADMIN_USER', 'AGENT_id'
  details: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}
