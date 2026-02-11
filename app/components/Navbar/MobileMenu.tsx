import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Badge } from '~/components/ui/badge';
import type { NavLink } from './types';

/**
 * Mobile menu props
 */
type MobileMenuProps = {
  /** Navigation links */
  links: NavLink[];
};

/**
 * Mobile menu drawer component
 *
 * @param {MobileMenuProps} props - Component props
 * @returns {React.ReactElement} Mobile menu
 */
export function MobileMenu({ links }: MobileMenuProps): React.ReactElement {
  /**
   * Handle logout action
   *
   * @returns {void}
   */
  const handleLogout = (): void => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
              {link.badge && <Badge variant="secondary">{link.badge}</Badge>}
            </Link>
          ))}
          <div className="my-4 h-px bg-border" />
          <Link
            to="/profile"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Settings
          </Link>
          <Link
            to="/billing"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Billing
          </Link>
          <div className="my-4 h-px bg-border" />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg px-4 py-2 text-start text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            Log out
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
