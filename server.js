/**
 * Local development server for Claude API
 * This allows the API to work with npm run dev
 * 
 * Run: node server.js (in a separate terminal)
 * Or use: npm run dev:full (runs both Vite and this server)
 */

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'ANTHROPIC_API_KEY is not configured. Please set it in your .env file.' 
    });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const { message, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024, system } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = Array.isArray(message) ? message : [{ role: 'user', content: message }];

    const response = await anthropic.messages.create({
      model: model,
      max_tokens: max_tokens,
      system: system,
      messages: messages,
    });

    const textContent = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return res.status(200).json({
      content: textContent,
      usage: response.usage,
      model: response.model,
    });
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while calling Claude API',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Claude API server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure ANTHROPIC_API_KEY is set in your .env file`);
});
