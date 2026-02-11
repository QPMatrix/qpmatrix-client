import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './constants';
import {ActivityView} from '../ActivityView';

/**
 * Modern high-tech navbar component
 * Composed of small, reusable sub-components
 *
 * @returns {React.ReactElement} Navbar component
 */
function Navbar(): React.ReactElement {
  // Mock authentication and mobile state (replace with real hooks later)
  const isAuthenticated = true;
  const isMobile = true; // In a real app, use a media query hook

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        <DesktopNav links={NAV_LINKS} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <ActivityView isActive={isAuthenticated}>
            <UserMenu />
          </ActivityView>
          
          {/* 
            Note: MobileMenu usually handles its own visibility via CSS (md:hidden).
            Wrapping it in ActivityView with isMobile=true keeps it mounted/active.
            We pass isActive={true} to keep it available, or wire up useMediaQuery.
          */}
          <ActivityView isActive={isMobile}>
            <MobileMenu links={NAV_LINKS} />
          </ActivityView>
        </div>
      </div>
    </header>
  );
}

export default Navbar;