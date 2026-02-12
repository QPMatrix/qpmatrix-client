/**
 * HTTP API client exports
 * Centralized barrel export for API clients and utilities
 */

// HTTP Services (recommended for application code)
export { externalHttp, internalHttp } from './services';

// Raw clients (for advanced usage)
export {
  COMMON_HEADERS,
  DEFAULT_RETRY_CONFIG,
  EXTERNAL_API_TIMEOUT,
  INTERNAL_API_TIMEOUT,
  MAX_RETRIES,
  RETRY_DELAY,
  RETRYABLE_STATUS_CODES,
} from './config';
export { createExternalApiClient, externalApiClient } from './external.client';
export { internalApiClient } from './internal.client';
export type {
  ApiClientConfig,
  ApiError,
  ApiResponse,
  HttpMethod,
  RequestConfig,
  RetryConfig,
} from './types';
