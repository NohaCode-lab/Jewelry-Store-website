import { Queue } from 'bullmq';
import { logger } from '../utils/logger';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const connectionOpts = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

export const orderProcessingQueue = new Queue('order-processing-queue', {
  connection: connectionOpts,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

logger.info('BullMQ orderProcessingQueue initialized');
