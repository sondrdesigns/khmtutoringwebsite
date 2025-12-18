# Claude API Setup Instructions

This guide will help you set up Claude API integration securely without exposing your API key in the codebase.

## Overview

The Claude API integration uses a secure backend proxy pattern:
- **Frontend** (React) → Calls `/api/claude` endpoint
- **Backend** (Vercel Serverless Function) → Makes authenticated requests to Claude API
- **API Key** → Stored securely in environment variables (never in code)

## Step 1: Get Your Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the API key (you'll only see it once!)

## Step 2: Local Development Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `YOUR_ANTHROPIC_API_KEY_HERE` with your actual API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

3. The `.env` file is already in `.gitignore`, so it won't be committed to git.

4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 3: Vercel Deployment Setup

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the following:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Claude API key (starts with `sk-ant-...`)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your application for the changes to take effect

## Step 4: Using Claude API in Your Code

### Option 1: Using the Hook (Recommended)

```tsx
import { useClaude } from '../hooks/use-claude';

function MyComponent() {
  const { askClaude, response, isLoading, error } = useClaude();

  const handleAsk = async () => {
    try {
      await askClaude("What is React?", "You are a helpful assistant.");
      // Response will be in the `response` state
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleAsk} disabled={isLoading}>
        {isLoading ? 'Asking...' : 'Ask Claude'}
      </button>
      {response && <p>{response}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

### Option 2: Using the Utility Functions

```tsx
import { askClaude, callClaude } from '../lib/claude-api';

// Simple question
const answer = await askClaude("What is TypeScript?");

// With system prompt
const answer = await askClaude(
  "Explain React hooks",
  "You are a React expert. Keep explanations concise."
);

// Advanced usage with full control
const response = await callClaude({
  message: "What are the best practices for React?",
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 2048,
  system: "You are a senior React developer."
});

console.log(response.content); // The response text
console.log(response.usage); // Token usage information
```

### Option 3: Multi-turn Conversations

```tsx
import { callClaude } from '../lib/claude-api';

const response = await callClaude({
  message: [
    { role: 'user', content: 'What is React?' },
    { role: 'assistant', content: 'React is a JavaScript library...' },
    { role: 'user', content: 'How do I use hooks?' }
  ],
  system: 'You are a helpful coding assistant.'
});
```

## Available Models

- `claude-3-5-sonnet-20241022` (default) - Best balance of speed and capability
- `claude-3-opus-20240229` - Most capable, slower
- `claude-3-sonnet-20240229` - Good balance
- `claude-3-haiku-20240307` - Fastest, most cost-effective

## Troubleshooting

### Error: "ANTHROPIC_API_KEY is not configured"

**Solution**: Make sure you've set the environment variable:
- **Local**: Check your `.env` file exists and has the correct key
- **Vercel**: Verify the environment variable is set in Vercel dashboard and redeploy

### Error: "API request failed with status 401"

**Solution**: Your API key is invalid or expired. Generate a new one from Anthropic Console.

### Error: "API request failed with status 429"

**Solution**: You've hit the rate limit. Wait a moment and try again, or upgrade your Anthropic plan.

### API Route Not Found (404)

**Solution**: 
- Make sure the `api/claude.ts` file exists
- For local development, you may need to use Vercel CLI: `npm install -g vercel && vercel dev`
- Or use a different approach for local development (see below)

## Local Development Alternative

If Vercel serverless functions don't work locally, you can:

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel dev` instead of `npm run dev`
3. This will start a local server that handles API routes

Or create a simple Express server for local development (contact me if you need help with this).

## Security Best Practices

✅ **DO:**
- Store API keys in environment variables
- Use the backend proxy (never call Claude API directly from frontend)
- Keep `.env` in `.gitignore`
- Rotate API keys periodically
- Use different keys for development and production

❌ **DON'T:**
- Commit API keys to git
- Hardcode API keys in your source code
- Expose API keys in client-side code
- Share API keys publicly

## Cost Considerations

Claude API is pay-per-use. Monitor your usage at:
- [Anthropic Console Usage](https://console.anthropic.com/usage)

Set up billing alerts to avoid unexpected charges.

## Need Help?

If you encounter any issues:
1. Check the error message in the browser console
2. Check Vercel function logs (Vercel Dashboard → Your Project → Functions)
3. Verify your API key is correct and active
4. Make sure you've redeployed after adding environment variables
