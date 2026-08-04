import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { RagAiService } from '../../services/ragAiService';
import { sendSuccess } from '../../utils/response';

const AiSearchSchema = z.object({
  query: z.string().min(2),
  maxBudget: z.number().optional(),
});

export const searchAiConcierge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, maxBudget } = AiSearchSchema.parse(req.body);
    const recommendations = RagAiService.performVectorSearch(query, maxBudget, 3);

    return sendSuccess(res, {
      query,
      maxBudget,
      ragArchitecture: 'PostgreSQL pgvector / Cosine Distance Similarity',
      recommendationsCount: recommendations.length,
      recommendations,
      synthesis: `Based on your desire for "${query}", our Mangata & Gallo Atelier AI Concierge recommends selecting pieces crafted with high-purity gold and Ceylon sapphire or solitaire diamonds.`,
    });
  } catch (err) {
    next(err);
  }
};
