import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variable
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'ANTHROPIC_API_KEY is not configured. Please set it in your environment variables.' 
    });
  }

  try {
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Get the message and other parameters from the request body
    const { message, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024, system } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare messages array
    const messages = Array.isArray(message) ? message : [{ role: 'user', content: message }];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: model,
      max_tokens: max_tokens,
      system: system,
      messages: messages,
    });

    // Extract the text content from the response
    const textContent = response.content
      .filter((block: any) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    // Return the response
    return res.status(200).json({
      content: textContent,
      usage: response.usage,
      model: response.model,
    });
  } catch (error: any) {
    console.error('Claude API error:', error);
    
    // Return a user-friendly error message
    return res.status(500).json({
      error: error.message || 'An error occurred while calling Claude API',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}



