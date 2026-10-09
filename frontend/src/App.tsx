import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';
import SkillSelector from './components/sections/SkillSelector';
import ShowreelSection from './components/sections/ShowreelSection';
import { TemporaryLoader } from './components/ui/TemporaryLoader';
import Hero from './components/sections/Hero';
import Showcase from './components/sections/Showcase';
import Illustration from './components/sections/Illustration';
import Gallery from './components/sections/Gallery';


gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const refreshScrollTriggers = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    };

    window.addEventListener('pageshow', refreshScrollTriggers);
    refreshScrollTriggers();

    return () => {
      window.removeEventListener('pageshow', refreshScrollTriggers);
    };
  }, []);

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
        {/* <CustomCursor/> */}
            {/* React Three Fiber Interactive 3D Canvas Background */}
        <Hero/>
        <Header />
        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Section content transitions are coordinated here for a consistent page flow. */}
          {/* <Hero/> */}

          <About />

          {/* Services / Capabilities Section */}
          <SkillSelector />

          {/* <CapturingMoments/> */}

          <Showcase/>
          {/* Section 5: Showreel Section (Autoplay On Focus & Chapter Sections) */}
          <ShowreelSection />

        </main>

        <Footer />
        {/* <Footerv2/> */}
      </div>
    </>
  );
};

const IllustrationPage: React.FC = () => (
  <main className="min-h-screen bg-[#0A0A0A]">
    <Illustration />
  </main>
);

const GalleryPage: React.FC = () => <Gallery />;

const ShowreelPage: React.FC = () => (
  <main className="relative min-h-screen bg-[#111111]">
    <a
      href="/"
      className="fixed left-6 top-6 z-50 rounded-lg border border-[#00C2A7]/40 bg-black/80 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00C2A7] transition-colors hover:bg-[#00C2A7] hover:text-[#111111]"
    >
      ← Home
    </a>
    <ShowreelSection />
  </main>
);

const NotFoundPage: React.FC = () => (
  <main className="flex min-h-screen items-center justify-center bg-[#f3f3f1] px-6 text-[#111111]">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-medium tracking-tight text-[#111111]">
        This page doesn't exist
      </h1>
      <p className="mt-4 max-w-xs text-sm text-[#4b4b4b]">
        It may have been moved, removed, or never existed.
      </p>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-6 rounded-md bg-[#111111] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
      >
        Go back
      </button>

      <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#777777]">
        <div>404 not_found</div>
        <div className="mt-2 text-[9px] tracking-[0.15em] text-[#8b8b8b]">
          404: /{window.location.pathname.replace(/^\//, '') || 'home'}
        </div>
      </div>
    </div>
  </main>
);

export const App: React.FC = () => {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  if (currentPath === '/illustration') return <IllustrationPage />;
  if (currentPath === '/gallery') return <GalleryPage />;
  if (currentPath === '/showreel') return <ShowreelPage />;
  if (currentPath === '/') return <HomePage />;

  return <NotFoundPage />;
};

export default App;
