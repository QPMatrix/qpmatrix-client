import { useMediaQuery } from './use-media-query';

/**
 * Breakpoint definitions (based on Tailwind defaults)
 * mobile: < 768px
 * tablet: >= 768px and < 1024px
 * desktop: >= 1024px
 */
export function useBreakpoints() {
  // Mobile: 0px - 767px
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Tablet: 768px - 1023px
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  
  // Desktop: 1024px+
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Helper for "at least" checks
  const isMd = useMediaQuery('(min-width: 768px)'); // Tablet or larger
  const isLg = useMediaQuery('(min-width: 1024px)'); // Desktop or larger

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMd,
    isLg,
    /** active breakpoint name for debugging or specific logic */
    active: isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile',
  };
}
