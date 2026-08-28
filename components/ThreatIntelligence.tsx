'use client';
import { useState, useEffect } from 'react';
import { ThreatAlert } from '@/lib/types';
import styles from './ThreatIntelligence.module.css';
import { ShieldAlert, Activity, Cpu } from 'lucide-react';

interface ThreatIntelligenceProps {
  initialThreats: ThreatAlert[];
}

export default function ThreatIntelligence({ initialThreats }: ThreatIntelligenceProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const formatTime = (isoString: string) => {
    if (!mounted) return '';
    const date = new Date(isoString);
    return date.toLocaleString([], { 
      month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {initialThreats.map(threat => (
          <div key={threat.id} className={styles.threatCard}>
            <div className={styles.header}>
              <div className={styles.iconBox}>
                <ShieldAlert size={20} className={threat.severity === 'HIGH' ? styles.iconHigh : styles.iconModerate} />
              </div>
              <div className={styles.titleArea}>
                <h3 className={styles.title}>{threat.title}</h3>
                <div className={styles.meta}>
                  <span suppressHydrationWarning>{formatTime(threat.timestamp)}</span>
                  <span className={styles.divider}>•</span>
                  <span>ID: {threat.id}</span>
                </div>
              </div>
              <div className={styles.badgeArea}>
                <span className={`${styles.badge} ${threat.severity === 'HIGH' ? styles.badgeHigh : styles.badgeModerate}`}>
                  {threat.severity} SEVERITY
                </span>
              </div>
            </div>
            
            <div className={styles.content}>
              <div className={styles.infoRow}>
                <div className={styles.infoCol}>
                  <div className={styles.label}>AFFECTED AGENT</div>
                  <div className={styles.value}>
                    <Cpu size={14} />
                    {threat.agentName}
                  </div>
                </div>
                <div className={styles.infoCol}>
                  <div className={styles.label}>CURRENT STATUS</div>
                  <div className={styles.value}>
                    <Activity size={14} />
                    {threat.status}
                  </div>
                </div>
              </div>
              
              <div className={styles.mitigationBox}>
                <div className={styles.label}>RECOMMENDED ACTION</div>
                <p className={styles.mitigationText}>
                  {threat.severity === 'HIGH' 
                    ? 'Immediate manual review of agent logic required. Agent restricted until clearance.' 
                    : 'Monitor agent for further anomalous activity. No immediate intervention required.'}
                </p>
                <div className={styles.actions}>
                  <button className={styles.primaryBtn}>Review Agent</button>
                  <button className={styles.secondaryBtn}>Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
