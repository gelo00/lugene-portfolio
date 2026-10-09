import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface FooterProps {
  initialTheme?: 'teal' | 'dark';
  email?: string;
  phone?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  initialTheme = 'teal',
  email = 'Lugeneserandoncorp@gmail.com',
  phone = '+63 0948-703-2740',
  onNavigate,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'teal' | 'dark'>(initialTheme);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Copy email helper
  const handleCopyEmail = () => {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
    document.body.removeChild(textarea);
  };

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
        );
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }
    },
    { scope: footerRef }
  );

  const isTeal = theme === 'teal';

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={`relative z-10 flex min-h-screen w-full flex-col justify-between px-6 py-10 transition-colors duration-500 select-none sm:px-10 md:px-16 lg:px-20 ${
        isTeal
          ? 'bg-[#52C3C1] text-black'
          : 'bg-[#121212] text-white shadow-inner'
      }`}
    >
      {/* Top utility bar / Theme switcher */}
      <div className="flex w-full items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 text-xs font-mono tracking-widest">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isTeal ? 'bg-black' : 'bg-[#52C3C1]'}`} />
          <span className="font-bold">LUGENE SERANDON</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(isTeal ? 'dark' : 'teal')}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-all border ${
              isTeal
                ? 'border-black/30 hover:bg-black hover:text-[#52C3C1]'
                : 'border-white/30 hover:bg-white hover:text-black'
            }`}
          >
            SWITCH TO {isTeal ? 'DARK' : 'TEAL'} THEME
          </button>
        </div>
      </div>

      {/* Main Hero Heading: SAY HELLO */}
      <div className="my-auto py-12">
        <h1
          ref={headingRef}
          className="w-full text-center font-black tracking-tighter uppercase font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none drop-shadow-sm select-none"
        >
          SAY HELLO
        </h1>

        {/* Navigation & Contact Details Grid matching reference */}
        <div
          ref={contentRef}
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 max-w-5xl mx-auto"
        >
          {/* Column 1: Navigation Links */}
          <div className="flex flex-col space-y-4 font-sans font-bold tracking-wider text-xl md:text-2xl">
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left hover:opacity-75 transition-opacity cursor-pointer w-fit underline-offset-4 hover:underline"
            >
              PROJECTS
            </button>
            <a
              href="/showreel"
              className="text-left hover:opacity-75 transition-opacity cursor-pointer w-fit underline-offset-4 hover:underline"
            >
              SHOWREELS
            </a>
            <a
              href="/illustration"
              className="text-left hover:opacity-75 transition-opacity cursor-pointer w-fit underline-offset-4 hover:underline"
            >
              ILLUSTRATION
            </a>
            <a
              href="/gallery"
              className="text-left hover:opacity-75 transition-opacity cursor-pointer w-fit underline-offset-4 hover:underline"
            >
              GALLERY
            </a>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left hover:opacity-75 transition-opacity cursor-pointer w-fit underline-offset-4 hover:underline"
            >
              ABOUT ME
            </button>
          </div>

          {/* Column 2: Contact Details & Copy Actions */}
          <div className="flex flex-col space-y-6 font-mono text-sm md:text-base">
            <div>
              <span className="block font-bold tracking-widest text-xs opacity-60 mb-2 uppercase">
                DETAILS
              </span>
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 text-left hover:opacity-80 transition-opacity cursor-pointer py-1"
                title="Click to copy email"
              >
                <span className={`w-3.5 h-3.5 ${isTeal ? 'bg-black' : 'bg-white'} shrink-0`} />
                <span className="underline decoration-dotted underline-offset-4 text-xs sm:text-sm">
                  {copiedEmail ? 'COPIED TO CLIPBOARD!' : email}
                </span>
              </button>
              <div className="flex items-center gap-3 mt-3 py-1">
                <span className={`w-3.5 h-3.5 ${isTeal ? 'bg-black' : 'bg-white'} shrink-0`} />
                <span className="text-xs sm:text-sm">{phone}</span>
              </div>
            </div>

            <div>
              <span className="block font-bold tracking-widest text-xs opacity-60 mb-2 uppercase">
                PHONE
              </span>
              <div className="flex items-center gap-3 py-1">
                <span className={`w-3.5 h-3.5 ${isTeal ? 'bg-black' : 'bg-white'} shrink-0`} />
                <span className="text-xs sm:text-sm">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Branding & Logo Box */}
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-end justify-between border-t border-black/10 dark:border-white/10 pt-6 gap-6">
        {/* 3 Square Logo Boxes & Name */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${isTeal ? 'bg-black shadow-md' : 'bg-neutral-800 border border-neutral-700'}`} />
            <div className={`w-6 h-6 ${isTeal ? 'bg-black shadow-md' : 'bg-neutral-800 border border-neutral-700'}`} />
            <div className={`w-6 h-6 ${isTeal ? 'bg-black shadow-md' : 'bg-neutral-800 border border-neutral-700'}`} />
          </div>
          <h2 className="font-sans font-black tracking-widest text-lg sm:text-xl uppercase">
            LUGENE SERANDON
          </h2>
        </div>

        {/* Back to top or interactive cue */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="opacity-60">© 2026 ALL RIGHTS RESERVED</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`cursor-pointer px-4 py-2 rounded font-bold uppercase transition-transform hover:scale-105 active:scale-95 border ${
              isTeal
                ? 'border-black text-black hover:bg-black hover:text-[#52C3C1]'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;