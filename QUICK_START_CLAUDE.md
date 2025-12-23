# Quick Start: Claude API Integration

## ✅ What's Been Set Up

1. **Backend API Route** (`api/claude.ts`) - Secure serverless function that proxies Claude API calls
2. **React Utilities** (`src/lib/claude-api.ts`) - Helper functions for calling Claude
3. **React Hook** (`src/hooks/use-claude.ts`) - Easy-to-use hook for React components
4. **Example Component** (`src/components/ClaudeExample.tsx`) - Reference implementation

## 🚀 Quick Setup (3 Steps)

### 1. Get Your API Key
- Go to https://console.anthropic.com/
- Create an API key
- Copy it (starts with `sk-ant-...`)

### 2. Set Environment Variable

**For Local Development:**
```bash
# Create .env file in project root
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**For Vercel:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add `ANTHROPIC_API_KEY` with your key value
- Redeploy

### 3. Use in Your Code

```tsx
import { useClaude } from '../hooks/use-claude';

function MyComponent() {
  const { askClaude, response, isLoading, error } = useClaude();

  const handleClick = async () => {
    await askClaude("What is React?");
  };

  return (
    <div>
      <button onClick={handleClick}>Ask Claude</button>
      {response && <p>{response}</p>}
    </div>
  );
}
```

## 📚 Full Documentation

See `CLAUDE_API_SETUP.md` for complete setup instructions and examples.

## 🔒 Security

- ✅ API key is stored in environment variables (never in code)
- ✅ Backend proxy prevents key exposure to frontend
- ✅ `.env` is already in `.gitignore`

## 🐛 Troubleshooting

**"ANTHROPIC_API_KEY is not configured"**
→ Set the environment variable (see step 2 above)

**API route returns 404**
→ For local dev, use `vercel dev` instead of `npm run dev`

**Need help?**
→ Check `CLAUDE_API_SETUP.md` for detailed troubleshooting



