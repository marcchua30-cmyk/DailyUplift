# Quote Generator App 🌟

A beautiful AI-powered quote generator that creates personalized, uplifting quotes based on exactly how you're feeling. Uses Groq's FREE AI API with smart fallback to curated quotes.

![Quote Generator](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![FREE API](https://img.shields.io/badge/Groq-FREE-green)

## Features ✨

- **AI-Generated Quotes**: Custom quotes generated specifically for your feeling
- **FREE API**: Groq AI with generous free tier (no credit card!)
- **Smart Fallback**: 50+ curated quotes if API is unavailable
- **Fast**: Responses in under 1 second
- **Beautiful UI**: Gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Quick Start

### 1. Get FREE Groq API Key

1. Go to https://console.groq.com
2. Sign up (free, no credit card)
3. Create API Key
4. Copy the key (starts with `gsk_...`)

See detailed instructions in **GROQ_SETUP.md**

### 2. Local Development

```bash
git clone https://github.com/yourusername/quote-generator-app.git
cd quote-generator-app
npm install

# Add your Groq API key
echo "GROQ_API_KEY=gsk_your_key_here" > .env.local

npm run dev
```

Open http://localhost:3000

### 3. Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: `GROQ_API_KEY` = your key
4. Deploy!

## How It Works 🧠

1. **You input**: "feeling anxious about my job interview"
2. **Groq AI generates**: A custom, encouraging quote specifically for that feeling
3. **You get**: Personalized support in seconds
4. **Fallback**: If API is down, uses smart curated quotes

## API Details 🔌

- **API**: Groq (llama-3.1-8b-instant model)
- **Cost**: FREE (30 req/min, 14,400/day)
- **Speed**: ~500ms response time
- **Fallback**: 50+ curated quotes organized by emotion

## Examples 💬

**Input**: "stressed about deadlines"
**Output**: "Remember, progress over perfection. Each small step forward is a victory worth celebrating."

**Input**: "excited about my new job"  
**Output**: "Your enthusiasm is your superpower! Channel that energy and watch yourself soar."

**Input**: "tired and overwhelmed"
**Output**: "Rest isn't giving up—it's giving yourself what you need to continue. Be gentle with yourself."

## Customization 🎨

Add more quotes in `app/api/generate-quote/route.ts`:

```typescript
const yourQuotes = [
  "Add your quote here!",
];
```

## Troubleshooting 🔧

**Build fails?**
- Go to Vercel → Deployments → ⋯ → Redeploy
- Uncheck "Use existing Build Cache"
- Redeploy

See BUILD_TROUBLESHOOTING.md for more help.

---

Built with ❤️ • No APIs Required • 100% Free Forever
