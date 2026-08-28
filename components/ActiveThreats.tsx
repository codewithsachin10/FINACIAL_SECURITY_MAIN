import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ThreatAlert } from '@/lib/types';
import styles from './ActiveThreats.module.css';

interface ActiveThreatsProps {
  threats: ThreatAlert[];
}

export default function ActiveThreats({ threats }: ActiveThreatsProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ACTIVE THREATS</h3>
      
      <div className={styles.threatList}>
        {threats.map(threat => (
          <div key={threat.id} className={styles.threatCard}>
            <div className={styles.header}>
              <span className={threat.severity === 'HIGH' ? styles.indicatorHigh : styles.indicatorModerate}>
                {threat.severity === 'HIGH' ? '🔴 HIGH' : '🟠 MODERATE'}
              </span>
              <span className={styles.titleText}>{threat.title}</span>
            </div>
            
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Agent:</span>
                <span className={styles.value}>{threat.agentName}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Status:</span>
                <span className={styles.value}>{threat.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Link href="/threats" className={styles.viewAll}>
        View all threats <ArrowRight size={14} />
      </Link>
    </div>
  );
}
