import { Link } from 'react-router';
import { cn } from '~/lib/utils';
import { Image } from '~/components/ui/image';
import { Images } from '~/assets/images';

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
    <Link to="/" className={cn(`group flex items-center space-x-3`, className)}>
      <Image
        src={Images.Logo}
        alt="QPMatrix Logo"
        className="size-20 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
      />
      <span className="to-secondary bg-linear-to-r from-white bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:tracking-wider">
        QPMatrix
      </span>
    </Link>
  );
}
