import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpoints } from './use-breakpoints';

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: matches, // simplified: all queries match or don't
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('useBreakpoints', () => {
    // Note: mocking matchMedia for different queries simultaneously is complex in JSDOM unit test 
    // without a sophisticated mock implementation that parses the query.
    // For unit testing this hook, we might just verify it returns the object structure
    // and relies on useMediaQuery (which we tested separately).
    
    // However, we can test "default" state (false)
    it('should return default values', () => {
        mockMatchMedia(false);
        const { result } = renderHook(() => useBreakpoints());
        
        expect(result.current.isMobile).toBe(false);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isDesktop).toBe(false);
        expect(result.current.active).toBe('mobile'); // Fallback if none match? 
        // Logic: active: isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'
        // If all false, it returns 'mobile'.
    });
});
