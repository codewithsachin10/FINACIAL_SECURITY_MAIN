'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import RiskAnalysisBoard from '@/components/RiskAnalysisBoard';
import styles from './page.module.css';

export default function RiskAnalysisPage() {
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>RISK ANALYSIS</h1>
        <p className={styles.description}>Deep dive into systemic risk factors and behavioral drift across all active agents.</p>
      </div>
      <RiskAnalysisBoard />
    </div>
  );
}
