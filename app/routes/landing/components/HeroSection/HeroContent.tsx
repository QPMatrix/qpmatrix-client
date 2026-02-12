import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { StaggerContainer, StaggerItem } from '~/components/motion/Stagger';
import { Button } from '~/components/ui/button';

export function HeroContent() {
  return (
    <StaggerContainer className="text-center" delay={0.2}>
      <StaggerItem>
        <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl bg-linear-to-b from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent drop-shadow-sm">
          Building Digital <br className="hidden sm:block" />
          <span className="text-primary italic">Experiences That Scale</span>
        </h1>
      </StaggerItem>
      
      <StaggerItem delay={0.1}>
        <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-2xl mx-auto">
          I help businesses grow by crafting high-performance, beautiful web applications. 
          Full-stack development tailored to your unique business needs.
        </p>
      </StaggerItem>

      <StaggerItem delay={0.2}>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" asChild>
            <Link to="#">
              View My Work
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full px-6 text-base group" asChild>
            <Link to="#">
              Contact Me <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </StaggerItem>
    </StaggerContainer>
  );
}
