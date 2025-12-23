# Global Claude API Setup for All Projects

This guide helps you set up Claude API access that works across ALL your projects in Cursor.

## Option 1: System-Wide Environment Variable (Recommended)

### Windows Setup

1. **Get your Claude API key** from https://console.anthropic.com/

2. **Set system environment variable:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "User variables", click "New"
   - Variable name: `ANTHROPIC_API_KEY`
   - Variable value: `sk-ant-your-key-here`
   - Click OK on all dialogs

3. **Restart Cursor** for changes to take effect

4. **In any project**, create a `.env` file with:
   ```
   ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
   ```
   Or just reference it directly in your code (for Node.js projects)

### Benefits:
- ✅ Works in all projects automatically
- ✅ No need to copy API key to each project
- ✅ More secure (key stored once, system-wide)

## Option 2: Reusable Template Package

I'll create a template you can copy to any new project. See `CLAUDE_TEMPLATE/` folder.

## Option 3: Global npm Package (Advanced)

Create a global npm package that provides Claude utilities.



