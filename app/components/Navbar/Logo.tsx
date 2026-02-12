import { Link } from 'react-router';
import { cn } from '~/lib/utils';

/**
 * Logo component props
 */
type LogoProps = {
  /** Optional CSS class name */
  className?: string;
};

/**
 * Logo component with gradient and text
 *
 * @param {LogoProps} props - Component props
 * @returns {React.ReactElement} Logo component
 */
export function Logo({ className }: LogoProps): React.ReactElement {
  return (
    <Link to="/" className={cn(`group flex items-center space-x-2`, className)}>
      <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
        QPMatrix
      </span>
    </Link>
  );
}
