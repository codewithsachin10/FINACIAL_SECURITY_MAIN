import { Bell } from 'lucide-react';
import styles from './TopHeader.module.css';

export default function TopHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2 className={styles.title}>Security Overview</h2>
        <p className={styles.subtitle}>Real-time security posture across autonomous financial agents</p>
      </div>
      <div className={styles.right}>
        <div className={styles.liveIndicator}>
          <span className={styles.pulseDot}></span>
          <span>MONITORING ACTIVE</span>
        </div>
        <div className={styles.timestamp}>
          Last updated: Just now
        </div>
        <button className={styles.iconButton}>
          <Bell size={18} strokeWidth={1.5} />
        </button>
        <div className={styles.avatar}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" />
        </div>
      </div>
    </header>
  );
}
