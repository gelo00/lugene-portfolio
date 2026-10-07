import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance timeline for the card & contents
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: window.matchMedia('(min-width: 768px)').matches ? '+=100%' : 'bottom top',
          pin: window.matchMedia('(min-width: 768px)').matches,
          scrub: 1,
        },
      });

      // Card elevation entrance
      mainTl.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );

      // Polaroid swing-in
      mainTl.fromTo(
        polaroidRef.current,
        { y: 50, rotate: -8, opacity: 0 },
        { y: 0, rotate: -3, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
        '-=0.7'
      );

      // Word-by-word reveal for the heading
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      if (words && words.length > 0) {
        mainTl.fromTo(
          words,
          { y: 24, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }

      // Paragraph fade-in
      mainTl.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Button scale bounce
      mainTl.fromTo(
        buttonRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-12 text-white sm:py-16 md:px-8 md:py-24"
    >
      {/* Main Container Card */}
      <div
        ref={cardRef}
        className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-8 rounded-3xl border border-zinc-800/80 bg-[#1a1a1a] p-5 shadow-2xl sm:gap-10 sm:p-8 md:p-14 lg:grid-cols-12 lg:gap-12"
      >
        {/* Left Column: Polaroid Frame */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={polaroidRef}
            className="group bg-white text-zinc-900 p-4 pb-6 rounded-sm shadow-2xl transform transition-all duration-500 hover:rotate-0 hover:scale-[1.03] max-w-sm w-full cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 rounded-xs mb-4 relative">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                alt="Lugene Cyberpunk Gamer/Designer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="text-center font-mono text-xs md:text-sm tracking-wider text-zinc-700 font-semibold uppercase">
              lugene.creatives
            </p>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Main Heading with split typography */}
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.2] font-sans font-normal text-zinc-200 tracking-tight"
          >
            <span className="inline-block reveal-word">What</span>{' '}
            <span className="inline-block reveal-word">i</span>{' '}
            <span className="inline-block reveal-word">do</span>{' '}
            <span className="inline-block reveal-word">as</span>{' '}
            <span className="inline-block reveal-word">a</span>{' '}
            <span className="inline-block reveal-word font-black text-[#3ec1b0]">
              multimedia designer?
            </span>{' '}
            <br className="hidden sm:inline" />
            <span className="inline-block reveal-word italic font-serif text-teal-300/80 font-light text-2xl sm:text-3xl lg:text-4xl mr-2">
              clears throat
            </span>{' '}
            <span className="inline-block reveal-word font-black text-[#3ec1b0] uppercase tracking-wide">
              Allow me!
            </span>{' '}
            <span className="inline-block reveal-word">to</span>{' '}
            <span className="inline-block reveal-word">enlighten</span>{' '}
            <span className="inline-block reveal-word">you.</span>
          </h2>

          {/* Body Copy */}
          <p
            ref={bodyRef}
            className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans font-light"
          >
            Hi! I'm <strong className="font-semibold text-white">Lugene Serandon</strong>, a 25-year-old multimedia artist with nearly 6 years of experience. I'm passionate about creating impactful designs and constantly improving my skills. Outside of work, I'm a gamer, movie buff, and music lover. I enjoy drawing and experimenting with new techniques. I believe in learning from setbacks and always pushing my creative limits.
          </p>

          {/* Call to Action Button */}
          <div ref={buttonRef} className="pt-2">
            <button
              className="px-7 py-3 rounded-full border border-[#3ec1b0] text-[#3ec1b0] font-mono text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-[#3ec1b0] hover:text-[#111111] hover:shadow-[0_0_20px_rgba(62,193,176,0.3)] active:scale-95"
            >
              the creation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;