import type { ThemeDirection, ThemeMode } from './types';

/**
 * Cookie name for storing theme preference
 */
export const THEME_COOKIE_NAME = 'qpmatrix-theme';

/**
 * Cookie name for storing direction preference
 */
export const DIRECTION_COOKIE_NAME = 'qpmatrix-direction';

/**
 * Cookie max age in seconds (1 year)
 */
export const COOKIE_MAX_AGE = 31536000;

/**
 * Default theme value
 */
export const DEFAULT_THEME: ThemeMode = 'system';

/**
 * Default direction value
 */
export const DEFAULT_DIRECTION: ThemeDirection = 'ltr';

/**
 * Storage key prefix for local storage
 */
export const STORAGE_KEY_PREFIX = 'qpmatrix';
