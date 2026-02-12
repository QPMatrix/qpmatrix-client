import { Code2, Database,Gauge, Laptop, Rocket, Smartphone } from 'lucide-react';

import { FadeIn } from '~/components/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '~/components/motion/Stagger';
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from '~/components/ui/card';

const services = [
  {
    title: 'Full Stack Development',
    description: 'End-to-end web application development using modern stacks like React, Node.js, and TypeScript.',
    icon: Code2,
  },
  {
    title: 'UI/UX Design Implementation',
    description: 'Translating designs into pixel-perfect, responsive, and interactive user interfaces.',
    icon: Laptop,
  },
  {
    title: 'Performance Optimization',
    description: 'Speeding up existing applications to improve Core Web Vitals and user experience.',
    icon: Gauge,
  },
  {
    title: 'Mobile-First Design',
    description: 'Ensuring your application looks and works perfectly on every device, from mobile to desktop.',
    icon: Smartphone,
  },
  {
    title: 'API Design & Integration',
    description: 'Building robust RESTful and GraphQL APIs for seamless data communication.',
    icon: Database,
  },
  {
    title: 'Scalable Architecture',
    description: 'Designing systems that grow with your business, ensuring reliability and maintainability.',
    icon: Rocket,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive technical solutions to bring your vision to life.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.title} delay={index * 0.1}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
