/**
 * Async utility functions
 */

/**
 * Sleep for a specified duration
 *
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>} Promise that resolves after delay
 * @example
 * await sleep(1000); // Sleep for 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute a function with a timeout
 *
 * @template T
 * @param {() => Promise<T>} fn - Async function to execute
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise<T>} Result of the function
 * @throws {Error} When timeout is reached
 * @example
 * const result = await withTimeout(() => fetchData(), 5000);
 */
export async function withTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    fn(),
    sleep(timeoutMs).then(() => {
      throw new Error(`Operation timed out after ${timeoutMs}ms`);
    }),
  ]);
}

/**
 * Retry a function with exponential backoff
 *
 * @template T
 * @param {() => Promise<T>} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<T>} Result of the function
 * @throws {Error} When all retries are exhausted
 * @example
 * const result = await retry(() => fetchData(), 3, 1000);
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  baseDelay: number
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error('Retry failed');
}

/**
 * Calculate exponential backoff delay
 *
 * @param {number} retryCount - Current retry attempt number
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {number} Calculated delay in milliseconds
 * @example
 * const delay = getExponentialBackoff(2, 1000); // Returns 4000 (1000 * 2^2)
 */
export function getExponentialBackoff(retryCount: number, baseDelay: number): number {
  return baseDelay * Math.pow(2, retryCount);
}
