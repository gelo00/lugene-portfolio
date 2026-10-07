import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NAV_ITEMS = [
  { label: 'ABOUT', targetId: 'about' },
  { label: 'SKILLS', targetId: 'services' },
  { label: 'PROJECTS', targetId: 'showcase' },
];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const focusY = window.scrollY + window.innerHeight * 0.45;
      const currentSection = NAV_ITEMS
        .map(({ targetId }) => document.getElementById(targetId))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          return sectionTop <= focusY && sectionTop + section.offsetHeight > focusY;
        })
        .at(-1);

      setActiveSection(currentSection?.id ?? '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  const scrollToSection = (targetId: string) => {
    if (targetId === 'showreel') {
      const showreelTrigger = ScrollTrigger.getById('showreel-transition');
      if (showreelTrigger) {
        const videoPosition =
          showreelTrigger.start + (showreelTrigger.end - showreelTrigger.start) * 0.5;
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: videoPosition, autoKill: false },
          ease: 'power2.inOut',
        });
        return;
      }
    }

    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax Reveal & Stagger Animation
  useGSAP(() => {
    if (!footerRef.current || !ctaContainerRef.current) return;

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        end: 'top 20%',
        scrub: 0.8,
        toggleActions: 'play reverse play reverse',
      },
    });

    // 1. Teal CTA Banner Unveil & Scale In
    revealTimeline.fromTo(
      ctaContainerRef.current,
      { y: 60, scale: 0.94, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // 2. Heading Stagger
    if (headingRef.current) {
      revealTimeline.fromTo(
        headingRef.current,
        { y: 30, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.6'
      );
    }

    // 3. Description Fade In
    if (textRef.current) {
      revealTimeline.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      id="footer"
      data-scroll-section
      className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden bg-[#0e0e0e] px-4 py-5 text-white select-none sm:px-6 sm:py-6 md:px-12"
    >
      {/* Top Header Navigation Indicator Bar */}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-3 border-b border-white/5 py-4 text-[10px] font-mono tracking-widest text-neutral-400 sm:justify-between sm:gap-4 sm:text-[11px]">
        <button
          type="button"
          onClick={scrollToTop}
          className="flex cursor-pointer items-center space-x-2"
          aria-label="Back to top"
        >
          <span className="w-2 h-2 rounded-full bg-[#52C3C1] animate-pulse" />
          <span className="font-bold text-white uppercase">LUGENE</span>
        </button>

        <nav aria-label="Section navigation" className="order-3 flex w-full flex-wrap items-center justify-center gap-1 sm:order-none sm:w-auto sm:gap-5">
          {NAV_ITEMS.map(({ label, targetId }) => {
            const isActive = activeSection === targetId;
            return (
              <button
                key={targetId}
                type="button"
                onClick={() => scrollToSection(targetId)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative cursor-pointer px-2 py-2 transition-colors hover:text-white ${
                  isActive ? 'text-[#52C3C1]' : 'text-neutral-400'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-2 bottom-0 h-px bg-[#52C3C1] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => scrollToSection('showreel')}
          className="cursor-pointer rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 transition-all hover:border-[#52C3C1] hover:text-[#52C3C1] uppercase"
        >
          PLAY REEL
        </button>
      </div>

      {/* Main Full-Bleed Teal CTA Banner */}
      <div
        ref={ctaContainerRef}
        className="my-auto mx-auto w-full max-w-7xl overflow-hidden rounded-2xl bg-[#52C3C1] px-5 py-10 text-center text-black shadow-2xl relative sm:px-8 sm:py-12 md:px-12 md:py-16"
      >
        <div data-scroll-content className="max-w-3xl mx-auto z-10 relative">
          <h2
            ref={headingRef}
            className="mb-5 text-3xl font-black uppercase leading-tight tracking-tight text-neutral-900 font-sans sm:mb-6 sm:text-5xl lg:text-6xl"
          >
            LET'S MAKE SOMETHING AWESOME
          </h2>
          <p
            ref={textRef}
            className="text-neutral-800 font-sans max-w-xl mx-auto text-sm md:text-base font-semibold leading-relaxed"
          >
            Have an upcoming motion graphics project, 3D visual reel, or brand refresh? Let's connect and collaborate.
          </p>
        </div>
      </div>

      {/* Footer Bottom Controls & Metadata */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/5 pt-6 text-center text-xs font-mono text-neutral-400 sm:pt-8 md:flex-row md:text-left">
        
        {/* Brand Copyright */}
        <div>
          <span className="text-[#52C3C1] font-bold font-sans text-sm tracking-wider uppercase">
            LUGENE
          </span>
          <p className="mt-1 text-neutral-500 text-[11px]">
            © 2026 Lugene Portfolio. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold tracking-widest sm:gap-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#52C3C1] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#52C3C1] transition-colors"
          >
            INSTAGRAM
          </a>
        </div>

        {/* Back to Top Trigger */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 border border-neutral-800 hover:border-[#52C3C1] text-white rounded font-mono hover:text-[#52C3C1] transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 text-[11px] font-bold"
        >
          <span>BACK TO TOP</span>
          <span>↑</span>
        </button>

      </div>
    </footer>
  );
};

export default Footer;