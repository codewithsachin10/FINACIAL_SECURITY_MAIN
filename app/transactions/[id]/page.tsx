'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import { ArrowLeft, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function TransactionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const { transactions, auditLogs } = useGlobalState();
  
  const transaction = transactions.find(t => t.id === id);
  const relatedLogs = auditLogs.filter(log => log.details.includes(id) || log.action === 'TRANSACTION_BLOCKED' && log.details.includes(transaction?.amount.toString() || '999999999')); // rudimentary matching if ID isn't directly in log

  if (!transaction) {
    return (
      <div className={styles.container}>
        <TopHeader />
        <div className={styles.content}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className={styles.notFound}>
            <h2>Transaction Not Found</h2>
            <p>The transaction with ID {id} could not be found in the current session.</p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'LOW': return styles.badgeLow;
      case 'MODERATE': return styles.badgeModerate;
      case 'HIGH': return styles.badgeHigh;
      case 'CRITICAL': return styles.badgeCritical;
      default: return '';
    }
  };

  const getDecisionStyle = (decision: string) => {
    switch (decision) {
      case 'EXECUTED': return styles.decisionExecuted;
      case 'HELD': return styles.decisionHeld;
      case 'BLOCKED': return styles.decisionBlocked;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <TopHeader />
      
      <div className={styles.content}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Transaction Details</h1>
            <div className={styles.subtitle}>ID: {transaction.id} &bull; {new Date(transaction.time).toLocaleString()}</div>
          </div>
          <div className={`${styles.decisionBadge} ${getDecisionStyle(transaction.decision)}`}>
            {transaction.decision === 'EXECUTED' && <CheckCircle size={18} />}
            {transaction.decision === 'HELD' && <Clock size={18} />}
            {transaction.decision === 'BLOCKED' && <ShieldAlert size={18} />}
            <span>{transaction.decision}</span>
          </div>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Transfer Information</h3>
            <div className={styles.dataRow}>
              <span className={styles.label}>Action</span>
              <span className={styles.value}>{transaction.action}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Amount</span>
              <span className={styles.valueLarge}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: transaction.currency, maximumFractionDigits: 0 }).format(transaction.amount)}
              </span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Counterparty</span>
              <span className={styles.value}>{transaction.counterparty}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Originating Agent</span>
              <span className={styles.value}>{transaction.agentName} ({transaction.agentId})</span>
            </div>
          </div>
          
          <div className={styles.card}>
            <h3>Security & Risk Assessment</h3>
            <div className={styles.dataRow}>
              <span className={styles.label}>Assessed Risk</span>
              <span className={`${styles.badge} ${getRiskStyle(transaction.risk)}`}>{transaction.risk}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.label}>Final Decision</span>
              <span className={styles.value}>{transaction.decision}</span>
            </div>
            
            {transaction.decision === 'BLOCKED' && (
              <div className={styles.warningBox}>
                <ShieldAlert size={16} />
                <span>This transaction was blocked due to policy violations. Check audit logs below.</span>
              </div>
            )}
          </div>
        </div>
        
        {/* We can show related logs if any exist */}
        <div className={styles.card} style={{ marginTop: '24px' }}>
          <h3>Transaction Audit Trail</h3>
          {relatedLogs.length > 0 ? (
            <div className={styles.logList}>
              {relatedLogs.map(log => (
                <div key={log.id} className={styles.logItem}>
                  <div className={styles.logTime}>{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div className={styles.logAction}>{log.action}</div>
                  <div className={styles.logDetails}>{log.details}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noLogs}>No specific audit logs matched to this transaction ID.</p>
          )}
        </div>
      </div>
    </div>
  );
}
