# ✅ Fixed Claude API Setup

## The Problem
- Vercel serverless functions don't work with `npm run dev` (Vite)
- You need a local development server

## The Solution
I've created a local Express server that works with `npm run dev`

## Quick Start

### 1. Add Your API Key to .env
Your `.env` file should have:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### 2. Run Development (Two Options)

**Option A: Run Both Servers Together (Recommended)**
```bash
npm run dev:full
```
This runs both the API server and Vite dev server together.

**Option B: Run Separately**
Terminal 1:
```bash
npm run dev:server
```

Terminal 2:
```bash
npm run dev
```

### 3. Use Claude API in Your Code

```tsx
import { useClaude } from '../hooks/use-claude';

function MyComponent() {
  const { askClaude, response, isLoading, error } = useClaude();

  const handleClick = async () => {
    await askClaude("Hello!");
  };

  return (
    <div>
      <button onClick={handleClick}>Ask Claude</button>
      {response && <p>{response}</p>}
    </div>
  );
}
```

## How It Works

1. **Local Development**: Express server on port 3001 handles `/api/claude`
2. **Vite Proxy**: Vite proxies `/api/*` requests to the Express server
3. **Production**: Vercel serverless function (`api/claude.ts`) handles requests

## Troubleshooting

**"ANTHROPIC_API_KEY is not configured"**
→ Make sure your `.env` file has `ANTHROPIC_API_KEY=sk-ant-...`

**"Cannot connect to server"**
→ Make sure `npm run dev:server` is running (or use `npm run dev:full`)

**"function greet()" error**
→ This might be a different issue. Check your browser console for the full error message.

## For Production (Vercel)

The `api/claude.ts` file will automatically work on Vercel. Just make sure to:
1. Add `ANTHROPIC_API_KEY` in Vercel Dashboard → Settings → Environment Variables
2. Redeploy your application
