import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let feeling: string = '';
  
  try {
    const body = await request.json();
    feeling = body.feeling || '';

    if (!feeling || !feeling.trim()) {
      return NextResponse.json(
        { error: 'Please provide how you\'re feeling' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      console.error('HUGGINGFACE_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured. Get a free key at https://huggingface.co/settings/tokens' },
        { status: 500 }
      );
    }

    console.log('Making request to Hugging Face...');

    // Using GPT-2 - always free and available on Hugging Face
    const response = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Here is an uplifting quote for someone feeling ${feeling}: "`,
          parameters: {
            max_new_tokens: 60,
            temperature: 0.9,
            top_p: 0.95,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();
    console.log('Hugging Face response:', JSON.stringify(data).substring(0, 200));

    // Handle Hugging Face response format
    if (data && data[0] && data[0].generated_text) {
      let quote = data[0].generated_text.trim();
      
      // Clean up the response
      // Remove quotes if they exist
      quote = quote.replace(/^["']|["']$/g, '');
      // Get only the first sentence or up to closing quote
      const endQuote = quote.indexOf('"');
      if (endQuote > 10) {
        quote = quote.substring(0, endQuote);
      }
      // Clean up any remaining artifacts
      quote = quote.split('\n')[0].trim();
      
      // If quote is too short, empty, or doesn't make sense, provide a fallback
      if (quote.length < 15 || quote.length > 200) {
        console.log('Quote not suitable, using fallback');
        quote = generateFallbackQuote(feeling);
      }
      
      return NextResponse.json({ quote });
    } else if (data.error) {
      console.error('Hugging Face API error:', data.error);
      
      // Model might be loading
      if (data.error.includes('loading') || data.error.includes('currently loading')) {
        return NextResponse.json(
          { error: 'AI model is waking up (this takes 20 seconds on first use). Please try again in a moment!' },
          { status: 503 }
        );
      }
      
      // Rate limit
      if (data.error.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `API Error: ${data.error}` },
        { status: 500 }
      );
    } else {
      console.error('Unexpected response format:', data);
      return NextResponse.json(
        { error: 'Unable to generate quote. The AI might be starting up - please try again in 20 seconds.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating quote:', error);
    // If API fails completely, just use a curated quote
    const quote = generateFallbackQuote(feeling);
    return NextResponse.json({ quote });
  }
}

// Fallback quotes in case the model response is poor
function generateFallbackQuote(feeling: string): string {
  const feelingLower = feeling.toLowerCase();
  
  // Categorize feelings and provide relevant quotes
  if (feelingLower.includes('anxious') || feelingLower.includes('worried') || feelingLower.includes('nervous')) {
    const anxiousQuotes = [
      "Worrying does not take away tomorrow's troubles. It takes away today's peace.",
      "You've survived 100% of your bad days. You're doing great.",
      "Anxiety is a thin stream of fear trickling through the mind. Change the channel to courage.",
    ];
    return anxiousQuotes[Math.floor(Math.random() * anxiousQuotes.length)];
  }
  
  if (feelingLower.includes('sad') || feelingLower.includes('down') || feelingLower.includes('depressed')) {
    const sadQuotes = [
      "Even the darkest night will end and the sun will rise.",
      "Your feelings are valid. It's okay to not be okay sometimes.",
      "This too shall pass. Be patient with yourself.",
    ];
    return sadQuotes[Math.floor(Math.random() * sadQuotes.length)];
  }
  
  if (feelingLower.includes('tired') || feelingLower.includes('exhausted') || feelingLower.includes('overwhelmed')) {
    const tiredQuotes = [
      "Rest is not idleness. Taking time to recharge is essential for your wellbeing.",
      "You don't have to see the whole staircase. Just take the first step.",
      "Be gentle with yourself. You're doing the best you can.",
    ];
    return tiredQuotes[Math.floor(Math.random() * tiredQuotes.length)];
  }
  
  if (feelingLower.includes('stressed') || feelingLower.includes('pressure')) {
    const stressedQuotes = [
      "You are braver than you believe, stronger than you seem, and smarter than you think.",
      "It's okay to take things one day at a time. Progress, not perfection.",
      "You've weathered many storms before. This too is temporary.",
    ];
    return stressedQuotes[Math.floor(Math.random() * stressedQuotes.length)];
  }
  
  // General uplifting quotes for any feeling
  const generalQuotes = [
    "Every storm runs out of rain. This feeling will pass, and you'll emerge stronger.",
    "In the midst of difficulty lies opportunity. You're more resilient than you know.",
    "This moment doesn't define you. Your strength lies in continuing despite how you feel.",
    "The only way out is through. Keep going, you've got this.",
    "Your current situation is not your final destination. Better days are coming.",
  ];
  
  return generalQuotes[Math.floor(Math.random() * generalQuotes.length)];
}
