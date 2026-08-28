'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, Transaction, Policy, ThreatAlert, AuditLog, DashboardMetrics } from './types';

interface GlobalState {
  agents: Agent[];
  transactions: Transaction[];
  policies: Policy[];
  threats: ThreatAlert[];
  auditLogs: AuditLog[];
  metrics: DashboardMetrics;
  activePipelineStep: string | null;
  addTransaction: (tx: Transaction) => void;
  addAuditLog: (log: AuditLog) => void;
  addThreat: (threat: ThreatAlert) => void;
  updatePolicy: (policyId: string, updates: Partial<Policy>) => void;
  setActivePipelineStep: (step: string | null) => void;
}

const initialState: Omit<GlobalState, 'addTransaction' | 'addAuditLog' | 'addThreat' | 'updatePolicy' | 'setActivePipelineStep'> = {
  activePipelineStep: null,
  agents: [
    {
      id: 'ag-04',
      name: 'SettlementAI',
      role: 'Cross-Border Settlements',
      risk: 'LOW',
      status: 'Healthy',
      lastActivity: new Date().toISOString(),
      transactionCount: 0
    }
  ],
  transactions: [],
  policies: [
    {
      id: 'pol-1',
      name: 'Maximum Transaction Limit',
      description: 'Blocks any single transaction exceeding ₹50,00,000 INR.',
      condition: 'amount > 5000000',
      action: 'BLOCKED',
      severity: 'HIGH',
      active: true,
      appliedAgents: 1
    },
    {
      id: 'pol-2',
      name: 'Unverified Counterparty',
      description: 'Holds transactions to new or unverified addresses for manual review.',
      condition: 'counterparty_trust < 0.8',
      action: 'HELD',
      severity: 'MODERATE',
      active: true,
      appliedAgents: 1
    }
  ],
  threats: [],
  auditLogs: [],
  metrics: {
    activeAgents: { total: 1, healthy: 1, observing: 0 },
    transactionsToday: { total: 0, trendPercentage: 0 },
    threatsDetected: { total: 0, highSeverity: 0 },
    transactionsBlocked: { total: 0, percentageOfTotal: 0 }
  }
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);
  const [mounted, setMounted] = useState(false);

  // Load from local database on initial mount
  React.useEffect(() => {
    const savedDb = localStorage.getItem('sentinel-db');
    if (savedDb) {
      try {
        const parsed = JSON.parse(savedDb);
        // Ensure activePipelineStep is always null on fresh reload
        parsed.activePipelineStep = null;
        setState(parsed);
      } catch (error) {
        console.error('Failed to parse local Sentinel database:', error);
      }
    }
    setMounted(true);
  }, []);

  // Save to local database on every state change
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem('sentinel-db', JSON.stringify(state));
    }
  }, [state, mounted]);

  // Global Telegram Queue Poller
  React.useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/telegram?t=' + Date.now(), { cache: 'no-store' });
        const data = await res.json();
        
        if (data.messages && data.messages.length > 0) {
          data.messages.forEach((msg: any) => {
            // Process fully evaluated intents from telegram-bot.js
            if (msg.intent && typeof msg.isBlocked !== 'undefined') {
              const finalStatus = msg.isBlocked ? 'BLOCKED' : 'EXECUTED';
              const finalRisk = msg.isBlocked ? 'HIGH' : 'LOW';
              
              const newTx = {
                id: `tx-${msg.id || Date.now().toString().slice(-4)}`,
                agentId: 'ag-04',
                agentName: 'SettlementAI',
                time: new Date().toISOString(),
                action: msg.intent.action,
                amount: msg.intent.amount,
                currency: msg.intent.currency,
                counterparty: msg.intent.counterparty,
                risk: finalRisk,
                decision: finalStatus
              } as Transaction;
              
              addTransaction(newTx);
              
              addAuditLog({
                id: `log-${Date.now()}-${Math.random()}`,
                timestamp: new Date().toISOString(),
                actor: 'SYSTEM',
                action: msg.isBlocked ? 'TRANSACTION_BLOCKED' : 'TRANSACTION_EXECUTED',
                details: `Agent 04 attempted ${msg.intent.action} of ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: msg.intent.currency, maximumFractionDigits: 0 }).format(msg.intent.amount)}. Decision: ${finalStatus}.`,
                status: msg.isBlocked ? 'WARNING' : 'SUCCESS'
              });

              if (msg.isBlocked) {
                addThreat({
                  id: `thr-${Date.now()}-${Math.random()}`,
                  timestamp: new Date().toISOString(),
                  severity: 'HIGH',
                  agentName: 'SettlementAI',
                  description: `Unauthorized high-value transaction attempt (${new Intl.NumberFormat('en-IN', { style: 'currency', currency: msg.intent.currency, maximumFractionDigits: 0 }).format(msg.intent.amount)}).`,
                  recommendedAction: 'Immediate manual review required.',
                  status: 'ACTIVE'
                });
              }
            }
          });
        }
      } catch (error) {
        // ignore polling errors
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [mounted]);

  const addTransaction = (tx: Transaction) => {
    setState(prev => {
      const newTotal = prev.metrics.transactionsToday.total + 1;
      const newBlocked = tx.status === 'BLOCKED' ? prev.metrics.transactionsBlocked.total + 1 : prev.metrics.transactionsBlocked.total;
      
      return {
        ...prev,
        transactions: [tx, ...prev.transactions],
        metrics: {
          ...prev.metrics,
          transactionsToday: { ...prev.metrics.transactionsToday, total: newTotal },
          transactionsBlocked: { 
            total: newBlocked, 
            percentageOfTotal: newTotal > 0 ? Math.round((newBlocked / newTotal) * 100) : 0 
          }
        }
      };
    });
  };

  const addAuditLog = (log: AuditLog) => {
    setState(prev => ({
      ...prev,
      auditLogs: [log, ...prev.auditLogs]
    }));
  };

  const addThreat = (threat: ThreatAlert) => {
    setState(prev => ({
      ...prev,
      threats: [threat, ...prev.threats]
    }));
  };

  const updatePolicy = (policyId: string, updates: Partial<Policy>) => {
    setState(prev => ({
      ...prev,
      policies: prev.policies.map(p => p.id === policyId ? { ...p, ...updates } : p)
    }));
  };

  const setActivePipelineStep = (step: string | null) => {
    setState(prev => ({
      ...prev,
      activePipelineStep: step
    }));
  };

  // Prevent hydration mismatch by not rendering the app until the local database is loaded
  if (!mounted) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', color: '#666' }}>Initializing Local Database...</div>;
  }

  return (
    <GlobalStateContext.Provider value={{ ...state, addTransaction, addAuditLog, addThreat, updatePolicy, setActivePipelineStep }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}
