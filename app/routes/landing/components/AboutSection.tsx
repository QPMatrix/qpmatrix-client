import { CheckCircle2 } from 'lucide-react';

import { FadeIn } from '~/components/motion/FadeIn';
import { Button } from '~/components/ui/button';

const skills = [
  'React & Next.js Ecosystem',
  'TypeScript & Node.js',
  'PostgreSQL & Database Design',
  'UI/UX & Responsive Design',
  'Cloud Infrastructure (AWS/Vercel)',
  'Performance Optimization',
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <FadeIn direction="right">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                More Than Just Code
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Hello! I&apos;m a passionate Full Stack Developer with a knack for building digital products that not only look great but perform exceptionally.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                With over 5 years of experience in the industry, I&apos;ve worked with startups and established businesses to turn complex problems into elegant, scalable solutions. My approach blends technical expertise with a deep understanding of user experience and business goals.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground/80 font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="rounded-full">
                  Download Resume
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  Read My Blog
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Image/Visual */}
          <FadeIn direction="left" delay={0.2} className="relative">
             <div className="relative aspect-square sm:aspect-4/5 w-full overflow-hidden rounded-2xl bg-muted border border-border shadow-2xl">
                {/* Replace with actual image later */}
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2155&auto=format&fit=crop" 
                  alt="Developer working" 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-primary/20 blur-3xl -z-10" />
                <div className="absolute -top-6 -left-6 h-64 w-64 rounded-full bg-accent/20 blur-3xl -z-10" />
             </div>
             
             {/* Floating Stats Card */}
             <div className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-xl shadow-xl backdrop-blur-md hidden sm:block">
               <div className="flex gap-8">
                 <div>
                   <p className="text-3xl font-bold text-primary">50+</p>
                   <p className="text-sm text-muted-foreground">Projects Delivered</p>
                 </div>
                 <div>
                   <p className="text-3xl font-bold text-primary">5+</p>
                   <p className="text-sm text-muted-foreground">Years Experience</p>
                 </div>
               </div>
             </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
