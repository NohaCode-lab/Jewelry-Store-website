import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Prometheus Operational Metrics Endpoint', () => {
  it('GET /api/v1/metrics - should return Prometheus text formatted telemetry metrics', async () => {
    const res = await request(app).get('/api/v1/metrics');

    expect(res.status).toBe(200);
    expect(res.text).toContain('mangatagallo_');
    expect(res.text).toContain('http_requests_total');
  });
});
