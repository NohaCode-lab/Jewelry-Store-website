import Redis from 'ioredis';
import { logger } from '../utils/logger';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const redisClient = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) {
      logger.warn('Redis connection retry limit reached. Falling back gracefully.');
      return null;
    }
    return Math.min(times * 100, 2000);
  },
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis Cache & Queue Manager');
});

redisClient.on('error', (err) => {
  logger.warn({ error: err.message }, 'Redis client error occurred');
});

export default redisClient;
