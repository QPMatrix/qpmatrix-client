import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError, RequestConfig } from './types';
import {
  COMMON_HEADERS,
  DEFAULT_RETRY_CONFIG,
  INTERNAL_API_TIMEOUT,
} from './config';
import { logger } from '~/lib/utils/logger';
import { env } from '~/lib/utils/env';
import { sleep, getExponentialBackoff } from '~/lib/utils/async';

/**
 * Create internal API client instance for same-origin requests
 *
 * @returns {AxiosInstance} Configured axios instance
 */
function createInternalApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: '/',
    timeout: INTERNAL_API_TIMEOUT,
    headers: COMMON_HEADERS,
    withCredentials: true,
  });

  // Request interceptor - logging and modifications
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Log requests in development
      if (env.isDevelopment()) {
        logger.debug('API Request', `${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error: unknown) => {
      logger.error('API Request', 'Request failed', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - data unwrapping and error handling
  client.interceptors.response.use(
    (response) => {
      // Log responses in development
      if (env.isDevelopment()) {
        logger.debug('API Response', `${response.config.url} - ${response.status}`);
      }

      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as RequestConfig | undefined;

      // Log errors
      if (env.isDevelopment()) {
        logger.error('API Error', `${error.response?.status || 'Network'} - ${error.message}`);
      }

      // Retry logic
      if (config && !config.skipRetry) {
        const retryCount = config._retryCount || 0;
        const status = error.response?.status;

        const shouldRetry =
          retryCount < DEFAULT_RETRY_CONFIG.maxRetries &&
          (status === undefined ||
            DEFAULT_RETRY_CONFIG.retryableStatuses.includes(status));

        if (shouldRetry) {
          config._retryCount = retryCount + 1;

          const delay = getExponentialBackoff(retryCount, DEFAULT_RETRY_CONFIG.retryDelay);

          if (env.isDevelopment()) {
            logger.info(
              'API Retry',
              `Attempt ${retryCount + 1}/${DEFAULT_RETRY_CONFIG.maxRetries} after ${delay}ms`
            );
          }

          await sleep(delay);
          return client.request(config);
        }
      }

      // Transform error to standard format
      const apiError: ApiError = {
        message: error.message || 'An unexpected error occurred',
        status: error.response?.status,
        code: error.code,
        details: error.response?.data as Record<string, unknown> | undefined,
      };

      return Promise.reject(apiError);
    }
  );

  return client;
}

/**
 * Internal API client instance for same-origin requests
 * Includes automatic retry, error handling, and request logging
 *
 * @example
 * // POST request
 * const response = await internalApiClient.post('/api/users', { name: 'John' });
 *
 * // GET request
 * const users = await internalApiClient.get('/api/users');
 */
export const internalApiClient = createInternalApiClient();
