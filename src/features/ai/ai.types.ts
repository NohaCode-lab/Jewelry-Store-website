import { Product } from '../../types/product';

export type OccasionType = 'Anniversary' | 'Engagement' | 'Wedding' | 'Black-Tie Gala' | 'Birthday' | 'Self-Reward';

export type RecipientType = 'Partner' | 'Self' | 'Mother' | 'Daughter' | 'VIP Client';

export type StylePreference = 'Classic Elegance' | 'Modern Regal' | 'Minimalist Diamond' | 'Vintage Royal';

export interface AIConciergeRequest {
  occasion: OccasionType;
  recipient: RecipientType;
  maxBudget: number;
  stylePreference: StylePreference;
  notes?: string;
}

export interface AIConciergeResponse {
  primaryRecommendation: Product;
  recommendationReasoning: string;
  suggestedMetal: string;
  alternativeRecommendations: Product[];
  curatorNote: string;
}
