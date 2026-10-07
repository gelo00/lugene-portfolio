import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


export const Hero: React.FC = () => {
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
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(
          letters,
          {
            y: -450,
            opacity: 0,
            rotation: () => gsap.utils.random(-25, 25),
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
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
          '.hero-cta',
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.3'
        );

      // 2. Scroll-Driven Pinning & Upward Lift Transition
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
          scale: 0.9,
          ease: 'power2.inOut',
        });
      }
    },
    { scope: containerRef }
  );

  // Interactive Physics: Hover Squish
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: 35,
      scaleY: 0.75,
      scaleX: 1.15,
      color: '#00C2A7',
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
        y: -350,
        rotation: gsap.utils.random(-30, 30),
        color: '#E94E77',
        scale: 1.2,
        duration: 0.45,
        ease: 'power3.out',
      })
      .to(target, {
        y: 0,
        rotation: 0,
        color: '#F0F0F0',
        scale: 1,
        duration: 0.85,
        ease: 'bounce.out',
      });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-[#111111] text-[#F0F0F0] overflow-hidden flex items-center justify-center "
    >
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto px-6 py-16 text-center z-10 flex flex-col items-center justify-center"
      >

        {/* Interactive Falling Cascade Title */}
        <div
          ref={titleContainerRef}
          className="relative flex justify-center items-center select-none top-100"
        >
          {titleLetters.map((letter, index) => (
            <span
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="hero-letter text-xl sm:text-9xl md:text-[14rem] font-black uppercase tracking-tight text-[#52C3C1] inline-block cursor-pointer transition-colors leading-none"
              style={{
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                willChange: 'transform, opacity',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
