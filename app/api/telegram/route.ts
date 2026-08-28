import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const queueFile = path.join(process.cwd(), 'telegram_queue.json');
    
    if (!fs.existsSync(queueFile)) {
      return NextResponse.json({ messages: [] });
    }

    const data = fs.readFileSync(queueFile, 'utf8');
    let queue = [];
    try {
      queue = JSON.parse(data);
    } catch (e) {
      queue = [];
    }

    if (queue.length > 0) {
      // Return the messages and clear the queue
      fs.writeFileSync(queueFile, '[]');
      return NextResponse.json({ messages: queue });
    }

    return NextResponse.json({ messages: [] });
  } catch (error: any) {
    console.error('Error reading telegram queue:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { chatId, message } = await req.json();
    
    // Replace with the bot token used in telegram-bot.js
    const botToken = '8725968129:AAGKatH7IgKRr2jvTy5OVzR8DW0PXPSI5Lk';
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending telegram message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
