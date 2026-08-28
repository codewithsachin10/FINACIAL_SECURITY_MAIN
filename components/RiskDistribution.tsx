import { RiskSummary } from '@/lib/types';
import styles from './RiskDistribution.module.css';

interface RiskDistributionProps {
  summary: RiskSummary;
}

export default function RiskDistribution({ summary }: RiskDistributionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>RISK DISTRIBUTION</h3>
        <p className={styles.subtitle}>Most activity remains within autonomous execution thresholds.</p>
      </div>
      
      <div className={styles.barContainer}>
        <div className={styles.barSegment} style={{ width: `${summary.lowPercentage}%`, backgroundColor: 'var(--color-low)' }}></div>
        <div className={styles.barSegment} style={{ width: `${summary.moderatePercentage}%`, backgroundColor: 'var(--color-moderate)' }}></div>
        <div className={styles.barSegment} style={{ width: `${summary.highPercentage}%`, backgroundColor: 'var(--color-high)' }}></div>
      </div>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: 'var(--color-low)' }}></div>
          <span className={styles.legendLabel}>LOW</span>
          <span className={styles.legendValue}>{summary.lowPercentage}%</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: 'var(--color-moderate)' }}></div>
          <span className={styles.legendLabel}>MODERATE</span>
          <span className={styles.legendValue}>{summary.moderatePercentage}%</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: 'var(--color-high)' }}></div>
          <span className={styles.legendLabel}>HIGH</span>
          <span className={styles.legendValue}>{summary.highPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
