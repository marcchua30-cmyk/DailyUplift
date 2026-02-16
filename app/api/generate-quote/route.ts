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

    const apiKey = process.env.GROQ_API_KEY;

    // Try Groq API if key is available
    if (apiKey) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'system',
                content: 'You are a compassionate quote generator. Create short, uplifting quotes (1-2 sentences max) that speak directly to how someone is feeling. Be warm and encouraging. Only output the quote itself, no preamble or explanation.'
              },
              {
                role: 'user',
                content: `Create an uplifting quote for someone feeling: ${feeling}`
              }
            ],
            temperature: 0.8,
            max_tokens: 100,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            const quote = data.choices[0].message.content.trim();
            
            // Clean up any quotes that might have extra formatting
            const cleanedQuote = quote.replace(/^["']|["']$/g, '').trim();
            
            if (cleanedQuote.length > 10) {
              return NextResponse.json({ quote: cleanedQuote });
            }
          }
        } else {
          console.log('Groq API error:', response.status);
        }
      } catch (apiError) {
        console.log('Groq API unavailable:', apiError);
      }
    }

    // Fallback to curated quotes if API fails or no key
    const quote = generatePersonalizedQuote(feeling);
    return NextResponse.json({ quote });
    
  } catch (error) {
    console.error('Error generating quote:', error);
    // Fallback to a general quote
    const quote = generatePersonalizedQuote(feeling || 'uncertain');
    return NextResponse.json({ quote });
  }
}

// Generate personalized quotes based on feelings
function generatePersonalizedQuote(feeling: string): string {
  const feelingLower = feeling.toLowerCase();
  
  // Anxious / Worried / Nervous
  if (feelingLower.includes('anxious') || feelingLower.includes('worried') || feelingLower.includes('nervous') || feelingLower.includes('panic')) {
    const anxiousQuotes = [
      "Worrying does not take away tomorrow's troubles. It takes away today's peace.",
      "You've survived 100% of your bad days. You're doing great.",
      "Anxiety is a thin stream of fear trickling through the mind. Change the channel to courage.",
      "Your mind is a garden, your thoughts are the seeds. You can grow flowers or you can grow weeds.",
      "Feel the fear and do it anyway. Courage is not the absence of fear, but action in spite of it.",
      "Breathe. You are not your thoughts. You are the sky, and thoughts are just passing clouds.",
    ];
    return anxiousQuotes[Math.floor(Math.random() * anxiousQuotes.length)];
  }
  
  // Sad / Down / Depressed
  if (feelingLower.includes('sad') || feelingLower.includes('down') || feelingLower.includes('depressed') || feelingLower.includes('lonely') || feelingLower.includes('empty')) {
    const sadQuotes = [
      "Even the darkest night will end and the sun will rise.",
      "Your feelings are valid. It's okay to not be okay sometimes.",
      "This too shall pass. Be patient with yourself.",
      "Grief is love with no place to go. Allow yourself to feel.",
      "You are allowed to be both a masterpiece and a work in progress simultaneously.",
      "The wound is the place where the light enters you.",
      "Sometimes the bad things that happen in our lives put us directly on the path to the best things.",
    ];
    return sadQuotes[Math.floor(Math.random() * sadQuotes.length)];
  }
  
  // Tired / Exhausted / Overwhelmed
  if (feelingLower.includes('tired') || feelingLower.includes('exhausted') || feelingLower.includes('overwhelmed') || feelingLower.includes('drained') || feelingLower.includes('burnout')) {
    const tiredQuotes = [
      "Rest is not idleness. Taking time to recharge is essential for your wellbeing.",
      "You don't have to see the whole staircase. Just take the first step.",
      "Be gentle with yourself. You're doing the best you can.",
      "Almost everything will work again if you unplug it for a few minutes, including you.",
      "You can't pour from an empty cup. Take care of yourself first.",
      "Sometimes the most productive thing you can do is rest.",
      "It's okay to slow down. You don't have to do it all today.",
    ];
    return tiredQuotes[Math.floor(Math.random() * tiredQuotes.length)];
  }
  
  // Stressed / Pressure
  if (feelingLower.includes('stressed') || feelingLower.includes('pressure') || feelingLower.includes('tense')) {
    const stressedQuotes = [
      "You are braver than you believe, stronger than you seem, and smarter than you think.",
      "It's okay to take things one day at a time. Progress, not perfection.",
      "You've weathered many storms before. This too is temporary.",
      "The greatest weapon against stress is our ability to choose one thought over another.",
      "You don't have to control your thoughts. You just have to stop letting them control you.",
      "Within you is the strength to meet life's challenges and the wisdom to know when to ask for help.",
    ];
    return stressedQuotes[Math.floor(Math.random() * stressedQuotes.length)];
  }
  
  // Angry / Frustrated
  if (feelingLower.includes('angry') || feelingLower.includes('mad') || feelingLower.includes('frustrated') || feelingLower.includes('irritated')) {
    const angryQuotes = [
      "Holding onto anger is like drinking poison and expecting the other person to die.",
      "Your peace is more important than driving yourself crazy trying to understand why something happened.",
      "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
      "Take a deep breath. It's just a bad day, not a bad life.",
      "You have the power to choose your response. Choose peace.",
    ];
    return angryQuotes[Math.floor(Math.random() * angryQuotes.length)];
  }
  
  // Lost / Confused / Uncertain
  if (feelingLower.includes('lost') || feelingLower.includes('confused') || feelingLower.includes('uncertain') || feelingLower.includes('unsure') || feelingLower.includes('stuck')) {
    const lostQuotes = [
      "Not all who wander are lost. Sometimes you need to explore to find your path.",
      "It's okay to not have it all figured out. Life is a journey, not a destination.",
      "When you feel lost, remember that the forest is darkest just before you find the clearing.",
      "Confusion is the first step toward clarity.",
      "Sometimes the wrong choices bring us to the right places.",
      "You don't need to see the whole path. Just take the next step.",
    ];
    return lostQuotes[Math.floor(Math.random() * lostQuotes.length)];
  }
  
  // Happy / Excited / Good
  if (feelingLower.includes('happy') || feelingLower.includes('great') || feelingLower.includes('excited') || feelingLower.includes('good') || feelingLower.includes('amazing')) {
    const happyQuotes = [
      "Keep shining! Your positive energy is contagious and the world needs more of it.",
      "Happiness looks gorgeous on you. Celebrate every moment of joy.",
      "This feeling is a glimpse of your true potential. Keep reaching for it.",
      "Your joy is your strength. Never apologize for being happy.",
      "May this moment of happiness remind you of all the good that's possible.",
    ];
    return happyQuotes[Math.floor(Math.random() * happyQuotes.length)];
  }
  
  // Grateful / Thankful
  if (feelingLower.includes('grateful') || feelingLower.includes('thankful') || feelingLower.includes('blessed')) {
    const gratefulQuotes = [
      "Gratitude turns what we have into enough, and more.",
      "The more grateful you are, the more you will find to be grateful for.",
      "Gratitude is not only the greatest of virtues, but the parent of all others.",
      "When you focus on the good, the good gets better.",
    ];
    return gratefulQuotes[Math.floor(Math.random() * gratefulQuotes.length)];
  }
  
  // General uplifting quotes for any feeling
  const generalQuotes = [
    "Every storm runs out of rain. This feeling will pass, and you'll emerge stronger.",
    "In the midst of difficulty lies opportunity. You're more resilient than you know.",
    "This moment doesn't define you. Your strength lies in continuing despite how you feel.",
    "The only way out is through. Keep going, you've got this.",
    "Your current situation is not your final destination. Better days are coming.",
    "You are exactly where you need to be. Trust the journey.",
    "Everything you're going through is preparing you for what you asked for.",
    "You've come so far. Don't give up now.",
  ];
  
  return generalQuotes[Math.floor(Math.random() * generalQuotes.length)];
}
