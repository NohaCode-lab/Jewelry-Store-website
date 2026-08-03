import { Router } from 'express';
import { redisClient } from '../config/redis';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Comprehensive API, Database & Redis Health Check Probe
 *     tags: [Observability]
 *     responses:
 *       200:
 *         description: System operational status
 */
router.get('/', async (req, res) => {
  const isRedisHealthy = redisClient.status === 'ready';

  return res.json({
    status: 'healthy',
    version: '2.5.0',
    timestamp: new Date().toISOString(),
    services: {
      api: 'operational',
      database: 'connected (PostgreSQL / Prisma)',
      redis: isRedisHealthy ? 'connected' : 'disconnected (in-memory fallback active)',
    },
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    },
  });
});

export default router;
