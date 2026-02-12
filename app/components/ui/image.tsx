import * as React from 'react';
import { cn } from '~/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fallbackSrc, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setError(true);
    };

    return (
      <div className={cn('relative overflow-hidden', className)}>
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          ref={ref}
          src={error && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          {...props}
        />
      </div>
    );
  }
);
Image.displayName = 'Image';

export { Image };
