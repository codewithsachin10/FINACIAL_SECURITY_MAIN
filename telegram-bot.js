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
        
        try {
            // Read current queue
            const queueData = fs.readFileSync(QUEUE_FILE, 'utf8');
            let queue = [];
            try {
                queue = JSON.parse(queueData);
            } catch (e) {
                queue = [];
            }
            
            // Add new message
            queue.push({
                id: msg.message_id,
                chatId: chatId,
                from: from,
                body: msg.text,
                timestamp: Date.now()
            });
            
            // Write back
            fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
            console.log(`[TELEGRAM] Message queued for Sentinel pipeline.`);
            
            // Send reply back to Telegram
            bot.sendMessage(chatId, `Agent 04 is processing your request...`);
            
        } catch (error) {
            console.error('[TELEGRAM] Error queuing message:', error);
            bot.sendMessage(chatId, 'Error connecting to Sentinel Gateway.');
        }
    }
});
