'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/lib/types';
import styles from './LiveTransactionStream.module.css';

interface LiveTransactionStreamProps {
  initialTransactions: Transaction[];
}

export default function LiveTransactionStream({ initialTransactions }: LiveTransactionStreamProps) {
  const router = useRouter();
  const [transactions, setTransactions] = useState(initialTransactions);

  // Add subtle animations when component mounts
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

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
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>LIVE TRANSACTION ACTIVITY</h3>
          <p className={styles.subtitle}>Security decisions across autonomous financial actions</p>
        </div>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Agent</th>
              <th>Action</th>
              <th>Amount</th>
              <th>Counterparty</th>
              <th>Risk</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr 
                key={tx.id} 
                className={`${styles.row} ${mounted && index === 0 ? styles.newRow : ''}`}
                onClick={() => router.push(`/transactions/${tx.id}`)}
              >
                <td className={styles.timeCell} suppressHydrationWarning>
                  {formatTime(tx.time)}
                </td>
                <td className={styles.agentCell}>{tx.agentName}</td>
                <td>{tx.action}</td>
                <td className={styles.amountCell}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: tx.currency, maximumFractionDigits: 0 }).format(tx.amount)}</td>
                <td>{tx.counterparty}</td>
                <td>
                  <span className={`${styles.badge} ${getRiskStyle(tx.risk)}`}>
                    {tx.risk === 'LOW' && '🟢 '}
                    {tx.risk === 'MODERATE' && '🟠 '}
                    {tx.risk === 'HIGH' && '🔴 '}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
