'use client';
import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/types';
import styles from './TransactionsList.module.css';

interface TransactionsListProps {
  initialTransactions: Transaction[];
}

export default function TransactionsList({ initialTransactions }: TransactionsListProps) {
  const [mounted, setMounted] = useState(false);
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [filterDecision, setFilterDecision] = useState<string>('ALL');

  useEffect(() => setMounted(true), []);

  const formatTime = (isoString: string) => {
    if (!mounted) return '';
    const date = new Date(isoString);
    return date.toLocaleString([], { 
      month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  };

  const filteredTransactions = initialTransactions.filter(tx => {
    if (filterRisk !== 'ALL' && tx.risk !== filterRisk) return false;
    if (filterDecision !== 'ALL' && tx.decision !== filterDecision) return false;
    return true;
  });

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'LOW': return styles.riskLow;
      case 'MODERATE': return styles.riskModerate;
      case 'HIGH': return styles.riskHigh;
      default: return '';
    }
  };

  const getDecisionStyle = (decision: string) => {
    switch (decision) {
      case 'EXECUTED': return styles.decisionExecuted;
      case 'HELD': return styles.decisionHeld;
      case 'BLOCKED': return styles.decisionBlocked;
      case 'ESCALATED': return styles.decisionEscalated;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Risk Level:</label>
          <select value={filterRisk} onChange={e => setFilterRisk(e.target.value)}>
            <option value="ALL">All Risks</option>
            <option value="LOW">Low</option>
            <option value="MODERATE">Moderate</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Decision:</label>
          <select value={filterDecision} onChange={e => setFilterDecision(e.target.value)}>
            <option value="ALL">All Decisions</option>
            <option value="EXECUTED">Executed</option>
            <option value="HELD">Held</option>
            <option value="BLOCKED">Blocked</option>
            <option value="ESCALATED">Escalated</option>
          </select>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Agent</th>
              <th>Action</th>
              <th>Counterparty</th>
              <th className={styles.alignRight}>Amount</th>
              <th>Risk</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className={styles.row}>
                <td className={styles.idCell}>{tx.id}</td>
                <td className={styles.timeCell} suppressHydrationWarning>{formatTime(tx.time)}</td>
                <td className={styles.agentCell}>{tx.agentName} <span className={styles.agentId}>({tx.agentId})</span></td>
                <td>{tx.action}</td>
                <td className={styles.counterpartyCell}>{tx.counterparty}</td>
                <td className={styles.amountCell}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: tx.currency, maximumFractionDigits: 0 }).format(tx.amount)}</td>
                <td>
                  <span className={`${styles.badge} ${getRiskStyle(tx.risk)}`}>
                    {tx.risk}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusText} ${getDecisionStyle(tx.decision)}`}>
                    {tx.decision}
                  </span>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.emptyState}>No transactions match the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
