import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { feeling } = await request.json();

    if (!feeling || !feeling.trim()) {
      return NextResponse.json(
        { error: 'Please provide how you\'re feeling' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured. Get a free key at https://huggingface.co/settings/tokens' },
        { status: 500 }
      );
    }

    // Using Mistral-7B-Instruct model (free on Hugging Face)
    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Create a short, uplifting quote for someone feeling: ${feeling}. The quote should be warm, encouraging, and help them feel better. Only write the quote itself with no explanations or preamble.`,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.8,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    // Handle Hugging Face response format
    if (data && data[0] && data[0].generated_text) {
      let quote = data[0].generated_text.trim();
      
      // Clean up the response - remove any instruction repetition
      quote = quote.replace(/Create a.*quote.*feeling:.*\./gi, '').trim();
      quote = quote.replace(/^["']|["']$/g, '').trim(); // Remove surrounding quotes if any
      
      // If quote is too short or empty, provide a fallback
      if (quote.length < 10) {
        quote = generateFallbackQuote(feeling);
      }
      
      return NextResponse.json({ quote });
    } else if (data.error) {
      // Model might be loading
      if (data.error.includes('loading')) {
        return NextResponse.json(
          { error: 'AI model is loading. Please try again in a few seconds.' },
          { status: 503 }
        );
      }
      console.error('Hugging Face error:', data.error);
      return NextResponse.json(
        { error: 'Unable to generate quote. Please try again.' },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Unable to generate quote' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    );
  }
}

// Fallback quotes in case the model response is poor
function generateFallbackQuote(feeling: string): string {
  const fallbacks = [
    "Every storm runs out of rain. This feeling will pass, and you'll emerge stronger.",
    "Your feelings are valid, and it's okay to not be okay. Tomorrow is a new opportunity.",
    "In the midst of difficulty lies opportunity. You're more resilient than you know.",
    "Be gentle with yourself. You're doing the best you can with what you have right now.",
    "This moment doesn't define you. Your strength lies in continuing despite how you feel.",
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
