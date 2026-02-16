# 🚀 Quick Setup Guide - Hugging Face (FREE!)

## Step 1: Get Your FREE Hugging Face API Token

1. **Go to Hugging Face**: https://huggingface.co/join
2. **Sign up for free** (no credit card needed!)
3. **Verify your email**
4. **Go to your tokens page**: https://huggingface.co/settings/tokens
5. **Click "New token"**
   - Name: `quote-generator`
   - Role: **Read** (default)
6. **Click "Generate"**
7. **Copy the token** (starts with `hf_...`)

## Step 2: Local Setup

```bash
# Navigate to project folder
cd quote-generator-app

# Install dependencies
npm install

# Create environment file
echo "HUGGINGFACE_API_KEY=hf_paste_your_token_here" > .env.local

# Start the app
npm run dev
```

## Step 3: Test It!

1. Open http://localhost:3000
2. Type how you're feeling
3. Click "Generate My Quote"
4. **First request may take 10-20 seconds** (model cold start)
5. After that, quotes generate instantly!

## Step 4: Deploy to Vercel (Optional)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variable: `HUGGINGFACE_API_KEY` = your token
4. Deploy!

## 🎉 That's it! Completely FREE forever!

### Troubleshooting

**"Model is loading" message?**
- This is normal on first use
- Wait 20 seconds and try again
- After first load, it's instant!

**"API key not configured"?**
- Make sure `.env.local` exists
- Token should start with `hf_`
- Restart dev server: `npm run dev`

**Questions?**
- Read the full README.md
- Check https://huggingface.co/docs
