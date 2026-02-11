import type { NavLink } from './types';

/**
 * Navigation links configuration
 */
export const NAV_LINKS: NavLink[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs', badge: 'New' },
];
