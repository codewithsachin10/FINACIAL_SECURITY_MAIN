'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import AuditLogViewer from '@/components/AuditLogViewer';
import styles from './page.module.css';

export default function AuditPage() {
  const { auditLogs } = useGlobalState();
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>AUDIT LOGS</h1>
        <p className={styles.description}>Immutable ledger of all security decisions, policy changes, and system events.</p>
      </div>
      <AuditLogViewer initialLogs={auditLogs} />
    </div>
  );
}
