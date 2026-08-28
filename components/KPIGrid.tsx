import { Bot, Activity, ShieldAlert, Lock } from 'lucide-react';
import { DashboardMetrics } from '@/lib/types';
import styles from './KPIGrid.module.css';

interface KPIGridProps {
  metrics: DashboardMetrics;
}

export default function KPIGrid({ metrics }: KPIGridProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Active Agents</span>
          <Bot size={16} className={styles.iconHealthy} strokeWidth={1.5} />
        </div>
        <div className={styles.value}>{metrics.activeAgents.total}</div>
        <div className={styles.supporting}>
          {metrics.activeAgents.healthy} healthy &middot; {metrics.activeAgents.observing} under observation
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Transactions Today</span>
          <Activity size={16} className={styles.iconNeutral} strokeWidth={1.5} />
        </div>
        <div className={styles.value}>{metrics.transactionsToday.total.toLocaleString()}</div>
        <div className={styles.supporting}>
          <span className={styles.trendUp}>+{metrics.transactionsToday.trendPercentage}%</span> from yesterday
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Threats Detected</span>
          <ShieldAlert size={16} className={styles.iconWarning} strokeWidth={1.5} />
        </div>
        <div className={styles.value}>{metrics.threatsDetected.total}</div>
        <div className={styles.supporting}>
          {metrics.threatsDetected.highSeverity} high severity
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Transactions Blocked</span>
          <Lock size={16} className={styles.iconDanger} strokeWidth={1.5} />
        </div>
        <div className={styles.value}>{metrics.transactionsBlocked.total}</div>
        <div className={styles.supporting}>
          {metrics.transactionsBlocked.percentageOfTotal}% of total activity
        </div>
      </div>
    </div>
  );
}
