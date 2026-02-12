import type { HTMLMotionProps } from 'framer-motion';

import { Motion } from './Motion';

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  delay?: number;
  staggerChildren?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <Motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  className?: string;
}

export function StaggerItem({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  className,
  ...props
}: StaggerItemProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <Motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration, delay, ease: 'easeOut' },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
}
