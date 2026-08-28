'use client';
import { useRouter } from 'next/navigation';
import { Play, ShieldAlert, Lock, Settings2 } from 'lucide-react';
import styles from './QuickActions.module.css';

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>QUICK ACTIONS</h3>
      <div className={styles.actionGrid}>
        <button className={styles.actionBtn} onClick={() => router.push('/simulator')}>
          <Play size={16} className={styles.icon} strokeWidth={1.5} />
          <span>Run Agent Simulation</span>
        </button>
        
        <button className={styles.actionBtn} onClick={() => router.push('/transactions?risk=HIGH')}>
          <ShieldAlert size={16} className={styles.icon} strokeWidth={1.5} />
          <span>View High-Risk Activity</span>
        </button>
        
        <button className={styles.actionBtn} onClick={() => router.push('/transactions?status=BLOCKED')}>
          <Lock size={16} className={styles.icon} strokeWidth={1.5} />
          <span>Review Blocked Transactions</span>
        </button>
        
        <button className={styles.actionBtn} onClick={() => router.push('/policies')}>
          <Settings2 size={16} className={styles.icon} strokeWidth={1.5} />
          <span>Manage Policies</span>
        </button>
      </div>
    </div>
  );
}
