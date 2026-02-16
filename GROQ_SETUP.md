# 🚀 Groq API Setup Guide (FREE!)

Groq is a FREE AI API that generates custom quotes based on your feelings. It's fast, powerful, and has generous free limits!

## Step 1: Get Your FREE Groq API Key

1. **Go to Groq Console**: https://console.groq.com
2. **Sign up for free** (no credit card required!)
3. **Verify your email**
4. **Go to API Keys**: https://console.groq.com/keys
5. **Click "Create API Key"**
6. **Copy the key** (starts with `gsk_...`)

## Step 2: Add to Your Project

### For Local Development:

```bash
# In your project folder, create .env.local
echo "GROQ_API_KEY=gsk_your_actual_key_here" > .env.local

# Restart your dev server
npm run dev
```

### For Vercel Deployment:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add new variable:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `gsk_your_actual_key_here`
   - **Environment**: Select all (Production, Preview, Development)
4. Save
5. Redeploy your app

## Step 3: Test It!

1. Open your app
2. Type how you're feeling (e.g., "anxious about my presentation")
3. Get a custom AI-generated quote just for you!

## 🎯 What You Get:

- ✅ **Custom quotes** - Generated specifically for your feeling
- ✅ **Fast responses** - Usually < 1 second
- ✅ **FREE** - Generous free tier (30 requests/minute)
- ✅ **No credit card** - Actually free
- ✅ **Smart fallback** - Uses curated quotes if API is down

## 📊 Groq Free Limits:

- **30 requests per minute** (plenty for personal use!)
- **14,400 requests per day**
- **~432,000 requests per month**

Basically unlimited for a personal quote generator!

## 🔒 Security:

- **Never commit** your `.env.local` file to GitHub
- **Never share** your API key publicly
- The key only goes in:
  - Your local `.env.local` file
  - Vercel environment variables

## ❓ Troubleshooting:

### "API key not configured"
- Make sure you added `GROQ_API_KEY` to `.env.local`
- Restart your dev server
- Check the key starts with `gsk_`

### API not working
- App will automatically fall back to curated quotes
- Check your Groq console for rate limits
- Verify your key is still active

## 🆚 Groq vs Other Options:

| Feature | Groq (Current) | OpenAI | Anthropic |
|---------|---------------|---------|-----------|
| Cost | FREE | $0.001/quote | $0.001/quote |
| Speed | Very Fast | Fast | Fast |
| Custom Quotes | ✅ Yes | ✅ Yes | ✅ Yes |
| Credit Card | ❌ No | ✅ Required | ✅ Required |

Groq is the best free option! 🎉

---

Need help? Check the main README.md or open an issue on GitHub!
