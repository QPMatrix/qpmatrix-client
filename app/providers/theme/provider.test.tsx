import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './provider';
import { useTheme } from './context';

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
