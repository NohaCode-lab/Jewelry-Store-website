import client from 'prom-client';

// Create a Registry to register metrics
export const register = new client.Registry();

// Add default system metrics (CPU, Memory, Event Loop, etc.)
client.collectDefaultMetrics({
  register,
  prefix: 'mangatagallo_',
});

// HTTP Request Duration Histogram
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
});
register.registerMetric(httpRequestDurationMicroseconds);

// HTTP Total Request Counter
export const httpTotalRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests processed',
  labelNames: ['method', 'route', 'code'],
});
register.registerMetric(httpTotalRequests);

// Active Requests Gauge
export const activeRequestsGauge = new client.Gauge({
  name: 'http_active_requests',
  help: 'Number of active HTTP requests currently in flight',
});
register.registerMetric(activeRequestsGauge);

// Redis Latency Gauge
export const redisLatencyGauge = new client.Gauge({
  name: 'redis_latency_seconds',
  help: 'Redis ping latency in seconds',
});
register.registerMetric(redisLatencyGauge);

// Database Latency Gauge
export const dbLatencyGauge = new client.Gauge({
  name: 'database_latency_seconds',
  help: 'PostgreSQL database query latency in seconds',
});
register.registerMetric(dbLatencyGauge);

// BullMQ Queue Jobs Counter
export const queueJobsCounter = new client.Counter({
  name: 'bullmq_jobs_processed_total',
  help: 'Total BullMQ order processing background jobs',
  labelNames: ['queue', 'status'],
});
register.registerMetric(queueJobsCounter);
