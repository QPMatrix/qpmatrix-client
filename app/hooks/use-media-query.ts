import { useCallback, useSyncExternalStore } from 'react';

/**
 * Custom hook to detect if a media query matches
 * SSR-safe implementation using useSyncExternalStore
 *
 * @param {string} query - The media query to check (e.g., "(min-width: 768px)")
 * @returns {boolean} True if the media query matches, false otherwise
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);

      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false; // Default to false during SSR
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
