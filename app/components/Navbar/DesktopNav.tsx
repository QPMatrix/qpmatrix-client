import { Link } from 'react-router';

import { Badge } from '~/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '~/components/ui/navigation-menu';

import type { NavLink } from './types';

/**
 * Desktop navigation props
 */
interface DesktopNavProps {
  /** Navigation links */
  links: NavLink[];
}

/**
 * Desktop navigation menu component
 *
 * @param {DesktopNavProps} props - Component props
 * @returns {React.ReactElement} Desktop navigation
 */
export function DesktopNav({ links }: DesktopNavProps): React.ReactElement {
  return (
    <NavigationMenu className="animate-fade-in hidden delay-200 md:flex">
      <NavigationMenuList className="gap-1">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                to={link.href}
                className="group relative inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-white/10 data-active:text-white"
              >
                {link.label}
                {link.badge && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary hover:bg-primary/30 ms-2 h-5 border-none"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
