import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './constants';
import { ActivityView } from '../ActivityView';
import { useBreakpoints } from '~/hooks/use-breakpoints';

/**
 * Modern high-tech navbar component
 * Composed of small, reusable sub-components
 *
 * @returns {React.ReactElement} Navbar component
 */
function Navbar(): React.ReactElement {
  // Mock authentication (replace with real auth hook later)
  const isAuthenticated = true;
  
  // Responsive check
  const { isMobile, isTablet } = useBreakpoints();
  // Show mobile menu on mobile and tablet (collapsed view)
  const showMobileMenu = isMobile || isTablet;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        <DesktopNav links={NAV_LINKS} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <ActivityView isActive={isAuthenticated}>
            <UserMenu />
          </ActivityView>
          
          <ActivityView isActive={showMobileMenu}>
            <MobileMenu links={NAV_LINKS} />
          </ActivityView>
        </div>
      </div>
    </header>
  );
}

export default Navbar;