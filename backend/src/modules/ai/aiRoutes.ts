import { Router } from 'express';
import { searchAiConcierge } from './aiController';

const router = Router();

/**
 * @openapi
 * /ai/concierge-search:
 *   post:
 *     summary: Execute RAG Vector Semantic Search for luxury jewelry recommendations
 *     tags: [AI Concierge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query: { type: string, example: "Elegant gold necklace for evening gala" }
 *               maxBudget: { type: number, example: 5000 }
 *     responses:
 *       200:
 *         description: Structured vector RAG AI recommendations
 */
router.post('/concierge-search', searchAiConcierge);

export default router;
