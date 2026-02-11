/**
 * Environment utility for accessing environment variables
 * Provides type-safe access to environment configuration
 */

/**
 * Check if running in development mode
 *
 * @returns {boolean} True if in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if running in production mode
 *
 * @returns {boolean} True if in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Get environment mode
 *
 * @returns {string} Current environment mode
 */
export function getMode(): string {
  return import.meta.env.MODE;
}

/**
 * Get API token from environment (for external APIs)
 *
 * @returns {string | undefined} API token if set
 */
export function getApiToken(): string | undefined {
  return import.meta.env.VITE_API_TOKEN;
}

/**
 * Get external API base URL from environment
 *
 * @returns {string | undefined} External API base URL if set
 */
export function getExternalApiUrl(): string | undefined {
  return import.meta.env.VITE_EXTERNAL_API_URL;
}

/**
 * Get a custom environment variable
 *
 * @param {string} key - Environment variable key (with VITE_ prefix)
 * @returns {string | undefined} Environment variable value
 * @example
 * const customValue = getEnvVar('VITE_CUSTOM_CONFIG');
 */
export function getEnvVar(key: string): string | undefined {
  return import.meta.env[key];
}

/**
 * Environment configuration utility
 */
export const env = {
  isDevelopment,
  isProduction,
  getMode,
  getApiToken,
  getExternalApiUrl,
  getEnvVar,
} as const;
