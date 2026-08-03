import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Shopping Cart API Endpoints', () => {
  it('GET /api/v1/cart - should reject unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/v1/cart');
    expect(res.status).toBe(401);
  });

  it('POST /api/v1/cart/items - should add item when authenticated', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'prd-001',
        quantity: 1,
        selectedMetal: '18K Yellow Gold',
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('items');
    expect(res.body.data.items.length).toBeGreaterThan(0);
  });

  it('PUT /api/v1/cart/items/:id - should update item quantity', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });
    const token = loginRes.body.data.token;

    const addRes = await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'prd-002',
        quantity: 1,
      });

    const itemId = addRes.body.data.items[0]?.id;

    if (itemId) {
      const updateRes = await request(app)
        .put(`/api/v1/cart/items/${itemId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 3 });

      expect(updateRes.status).toBe(200);
    }
  });

  it('DELETE /api/v1/cart/items/:id - should remove item from user cart', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.token;

    const addRes = await request(app)
      .post('/api/v1/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'prd-003',
        quantity: 1,
      });

    const itemId = addRes.body.data.items[0]?.id;

    if (itemId) {
      const delRes = await request(app)
        .delete(`/api/v1/cart/items/${itemId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(delRes.status).toBe(200);
    }
  });
});
