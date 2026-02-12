import type { RetryConfig } from './types';

/**
 * Internal API timeout in milliseconds (10 seconds)
 */
export const INTERNAL_API_TIMEOUT = 10000;

/**
 * External API timeout in milliseconds (30 seconds)
 */
export const EXTERNAL_API_TIMEOUT = 30000;

/**
 * Maximum number of retry attempts
 */
export const MAX_RETRIES = 3;

/**
 * Base delay between retries in milliseconds
 */
export const RETRY_DELAY = 1000;

/**
 * HTTP status codes that should trigger retry
 */
export const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: MAX_RETRIES,
  retryDelay: RETRY_DELAY,
  retryableStatuses: RETRYABLE_STATUS_CODES,
};

/**
 * Common request headers
 */
export const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const;
