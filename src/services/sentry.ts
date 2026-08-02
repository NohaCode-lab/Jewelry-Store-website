export const initMonitoring = () => {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  if (sentryDsn) {
    console.log('Production Sentry Monitoring initialized with DSN:', sentryDsn);
  }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  console.error('[Production Error Capture]:', error.message, context);
};
