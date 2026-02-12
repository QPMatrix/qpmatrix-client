import { ArrowRight, ExternalLink, Github } from 'lucide-react';

import { FadeIn } from '~/components/motion/FadeIn';
import { ScaleIn } from '~/components/motion/ScaleIn';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription,CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers, featuring real-time data visualization and inventory management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'SaaS Landing Page',
    description: 'High-converting landing page with modern animations, dark mode support, and optimized performance scores.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop',
    tags: ['Next.js', 'Framer Motion', 'Stripe'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop interface and real-time updates via WebSockets.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2370&auto=format&fit=crop',
    tags: ['Vue.js', 'Firebase', 'Pinia'],
    demoUrl: '#',
    repoUrl: '#',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A selection of my recent work, showcasing technical depth and design precision.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScaleIn key={project.title} delay={index * 0.1} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                     <Button variant="secondary" size="sm" asChild className="rounded-full">
                       <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                         Demo <ExternalLink className="ml-2 h-3 w-3" />
                       </a>
                     </Button>
                     <Button variant="outline" size="sm" asChild className="rounded-full bg-background/50 backdrop-blur-md">
                       <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                         Code <Github className="ml-2 h-3 w-3" />
                       </a>
                     </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-normal text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardContent>
                
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-primary group/link" asChild>
                    <a href={project.demoUrl}>
                      View Case Study <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </ScaleIn>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
