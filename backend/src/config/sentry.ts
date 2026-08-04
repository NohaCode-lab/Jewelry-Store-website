import * as Sentry from '@sentry/node';
import { Application } from 'express';

export const initSentry = (app: Application) => {
  const dsn = process.env.SENTRY_DSN;

  if (dsn) {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV || 'development',
      release: `mangatagallo-backend@${process.env.npm_package_version || '2.1.0'}`,
      tracesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler() as any);
    app.use(Sentry.Handlers.tracingHandler() as any);

    console.log('✅ Sentry Exception & Error Monitoring initialized');
  } else {
    console.log('ℹ️ Sentry DSN not provided. Sentry exception tracking in Ready for Production Configuration mode.');
  }
};

export const captureException = (error: any, context?: Record<string, any>) => {
  if (process.env.SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) scope.setExtras(context);
      Sentry.captureException(error);
    });
  }
};
