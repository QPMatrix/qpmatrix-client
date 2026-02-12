import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { env } from '~/lib/utils/env';
import { logger } from '~/lib/utils/logger';

import { COMMON_HEADERS, EXTERNAL_API_TIMEOUT } from './config';
import type { ApiError } from './types';

/**
 * Create external API client instance for third-party APIs
 *
 * @param {string} baseURL - Base URL for external API
 * @returns {AxiosInstance} Configured axios instance
 */
function createExternalApiClient(baseURL?: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: EXTERNAL_API_TIMEOUT,
    headers: COMMON_HEADERS,
  });

  // Request interceptor - auth token injection and logging
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Inject auth token if available
      const authToken = env.getApiToken();
      if (authToken && config.headers) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }

      // Log requests in development
      if (env.isDevelopment()) {
        logger.debug(
          'External API Request',
          `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
        );
      }

      return config;
    },
    (error: unknown) => {
      logger.error('External API Request', 'Request failed', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - error handling
  client.interceptors.response.use(
    (response) => {
      // Log responses in development
      if (env.isDevelopment()) {
        logger.debug('External API Response', `${response.config.url} - ${response.status}`);
      }

      return response;
    },
    (error: AxiosError) => {
      // Log errors
      if (env.isDevelopment()) {
        logger.error(
          'External API Error',
          `${error.response?.status || 'Network'} - ${error.message}`
        );
      }

      // Transform error to standard format
      const apiError: ApiError = {
        message: error.message || 'External API request failed',
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
 * External API client instance for third-party APIs
 * Configure baseURL before using or pass it to createExternalApiClient
 *
 * @example
 * // Configure base URL
 * externalApiClient.defaults.baseURL = 'https://api.example.com';
 *
 * // Make request
 * const data = await externalApiClient.get('/users');
 *
 * // Or create custom instance
 * const customClient = createExternalApiClient('https://api.custom.com');
 * const result = await customClient.get('/data');
 */
export const externalApiClient = createExternalApiClient();

/**
 * Export factory function for creating custom external clients
 */
export { createExternalApiClient };
