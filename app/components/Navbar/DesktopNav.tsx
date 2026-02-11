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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                to={link.href}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                {link.label}
                {link.badge && (
                  <Badge variant="secondary" className="ms-2">
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
