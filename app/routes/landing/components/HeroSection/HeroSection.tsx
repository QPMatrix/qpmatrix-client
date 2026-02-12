import { HeroAnnouncement } from './HeroAnnouncement';
import { HeroBackground, HeroBackgroundBottom } from './HeroBackground';
import { HeroContent } from './HeroContent';

const HeroSection = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <HeroBackground />
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <HeroAnnouncement />
        <HeroContent />
      </div>
      <HeroBackgroundBottom />
    </div>
  );
};

export default HeroSection;