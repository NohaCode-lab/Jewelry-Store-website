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

  it('POST /api/auth/login - should reject invalid password with 401', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'WrongPassword!',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/auth/login - should reject non-existent user with 401', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@mangatagallo.com',
      password: 'Password123!',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
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

  it('GET /api/auth/me - should reject request without Bearer token with 401', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/auth/me - should reject invalid Bearer token with 401', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid_token_string');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/auth/gdpr-export - should return structured GDPR user data export when authenticated', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/gdpr-export')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('gdprNotice');
    expect(res.body).toHaveProperty('userProfile');
    expect(res.body.userProfile).toHaveProperty('email', 'vip.client@mangatagallo.com');
  });
});

