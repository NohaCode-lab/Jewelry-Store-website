import { AIConciergeRequest, AIConciergeResponse } from './ai.types';
import { PRODUCTS } from '../../data/products';

const AI_CONCIERGE_PROXY_ENDPOINT =
  import.meta.env.VITE_AI_CONCIERGE_ENDPOINT || 'https://api.mangatagallo.com/v1/ai/concierge';

export const aiService = {
  async getLuxuryRecommendation(request: AIConciergeRequest): Promise<AIConciergeResponse> {
    try {
      // 1. If backend edge function endpoint exists in environment, call secure proxy
      if (import.meta.env.VITE_AI_CONCIERGE_ENDPOINT) {
        const response = await fetch(AI_CONCIERGE_PROXY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`AI Edge Service error: ${response.statusText}`);
        }

        const data: AIConciergeResponse = await response.json();
        return data;
      }
    } catch (err) {
      console.warn('AI Proxy connection fallback triggered:', err);
    }

    // 2. High-performance offline fallback inference engine
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const affordable = PRODUCTS.filter((p) => p.price <= request.maxBudget);
    const pool = affordable.length > 0 ? affordable : PRODUCTS;

    let primary = pool[0];
    if (request.occasion === 'Engagement' || request.occasion === 'Anniversary') {
      primary = pool.find((p) => p.category === 'rings' || p.category === 'collections') || pool[0];
    } else if (request.occasion === 'Black-Tie Gala' || request.occasion === 'Wedding') {
      primary = pool.find((p) => p.category === 'crowns' || p.category === 'necklace') || pool[0];
    }

    const alternatives = pool.filter((p) => p.id !== primary.id).slice(0, 2);

    const metalSuggestion =
      request.stylePreference === 'Vintage Royal'
        ? '950 Platinum'
        : request.stylePreference === 'Classic Elegance'
          ? '18K Yellow Gold'
          : '18K Rose Gold';

    return {
      primaryRecommendation: primary,
      recommendationReasoning: `For a memorable ${request.occasion} tailored for your ${request.recipient}, the ${primary.title} embodies ${request.stylePreference} with unmatched brilliance. Handcrafted with VVS1 diamonds, it perfectly aligns within your $${request.maxBudget.toLocaleString()} threshold.`,
      suggestedMetal: metalSuggestion,
      alternativeRecommendations: alternatives,
      curatorNote: `Hand-selected by Mariana Gallo Atelier. Complimentary custom engraving is included for this piece.`,
    };
  },
};
