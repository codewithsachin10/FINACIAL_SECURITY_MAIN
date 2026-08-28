import TopHeader from '@/components/TopHeader';
import TransactionSimulator from '@/components/TransactionSimulator';
import styles from './page.module.css';

export default function SimulatorPage() {
  return (
    <div className={styles.container}>
      <TopHeader />
      
      <div className={styles.header}>
        <h1 className={styles.title}>TRANSACTION SIMULATOR</h1>
        <p className={styles.description}>Test the security pipeline behavior against mock agent intents.</p>
      </div>
      
      <TransactionSimulator />
    </div>
  );
}
