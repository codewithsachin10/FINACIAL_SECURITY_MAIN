'use client';
import { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PipelineStep, SimulationState } from '@/lib/types';
import styles from './TransactionSimulator.module.css';

export default function TransactionSimulator() {
  const [state, setState] = useState<SimulationState>({
    currentStep: null,
    agentId: 'AGT-809',
    intent: 'Transfer 50,000 USD to counterparty_wallet_a for liquidity provision.',
    amount: 50000,
    isComplete: false,
    decision: null,
    logs: [],
  });

  const pipeline: PipelineStep[] = [
    'OBSERVE', 'INTENT', 'AUTHORITY', 'CONTEXT', 'RISK', 'POLICY', 'DECISION'
  ];

  const runSimulation = () => {
    setState(prev => ({ ...prev, currentStep: 'OBSERVE', logs: ['System observing new agent activity.'], isComplete: false, decision: null }));
    
    // Simulate steps with delays
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < pipeline.length) {
        setState(prev => {
          const newStep = pipeline[stepIndex];
          let newLog = `Executing step: ${newStep}...`;
          
          if (newStep === 'POLICY') {
            if (prev.amount >= 50000) {
              newLog = 'Policy Triggered: Require Human Approval > $50k';
            }
          }
          if (newStep === 'DECISION') {
            const decision = prev.amount >= 50000 ? 'HELD' : 'EXECUTED';
            return {
              ...prev,
              currentStep: newStep,
              logs: [...prev.logs, newLog, `Final Decision: ${decision}`],
              isComplete: true,
              decision: decision
            };
          }

          return {
            ...prev,
            currentStep: newStep,
            logs: [...prev.logs, newLog]
          };
        });
      }
      
      if (stepIndex >= pipeline.length - 1) {
        clearInterval(interval);
      }
    }, 800);
  };

  const reset = () => {
    setState({
      ...state,
      currentStep: null,
      isComplete: false,
      decision: null,
      logs: [],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.configPanel}>
        <h3 className={styles.panelTitle}>SIMULATION PARAMETERS</h3>
        
        <div className={styles.formGroup}>
          <label>Agent ID</label>
          <input 
            type="text" 
            value={state.agentId} 
            onChange={e => setState({...state, agentId: e.target.value})}
            disabled={state.currentStep !== null}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Amount (USD)</label>
          <input 
            type="number" 
            value={state.amount} 
            onChange={e => setState({...state, amount: Number(e.target.value)})}
            disabled={state.currentStep !== null}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Intent Description</label>
          <textarea 
            value={state.intent} 
            onChange={e => setState({...state, intent: e.target.value})}
            disabled={state.currentStep !== null}
            rows={3}
          />
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.runBtn} 
            onClick={runSimulation}
            disabled={state.currentStep !== null && !state.isComplete}
          >
            <Play size={14} /> Run Security Loop
          </button>
          
          <button 
            className={styles.resetBtn} 
            onClick={reset}
            disabled={state.currentStep === null}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
      
      <div className={styles.executionPanel}>
        <h3 className={styles.panelTitle}>PIPELINE EXECUTION</h3>
        
        <div className={styles.pipelineSteps}>
          {pipeline.map((step, i) => {
            const isActive = state.currentStep === step;
            const isPast = state.currentStep && pipeline.indexOf(state.currentStep) > i;
            
            return (
              <div key={step} className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isPast ? styles.stepPast : ''}`}>
                <div className={styles.stepIndicator}>
                  {isPast ? '✓' : i + 1}
                </div>
                <span className={styles.stepName}>{step}</span>
              </div>
            );
          })}
        </div>
        
        <div className={styles.logs}>
          <h4 className={styles.logTitle}>EXECUTION LOGS</h4>
          <div className={styles.logContainer}>
            {state.logs.map((log, i) => (
              <div key={i} className={styles.logLine}>
                <span className={styles.logTime}>{new Date().toISOString().substring(11, 23)}</span>
                <span className={styles.logText}>{log}</span>
              </div>
            ))}
            {!state.currentStep && <div className={styles.logMuted}>Awaiting simulation start...</div>}
          </div>
        </div>
        
        {state.isComplete && (
          <div className={`${styles.resultBanner} ${state.decision === 'HELD' || state.decision === 'BLOCKED' ? styles.resultWarning : styles.resultSuccess}`}>
            {state.decision === 'HELD' || state.decision === 'BLOCKED' ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
            <div className={styles.resultContent}>
              <div className={styles.resultTitle}>TRANSACTION {state.decision}</div>
              <div className={styles.resultDesc}>
                {state.decision === 'HELD' 
                  ? 'Transaction placed in holding queue pending manual human review.' 
                  : state.decision === 'BLOCKED' 
                  ? 'Transaction permanently rejected due to critical policy violation.' 
                  : 'Transaction passed all security checks and was authorized.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
