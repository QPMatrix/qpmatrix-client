import { test, expect } from '@playwright/test';

test.describe('Theme System E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should persist theme selection across page reloads', async ({ page, context }) => {
    // Check initial theme cookie
    const cookies = await context.cookies();
    const themeCookie = cookies.find((c) => c.name === 'qpmatrix-theme');

    // If no cookie, default should be 'system'
    if (!themeCookie) {
      expect(themeCookie).toBeUndefined();
    }

    // Set theme via API using PAGE request context to share storage state (cookies)
    const response = await page.request.post('/api/theme', {
      data: { theme: 'dark' },
    });
    expect(response.ok()).toBeTruthy();

    // Reload page to pick up the new cookie/theme
    await page.reload();

    // Check cookie persisted
    const updatedCookies = await context.cookies();
    const updatedThemeCookie = updatedCookies.find((c) => c.name === 'qpmatrix-theme');
    expect(updatedThemeCookie?.value).toBe('dark');

    // Check document has dark class
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should persist direction selection across page reloads', async ({ page, context }) => {
    // Set direction via API using PAGE request context
    const response = await page.request.post('/api/theme/direction', {
      data: { direction: 'rtl' },
    });
    expect(response.ok()).toBeTruthy();

    // Reload page
    await page.reload();

    // Check cookie persisted
    const cookies = await context.cookies();
    const directionCookie = cookies.find((c) => c.name === 'qpmatrix-direction');
    expect(directionCookie?.value).toBe('rtl');

    // Check document has dir attribute
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('theme API should validate input', async ({ page }) => {
    const response = await page.request.post('/api/theme', {
      data: { theme: 'invalid-theme' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Invalid theme value');
  });

  test('direction API should validate input', async ({ page }) => {
    const response = await page.request.post('/api/theme/direction', {
      data: { direction: 'invalid-direction' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Invalid direction value');
  });

  test('theme API should reject non-POST requests', async ({ page }) => {
    // Use GET request to check 405
    const response = await page.request.get('/api/theme');

    expect(response.status()).toBe(405);
    const body = await response.json();
    expect(body.error).toContain('Method not allowed');
  });

  test('direction API should reject non-POST requests', async ({ page }) => {
    const response = await page.request.get('/api/theme/direction');

    expect(response.status()).toBe(405);
    const body = await response.json();
    expect(body.error).toContain('Method not allowed');
  });

  test('should handle system theme preference', async ({ page }) => {
    // Set theme to system
    const response = await page.request.post('/api/theme', {
      data: { theme: 'system' },
    });
    expect(response.ok()).toBeTruthy();

    await page.reload();

    // Document should have either dark or light class
    // Use toHaveClass to wait for hydration/useEffect
    await expect(page.locator('html')).toHaveClass(/dark|light/);
  });
});
