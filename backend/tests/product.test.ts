import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Product Catalog API Endpoints', () => {
  it('GET /api/v1/products - should return jewelry catalog list', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/products - should filter by category', async () => {
    const res = await request(app).get('/api/v1/products?category=rings');
    expect(res.status).toBe(200);
    expect(res.body.data.every((p: any) => p.category.toLowerCase() === 'rings')).toBe(true);
  });

  it('GET /api/v1/products/:id - should return single product details', async () => {
    const res = await request(app).get('/api/v1/products/prd-001');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', 'prd-001');
    expect(res.body.data).toHaveProperty('name');
  });

  it('GET /api/v1/products/:id - should return 404 for non-existent product', async () => {
    const res = await request(app).get('/api/v1/products/non-existent-id');
    expect(res.status).toBe(404);
  });

  it('POST /api/v1/products - should reject unauthenticated request with 401', async () => {
    const res = await request(app).post('/api/v1/products').send({
      name: 'Unauthorized Ring',
      price: 5000,
    });
    expect(res.status).toBe(401);
  });

  it('POST /api/v1/products - should create product when authenticated as ADMIN', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'admin@mangatagallo.com',
      password: 'Password123!',
    });
    const adminToken = loginRes.body.data.token;

    const res = await request(app)
      .post('/api/v1/products')
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
    expect(res.body.data).toHaveProperty('name', 'Bespoke Diamond Crown');
  });
});
