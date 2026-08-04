import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export const initOpenTelemetry = () => {
  if (process.env.ENABLE_OTEL === 'true' || process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    const traceExporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
    });

    const sdk = new NodeSDK({
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    console.log('✅ OpenTelemetry Distributed Tracing active (OTLP/Tempo exporter enabled)');
  } else {
    console.log('ℹ️ OpenTelemetry Tracing initialized in Ready for Production Configuration mode.');
  }
};
