import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Authentication API Endpoints', () => {
  it('POST /api/auth/register - should create a new user account', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test Client',
      email: `test-${Date.now()}@mangatagallo.com`,
      password: 'Password123!',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email');
  });

  it('POST /api/auth/login - should authenticate existing credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('GET /api/auth/me - should return profile when token is provided', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'vip.client@mangatagallo.com');
  });
});
