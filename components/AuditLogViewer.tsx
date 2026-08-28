'use client';
import { useState, useEffect } from 'react';
import { AuditLog } from '@/lib/types';
import styles from './AuditLogViewer.module.css';

interface AuditLogViewerProps {
  initialLogs: AuditLog[];
}

export default function AuditLogViewer({ initialLogs }: AuditLogViewerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const formatTime = (isoString: string) => {
    if (!mounted) return '';
    const date = new Date(isoString);
    return date.toLocaleString([], { 
      month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'SUCCESS': return styles.statusSuccess;
      case 'FAILURE': return styles.statusFailure;
      case 'WARNING': return styles.statusWarning;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Actor</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {initialLogs.map((log) => (
              <tr key={log.id} className={styles.row}>
                <td className={styles.timeCell} suppressHydrationWarning>{formatTime(log.timestamp)}</td>
                <td className={styles.actionCell}>{log.action}</td>
                <td className={styles.actorCell}>{log.actor}</td>
                <td className={styles.detailsCell}>{log.details}</td>
                <td>
                  <span className={`${styles.badge} ${getStatusStyle(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
