import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './provider';
import { useTheme } from './context';
import * as themeService from '~/lib/api/services/theme.service';

// Mock the theme service
vi.mock('~/lib/api/services/theme.service', () => ({
  themeService: {
    setTheme: vi.fn(() => Promise.resolve()),
    setDirection: vi.fn(() => Promise.resolve()),
  },
}));

/**
 * Test component that uses the theme context
 */
function TestComponent(): React.ReactElement {
  const { theme, direction, setTheme, setDirection } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="direction">{direction}</div>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setDirection('rtl')} data-testid="set-rtl">
        Set RTL
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should provide default theme and direction', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
  });

  it('should provide custom default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should provide custom default direction', () => {
    render(
      <ThemeProvider defaultDirection="rtl">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
  });

  it('should apply theme class to document root', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    const root = document.documentElement;
    expect(root.classList.contains('dark') || root.classList.contains('light')).toBe(
      true
    );
  });

  it('should apply direction attribute to document root', () => {
    render(
      <ThemeProvider defaultDirection="rtl">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('should call theme service when theme changes', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByTestId('set-dark');
    await user.click(button);

    await waitFor(() => {
      expect(themeService.themeService.setTheme).toHaveBeenCalledWith('dark');
      expect(themeService.themeService.setTheme).toHaveBeenCalledTimes(1);
    });
  });

  it('should call theme service when direction changes', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByTestId('set-rtl');
    await user.click(button);

    await waitFor(() => {
      expect(themeService.themeService.setDirection).toHaveBeenCalledWith('rtl');
      expect(themeService.themeService.setDirection).toHaveBeenCalledTimes(1);
    });
  });

  it('should update state immediately even if API call fails', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock API failure
    vi.mocked(themeService.themeService.setTheme).mockRejectedValueOnce(
      new Error('API Error')
    );

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByTestId('set-dark');
    await user.click(button);

    // State should update immediately
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Error should be logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to persist theme:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});

describe('useTheme', () => {
  it('should throw error when used outside provider', () => {
    const TestComponentOutside = (): React.ReactElement => {
      try {
        useTheme();
        return <div>Should not render</div>;
      } catch (error) {
        return <div data-testid="error">{(error as Error).message}</div>;
      }
    };

    render(<TestComponentOutside />);

    expect(screen.getByTestId('error')).toHaveTextContent(
      'useTheme must be used within a ThemeProvider'
    );
  });

  it('should provide theme context values', () => {
    render(
      <ThemeProvider defaultTheme="light" defaultDirection="ltr">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
  });
});
