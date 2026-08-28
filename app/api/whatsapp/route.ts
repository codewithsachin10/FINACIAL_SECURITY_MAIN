import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const queueFile = path.join(process.cwd(), 'whatsapp_queue.json');
    
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
    console.error('Error reading whatsapp queue:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
