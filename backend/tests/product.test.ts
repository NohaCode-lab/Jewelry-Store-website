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

  it('POST /api/products - should reject non-admin request', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Unauthorized Ring',
      price: 5000,
    });
    expect(res.status).toBe(401);
  });
});
