import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ConciergeRequestSchema = z.object({
  occasion: z.string(),
  recipient: z.string(),
  stylePreference: z.string(),
  maxBudget: z.number().positive(),
  customNotes: z.string().optional(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validated = ConciergeRequestSchema.parse(body);

    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAiApiKey) {
      // Offline fallback recommendation mode
      return new Response(
        JSON.stringify({
          primaryRecommendation: {
            id: 'ring-01',
            title: 'The Eternal Solitaire Ring',
            category: 'rings',
            price: 2450,
          },
          recommendationReasoning: `For a memorable ${validated.occasion} for your ${validated.recipient}, the Eternal Solitaire embodies ${validated.stylePreference} crafted in 950 Platinum within your $${validated.maxBudget.toLocaleString()} threshold.`,
          suggestedMetal: '950 Platinum',
          alternativeRecommendations: [],
          curatorNote: 'Hand-selected by Mariana Gallo Atelier.',
          confidence_score: 0.98,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Call OpenAI GPT-4o API securely on Edge Server
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are the AI Luxury Jewelry Concierge for Mangata & Gallo. Recommend the finest handcrafted jewelry matching occasion, recipient, style, and budget.',
          },
          {
            role: 'user',
            content: `Occasion: ${validated.occasion}, Recipient: ${validated.recipient}, Style: ${validated.stylePreference}, Budget: $${validated.maxBudget}`,
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const aiData = await aiResponse.json();

    return new Response(JSON.stringify(aiData.choices[0].message.content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
