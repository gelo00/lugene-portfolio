import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface HeroProps {
  onOpenShowreel?: () => void;
}

export const Hero4: React.FC<HeroProps> = ({ onOpenShowreel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleLetters = ['L', 'U', 'G', 'E', 'N', 'E'];

  useGSAP(
    () => {
      const container = containerRef.current;
      const letters = gsap.utils.toArray<HTMLElement>('.hero-letter');
      const content = contentRef.current;

      if (!container || !letters.length) return;

      // 1. Entrance Animation Timeline: Falling Cascade Physics
      const entranceTl = gsap.timeline();

      entranceTl
        .fromTo(
          '.hero-badge',
          { y: -30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(
          letters,
          {
            y: -500,
            opacity: 0,
            rotation: () => gsap.utils.random(-35, 35),
            scale: 0.5,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.3,
            stagger: 0.08,
            ease: 'bounce.out',
          },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-tags',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        );

      // 2. Scroll-Driven Pinning & Upward Lift Transition into Stage 02
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: '+=800',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (content) {
        scrollTl.to(content, {
          yPercent: -120,
          opacity: 0,
          scale: 0.88,
          ease: 'power2.inOut',
        });
      }
    },
    { scope: containerRef }
  );

  // Interactive Physics: Hover Squish & Glow
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: 35,
      scaleY: 0.72,
      scaleX: 1.18,
      color: '#00C2A7',
      textShadow: '0 0 25px rgba(0, 194, 167, 0.8)',
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scaleY: 1,
      scaleX: 1,
      color: '#F0F0F0',
      textShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
      duration: 0.45,
      ease: 'bounce.out',
      overwrite: 'auto',
    });
  };

  // Interactive Physics: Click Launch into Space
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;

    const launchTl = gsap.timeline();
    launchTl
      .to(target, {
        y: -380,
        rotation: gsap.utils.random(-40, 40),
        color: '#E94E77',
        textShadow: '0 0 30px rgba(233, 78, 119, 0.9)',
        scale: 1.25,
        duration: 0.45,
        ease: 'power3.out',
      })
      .to(target, {
        y: 0,
        rotation: 0,
        color: '#F0F0F0',
        textShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
        scale: 1,
        duration: 0.85,
        ease: 'bounce.out',
      });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen text-[#F0F0F0] overflow-hidden flex items-center justify-center border-b border-[#262626]/80 bg-transparent"
    >
      {/* Hero Content Overlay (Mounted over Global3DBackground) */}
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-6 py-16 text-center z-10 flex flex-col items-center justify-center relative pointer-events-none"
      >
        {/* Status Badge */}
        <div className="hero-badge pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-mono tracking-widest text-[#00C2A7] border border-[#00C2A7]/40 bg-black/70 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(0,194,167,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00C2A7] animate-pulse" />
          <span>STAGE 01 UNLOCKED • PERSISTENT 3D CANVAS ACTIVE</span>
        </div>

        {/* Interactive Falling Cascade Title */}
        <div
          ref={titleContainerRef}
          className="relative flex justify-center items-center gap-2 md:gap-4 my-2 select-none pointer-events-auto"
        >
          {titleLetters.map((letter, index) => (
            <span
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="hero-letter text-7xl sm:text-9xl md:text-[13rem] font-black uppercase tracking-tight text-[#F0F0F0] inline-block cursor-pointer font-header transition-colors leading-none"
              style={{
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
                willChange: 'transform, opacity, textShadow',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Interaction Cue */}
        <p className="text-[11px] font-mono text-[#00C2A7] tracking-widest uppercase mb-6 opacity-90 pointer-events-auto">
          [ HOVER TO SQUISH • CLICK TO LAUNCH LETTERS ]
        </p>

        {/* Hero Tagline / Subtitle */}
        <p className="hero-subtitle text-base sm:text-lg md:text-2xl text-[#AAAAAA] max-w-2xl mx-auto mb-6 font-light leading-relaxed pointer-events-auto bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-[#262626] shadow-2xl">
          High-octane <strong className="text-white font-semibold">3D Motion Design</strong>,{' '}
          <strong className="text-white font-semibold">Visual Effects</strong>, and fluid interactive frontend experiences built for high-impact brands.
        </p>

        {/* Capability Tags Pill Group */}
        <div className="hero-tags flex flex-wrap justify-center gap-2 mb-8 pointer-events-auto">
          {['3D MOTION VIX', 'PROCEDURAL SHADERS', 'FRONTEND ARCHITECTURE', 'CINEMATIC REELS'].map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-bold text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-3 py-1 rounded-full uppercase shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hero-cta flex flex-wrap justify-center items-center gap-4 pointer-events-auto">
          <a
            href="#projects"
            className="px-8 py-4 bg-[#00C2A7] hover:bg-[#00C2A7]/90 text-[#111111] font-mono font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_0_25px_rgba(0,194,167,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            EXPLORE WORK ↓
          </a>

          <button
            onClick={onOpenShowreel}
            className="px-8 py-4 bg-[#1A1A1A]/90 border border-[#262626] hover:border-[#E94E77] text-white font-mono font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(233,78,119,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 backdrop-blur-md"
          >
            <span className="text-[#E94E77]">🎬</span>
            <span>PLAY SHOWREEL '24</span>
          </button>
        </div>
      </div>

      {/* Decorative Bottom Corner Indicators */}
      <div className="absolute bottom-6 left-6 md:left-12 text-[10px] font-mono text-[#888888] hidden sm:block z-10 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-[#262626]">
        SYS.VER // v5.0 (THREE.JS PIPELINE)
        <br />
        FRAMEWORK // REACT 19 + THREE.JS + GSAP
      </div>

      <div className="absolute bottom-6 right-6 md:right-12 text-[10px] font-mono text-[#00C2A7] hidden sm:block text-right z-10 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-[#262626]">
        STATUS // GLOBAL 3D CANVAS ACTIVE
        <br />
        LOCATION // GLOBAL / REMOTE
      </div>
    </section>
  );
};

export default Hero4;
