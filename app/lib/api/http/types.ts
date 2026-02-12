import type { AxiosRequestConfig } from 'axios';

/**
 * Generic API response wrapper with type inference
 *
 * @template TData - The type of data in the response
 */
export interface ApiResponse<TData = unknown> {
  /** Response data */
  data: TData;
  /** HTTP status code */
  status: number;
  /** Status message */
  message?: string;
}

/**
 * Standardized API error structure
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status?: number;
  /** Error code */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * API client configuration options
 */
export interface ApiClientConfig {
  /** Base URL for API requests */
  baseURL?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Default headers */
  headers?: Record<string, string>;
  /** Enable request logging */
  enableLogging?: boolean;
  /** Enable retry on failure */
  enableRetry?: boolean;
  /** Maximum number of retry attempts */
  maxRetries?: number;
}

/**
 * Extended axios request configuration with custom options
 */
export type RequestConfig<TData = unknown> = AxiosRequestConfig<TData> & {
  /** Skip retry logic for this request */
  skipRetry?: boolean;
  /** Custom timeout for this request */
  customTimeout?: number;
  /** Internal retry counter */
  _retryCount?: number;
};

/**
 * HTTP method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Retry configuration
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxRetries: number;
  /** Base delay between retries in milliseconds */
  retryDelay: number;
  /** HTTP status codes that should trigger retry */
  retryableStatuses: number[];
}
