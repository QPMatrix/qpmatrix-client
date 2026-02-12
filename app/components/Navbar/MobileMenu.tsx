import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
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
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-white hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 border-l border-white/10 bg-black/80 p-6 text-white backdrop-blur-xl sm:max-w-xs"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="bg-linear-to-r from-white to-white/50 bg-clip-text text-2xl font-bold text-transparent">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {links.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className="animate-fade-in-up flex items-center justify-between rounded-full px-4 py-3 text-lg font-medium text-white/80 transition-all hover:bg-white/10 hover:pl-6 hover:text-white"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
              {link.badge && (
                <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                  {link.badge}
                </Badge>
              )}
            </Link>
          ))}
          <div className="my-6 h-px w-full bg-white/10" />
          <div className="flex flex-col gap-2">
            <Link
              to="/profile"
              className="animate-fade-in-up rounded-full px-4 py-3 text-lg font-medium text-white/80 transition-all delay-300 hover:bg-white/10 hover:pl-6 hover:text-white"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="animate-fade-in-up rounded-full px-4 py-3 text-lg font-medium text-white/80 transition-all delay-400 hover:bg-white/10 hover:pl-6 hover:text-white"
            >
              Settings
            </Link>
            <Link
              to="/billing"
              className="animate-fade-in-up rounded-full px-4 py-3 text-lg font-medium text-white/80 transition-all delay-500 hover:bg-white/10 hover:pl-6 hover:text-white"
            >
              Billing
            </Link>
          </div>
          <div className="my-6 h-px w-full bg-white/10" />
          <button
            type="button"
            onClick={handleLogout}
            className="animate-fade-in-up rounded-full px-4 py-3 text-start text-lg font-medium text-red-400 transition-all delay-700 hover:bg-red-500/10 hover:pl-6"
          >
            Log out
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
