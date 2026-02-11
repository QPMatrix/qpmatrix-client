import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './constants';

/**
 * Modern high-tech navbar component
 * Composed of small, reusable sub-components
 *
 * @returns {React.ReactElement} Navbar component
 */
function Navbar(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        <DesktopNav links={NAV_LINKS} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;