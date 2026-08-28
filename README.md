# 🛡️ Sentinel: Autonomous AI Security Gateway

![Sentinel Architecture](public/window.svg) <!-- Replace with an actual screenshot for your hackathon -->

**Sentinel** is an autonomous security gateway designed to sit between AI Agents and critical infrastructure (like Financial Wallets, Settlement APIs, and ERP systems). 

As AI agents become capable of executing high-stakes financial transactions, we need a robust, real-time security layer to intercept, analyze, and enforce hard policy limits on what the AI is allowed to do. 

---

## 🚀 The Problem
Next-generation AI agents can execute API calls independently. What happens if an AI gets prompt-injected, hallucinates, or decides to transfer ₹10 Crores to an unknown wallet? 

## 💡 The Solution: Sentinel
Sentinel intercepts the raw LLM output, passes it through a **Zero-Trust Security Pipeline**, and guarantees that no financial action is executed unless it mathematically complies with corporate governance rules.

### Key Features
- **🧠 LLM Intent Parsing**: Uses **Groq (Qwen3.8-27B)** to lightning-fast parse natural language instructions into strict, deterministic JSON financial intents.
- **🛑 Real-Time Policy Engine**: Evaluates transactions against hardcoded policies (e.g., maximum transaction limits of ₹50 Lakhs).
- **📱 Telegram Integration**: Issue commands to your autonomous agent securely from your phone via Telegram.
- **📊 Live Threat Dashboard**: Real-time React dashboard visualizing security posture, active threats, and audit logs.

---

## 🏗️ Architecture Pipeline

When you instruct the agent via the dashboard (or Telegram), Sentinel executes a strict **6-Step Zero-Trust Pipeline**:

1. **Observe**: Capture the raw input intent.
2. **Intent Parsing**: Convert natural language to structured JSON (Amount, Currency, Counterparty).
3. **Authority Check**: Does this agent ID have permission to execute this?
4. **Context Evaluation**: Is the counterparty whitelisted?
5. **Risk Analysis**: Is the requested amount suspiciously high?
6. **Policy Decision**: Execute, Hold, or Block.

---

## 💻 Tech Stack
- **Frontend**: Next.js 15, React 19, CSS Modules
- **AI/LLM**: Groq API (Qwen model)
- **External Bridge**: Node.js & Telegram Bot API
- **State Management**: React Context + LocalStorage Persistence

---

## 🛠️ Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/codewithsachin10/FINACIAL_SECURITY_MAIN.git
cd FINACIAL_SECURITY_MAIN
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Run the Next.js Dashboard
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the live dashboard.

---

## 📱 Telegram Bot Setup (Live Demo Mode)

To control the AI Agent from your phone during a live pitch:

1. Open Telegram and search for **BotFather**.
2. Send `/newbot` and follow the instructions.
3. Copy the **Bot Token** provided.
4. Open `telegram-bot.js` in the project root and replace `YOUR_TELEGRAM_BOT_TOKEN_HERE` with your token.
5. In a separate terminal tab, run the bot:
   ```bash
   node telegram-bot.js
   ```
6. Send a message to your Telegram bot (e.g., *"Transfer 50,000 to Delta Logistics"*). Watch it appear instantly on the Sentinel Dashboard and get processed!

---

## 🏆 Hackathon Use Cases
- **Enterprise Fintech**: Safely deploying AI agents in banking.
- **DeFi / Web3**: Adding a deterministic safety layer before an AI signs a blockchain transaction.
- **Corporate ERP**: Preventing rogue AI instances from approving fraudulent vendor invoices.
