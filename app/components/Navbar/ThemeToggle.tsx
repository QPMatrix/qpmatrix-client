import { Moon, Sun } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/providers/theme';
import type { ThemeMode } from '~/providers/theme/types';

/**
 * Theme toggle button component
 *
 * @returns {React.ReactElement} Theme toggle button
 */
export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme();

  /**
   * Toggle theme between light and dark
   *
   * @returns {void}
   */
  const handleToggle = (): void => {
    const newTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
