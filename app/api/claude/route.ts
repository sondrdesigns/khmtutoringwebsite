import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured. Please set it in your environment variables.' },
      { status: 500 }
    );
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const { message, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024, system } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages = Array.isArray(message) ? message : [{ role: 'user' as const, content: message }];

    const response = await anthropic.messages.create({
      model: model,
      max_tokens: max_tokens,
      system: system,
      messages: messages,
    });

    const textContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({
      content: textContent,
      usage: response.usage,
      model: response.model,
    });
  } catch (error) {
    console.error('Claude API error:', error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An error occurred while calling Claude API',
      },
      { status: 500 }
    );
  }
}
