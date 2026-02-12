import type { AxiosResponse } from 'axios';
import { externalApiClient } from '../external.client';

/**
 * External HTTP Service for making requests to third-party APIs
 * Wraps the external API client with a cleaner interface
 */

/**
 * Make a GET request to external API
 *
 * @template TResponse
 * @param {string} url - URL path
 * @param {Record<string, unknown>} params - Query parameters
 * @returns {Promise<TResponse>} Response data
 * @example
 * const users = await externalHttp.get<User[]>('/users');
 */
async function get<TResponse = unknown>(
  url: string,
  params?: Record<string, unknown>
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await externalApiClient.get(url, {
    params,
  });
  return response.data;
}

/**
 * Make a POST request to external API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await externalHttp.post<User, CreateUserDto>('/users', { name: 'John' });
 */
async function post<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await externalApiClient.post(url, data);
  return response.data;
}

/**
 * Make a PUT request to external API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await externalHttp.put<User, UpdateUserDto>('/users/1', { name: 'Jane' });
 */
async function put<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await externalApiClient.put(url, data);
  return response.data;
}

/**
 * Make a PATCH request to external API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await externalHttp.patch<User, Partial<User>>('/users/1', { name: 'Jane' });
 */
async function patch<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await externalApiClient.patch(url, data);
  return response.data;
}

/**
 * Make a DELETE request to external API
 *
 * @template TResponse
 * @param {string} url - URL path
 * @returns {Promise<TResponse>} Response data
 * @example
 * await externalHttp.del<void>('/users/1');
 */
async function del<TResponse = unknown>(url: string): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await externalApiClient.delete(url);
  return response.data;
}

/**
 * External HTTP service for third-party API requests
 * Provides a clean, type-safe interface for making HTTP requests
 *
 * @example
 * // Configure base URL first
 * import { externalApiClient } from '../external.client';
 * externalApiClient.defaults.baseURL = 'https://api.example.com';
 *
 * // Then use the service
 * const data = await externalHttp.get<DataType>('/endpoint');
 */
export const externalHttp = {
  get,
  post,
  put,
  patch,
  delete: del,
} as const;
