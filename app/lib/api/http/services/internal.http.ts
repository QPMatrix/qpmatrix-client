import type { AxiosResponse } from 'axios';
import { internalApiClient } from '../internal.client';

/**
 * Internal HTTP Service for making requests to same-origin APIs
 * Wraps the internal API client with a cleaner interface
 */

/**
 * Make a GET request to internal API
 *
 * @template TResponse
 * @param {string} url - URL path
 * @param {Record<string, unknown>} params - Query parameters
 * @returns {Promise<TResponse>} Response data
 * @example
 * const users = await internalHttp.get<User[]>('/api/users');
 */
async function get<TResponse = unknown>(
  url: string,
  params?: Record<string, unknown>
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await internalApiClient.get(url, {
    params,
  });
  return response.data;
}

/**
 * Make a POST request to internal API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await internalHttp.post<User, CreateUserDto>('/api/users', { name: 'John' });
 */
async function post<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await internalApiClient.post(url, data);
  return response.data;
}

/**
 * Make a PUT request to internal API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await internalHttp.put<User, UpdateUserDto>('/api/users/1', { name: 'Jane' });
 */
async function put<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await internalApiClient.put(url, data);
  return response.data;
}

/**
 * Make a PATCH request to internal API
 *
 * @template TResponse
 * @template TData
 * @param {string} url - URL path
 * @param {TData} data - Request body data
 * @returns {Promise<TResponse>} Response data
 * @example
 * const user = await internalHttp.patch<User, Partial<User>>('/api/users/1', { name: 'Jane' });
 */
async function patch<TResponse = unknown, TData = unknown>(
  url: string,
  data?: TData
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await internalApiClient.patch(url, data);
  return response.data;
}

/**
 * Make a DELETE request to internal API
 *
 * @template TResponse
 * @param {string} url - URL path
 * @returns {Promise<TResponse>} Response data
 * @example
 * await internalHttp.del<void>('/api/users/1');
 */
async function del<TResponse = unknown>(url: string): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await internalApiClient.delete(url);
  return response.data;
}

/**
 * Internal HTTP service for same-origin API requests
 * Provides a clean, type-safe interface for making HTTP requests
 */
export const internalHttp = {
  get,
  post,
  put,
  patch,
  delete: del,
} as const;
