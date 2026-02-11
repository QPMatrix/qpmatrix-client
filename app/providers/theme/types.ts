import type { ReactNode } from 'react';

/**
 * Theme mode type
 * - dark: Dark theme
 * - light: Light theme
 * - system: Follow system preference
 */
export type ThemeMode = 'dark' | 'light' | 'system';

/**
 * Text direction type
 * - rtl: Right-to-left (Arabic, Hebrew, etc.)
 * - ltr: Left-to-right (English, etc.)
 */
export type ThemeDirection = 'rtl' | 'ltr';

/**
 * Theme provider context state
 */
export interface IThemeProviderState {
  /** Current theme mode */
  theme: ThemeMode;
  /** Function to update theme mode */
  setTheme: (theme: ThemeMode) => void;
  /** Current text direction */
  direction: ThemeDirection;
  /** Function to update text direction */
  setDirection: (direction: ThemeDirection) => void;
}

/**
 * Theme provider component props
 */
export interface IThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial theme from server */
  defaultTheme?: ThemeMode;
  /** Initial direction from server */
  defaultDirection?: ThemeDirection;
  /** Storage key prefix for cookies */
  storageKey?: string;
}

/**
 * Cookie options for theme persistence
 */
export interface IThemeCookieOptions {
  /** Cookie name */
  name: string;
  /** Cookie value */
  value: string;
  /** Max age in seconds */
  maxAge: number;
  /** Cookie path */
  path: string;
  /** SameSite attribute */
  sameSite: 'Strict' | 'Lax' | 'None';
}