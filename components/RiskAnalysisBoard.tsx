'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import styles from './RiskAnalysisBoard.module.css';

export default function RiskAnalysisBoard() {
  const { agents } = useGlobalState();
  const systemRiskScore = 12;
  
  return (
    <div className={styles.boardContainer}>
      <div className={styles.topMetrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>System Risk Score</div>
          <div className={styles.metricValue}>{systemRiskScore}/100</div>
          <div className={styles.metricDesc}>Low overall risk. Minor behavioral drift detected.</div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>High Risk Agents</div>
          <div className={styles.metricValue}>{agents.filter(a => a.risk === 'HIGH').length}</div>
          <div className={styles.metricDesc}>Agents requiring immediate review.</div>
        </div>
      </div>

      <div className={styles.driftSection}>
        <h3 className={styles.sectionTitle}>Behavioral Drift Trajectory</h3>
        <div className={styles.driftChart}>
          {agents.map(agent => (
            <div key={agent.id} className={styles.driftRow}>
              <div className={styles.driftAgentName}>{agent.name}</div>
              <div className={styles.driftTrack}>
                <div 
                  className={`${styles.driftFill} ${agent.risk === 'HIGH' ? styles.fillHigh : agent.risk === 'MODERATE' ? styles.fillModerate : styles.fillLow}`}
                  style={{ width: `${agent.risk === 'HIGH' ? 85 : agent.risk === 'MODERATE' ? 45 : 15}%` }}
                ></div>
                <div className={styles.driftMarker} style={{ left: '15%' }}></div>
                <div className={styles.driftMarker} style={{ left: '50%' }}></div>
                <div className={styles.driftMarker} style={{ left: '85%' }}></div>
              </div>
              <div className={styles.driftLabel}>{agent.risk}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
