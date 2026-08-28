'use client';
import { useGlobalState } from '@/lib/GlobalStateContext';
import TopHeader from '@/components/TopHeader';
import PolicyList from '@/components/PolicyList';
import styles from './page.module.css';

export default function PoliciesPage() {
  const { policies } = useGlobalState();
  return (
    <div className={styles.container}>
      <TopHeader />
      <div className={styles.header}>
        <h1 className={styles.title}>SECURITY POLICIES</h1>
        <p className={styles.description}>Manage rules, limits, and restrictions for autonomous agent behavior.</p>
      </div>
      <PolicyList initialPolicies={policies} />
    </div>
  );
}
