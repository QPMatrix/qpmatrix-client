import { useBreakpoints } from '~/hooks/use-breakpoints';

import { ActivityView } from '../ActivityView';
import { NAV_LINKS } from './constants';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

/**
 * Modern high-tech navbar component
 * Composed of small, reusable sub-components
 *
 * @returns {React.ReactElement} Navbar component
 */
function Navbar(): React.ReactElement {
  // Responsive check
  const { isMobile, isTablet } = useBreakpoints();
  // Mock authentication (replace with real auth hook later)
  const isAuthenticated = false;

  // Show mobile menu on mobile and tablet (collapsed view)
  const showMobileMenu = isMobile || isTablet;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex justify-center p-4">
      <div className="animate-fade-in-down w-full max-w-6xl rounded-2xl border border-white/10 bg-black/60 shadow-lg backdrop-blur-xl supports-backdrop-filter:bg-black/30 md:px-2">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Logo className="transition-transform duration-300 hover:scale-105" />
            <DesktopNav links={NAV_LINKS} />
          </div>

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
      </div>
    </header>
  );
}

export default Navbar;
