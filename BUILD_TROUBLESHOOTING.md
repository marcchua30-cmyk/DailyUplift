# Build Troubleshooting Guide

If you're getting "npm run build exited with 1" error, follow these steps:

## Step 1: Check Vercel Build Logs

1. Go to your Vercel project dashboard
2. Click on the failed deployment
3. Look at the build logs - find the ACTUAL error message
4. Common errors you might see:
   - TypeScript errors
   - Missing dependencies
   - Environment variable issues

## Step 2: Common Fixes

### Fix 1: Clear Cache and Redeploy
1. Go to Vercel → Deployments
2. Click the three dots (⋯) on your deployment
3. Click "Redeploy"
4. **IMPORTANT**: Uncheck "Use existing Build Cache"
5. Click "Redeploy"

### Fix 2: Verify Environment Variables
1. Go to Settings → Environment Variables
2. Make sure `HUGGINGFACE_API_KEY` is set
3. It should be set for: Production, Preview, AND Development
4. Value should start with `hf_`

### Fix 3: Update Next.js Version (if needed)
If logs show Next.js version issues, you can try:
1. In your local project, update package.json:
   ```json
   "next": "14.2.14"
   ```
2. Commit and push

### Fix 4: Verify All Files Are Present
Make sure these files exist:
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/api/generate-quote/route.ts`
- `tsconfig.json`
- `next.config.mjs`
- `tailwind.config.js`
- `postcss.config.js`

## Step 3: Test Build Locally

```bash
# In your project directory
npm install
npm run build
```

If it builds locally but fails on Vercel, the issue is likely:
- Environment variables
- Vercel's Node.js version
- Build cache

## Step 4: Node.js Version

Vercel uses Node 18 by default. If you need a specific version:

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

## Step 5: Fresh Deploy

If nothing works:
1. Delete the project on Vercel
2. Re-import from GitHub
3. Set environment variables again
4. Deploy fresh

## Still Having Issues?

Share the EXACT error message from Vercel build logs and I can help debug!

Common error patterns:
- `Module not found` → Missing dependency
- `Type error` → TypeScript issue  
- `Cannot find module` → Import path issue
- `Build failed` with no details → Check environment variables
