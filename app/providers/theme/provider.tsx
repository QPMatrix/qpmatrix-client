import { type ReactNode, useEffect, useState } from 'react';

import { DirectionProvider } from '~/components/ui/direction';
import { themeService } from '~/lib/api/services/theme.service';

import { DEFAULT_DIRECTION, DEFAULT_THEME } from './constants';
import { ThemeContext } from './context';
import type { IThemeProviderProps, ThemeDirection, ThemeMode } from './types';

/**
 * Theme Provider component for managing theme and direction with SSR support
 *
 * @param {IThemeProviderProps} props - Component props
 * @returns {JSX.Element} Theme provider component
 * @example
 * <ThemeProvider defaultTheme="dark" defaultDirection="rtl">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultDirection = DEFAULT_DIRECTION,
  defaultTheme = DEFAULT_THEME,
  storageKey = 'qpmatrix',
  ...props
}: IThemeProviderProps): ReactNode {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [direction, setDirectionState] = useState<ThemeDirection>(defaultDirection);

  /**
   * Update theme and persist to cookie via API route
   *
   * @param {ThemeMode} newTheme - New theme value
   * @returns {void}
   */
  const setTheme = (newTheme: ThemeMode): void => {
    setThemeState(newTheme);

    // Persist to cookie via API using theme service
    themeService.setTheme(newTheme).catch((error: unknown) => {
      console.error('Failed to persist theme:', error);
      // Optionally revert state on error
      // setThemeState(theme);
    });
  };

  /**
   * Update direction and persist to cookie via API route
   *
   * @param {ThemeDirection} newDirection - New direction value
   * @returns {void}
   */
  const setDirection = (newDirection: ThemeDirection): void => {
    setDirectionState(newDirection);

    // Persist to cookie via API using theme service
    themeService.setDirection(newDirection).catch((error: unknown) => {
      console.error('Failed to persist direction:', error);
      // Optionally revert state on error
      // setDirectionState(direction);
    });
  };

  // Apply theme to document root
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Apply direction to document root
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('dir', direction);
  }, [direction]);

  const value = {
    theme,
    setTheme,
    direction,
    setDirection,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      <DirectionProvider dir={direction}>{children}</DirectionProvider>
    </ThemeContext.Provider>
  );
}
