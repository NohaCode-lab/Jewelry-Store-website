import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Orders & AI Concierge RAG API Endpoints', () => {
  it('POST /api/v1/ai/concierge-search - should return vector RAG recommendations', async () => {
    const res = await request(app).post('/api/v1/ai/concierge-search').send({
      query: 'Elegant gold necklace for evening gala',
      maxBudget: 5000,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('ragArchitecture');
    expect(res.body.data).toHaveProperty('recommendations');
    expect(Array.isArray(res.body.data.recommendations)).toBe(true);
  });

  it('POST /api/v1/orders - should reject unauthenticated checkout with 401', async () => {
    const res = await request(app).post('/api/v1/orders').send({
      items: [{ productId: 'prd-001', quantity: 1 }],
    });

    expect(res.status).toBe(401);
  });

  it('POST /api/v1/orders - should create order & enqueue BullMQ processing when authenticated', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: 'prd-001', quantity: 1 }],
        totalAmount: 4850.0,
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('status', 'PENDING');
  });

  it('GET /api/v1/health - should return comprehensive health probe status', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('services');
  });
});
