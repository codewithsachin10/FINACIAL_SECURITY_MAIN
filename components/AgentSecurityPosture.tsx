'use client';
import { useRouter } from 'next/navigation';
import { Agent } from '@/lib/types';
import styles from './AgentSecurityPosture.module.css';

interface AgentSecurityPostureProps {
  agents: Agent[];
}

export default function AgentSecurityPosture({ agents }: AgentSecurityPostureProps) {
  const router = useRouter();

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'LOW': return styles.riskLow;
      case 'MODERATE': return styles.riskModerate;
      case 'HIGH': return styles.riskHigh;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>AGENT SECURITY POSTURE</h3>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Role</th>
              <th>Risk</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr 
                key={agent.id} 
                className={styles.row}
                onClick={() => router.push(`/agents/${agent.id}`)}
              >
                <td className={styles.agentCell}>{agent.name}</td>
                <td className={styles.roleCell}>{agent.role}</td>
                <td>
                  <span className={`${styles.riskBadge} ${getRiskStyle(agent.risk)}`}>
                    {agent.risk}
                  </span>
                </td>
                <td className={styles.statusCell}>
                  <div className={styles.statusWrapper}>
                    <span className={`${styles.statusDot} ${agent.status === 'Healthy' ? styles.dotHealthy : agent.status === 'Observing' ? styles.dotObserving : styles.dotRestricted}`}></span>
                    {agent.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
