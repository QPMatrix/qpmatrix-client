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
  // Responsive check
  const { isMobile, isTablet } = useBreakpoints();
  // Mock authentication (replace with real auth hook later)
  const isAuthenticated = false;
  
  // Show mobile menu on mobile and tablet (collapsed view)
  const showMobileMenu = isMobile || isTablet;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <header className="animate-fade-in-down w-full max-w-6xl rounded-2xl border border-white/10 bg-black/60 shadow-lg backdrop-blur-xl supports-backdrop-filter:bg-black/30 md:px-2">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Logo className="hover:scale-105 transition-transform duration-300" />
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
      </header>
    </div>
  );
}

export default Navbar;