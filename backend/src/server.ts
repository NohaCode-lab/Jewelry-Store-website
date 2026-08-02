import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', version: '2.5.0', timestamp: new Date().toISOString() });
});

// Centralized Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    console.log(`Mangata & Gallo Backend running at http://localhost:${ENV.PORT}`);
  });
}

export default app;
