'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import styles from './HeroSecurityStatus.module.css';

export default function HeroSecurityStatus() {
  const { agents, transactions, threats, auditLogs, metrics } = useGlobalState();
  
  const blockedTransactionsCount = auditLogs.filter(log => log.action === 'TRANSACTION_BLOCKED').length;
  // Calculate dynamic security score based on threats and blocked transactions.
  // We'll base it around 100, subtracting points for high severity threats.
  const securityScore = Math.max(0, 100 - (threats.length * 5) - (blockedTransactionsCount * 2));
  
  // Calculate stroke dasharray for the SVG circle (circumference is 2 * PI * 45 = 282.7)
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (securityScore / 100) * circumference;

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.label}>SYSTEM SECURITY POSTURE</div>
        <h1 className={styles.status} style={{ color: securityScore > 80 ? 'var(--color-low)' : securityScore > 50 ? 'var(--color-moderate)' : 'var(--color-high)' }}>
          {securityScore > 80 ? 'PROTECTED' : securityScore > 50 ? 'ELEVATED RISK' : 'CRITICAL'}
        </h1>
        <p className={styles.description}>All autonomous financial activity is being continuously evaluated.</p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{agents.length}</span>
            <span className={styles.statLabel}>Active Agents</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{transactions.length}</span>
            <span className={styles.statLabel}>Transactions Today</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{threats.length}</span>
            <span className={styles.statLabel}>Threats Detected</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{blockedTransactionsCount}</span>
            <span className={styles.statLabel}>Transactions Blocked</span>
          </div>
        </div>
      </div>
      <div className={styles.scoreContainer}>
        <div className={styles.scoreRing}>
          <svg viewBox="0 0 100 100" className={styles.svgRing}>
            <circle cx="50" cy="50" r="45" className={styles.ringBackground} />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className={styles.ringProgress} 
              style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, stroke: securityScore > 80 ? 'var(--color-low)' : securityScore > 50 ? 'var(--color-moderate)' : 'var(--color-high)' }}
            />
          </svg>
          <div className={styles.scoreValue}>
            <span className={styles.scoreNumber}>{securityScore}</span>
            <span className={styles.scoreMax}>/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
