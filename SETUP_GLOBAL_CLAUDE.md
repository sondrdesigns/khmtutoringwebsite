# Setup Claude API for ALL Your Projects

## 🎯 Goal
Set up Claude API once, use it in every project without reconfiguring.

## ✅ Step 1: Set System-Wide Environment Variable

### Windows:
1. Press `Win + R`
2. Type: `sysdm.cpl` and press Enter
3. Click "Advanced" tab
4. Click "Environment Variables"
5. Under "User variables", click "New"
6. Enter:
   - **Variable name**: `ANTHROPIC_API_KEY`
   - **Variable value**: `sk-ant-your-actual-key-here` (get from https://console.anthropic.com/)
7. Click OK on all dialogs
8. **Restart Cursor** (important!)

### Verify it worked:
Open PowerShell and run:
```powershell
$env:ANTHROPIC_API_KEY
```
You should see your API key.

## ✅ Step 2: Use the Template for New Projects

I've created a template at: `C:\Users\aacec\ClaudeTemplate\`

### For each new project:

1. **Copy template files:**
   ```powershell
   # From your new project folder
   Copy-Item "C:\Users\aacec\ClaudeTemplate\api" -Destination . -Recurse
   Copy-Item "C:\Users\aacec\ClaudeTemplate\src\lib\claude-api.ts" -Destination "src\lib\" -Force
   Copy-Item "C:\Users\aacec\ClaudeTemplate\src\hooks\use-claude.ts" -Destination "src\hooks\" -Force
   Copy-Item "C:\Users\aacec\ClaudeTemplate\server.js" -Destination . -Force
   ```

2. **Install dependencies:**
   ```bash
   npm install @anthropic-ai/sdk
   npm install --save-dev express dotenv concurrently @vercel/node
   ```

3. **Add scripts to package.json:**
   ```json
   {
     "scripts": {
       "dev:server": "node server.js",
       "dev:full": "concurrently \"npm run dev:server\" \"npm run dev\""
     }
   }
   ```

4. **Configure Vite proxy** (if using Vite):
   Add to `vite.config.ts`:
   ```ts
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
       },
     },
   }
   ```

5. **Run:**
   ```bash
   npm run dev:full
   ```

## ✅ Step 3: Use in Your Code

```tsx
import { useClaude } from './hooks/use-claude';

function MyComponent() {
  const { askClaude, response, isLoading } = useClaude();
  
  return (
    <div>
      <button onClick={() => askClaude("Hello Claude!")}>
        Ask Claude
      </button>
      {response && <p>{response}</p>}
    </div>
  );
}
```

## 🎉 Done!

Now Claude API works in:
- ✅ Current project (Khmtutoring)
- ✅ All future projects (just copy template files)
- ✅ No need to add API key to each project (uses system env var)

## 📝 Notes

- The system environment variable works automatically
- No need to create `.env` files in each project
- Template is saved at: `C:\Users\aacec\ClaudeTemplate\`
- For Vercel deployment, add `ANTHROPIC_API_KEY` in Vercel dashboard (one-time per project)

## 🔧 Troubleshooting

**"ANTHROPIC_API_KEY not found"**
→ Make sure you set the system environment variable and restarted Cursor

**API route not working**
→ Make sure `npm run dev:server` is running (or use `npm run dev:full`)

**Template files missing**
→ They're at `C:\Users\aacec\ClaudeTemplate\`
