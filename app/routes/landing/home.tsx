import type { Route } from './+types/home';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import HeroSection from './components/HeroSection/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Hasan | Full Stack Developer' },
    { name: 'description', content: 'Portfolio of Hasan, a Full Stack Developer specializing in React, Node.js, and scalable web solutions.' },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
