import type { ThemeDirection, ThemeMode } from './types';
import {
  COOKIE_MAX_AGE,
  DEFAULT_DIRECTION,
  DEFAULT_THEME,
  DIRECTION_COOKIE_NAME,
  THEME_COOKIE_NAME,
} from './constants';

/**
 * Parse theme from cookie header
 *
 * @param {string | null} cookieHeader - Cookie header string from request
 * @returns {ThemeMode} Parsed theme or default
 * @example
 * const theme = parseThemeCookie(request.headers.get('Cookie'));
 */
export function parseThemeCookie(cookieHeader: string | null): ThemeMode {
  if (!cookieHeader) {
    return DEFAULT_THEME;
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const themeCookie = cookies.find((cookie) =>
    cookie.startsWith(`${THEME_COOKIE_NAME}=`)
  );

  if (!themeCookie) {
    return DEFAULT_THEME;
  }

  const theme = themeCookie.split('=')[1];

  if (theme === 'dark' || theme === 'light' || theme === 'system') {
    return theme;
  }

  return DEFAULT_THEME;
}

/**
 * Parse direction from cookie header
 *
 * @param {string | null} cookieHeader - Cookie header string from request
 * @returns {ThemeDirection} Parsed direction or default
 * @example
 * const direction = parseDirectionCookie(request.headers.get('Cookie'));
 */
export function parseDirectionCookie(
  cookieHeader: string | null
): ThemeDirection {
  if (!cookieHeader) {
    return DEFAULT_DIRECTION;
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const directionCookie = cookies.find((cookie) =>
    cookie.startsWith(`${DIRECTION_COOKIE_NAME}=`)
  );

  if (!directionCookie) {
    return DEFAULT_DIRECTION;
  }

  const direction = directionCookie.split('=')[1];

  if (direction === 'rtl' || direction === 'ltr') {
    return direction;
  }

  return DEFAULT_DIRECTION;
}

/**
 * Serialize theme to Set-Cookie header value
 *
 * @param {ThemeMode} theme - Theme value to serialize
 * @returns {string} Set-Cookie header value
 * @example
 * headers.append('Set-Cookie', serializeThemeCookie('dark'));
 */
export function serializeThemeCookie(theme: ThemeMode): string {
  return `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Serialize direction to Set-Cookie header value
 *
 * @param {ThemeDirection} direction - Direction value to serialize
 * @returns {string} Set-Cookie header value
 * @example
 * headers.append('Set-Cookie', serializeDirectionCookie('rtl'));
 */
export function serializeDirectionCookie(direction: ThemeDirection): string {
  return `${DIRECTION_COOKIE_NAME}=${direction}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}
