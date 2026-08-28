import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import styles from './layout.module.css';

import { GlobalStateProvider } from '@/lib/GlobalStateContext';

export const metadata: Metadata = {
  title: 'SENTINEL | Autonomous Financial Security',
  description: 'Security overview dashboard for autonomous financial agents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStateProvider>
          <div className={styles.appContainer}>
            <Sidebar />
            <main className={styles.mainContent}>
              {children}
            </main>
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
