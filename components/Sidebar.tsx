'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, ShieldAlert, BookOpen, AlertOctagon, FileText, Settings, UserCircle, ActivitySquare, Terminal } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}><ShieldAlert size={24} strokeWidth={1.5} /></div>
          <div>
            <h1 className={styles.brandTitle}>SENTINEL</h1>
            <p className={styles.brandSubtitle}>Autonomous Financial Security</p>
          </div>
        </div>
      </div>
      
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
              <LayoutDashboard size={18} strokeWidth={1.5} />
              <span>Overview</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/agents" className={`${styles.navLink} ${pathname === '/agents' ? styles.active : ''}`}>
              <Users size={18} strokeWidth={1.5} />
              <span>Agents</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/transactions" className={`${styles.navLink} ${pathname === '/transactions' ? styles.active : ''}`}>
              <Activity size={18} strokeWidth={1.5} />
              <span>Transactions</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/risk-analysis" className={`${styles.navLink} ${pathname === '/risk-analysis' ? styles.active : ''}`}>
              <ActivitySquare size={18} strokeWidth={1.5} />
              <span>Risk Analysis</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/policies" className={`${styles.navLink} ${pathname === '/policies' ? styles.active : ''}`}>
              <BookOpen size={18} strokeWidth={1.5} />
              <span>Policies</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/threats" className={`${styles.navLink} ${pathname === '/threats' ? styles.active : ''}`}>
              <AlertOctagon size={18} strokeWidth={1.5} />
              <span>Threats</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/audit-logs" className={`${styles.navLink} ${pathname === '/audit-logs' ? styles.active : ''}`}>
              <FileText size={18} strokeWidth={1.5} />
              <span>Audit Logs</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/console" className={`${styles.navLink} ${pathname === '/console' ? styles.active : ''}`}>
              <Terminal size={18} strokeWidth={1.5} />
              <span>Agent Console</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.divider}></div>

      <div className={styles.footer}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <div className={styles.systemStatus}>
              <span className={styles.statusDot}></span>
              <span>System Status: Optimal</span>
            </div>
          </li>
          <li className={styles.navItem}>
            <Link href="/settings" className={styles.navLink}>
              <Settings size={18} strokeWidth={1.5} />
              <span>Settings</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/profile" className={styles.navLink}>
              <UserCircle size={18} strokeWidth={1.5} />
              <span>Admin User</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
