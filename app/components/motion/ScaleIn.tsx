import type { HTMLMotionProps } from 'framer-motion';

import { Motion } from './Motion';

interface ScaleInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
  ...props
}: ScaleInProps) {
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        },
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
}
