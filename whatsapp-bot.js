const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const QUEUE_FILE = path.join(__dirname, 'whatsapp_queue.json');

// Ensure queue file exists
if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, '[]');
}

console.log('Initializing WhatsApp Client...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    }
});

client.on('qr', (qr) => {
    console.log('\n=========================================');
    console.log('📱 SCAN THIS QR CODE WITH YOUR WHATSAPP 📱');
    console.log('=========================================\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('\n✅ Sentinel WhatsApp Bridge is ready!');
    console.log('Listening for messages...\n');
});

client.on('message', async msg => {
    // Only process text messages
    if (msg.body) {
        console.log(`[WHATSAPP] Received from ${msg.from}: ${msg.body}`);
        
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
                id: msg.id.id,
                from: msg.from,
                body: msg.body,
                timestamp: Date.now()
            });
            
            // Write back
            fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
            console.log(`[WHATSAPP] Message queued for Sentinel pipeline.`);
            
        } catch (error) {
            console.error('[WHATSAPP] Error queuing message:', error);
        }
    }
});

client.initialize();
