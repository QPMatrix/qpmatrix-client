import { serializeDirectionCookie } from '../../../providers/theme/theme.server';
import type { ThemeDirection } from '../../../providers/theme/types';
import type { Route } from './+types/direction';

/**
 * Loader handler for direction API route
 * explicitly returns 405 Method Not Allowed for GET requests
 */
export async function loader() {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Action handler for direction API route
 * Sets direction cookie based on POST request body
 *
 * @param {Route.ActionArgs} args - Route action arguments
 * @returns {Promise<Response>} JSON response with success status
 * @throws {Response} 400 error if direction is invalid
 * @throws {Response} 405 error if method is not POST
 * @example
 * fetch('/api/theme/direction', {
 *   method: 'POST',
 *   body: JSON.stringify({ direction: 'rtl' })
 * });
 */
export async function action({ request }: Route.ActionArgs): Promise<Response> {
  // Defensive check
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const body = (await request.json()) as { direction: unknown };
    const { direction } = body;

    // Validate direction value
    if (direction !== 'ltr' && direction !== 'rtl') {
      return new Response(
        JSON.stringify({
          error: 'Invalid direction value. Must be "ltr" or "rtl"',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const typedDirection: ThemeDirection = direction;

    // Set cookie
    const headers = new Headers();
    headers.append('Set-Cookie', serializeDirectionCookie(typedDirection));
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ success: true, direction: typedDirection }), {
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
