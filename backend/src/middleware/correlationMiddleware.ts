import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface CorrelatedRequest extends Request {
  correlationId?: string;
  traceId?: string;
}

export const correlationIdMiddleware = (req: CorrelatedRequest, res: Response, next: NextFunction) => {
  const correlationId =
    (req.headers['x-correlation-id'] as string) ||
    (req.headers['x-request-id'] as string) ||
    `req-${crypto.randomUUID()}`;

  const traceId = (req.headers['x-trace-id'] as string) || `trc-${crypto.randomUUID()}`;

  req.correlationId = correlationId;
  req.traceId = traceId;

  res.setHeader('x-correlation-id', correlationId);
  res.setHeader('x-trace-id', traceId);

  next();
};
