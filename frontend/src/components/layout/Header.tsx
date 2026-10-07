import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

interface NavItem {
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'ABOUT', targetId: 'about' },
  { label: 'SERVICES', targetId: 'services' },
  { label: 'PROJECTS', targetId: 'showcase' },
];

export const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Transition: Hide Header when reaching the Footer section
  useGSAP(() => {
    const footerEl = document.getElementById('footer');
    if (!footerEl || !navRef.current) return;

    ScrollTrigger.create({
      trigger: footerEl,
      start: 'top 100%', // Triggers when top of footer reaches 85% viewport
      onEnter: () => {
        setIsMenuOpen(false); // Close dropdown menu if open
        gsap.to(navRef.current, {
          yPercent: -200,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      },
    });
  }, { scope: headerRef });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const focusY = window.scrollY + window.innerHeight * 0.45;
      const currentSection = NAV_ITEMS
        .map(({ targetId }) => document.getElementById(targetId))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionBottom = sectionTop + section.offsetHeight;
          return sectionTop <= focusY && sectionBottom > focusY;
        })
        .at(-1);

      if (currentSection) setActiveTab(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const scrollToShowreel = () => {
    setActiveTab('showreel');
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

    scrollTo('showreel');
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 py-3 pointer-events-none font-mono sm:px-6 sm:py-4"
    >
      <nav
        ref={navRef}
        className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-6 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo / Home Trigger */}
        <button
          onClick={() => scrollTo('top')}
          className="flex shrink-0 items-center space-x-2 text-xs font-black uppercase tracking-widest text-white group font-sans sm:text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#52C3C1] group-hover:scale-125 transition-transform duration-300" />
          <span className="group-hover:text-[#52C3C1] transition-colors">LUGENE</span>
        </button>

        {/* Section Navigation Dropdown */}
        <div
          ref={menuRef}
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="header-section-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wider transition-colors duration-300 cursor-pointer ${
              isMenuOpen || NAV_ITEMS.some((item) => activeTab === item.targetId)
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-200'
            }`}
          >
            MENU
          </button>
          {isMenuOpen && (
            <div
              id="header-section-menu"
              className="absolute left-1/2 top-full z-10 min-w-52 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#52C3C1] p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.targetId;

                return (
                  <button
                    key={item.targetId}
                    type="button"
                    onClick={() => scrollTo(item.targetId)}
                    className={`relative flex w-full items-center justify-center rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-white' : 'text-white/80 hover:bg-black/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Minimal Action Trigger */}
        <button
          onClick={scrollToShowreel}
          className="relative shrink-0 overflow-hidden rounded-full border border-[#52C3C1]/30 px-2.5 py-2 text-[10px] font-bold tracking-wide text-[#52C3C1] transition-all duration-300 group hover:border-[#52C3C1] hover:text-black sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-wider"
        >
          <span className="relative z-10 whitespace-nowrap">PLAY REEL</span>
          <span className="absolute inset-0 bg-[#52C3C1] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </nav>
    </header>
  );
};

export default Header;