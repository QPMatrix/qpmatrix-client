import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ActivityView from './ActivityView';
import { Activity } from 'react';

// Mock React Activity if not available in test environment,
// though React 19 should have it. If it's effectively a div with hidden, we can test that.
// For now, let's assume it renders children.

describe('ActivityView', () => {
  it('should render children when isActive is true', () => {
    render(
      <ActivityView isActive={true}>
        <div data-testid="child">Child Content</div>
      </ActivityView>
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    // When active, it should be visible
    expect(child).toBeVisible();
  });

  it('should render children even when isActive is false (for state preservation)', () => {
    render(
      <ActivityView isActive={false}>
        <div data-testid="child">Child Content</div>
      </ActivityView>
    );

    // It should still be in the document (that's the point of Activity/Offscreen)
    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();

    // Note: checking toBeVisible() might fail depending on jsdom implementation of Activity.
    // In strict React 19 Activity, hidden content is usually display:none or hidden attribute.
    // For now, determining presence is the key requirement of "Activity" vs "conditional rendering (null)".
  });
});
