# Quote Generator App 🌟

An AI-powered quote generator that creates personalized, uplifting quotes based on how you're feeling. Built with Next.js 14, React, TypeScript, Tailwind CSS, and Hugging Face AI (100% FREE!).

![Quote Generator](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![FREE](https://img.shields.io/badge/API-FREE-green)

## Features ✨

- **Personalized Quotes**: AI generates unique quotes based on your emotional state
- **100% FREE**: Uses Hugging Face's free Inference API
- **Beautiful UI**: Gradient backgrounds and smooth animations
- **Instant Generation**: Get uplifting quotes in seconds
- **Responsive Design**: Works perfectly on desktop and mobile
- **Type-Safe**: Built with TypeScript for better development experience

## Tech Stack 🛠️

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Hugging Face Inference API (Mistral-7B-Instruct - FREE!)
- **Icons**: Lucide React

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- A **FREE** Hugging Face account and API token

### Get Your FREE Hugging Face API Token

1. **Create a Hugging Face account**: Go to https://huggingface.co/join
2. **Go to Settings**: https://huggingface.co/settings/tokens
3. **Create a new token**: 
   - Click "New token"
   - Name it "quote-generator"
   - Role: "Read"
   - Click "Generate"
4. **Copy your token**: It starts with `hf_...`

**🎉 It's 100% FREE - no credit card required!**

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quote-generator-app.git
   cd quote-generator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Hugging Face API token to `.env.local`:
   ```
   HUGGINGFACE_API_KEY=hf_your_actual_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel 🚀

### Quick Deploy

The easiest way to deploy is using the Vercel Platform:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/quote-generator-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Configure the project:
     - Framework Preset: **Next.js**
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   
   In the Vercel project settings:
   - Go to "Settings" → "Environment Variables"
   - Add `HUGGINGFACE_API_KEY` with your token (starts with `hf_...`)
   - Click "Save"

4. **Deploy**
   
   Click "Deploy" and wait for the build to complete!

### Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add HUGGINGFACE_API_KEY

# Deploy to production
vercel --prod
```

## Environment Variables 🔐

| Variable | Description | Required | Cost |
|----------|-------------|----------|------|
| `HUGGINGFACE_API_KEY` | Your Hugging Face API token for AI generation | Yes | **FREE** |

**Important**: Never commit your `.env.local` file or expose your API key publicly!

## Project Structure 📁

```
quote-generator-app/
├── app/
│   ├── api/
│   │   └── generate-quote/
│   │       └── route.ts          # API endpoint for quote generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.mjs              # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## How It Works 🧠

1. User inputs how they're feeling
2. Frontend sends the feeling to the API route
3. API route calls Hugging Face AI (Mistral-7B-Instruct) with the user's input
4. AI generates a personalized, uplifting quote
5. Quote is displayed with beautiful animations

## API Usage 📊

The app uses **Mistral-7B-Instruct** via Hugging Face's free Inference API.

**🎉 100% FREE:**
- **No credit card required**
- **No usage limits** on free tier (rate-limited but sufficient for personal use)
- **No costs** - completely free forever!

**Rate Limits (Free Tier):**
- ~1 request per second
- If model is loading, it may take 10-20 seconds on first request
- After that, quotes generate instantly

## Customization 🎨

### Change AI Model

Edit `app/api/generate-quote/route.ts` and change the model URL:
```typescript
// Current: Mistral-7B-Instruct (recommended, free)
'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2'

// Other free options:
// 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf'
// 'https://api-inference.huggingface.co/models/google/flan-t5-large'
```

Browse more models at: https://huggingface.co/models?pipeline_tag=text-generation

### Modify Styling

Edit Tailwind classes in `app/page.tsx` or customize `tailwind.config.js`.

### Adjust Quote Prompt

Modify the prompt in `app/api/generate-quote/route.ts` to change quote style.

## Troubleshooting 🔧

### "npm run build" exited with 1 error

If you encounter this error, try these steps:

1. **Delete node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check Node.js version**
   ```bash
   node --version  # Should be 18.x or higher
   ```
   If not, install Node.js 18+ from [nodejs.org](https://nodejs.org)

3. **Verify environment variables**
   - Make sure `.env.local` exists with `HUGGINGFACE_API_KEY`
   - For Vercel, ensure the environment variable is set in the dashboard

4. **Check for TypeScript errors**
   ```bash
   npm run lint
   ```

5. **Clear Next.js cache**
   ```bash
   rm -rf .next
   npm run build
   ```

### "API key not configured" error
- Make sure `.env.local` exists with your Hugging Face token
- Your token should start with `hf_`
- Get a FREE token at https://huggingface.co/settings/tokens
- Restart the development server after adding environment variables

### Build fails on Vercel
- Verify `HUGGINGFACE_API_KEY` is set in Vercel dashboard
- Check build logs for specific errors

### Quotes not generating
- Verify your Hugging Face token is valid (starts with `hf_`)
- Check browser console for errors
- If you see "Model is loading", wait 10-20 seconds and try again (cold start)
- After first load, quotes will generate instantly

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Support 💬

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ using Hugging Face AI (100% FREE!)
