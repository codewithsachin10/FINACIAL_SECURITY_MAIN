'use client';
import { useState } from 'react';
import { Policy } from '@/lib/types';
import styles from './PolicyList.module.css';

interface PolicyListProps {
  initialPolicies: Policy[];
}

export default function PolicyList({ initialPolicies }: PolicyListProps) {
  const [policies, setPolicies] = useState(initialPolicies);

  const togglePolicy = (id: string) => {
    setPolicies(policies.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {policies.map(policy => (
          <div key={policy.id} className={`${styles.policyCard} ${!policy.active ? styles.inactive : ''}`}>
            <div className={styles.header}>
              <div className={styles.titleGroup}>
                <span className={policy.severity === 'HIGH' ? styles.indicatorHigh : styles.indicatorModerate}>
                  {policy.severity}
                </span>
                <h4 className={styles.name}>{policy.name}</h4>
              </div>
              <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  checked={policy.active} 
                  onChange={() => togglePolicy(policy.id)} 
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            
            <p className={styles.description}>{policy.description}</p>
            
            <div className={styles.details}>
              <div className={styles.detailBox}>
                <span className={styles.label}>Condition:</span>
                <code className={styles.code}>{policy.condition}</code>
              </div>
              <div className={styles.detailBox}>
                <span className={styles.label}>Action:</span>
                <span className={styles.action}>{policy.action}</span>
              </div>
              <div className={styles.detailBox}>
                <span className={styles.label}>Applied:</span>
                <span className={styles.applied}>{policy.appliedAgents} Agents</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
