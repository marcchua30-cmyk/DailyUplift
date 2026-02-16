'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';

export default function Home() {
  const [feeling, setFeeling] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQuote = async () => {
    if (!feeling.trim()) {
      setError('Please tell us how you\'re feeling first');
      return;
    }

    setLoading(true);
    setError('');
    setQuote('');

    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feeling }),
      });

      const data = await response.json();
      
      if (data.quote) {
        setQuote(data.quote);
      } else {
        setError(data.error || 'Unable to generate quote. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateQuote();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Daily Uplift
          </h1>
          <p className="text-gray-600">
            Share how you're feeling, and let me create a quote just for you
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today?
          </label>
          <textarea
            value={feeling}
            onChange={(e) => {
              setFeeling(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="e.g., anxious about work, excited but nervous, tired and overwhelmed..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none transition-colors"
            rows={3}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQuote}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Creating your quote...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate My Quote
            </>
          )}
        </button>

        {/* Quote Display */}
        {quote && (
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-4xl text-purple-400 font-serif leading-none">"</span>
              <div className="flex-1">
                <p className="text-xl text-gray-800 italic leading-relaxed">
                  {quote}
                </p>
              </div>
              <span className="text-4xl text-purple-400 font-serif leading-none self-end">"</span>
            </div>
            <button
              onClick={generateQuote}
              className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Generate another
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Every quote is uniquely created just for you ✨</p>
        </div>
      </div>
    </div>
  );
}
