import { describe, it, expect } from 'vitest';
import {
  parseThemeCookie,
  parseDirectionCookie,
  serializeThemeCookie,
  serializeDirectionCookie,
} from './theme.server';
import {
  COOKIE_MAX_AGE,
  DEFAULT_DIRECTION,
  DEFAULT_THEME,
  DIRECTION_COOKIE_NAME,
  THEME_COOKIE_NAME,
} from './constants';

describe('theme.server', () => {
  describe('parseThemeCookie', () => {
    it('should return default theme when cookie header is null', () => {
      const result = parseThemeCookie(null);
      expect(result).toBe(DEFAULT_THEME);
    });

    it('should return default theme when cookie header is empty', () => {
      const result = parseThemeCookie('');
      expect(result).toBe(DEFAULT_THEME);
    });

    it('should parse dark theme from cookie', () => {
      const result = parseThemeCookie(`${THEME_COOKIE_NAME}=dark`);
      expect(result).toBe('dark');
    });

    it('should parse light theme from cookie', () => {
      const result = parseThemeCookie(`${THEME_COOKIE_NAME}=light`);
      expect(result).toBe('light');
    });

    it('should parse system theme from cookie', () => {
      const result = parseThemeCookie(`${THEME_COOKIE_NAME}=system`);
      expect(result).toBe('system');
    });

    it('should return default theme for invalid theme value', () => {
      const result = parseThemeCookie(`${THEME_COOKIE_NAME}=invalid`);
      expect(result).toBe(DEFAULT_THEME);
    });

    it('should find theme cookie among multiple cookies', () => {
      const result = parseThemeCookie(`other=value; ${THEME_COOKIE_NAME}=dark; another=test`);
      expect(result).toBe('dark');
    });

    it('should handle cookies with spaces', () => {
      const result = parseThemeCookie(`other=value;   ${THEME_COOKIE_NAME}=light;   another=test`);
      expect(result).toBe('light');
    });
  });

  describe('parseDirectionCookie', () => {
    it('should return default direction when cookie header is null', () => {
      const result = parseDirectionCookie(null);
      expect(result).toBe(DEFAULT_DIRECTION);
    });

    it('should return default direction when cookie header is empty', () => {
      const result = parseDirectionCookie('');
      expect(result).toBe(DEFAULT_DIRECTION);
    });

    it('should parse rtl direction from cookie', () => {
      const result = parseDirectionCookie(`${DIRECTION_COOKIE_NAME}=rtl`);
      expect(result).toBe('rtl');
    });

    it('should parse ltr direction from cookie', () => {
      const result = parseDirectionCookie(`${DIRECTION_COOKIE_NAME}=ltr`);
      expect(result).toBe('ltr');
    });

    it('should return default direction for invalid direction value', () => {
      const result = parseDirectionCookie(`${DIRECTION_COOKIE_NAME}=invalid`);
      expect(result).toBe(DEFAULT_DIRECTION);
    });

    it('should find direction cookie among multiple cookies', () => {
      const result = parseDirectionCookie(
        `other=value; ${DIRECTION_COOKIE_NAME}=rtl; another=test`
      );
      expect(result).toBe('rtl');
    });

    it('should handle cookies with spaces', () => {
      const result = parseDirectionCookie(
        `other=value;   ${DIRECTION_COOKIE_NAME}=ltr;   another=test`
      );
      expect(result).toBe('ltr');
    });
  });

  describe('serializeThemeCookie', () => {
    it('should serialize dark theme cookie', () => {
      const result = serializeThemeCookie('dark');
      expect(result).toBe(
        `${THEME_COOKIE_NAME}=dark; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
      );
    });

    it('should serialize light theme cookie', () => {
      const result = serializeThemeCookie('light');
      expect(result).toBe(
        `${THEME_COOKIE_NAME}=light; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
      );
    });

    it('should serialize system theme cookie', () => {
      const result = serializeThemeCookie('system');
      expect(result).toBe(
        `${THEME_COOKIE_NAME}=system; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
      );
    });
  });

  describe('serializeDirectionCookie', () => {
    it('should serialize rtl direction cookie', () => {
      const result = serializeDirectionCookie('rtl');
      expect(result).toBe(
        `${DIRECTION_COOKIE_NAME}=rtl; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
      );
    });

    it('should serialize ltr direction cookie', () => {
      const result = serializeDirectionCookie('ltr');
      expect(result).toBe(
        `${DIRECTION_COOKIE_NAME}=ltr; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
      );
    });
  });
});
