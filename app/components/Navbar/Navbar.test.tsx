import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

// Mock sub-components/dependencies
vi.mock('./Logo', () => ({
  Logo: () => <div data-testid="mock-logo">Logo</div>,
}));

vi.mock('./DesktopNav', () => ({
  DesktopNav: () => <div data-testid="mock-desktop-nav">DesktopNav</div>,
}));

vi.mock('./ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="mock-theme-toggle">ThemeToggle</div>,
}));

vi.mock('./UserMenu', () => ({
  UserMenu: () => <div data-testid="mock-user-menu">UserMenu</div>,
}));

vi.mock('./MobileMenu', () => ({
  MobileMenu: () => <div data-testid="mock-mobile-menu">MobileMenu</div>,
}));

// Mock ActivityView to verify it's being used
vi.mock('../ActivityView', () => {
  return {
    ActivityView: ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
      <div data-testid="mock-activity-view" data-active={isActive}>
        {children}
      </div>
    ),
  };
});

describe('Navbar', () => {
  it('should render all components', () => {
    render(<Navbar />);

    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByTestId('mock-desktop-nav')).toBeInTheDocument();
    expect(screen.getByTestId('mock-theme-toggle')).toBeInTheDocument();
  });

  it('should render UserMenu inside ActivityView', () => {
    render(<Navbar />);
    
    const userMenu = screen.getByTestId('mock-user-menu');
    expect(userMenu).toBeInTheDocument();
    
    // Check if it is wrapped in ActivityView
    const activityWrapper = userMenu.closest('[data-testid="mock-activity-view"]');
    expect(activityWrapper).toBeInTheDocument();
  });

  it('should render MobileMenu inside ActivityView', () => {
    render(<Navbar />);
    
    const mobileMenu = screen.getByTestId('mock-mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
    
    // Check if it is wrapped in ActivityView
    const activityWrapper = mobileMenu.closest('[data-testid="mock-activity-view"]');
    expect(activityWrapper).toBeInTheDocument();
  });

  // Note: hardcoded "true" in Navbar for auth/mobile means we expect data-active="true"
  it('should have active constraints set to true (based on hardcoded values)', () => {
    render(<Navbar />);
    
    const activityViews = screen.getAllByTestId('mock-activity-view');
    activityViews.forEach(view => {
      expect(view).toHaveAttribute('data-active', 'true');
    });
  });
});
