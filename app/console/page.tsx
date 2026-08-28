import TopHeader from '@/components/TopHeader';
import AgentConsole from '@/components/AgentConsole';
import styles from './page.module.css';

export default function ConsolePage() {
  return (
    <div className={styles.container}>
      <TopHeader />
      
      <div className={styles.header}>
        <h1 className={styles.title}>LIVE AGENT CONSOLE</h1>
        <p className={styles.description}>
          Interact with the autonomous financial agent (Powered by Groq). 
          Sentinel intercepts and evaluates all LLM-generated intents in real-time.
        </p>
      </div>
      
      <AgentConsole />
    </div>
  );
}
