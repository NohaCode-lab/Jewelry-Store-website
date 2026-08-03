import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Authentication API Endpoints & Refresh Token Rotation', () => {
  it('POST /api/v1/auth/register - should create a new user account and set refresh cookie', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test Client',
      email: `test-${Date.now()}@mangatagallo.com`,
      password: 'Password123!',
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('token');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('POST /api/v1/auth/login - should authenticate and return access token + refresh cookie', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('POST /api/v1/auth/login - should reject invalid password with 401', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'WrongPassword!',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/v1/auth/refresh - should rotate refresh token and return new access token', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const cookies = loginRes.headers['set-cookie'];

    const refreshRes = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', cookies);

    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.data).toHaveProperty('token');
  });

  it('GET /api/v1/auth/me - should return profile when token is provided', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user).toHaveProperty('email', 'vip.client@mangatagallo.com');
  });

  it('GET /api/v1/auth/gdpr-export - should return structured GDPR user data export when authenticated', async () => {
    const loginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'vip.client@mangatagallo.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .get('/api/v1/auth/gdpr-export')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('gdprNotice');
    expect(res.body.data.userProfile).toHaveProperty('email', 'vip.client@mangatagallo.com');
  });
});
