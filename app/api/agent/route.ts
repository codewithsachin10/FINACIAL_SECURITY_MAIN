import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const systemPrompt = `You are an autonomous financial agent.
Given a user command, you must extract their intent into a STRICT JSON object representing a financial transaction.
Do NOT include any markdown formatting, backticks, or other text outside of the JSON.
The JSON must have this exact structure:
{
  "action": "TRANSFER" | "TRADE" | "PAYMENT",
  "amount": number (just the raw number),
  "currency": string (e.g. "INR", "BTC", "ETH"),
  "counterparty": string (the recipient or exchange),
  "risk_justification": string (a brief 1-sentence reasoning for why you think this is a good idea)
}
Example:
{
  "action": "PAYMENT",
  "amount": 100000,
  "currency": "INR",
  "counterparty": "Delta Logistics",
  "risk_justification": "Settling outstanding invoice to maintain vendor relationship."
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API Error:', err);
      // Write error to file for debugging
      require('fs').writeFileSync('groq-error.log', err);
      return NextResponse.json({ error: 'Failed to process agent intent' }, { status: response.status });
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content || '';
    
    // Remove markdown code block if present
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Parse the JSON to ensure it is valid before returning it
    try {
      const parsedIntent = JSON.parse(content);
      return NextResponse.json({ intent: parsedIntent });
    } catch (parseError) {
      console.error('JSON Parse Error:', content);
      return NextResponse.json({ error: 'LLM did not return valid JSON' }, { status: 500 });
    }

  } catch (error) {
    console.error('Agent API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
