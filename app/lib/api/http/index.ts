/**
 * HTTP API client exports
 * Centralized barrel export for API clients and utilities
 */

// HTTP Services (recommended for application code)
export { internalHttp, externalHttp } from './services';

// Raw clients (for advanced usage)
export { internalApiClient } from './internal.client';
export {
  externalApiClient,
  createExternalApiClient,
} from './external.client';

export type {
  ApiResponse,
  ApiError,
  ApiClientConfig,
  RequestConfig,
  HttpMethod,
  RetryConfig,
} from './types';

export {
  INTERNAL_API_TIMEOUT,
  EXTERNAL_API_TIMEOUT,
  MAX_RETRIES,
  RETRY_DELAY,
  RETRYABLE_STATUS_CODES,
  DEFAULT_RETRY_CONFIG,
  COMMON_HEADERS,
} from './config';
