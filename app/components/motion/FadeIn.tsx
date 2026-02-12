import type { HTMLMotionProps, TargetAndTransition } from 'framer-motion';

import { Motion } from './Motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string; // Corrected lowercase 'classname' to 'className'
  viewport?: { once?: boolean; margin?: string };
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className,
  viewport = { once: true, margin: '-50px' },
  ...props
}: FadeInProps) {
  const directions: Record<string, TargetAndTransition> = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  const initial: TargetAndTransition = {
    opacity: 0,
    ...directions[direction],
  };

  const animate: TargetAndTransition = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  };

  return (
    <Motion.div
      initial={initial}
      whileInView={animate}
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </Motion.div>
  );
}
