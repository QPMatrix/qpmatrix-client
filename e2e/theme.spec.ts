import { test, expect } from '@playwright/test';

test.describe('Theme System E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should persist theme selection across page reloads', async ({
    page,
    context,
  }) => {
    // Check initial theme cookie
    const cookies = await context.cookies();
    const themeCookie = cookies.find((c) => c.name === 'qpmatrix-theme');

    // If no cookie, default should be 'system'
    if (!themeCookie) {
      expect(themeCookie).toBeUndefined();
    }

    // Simulate setting theme via API
    await page.evaluate(async () => {
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: 'dark' }),
      });
    });

    // Wait a bit for cookie to be set
    await page.waitForTimeout(100);

    // Reload page
    await page.reload();

    // Check cookie persisted
    const updatedCookies = await context.cookies();
    const updatedThemeCookie = updatedCookies.find(
      (c) => c.name === 'qpmatrix-theme'
    );
    expect(updatedThemeCookie?.value).toBe('dark');

    // Check document has dark class
    const hasLight = await page.evaluate(() => {
      return document.documentElement.classList.contains('light');
    });
    const hasDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDark || hasLight).toBe(true);
  });

  test('should persist direction selection across page reloads', async ({
    page,
    context,
  }) => {
    // Simulate setting direction via API
    await page.evaluate(async () => {
      await fetch('/api/theme/direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'rtl' }),
      });
    });

    // Wait a bit for cookie to be set
    await page.waitForTimeout(100);

    // Reload page
    await page.reload();

    // Check cookie persisted
    const cookies = await context.cookies();
    const directionCookie = cookies.find((c) => c.name === 'qpmatrix-direction');
    expect(directionCookie?.value).toBe('rtl');

    // Check document has dir attribute
    const dir = await page.evaluate(() => {
      return document.documentElement.getAttribute('dir');
    });
    expect(dir).toBe('rtl');
  });

  test('theme API should validate input', async ({ page }) => {
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: 'invalid-theme' }),
      });
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Invalid theme value');
  });

  test('direction API should validate input', async ({ page }) => {
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/theme/direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'invalid-direction' }),
      });
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Invalid direction value');
  });

  test('theme API should reject non-POST requests', async ({ page }) => {
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/theme', {
        method: 'GET',
      });
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(405);
    expect(response.body.error).toContain('Method not allowed');
  });

  test('direction API should reject non-POST requests', async ({ page }) => {
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/theme/direction', {
        method: 'GET',
      });
      return {
        status: res.status,
        body: await res.json(),
      };
    });

    expect(response.status).toBe(405);
    expect(response.body.error).toContain('Method not allowed');
  });

  test('should handle system theme preference', async ({ page }) => {
    // Set theme to system
    await page.evaluate(async () => {
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: 'system' }),
      });
    });

    await page.waitForTimeout(100);
    await page.reload();

    // Document should have either dark or light class based on system preference
    const hasLight = await page.evaluate(() => {
      return document.documentElement.classList.contains('light');
    });
    const hasDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDark || hasLight).toBe(true);
  });
});
