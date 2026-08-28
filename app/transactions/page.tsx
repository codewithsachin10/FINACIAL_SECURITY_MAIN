'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import TransactionsList from '@/components/TransactionsList';
import styles from './page.module.css';

export default function TransactionsPage() {
  const { transactions } = useGlobalState();
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>TRANSACTIONS</h1>
        <p className={styles.description}>Immutable ledger of all agent-initiated financial activities.</p>
      </div>
      <TransactionsList initialTransactions={transactions} />
    </div>
  );
}
