import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import { logger } from './logger';

/**
 * Initialize Sentry monitoring.
 * It's safe to call this in all environments; it will only actively track
 * if a DSN is provided and it's not explicitly disabled.
 */
export const initMonitoring = () => {
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  const environment =
    process.env.EXPO_PUBLIC_APP_ENV ||
    (__DEV__ ? 'development' : 'production');

  if (!dsn) {
    logger.warn('[Monitoring] Sentry is disabled: EXPO_PUBLIC_SENTRY_DSN is not set.');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: environment === 'production' ? 0.2 : 1.0,
    enableAutoPerformanceTracing: true,
    initialScope: scope => {
      scope.setTags({
        platform: Platform.OS,
        appVersion: Application.nativeApplicationVersion || 'unknown',
        buildVersion: Application.nativeBuildVersion || 'unknown',
      });
      return scope;
    },
  });

  logger.log(`[Monitoring] Sentry initialized for environment: ${environment}`);
};
