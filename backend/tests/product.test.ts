import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Product Catalog API Endpoints', () => {
  it('GET /api/products - should return jewelry catalog list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/products - should filter by category', async () => {
    const res = await request(app).get('/api/products?category=rings');
    expect(res.status).toBe(200);
    expect(res.body.every((p: any) => p.category === 'rings')).toBe(true);
  });

  it('GET /api/products/:id - should return single product details', async () => {
    const res = await request(app).get('/api/products/ring-01');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 'ring-01');
    expect(res.body).toHaveProperty('name');
  });

  it('GET /api/products/:id - should return 404 for non-existent product', async () => {
    const res = await request(app).get('/api/products/non-existent-id');
    expect(res.status).toBe(404);
  });

  it('POST /api/products - should reject unauthenticated request with 401', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Unauthorized Ring',
      price: 5000,
    });
    expect(res.status).toBe(401);
  });

  it('POST /api/products - should reject non-admin user request with 403', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'VIP Attempt Ring',
        price: 5000,
      });

    expect(res.status).toBe(403);
  });

  it('POST /api/products - should create product when authenticated as ADMIN', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@mangatagallo.com',
      password: 'Password123!',
    });
    const adminToken = loginRes.body.token;

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Bespoke Diamond Crown',
        description: 'Exclusive Atelier creation',
        price: 15000,
        category: 'crowns',
        image: '/assets/crown-1.jpg',
        stock: 2,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Bespoke Diamond Crown');
  });
});
