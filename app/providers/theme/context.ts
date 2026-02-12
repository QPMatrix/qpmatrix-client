import { createContext, use, useContext } from 'react';
import type { IThemeProviderState } from './types';

/**
 * Initial theme state with default values
 */
const initialThemeState: IThemeProviderState = {
  theme: 'system',
  setTheme: () => {
    throw new Error('setTheme must be used within ThemeProvider');
  },
  direction: 'ltr',
  setDirection: () => {
    throw new Error('setDirection must be used within ThemeProvider');
  },
};

/**
 * React context for theme state
 */
export const ThemeContext = createContext<IThemeProviderState>(initialThemeState);

/**
 * Custom hook to access theme context
 *
 * @returns {IThemeProviderState} Theme state and setter functions
 * @throws {Error} When used outside of ThemeProvider
 * @example
 * const { theme, setTheme, direction, setDirection } = useTheme();
 * setTheme('dark');
 */
export function useTheme(): IThemeProviderState {
  const context = use(ThemeContext);

  if (context === initialThemeState) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
