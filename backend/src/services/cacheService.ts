import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';

export class CacheService {
  private static DEFAULT_TTL = 3600; // 1 hour TTL

  static async get<T>(key: string): Promise<T | null> {
    try {
      if (redisClient.status !== 'ready') return null;
      const data = await redisClient.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (err) {
      logger.warn({ key, err }, 'Failed to fetch from Redis cache');
      return null;
    }
  }

  static async set(key: string, value: any, ttlSeconds: number = CacheService.DEFAULT_TTL): Promise<void> {
    try {
      if (redisClient.status !== 'ready') return;
      await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      logger.warn({ key, err }, 'Failed to write to Redis cache');
    }
  }

  static async del(keyPattern: string): Promise<void> {
    try {
      if (redisClient.status !== 'ready') return;
      const keys = await redisClient.keys(keyPattern);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } catch (err) {
      logger.warn({ keyPattern, err }, 'Failed to invalidate Redis cache pattern');
    }
  }
}

export default CacheService;
