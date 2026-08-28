'use client';
import { use } from 'react';
import { useGlobalState } from '@/lib/GlobalStateContext';
import { notFound } from 'next/navigation';
import TopHeader from '@/components/TopHeader';
import TransactionsList from '@/components/TransactionsList';
import styles from './page.module.css';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { agents, transactions, policies } = useGlobalState();
  const resolvedParams = use(params);
  
  const agent = agents.find(a => a.id === resolvedParams.id);
  if (!agent) return notFound();

  const agentTx = transactions.filter(t => t.agentId === agent.id);
  const activePolicies = policies.filter(p => p.status === 'ACTIVE').length;

  return (
    <div className={styles.container}>
      <TopHeader />
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{agent.name}</h1>
          <p className={styles.subtitle}>ID: {agent.id} • {agent.role}</p>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.dotHealthy}></span>
          {agent.status}
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Transactions</div>
          <div className={styles.metricValue}>{agentTx.length}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Security Posture</div>
          <div className={styles.metricValue}>
            <div className={styles.riskScore}>
              <span className={agent.risk === 'HIGH' ? styles.textHigh : agent.risk === 'MODERATE' ? styles.textModerate : styles.textLow}>{agent.risk}</span>
            </div>
            <p className={styles.riskDesc}>Based on intent analysis and recent behavioral drift.</p>
          </div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Active Bound Policies</div>
          <div className={styles.metricValue}>{activePolicies} Policies</div>
          <p className={styles.riskDesc}>Constraining agent action space.</p>
        </div>
      </div>

      <div className={styles.ledgerSection}>
        <h2 className={styles.sectionTitle}>Agent Transaction Ledger</h2>
        <div className={styles.ledgerCard}>
          <TransactionsList initialTransactions={agentTx} />
        </div>
      </div>
    </div>
  );
}
