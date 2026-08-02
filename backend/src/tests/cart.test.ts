import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server';

describe('Shopping Cart API Endpoints', () => {
  it('GET /api/cart - should reject unauthenticated request', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.status).toBe(401);
  });

  it('POST /api/cart/items - should add item when authenticated', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'ring-01',
        quantity: 1,
        selectedMetal: '18K Yellow Gold',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('items');
  });
});
