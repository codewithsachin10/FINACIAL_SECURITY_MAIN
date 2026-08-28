'use client';
import { ArrowRight, Eye, BrainCircuit, KeyRound, Network, AlertTriangle, FileCheck, Shield, Activity } from 'lucide-react';
import { useGlobalState } from '@/lib/GlobalStateContext';
import styles from './SecurityLoopVisualization.module.css';

export default function SecurityLoopVisualization() {
  const { activePipelineStep } = useGlobalState();
  
  const steps = [
    { label: 'Observe', icon: Eye },
    { label: 'Intent', icon: BrainCircuit },
    { label: 'Authority', icon: KeyRound },
    { label: 'Context', icon: Network },
    { label: 'Risk', icon: AlertTriangle },
    { label: 'Policy', icon: FileCheck },
    { label: 'Decision', icon: Shield },
    { label: 'Monitor', icon: Activity },
  ];

  const activeStep = steps.findIndex(s => s.label === activePipelineStep);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>SECURITY PIPELINE</h3>
      <div className={styles.pipeline}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          
          return (
            <div key={step.label} className={styles.stepContainer}>
              <div className={styles.step}>
                <div className={`${styles.iconWrapper} ${isActive ? styles.activeIcon : ''}`}>
                  <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <span className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <ArrowRight size={18} className={`${styles.arrow} ${isActive ? styles.activeArrow : ''}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
