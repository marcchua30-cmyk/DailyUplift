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

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `I'm feeling ${feeling}. Can you create an original, uplifting quote that speaks directly to this feeling? The quote should be warm, encouraging, and help me feel better. Please respond with ONLY the quote itself, no preamble or explanation.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      return NextResponse.json({ quote: data.content[0].text.trim() });
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
