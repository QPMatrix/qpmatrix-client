import { Link } from 'react-router';

import { FadeIn } from '~/components/motion/FadeIn';

export function HeroAnnouncement() {
  return (
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <FadeIn delay={0.2} direction="down">
        <div className="relative rounded-full px-3 py-1 text-sm/6 text-muted-foreground ring-1 ring-border hover:ring-foreground/20 transition-all duration-300 hover:bg-muted/50 backdrop-blur-sm">
          Announcing our next round of funding.{' '}
          <Link to="#" className="font-semibold text-primary hover:text-primary/80">
            <span aria-hidden="true" className="absolute inset-0" />
            Read more <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
