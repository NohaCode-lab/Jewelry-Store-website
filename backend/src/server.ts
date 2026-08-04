import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { ENV } from './config/env';
import { swaggerSpec } from './docs/swagger';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import healthRoutes from './routes/healthRoutes';
import aiRoutes from './modules/ai/aiRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import { authRateLimiter, generalApiLimiter } from './middleware/rateLimitMiddleware';
import { logger } from './utils/logger';

import { correlationIdMiddleware } from './middleware/correlationMiddleware';

const app = express();

app.use(correlationIdMiddleware);
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000', 'https://mangatagallo.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: Not allowed by origin'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Interactive OpenAPI / Swagger Documentation Endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Rate Limiting Middleware
if (process.env.NODE_ENV === 'production') {
  app.use('/api/', generalApiLimiter);
  app.use('/api/v1/auth/', authRateLimiter);
}

import orderRoutes from './routes/orderRoutes';

// Enterprise Versioned API Routes (/api/v1/)
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/gdpr', authRoutes);

// Legacy API Aliases for Backward Compatibility
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Centralized Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    logger.info(`Mangata & Gallo Enterprise Backend running at http://localhost:${ENV.PORT}`);
    logger.info(`OpenAPI / Swagger Documentation available at http://localhost:${ENV.PORT}/api/docs`);
  });
}

export default app;
