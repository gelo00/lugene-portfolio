import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import  Showcase from './components/sections/Showcase';
import { Footer } from './components/layout/Footer';
import SkillSelector from './components/sections/SkillSeletor';
import ShowreelSection from './components/sections/ShowreelSection';
import { TemporaryLoader } from './components/ui/TemporaryLoader';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const page = pageRef.current;
    if (!page) return;

    const createPageTimelines = (distance: number) => {
     

      const heroTitle = page.querySelector<HTMLElement>('[data-hero-title]');
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -distance * 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'bottom 100%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      }

      const sections = gsap.utils.toArray<HTMLElement>(
        '[data-scroll-section]',
        page
      );

      sections.forEach((section) => {
        const content = section.querySelector<HTMLElement>('[data-scroll-content]');
        if (!content) return;

        let from: gsap.TweenVars;
        switch (section.id) {
          case 'about':
            from = { autoAlpha: 0 };
            break;
          case 'services':
            from = { autoAlpha: 0, x: -distance };
            break;
          case 'projects':
            from = { autoAlpha: 0, y: distance * 0.25, scale: 0.92 };
            break;
          case 'footer':
            from = { autoAlpha: 0, x: distance, rotation: 2 };
            break;
          default:
            from = { autoAlpha: 0, y: distance };
        }

        gsap.fromTo(
          content,
          from,
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: section.id === 'about' ? 'top 95%' : 'top 100%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        );
      });
    };

    const media = gsap.matchMedia();
    media.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => createPageTimelines(56)
    );
    media.add(
      '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
      () => createPageTimelines(24)
    );

    return () => media.revert();
  }, { scope: pageRef });

  return (
    <>
      <TemporaryLoader />

      <div ref={pageRef} className="relative min-h-screen bg-bg-dark text-text-primary selection:bg-primary selection:text-black font-body overflow-x-hidden">
        {/* Interactive Custom Cursor & Cyberpunk Glow Background */}
  
        {/* Main Navigation Header */}
        <Header />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section content transitions are coordinated here for a consistent page flow. */}
        <Hero />
        <About />

        {/* Services / Capabilities Section */}
        <SkillSelector />
        {/* Showcase / Selected Works Portfolio Gallery */}
        <Showcase />

        {/* Section 5: Showreel Section (Autoplay On Focus & Chapter Sections) */}
        <ShowreelSection />
      </main>

        {/* Footer */}
   
        <Footer />
      </div>
    </>
  );
};

export default App;
