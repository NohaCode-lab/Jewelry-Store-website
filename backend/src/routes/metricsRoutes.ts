import { Router, Request, Response } from 'express';
import { register } from '../services/metricsService';

const router = Router();

/**
 * @openapi
 * /metrics:
 *   get:
 *     summary: Retrieve Prometheus operational telemetry metrics
 *     tags: [Observability]
 *     responses:
 *       200:
 *         description: Prometheus formatted text metrics
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    res.setHeader('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.status(200).send(metrics);
  } catch (err) {
    res.status(500).send('Error retrieving Prometheus metrics');
  }
});

export default router;
