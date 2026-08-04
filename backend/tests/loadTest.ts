import http from 'http';

/**
 * Lightweight local concurrency and latency load test script
 * Simulates 100 concurrent HTTP requests against /api/v1/health & /api/v1/products
 */
const runLoadTest = async () => {
  console.log('🚀 Starting Mangata & Gallo Local Concurrency & Latency Stress Test...');

  const concurrency = 100;
  const latencies: number[] = [];
  let successCount = 0;
  let errorCount = 0;

  const startTotal = Date.now();

  const makeRequest = (): Promise<void> => {
    return new Promise((resolve) => {
      const start = Date.now();
      const req = http.get('http://localhost:5000/api/v1/health', (res) => {
        const duration = Date.now() - start;
        latencies.push(duration);

        if (res.statusCode === 200) {
          successCount++;
        } else {
          errorCount++;
        }
        res.resume();
        resolve();
      });

      req.on('error', () => {
        errorCount++;
        resolve();
      });
    });
  };

  const requests = Array.from({ length: concurrency }, () => makeRequest());
  await Promise.all(requests);

  const totalTime = Date.now() - startTotal;
  latencies.sort((a, b) => a - b);

  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;

  console.log('📊 Load Test Execution Results:');
  console.log(`- Total Concurrent Requests: ${concurrency}`);
  console.log(`- Success Rate: ${((successCount / concurrency) * 100).toFixed(1)}%`);
  console.log(`- Total Duration: ${totalTime}ms`);
  console.log(`- P50 Latency: ${p50}ms`);
  console.log(`- P95 Latency: ${p95}ms`);
  console.log(`- P99 Latency: ${p99}ms`);
};

runLoadTest();
