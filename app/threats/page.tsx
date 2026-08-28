'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import ThreatIntelligence from '@/components/ThreatIntelligence';
import styles from './page.module.css';

export default function ThreatsPage() {
  const { threats } = useGlobalState();
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>THREAT INTELLIGENCE</h1>
        <p className={styles.description}>Active alerts and mitigation recommendations for agent anomalies.</p>
      </div>
      <ThreatIntelligence initialThreats={threats} />
    </div>
  );
}
