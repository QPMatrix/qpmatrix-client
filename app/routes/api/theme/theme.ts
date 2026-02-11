import type { ThemeMode } from '../../../providers/theme/types';
import { serializeThemeCookie } from '../../../providers/theme/theme.server';
import type { Route } from './+types/theme';

/**
 * Action handler for theme API route
 * Sets theme cookie based on POST request body
 *
 * @param {Route.ActionArgs} args - Route action arguments
 * @returns {Promise<Response>} JSON response with success status
 * @throws {Response} 400 error if theme is invalid
 * @throws {Response} 405 error if method is not POST
 * @example
 * fetch('/api/theme', {
 *   method: 'POST',
 *   body: JSON.stringify({ theme: 'dark' })
 * });
 */
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const body = (await request.json()) as { theme: unknown };
    const { theme } = body;

    // Validate theme value
    if (theme !== 'dark' && theme !== 'light' && theme !== 'system') {
      return new Response(
        JSON.stringify({
          error: 'Invalid theme value. Must be "dark", "light", or "system"',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const typedTheme: ThemeMode = theme;

    // Set cookie
    const headers = new Headers();
    headers.append('Set-Cookie', serializeThemeCookie(typedTheme));
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ success: true, theme: typedTheme }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Invalid request body',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
