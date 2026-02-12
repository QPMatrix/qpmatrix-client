import { Link } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '~/components/ui/navigation-menu';
import { Badge } from '~/components/ui/badge';
import type { NavLink } from './types';

/**
 * Desktop navigation props
 */
type DesktopNavProps = {
  /** Navigation links */
  links: NavLink[];
};

/**
 * Desktop navigation menu component
 *
 * @param {DesktopNavProps} props - Component props
 * @returns {React.ReactElement} Desktop navigation
 */
export function DesktopNav({ links }: DesktopNavProps): React.ReactElement {
  return (
    <NavigationMenu className="hidden md:flex animate-fade-in delay-200">
      <NavigationMenuList className="gap-1">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                to={link.href}
                className="group relative inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-white/10 data-active:text-white"
              >
                {link.label}
                {link.badge && (
                  <Badge variant="secondary" className="ms-2 h-5 bg-primary/20 text-primary hover:bg-primary/30 border-none">
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
