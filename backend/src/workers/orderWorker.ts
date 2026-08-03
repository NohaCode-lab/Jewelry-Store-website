import { Worker, Job } from 'bullmq';
import { logger } from '../utils/logger';

const connectionOpts = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

export interface OrderJobData {
  orderId: string;
  userId: string;
  totalAmount: number;
  userEmail: string;
  items: Array<{ productId: string; quantity: number }>;
}

export const orderWorker = new Worker<OrderJobData>(
  'order-processing-queue',
  async (job: Job<OrderJobData>) => {
    const { orderId, userId, userEmail, totalAmount, items } = job.data;
    logger.info({ jobId: job.id, orderId, userEmail }, 'Processing background order job...');

    // 1. Simulate Confirmation Email Dispatch
    logger.info({ orderId, userEmail, amount: totalAmount }, 'Sending order confirmation email via Nodemailer harness...');

    // 2. Inventory Stock Update Simulation
    logger.info({ orderId, itemCount: items.length }, 'Updating product inventory counts in database...');

    // 3. Audit Log Dispatch
    logger.info({ orderId, userId }, 'Order audit notification dispatched to Atelier fulfillment log');

    return { status: 'COMPLETED', processedAt: new Date().toISOString() };
  },
  { connection: connectionOpts }
);

orderWorker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Order processing background job completed successfully');
});

orderWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, error: err.message }, 'Order processing background job failed after retries');
});
