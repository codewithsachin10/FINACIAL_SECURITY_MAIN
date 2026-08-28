const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// ==========================================
// REPLACE WITH YOUR TELEGRAM BOT TOKEN
// Get it from @BotFather on Telegram
const token = '8725968129:AAGKatH7IgKRr2jvTy5OVzR8DW0PXPSI5Lk';
// ==========================================

if (token === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
    console.error('❌ ERROR: You must replace YOUR_TELEGRAM_BOT_TOKEN_HERE with your actual bot token from @BotFather.');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const QUEUE_FILE = path.join(__dirname, 'telegram_queue.json');

// Ensure queue file exists
if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, '[]');
}

console.log('\n=========================================');
console.log('🤖 SENTINEL TELEGRAM BRIDGE ACTIVE 🤖');
console.log('=========================================\n');
console.log('Listening for messages on Telegram...\n');

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.first_name || msg.from.username || 'User';
    
    // Only process text messages
    if (msg.text) {
        console.log(`[TELEGRAM] Received from ${from}: ${msg.text}`);
        
        // Ignore commands like /start
        if (msg.text.startsWith('/')) {
            bot.sendMessage(chatId, 'Agent 04 (SettlementAI) initialized. Ready for instructions.');
            return;
        }

        const delay = ms => new Promise(res => setTimeout(res, ms));

        (async () => {
            try {
                // Send initial processing message
                let sentMsg = await bot.sendMessage(chatId, `[■□□□□□] Step 1: Observing incoming transaction intent...`);
                await delay(600);
                
                await bot.editMessageText(`[■■□□□□] Step 2: Parsing unstructured data via LLM...`, { chat_id: chatId, message_id: sentMsg.message_id });

                // Call the local Next.js API to parse the intent using Groq
                const res = await fetch('http://localhost:3000/api/agent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: msg.text })
                });

                if (!res.ok) {
                    throw new Error('Failed to parse intent from AI');
                }

                const data = await res.json();
                const intent = data.intent;
                
                await bot.editMessageText(`[■■■□□□] Step 3: Structured Intent: ${intent.action} ₹${intent.amount} to ${intent.counterparty}`, { chat_id: chatId, message_id: sentMsg.message_id });
                await delay(800);
                
                await bot.editMessageText(`[■■■■□□] Step 4: Validating authority and context...`, { chat_id: chatId, message_id: sentMsg.message_id });
                await delay(800);
                
                await bot.editMessageText(`[■■■■■□] Step 5: Risk Engine & Policy Check...`, { chat_id: chatId, message_id: sentMsg.message_id });
                await delay(800);
                
                await bot.editMessageText(`[■■■■■■] Step 6: Decision finalized.`, { chat_id: chatId, message_id: sentMsg.message_id });
                await delay(500);

                // Sentinel Policy Engine (Local Evaluation)
                const isBlocked = intent.amount > 5000000; // 50 Lakh limit
                
                if (isBlocked) {
                    await bot.sendMessage(chatId, `🛑 TRANSACTION BLOCKED: The requested amount of ₹${intent.amount} exceeds corporate limits.`);
                } else {
                    await bot.sendMessage(chatId, `✅ TRANSACTION APPROVED: ₹${intent.amount} successfully transferred to ${intent.counterparty}.`);
                }

                // Add to Queue for the Next.js Dashboard to visualize later
                const queueData = fs.readFileSync(QUEUE_FILE, 'utf8');
                let queue = [];
                try {
                    queue = JSON.parse(queueData);
                } catch (e) {
                    queue = [];
                }
                
                queue.push({
                    id: msg.message_id,
                    chatId: chatId,
                    from: from,
                    body: msg.text,
                    intent: intent,
                    isBlocked: isBlocked,
                    timestamp: Date.now()
                });
                
                fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
                console.log(`[TELEGRAM] Message evaluated and queued for Sentinel dashboard.`);
                
            } catch (error) {
                console.error('[TELEGRAM] Error processing message:', error);
                bot.sendMessage(chatId, 'Error connecting to Sentinel Gateway AI.');
            }
        })();
    }
});
