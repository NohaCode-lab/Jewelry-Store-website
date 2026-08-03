import { logger } from '../utils/logger';

export interface JewelryKnowledgeDoc {
  id: string;
  title: string;
  category: string;
  material: string;
  content: string;
  price: number;
  embedding: number[];
}

// In-Memory Vector Store fallback with Cosine Similarity math for pgvector compliance
export class RagAiService {
  private static knowledgeBase: JewelryKnowledgeDoc[] = [
    {
      id: 'doc-001',
      title: 'The Celestial Solitaire Diamond Ring',
      category: 'Rings',
      material: '18k Yellow Gold & Solitaire Diamond',
      content: 'Handcrafted 18k yellow gold solitaire ring with brilliant-cut diamond. Perfect for engagement, anniversaries, and luxury galas.',
      price: 4850.0,
      embedding: [0.12, 0.85, 0.45, 0.92, 0.31],
    },
    {
      id: 'doc-002',
      title: 'Royal Sapphire Halo Pendant Necklace',
      category: 'Necklaces',
      material: 'Platinum & Ceylon Sapphire',
      content: 'Deep velvet blue Ceylon sapphire surrounded by micro-pave diamond halo. Ideal for evening galas, weddings, and black-tie galas.',
      price: 6200.0,
      embedding: [0.88, 0.15, 0.95, 0.22, 0.74],
    },
    {
      id: 'doc-003',
      title: 'Mangata Emerald Cut Drop Earrings',
      category: 'Earrings',
      material: '18k White Gold & Colombian Emeralds',
      content: 'Vibrant green emeralds suspended in platinum drops. Designed for high fashion events, luxury gifts, and formal anniversaries.',
      price: 3950.0,
      embedding: [0.42, 0.65, 0.81, 0.19, 0.88],
    },
  ];

  /**
   * Generates a 5-dimensional vector embedding for user query (Simulates OpenAI text-embedding-3-small)
   */
  static generateQueryEmbedding(query: string): number[] {
    const lower = query.toLowerCase();
    const vec = [0.1, 0.1, 0.1, 0.1, 0.1];
    if (lower.includes('necklace') || lower.includes('pendant') || lower.includes('gala')) vec[0] += 0.7;
    if (lower.includes('ring') || lower.includes('diamond') || lower.includes('solitaire')) vec[1] += 0.7;
    if (lower.includes('sapphire') || lower.includes('blue') || lower.includes('wedding')) vec[2] += 0.8;
    if (lower.includes('gold') || lower.includes('yellow')) vec[3] += 0.7;
    if (lower.includes('earring') || lower.includes('emerald') || lower.includes('green')) vec[4] += 0.7;
    return vec;
  }

  /**
   * Calculates Cosine Similarity between vector query and stored product embeddings
   */
  static cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, val, idx) => sum + val * (vecB[idx] || 0), 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
  }

  /**
   * Performs Semantic Vector RAG Search
   */
  static performVectorSearch(query: string, maxPrice?: number, topK: number = 3): JewelryKnowledgeDoc[] {
    logger.info({ query, maxPrice }, 'Executing RAG Vector Semantic Search over jewelry embeddings...');
    const queryVec = this.generateQueryEmbedding(query);

    const scored = this.knowledgeBase
      .filter((doc) => (maxPrice ? doc.price <= maxPrice : true))
      .map((doc) => ({
        doc,
        similarity: this.cosineSimilarity(queryVec, doc.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    return scored.slice(0, topK).map((item) => item.doc);
  }
}

export default RagAiService;
