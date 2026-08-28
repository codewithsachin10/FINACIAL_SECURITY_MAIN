'use client';
import TopHeader from '@/components/TopHeader';
import HeroSecurityStatus from '@/components/HeroSecurityStatus';
import KPIGrid from '@/components/KPIGrid';
import RiskDistribution from '@/components/RiskDistribution';
import LiveTransactionStream from '@/components/LiveTransactionStream';
import SecurityDecisionPanel from '@/components/SecurityDecisionPanel';
import AgentSecurityPosture from '@/components/AgentSecurityPosture';
import ActiveThreats from '@/components/ActiveThreats';
import SecurityLoopVisualization from '@/components/SecurityLoopVisualization';
import QuickActions from '@/components/QuickActions';

import { useGlobalState } from '@/lib/GlobalStateContext';

import styles from './page.module.css';

export default function Dashboard() {
  const { metrics, threats, transactions, agents, auditLogs } = useGlobalState();
  
  // Derive mock data equivalents from real state where needed for visualizations
  const riskSummary = [
    { name: 'LOW', value: agents.filter(a => a.risk === 'LOW').length || 1 },
    { name: 'MODERATE', value: agents.filter(a => a.risk === 'MODERATE').length },
    { name: 'HIGH', value: agents.filter(a => a.risk === 'HIGH').length }
  ];

  const securityEvents = auditLogs.slice(0, 5).map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    agentName: 'SettlementAI',
    type: log.action.includes('BLOCKED') ? 'BLOCKED' : 'EXECUTED',
    description: log.details,
    reasons: log.action.includes('BLOCKED') ? ['Amount Limit Check failed'] : [],
    riskScore: log.action.includes('BLOCKED') ? 85 : 12,
    riskLevel: log.action.includes('BLOCKED') ? 'HIGH' : 'LOW'
  })) as any[];

  return (
    <div className={styles.dashboardContainer}>
      <TopHeader />
      
      <HeroSecurityStatus />
      
      <KPIGrid metrics={metrics} />
      
      <RiskDistribution summary={riskSummary} />

      <div style={{ marginTop: '24px' }}>
        <SecurityLoopVisualization />
      </div>
      
      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <LiveTransactionStream initialTransactions={transactions} />
          <AgentSecurityPosture agents={agents} />
        </div>
        
        <div className={styles.rightColumn}>
          <SecurityDecisionPanel events={securityEvents} />
          <ActiveThreats threats={threats} />
          <QuickActions />
        </div>
      </div>
      
      <div className={styles.demoIndicator}>
        DEMO ENVIRONMENT
      </div>
    </div>
  );
}
