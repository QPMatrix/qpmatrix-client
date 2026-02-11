/**
 * Logger context types
 */
type LoggerContext =
  | 'API Request'
  | 'API Response'
  | 'API Error'
  | 'API Retry'
  | 'External API Request'
  | 'External API Response'
  | 'External API Error'
  | 'Theme'
  | 'App';

/**
 * Log levels
 */
type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

/**
 * Format log message with context prefix
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {string} Formatted message with context
 */
function formatMessage(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): [string, ...unknown[]] {
  return [`[${context}] ${message}`, ...args];
}

/**
 * Log a message with context
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {void}
 * @example
 * logger.log('API Request', 'GET /api/users');
 */
function log(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): void {
  console.log(...formatMessage(context, message, ...args));
}

/**
 * Log an info message with context
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {void}
 * @example
 * logger.info('Theme', 'Theme changed to dark');
 */
function info(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): void {
  console.info(...formatMessage(context, message, ...args));
}

/**
 * Log a warning message with context
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {void}
 * @example
 * logger.warn('API Request', 'Request is taking longer than expected');
 */
function warn(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): void {
  console.warn(...formatMessage(context, message, ...args));
}

/**
 * Log an error message with context
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {void}
 * @example
 * logger.error('API Error', 'Failed to fetch users', error);
 */
function error(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): void {
  console.error(...formatMessage(context, message, ...args));
}

/**
 * Log a debug message with context (only in development)
 *
 * @param {LoggerContext} context - The context/category of the log
 * @param {string} message - The log message
 * @param {unknown[]} args - Additional arguments to log
 * @returns {void}
 * @example
 * logger.debug('API Response', 'Response data', data);
 */
function debug(
  context: LoggerContext,
  message: string,
  ...args: unknown[]
): void {
  if (import.meta.env.DEV) {
    console.debug(...formatMessage(context, message, ...args));
  }
}

/**
 * Logger utility with context prefixes
 */
export const logger = {
  log,
  info,
  warn,
  error,
  debug,
} as const;

export type { LoggerContext, LogLevel };
