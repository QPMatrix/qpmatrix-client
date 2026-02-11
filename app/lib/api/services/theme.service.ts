import type { ThemeDirection, ThemeMode } from '~/providers/theme/types';
import { internalHttp } from '../http/services';

/**
 * Theme API response type
 */
type ThemeApiResponse = {
  /** Success status */
  success: boolean;
  /** Theme value */
  theme?: ThemeMode;
  /** Direction value */
  direction?: ThemeDirection;
};

/**
 * Set theme preference via API
 *
 * @param {ThemeMode} theme - Theme mode to set
 * @returns {Promise<void>} Promise that resolves when theme is set
 * @throws {ApiError} When API request fails
 * @example
 * await themeService.setTheme('dark');
 */
async function setTheme(theme: ThemeMode): Promise<void> {
  await internalHttp.post<ThemeApiResponse>('/api/theme', { theme });
}

/**
 * Set direction preference via API
 *
 * @param {ThemeDirection} direction - Direction to set
 * @returns {Promise<void>} Promise that resolves when direction is set
 * @throws {ApiError} When API request fails
 * @example
 * await themeService.setDirection('rtl');
 */
async function setDirection(direction: ThemeDirection): Promise<void> {
  await internalHttp.post<ThemeApiResponse>('/api/theme/direction', {
    direction,
  });
}

/**
 * Theme service for managing theme and direction preferences
 */
export const themeService = {
  setTheme,
  setDirection,
} as const;
