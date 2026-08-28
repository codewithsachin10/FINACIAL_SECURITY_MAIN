import { SecurityEvent } from '@/lib/types';
import styles from './SecurityDecisionPanel.module.css';

interface SecurityDecisionPanelProps {
  events: SecurityEvent[];
}

export default function SecurityDecisionPanel({ events }: SecurityDecisionPanelProps) {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'BLOCKED': return styles.badgeBlocked;
      case 'HELD': return styles.badgeHeld;
      case 'EXECUTED': return styles.badgeExecuted;
      default: return '';
    }
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>RECENT SECURITY DECISIONS</h3>
      
      <div className={styles.eventList}>
        {events.map(event => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.cardHeader}>
              <span className={`${styles.badge} ${getBadgeStyle(event.type)}`}>{event.type}</span>
              <span className={styles.time}>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <p className={styles.description}>
              <span className={styles.agent}>{event.agentName}</span> {event.description}
            </p>
            
            {event.reasons && event.reasons.length > 0 && (
              <div className={styles.reasons}>
                <span className={styles.reasonsLabel}>Reasons:</span>
                <ul className={styles.reasonsList}>
                  {event.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={styles.riskFooter}>
              <span className={styles.riskLabel}>Risk:</span>
              <span className={styles.riskScore}>
                {event.riskScore} <span className={event.riskLevel === 'HIGH' ? styles.textHigh : event.riskLevel === 'MODERATE' ? styles.textModerate : styles.textLow}>{event.riskLevel}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
