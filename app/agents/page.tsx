'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import AgentSecurityPosture from '@/components/AgentSecurityPosture';
import styles from './page.module.css';

export default function AgentsPage() {
  const { agents } = useGlobalState();
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>AGENTS OVERVIEW</h1>
        <p className={styles.description}>Monitor the security posture and behavioral drift of all active autonomous agents.</p>
      </div>
      <div className={styles.content}>
        <AgentSecurityPosture agents={agents} />
      </div>
    </div>
  );
}
