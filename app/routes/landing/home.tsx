import type { Route } from './+types/home';
import HeroSection from './components/HeroSection/HeroSection';

// eslint-disable-next-line no-empty-pattern
export function meta({}:Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col">
     <HeroSection/>
    </main>
  );
}
