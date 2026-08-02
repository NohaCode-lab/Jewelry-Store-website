import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server';

describe('Product Catalog API Endpoints', () => {
  it('GET /api/products - should return jewelry catalog list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/products/:id - should return single product details', async () => {
    const res = await request(app).get('/api/products/ring-01');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 'ring-01');
    expect(res.body).toHaveProperty('name');
  });
});
