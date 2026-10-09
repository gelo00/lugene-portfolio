import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const bioText = "Hi! I'm Lugene Serandon, a 25-year-old multimedia artist with nearly 6 years of experience. I'm passionate about creating impactful designs and constantly improving my skills. Outside of work, I'm a gamer, movie buff, and music lover. I enjoy drawing and experimenting with new techniques. I believe in learning from setbacks and always pushing my creative limits.";

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Force manual restoration rules to clear stale historical refresh vectors completely
      if (typeof window !== 'undefined') {
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.clearScrollMemory();
        window.scrollTo(0, 0);
      }

      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      let scrollLocked = false;

      const lockScroll = () => {
        if (!scrollLocked) {
          document.body.style.overflow = 'hidden';
          scrollLocked = true;
        }
      };

      const unlockScroll = () => {
        document.body.style.overflow = '';
        scrollLocked = false;
      };

      // 1. Static Layout Pinning Trigger (Handles layout locking ONLY)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: isDesktop ? '+=100%' : 'bottom top',
        pin: isDesktop,
        invalidateOnRefresh: true,
      });

      // 2. THE MASTER AUTOMATIC TIMELINE
      // Consolidates everything into a single sequence so the card renders first
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top', 
          toggleActions: 'play none none reset',
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            if (bodyRef.current) {
              bodyRef.current.textContent = '';
            }
          },
          onEnter: () => {
            // Smoothly auto-scroll window viewport into perfect center alignment grid anchors
            gsap.to(window, {
              scrollTo: { y: section, autoKill: false },
              duration: 0.10,
              ease: 'power4.out',
              onComplete: () => {
                lockScroll();
              }
            });
          }
        },
        onComplete: () => {
          unlockScroll();
        }
      });

      // Beat A: Animate outer architecture entry (Card arrives at 100% opacity first)
      masterTl.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' }
      );

      // Beat B: Swing the polaroid photo layer into view right alongside it
      masterTl.fromTo(
        polaroidRef.current,
        { y: 40, rotate: -10, opacity: 0 },
        { y: 0, rotate: -3, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.35'
      );

      // Beat C: Question typography characters fade inside the established card bounds
      const questionWords = headingRef.current?.querySelectorAll('.reveal-question');
      if (questionWords && questionWords.length > 0) {
        masterTl.fromTo(
          questionWords,
          { y: 15, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.16, stagger: 0.025, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // Beat D: Voice clear transition label string enters
      masterTl.fromTo(
        '.reveal-cough',
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        '+=0.05'
      );
      
      // Jitter horizontal tremor loop run sequence execution
      masterTl.to('.reveal-cough', {
        x: -4,
        repeat: 5, 
        yoyo: true,
        duration: 0.025,
        ease: 'linear'
      });

      // Clear the throat text overlay loop completely
      masterTl.to('.reveal-cough', { 
        opacity: 0, 
        scale: 0.8, 
        display: 'none', 
        duration: 0.08, 
        ease: 'power2.in' 
      }, 'revealPayoff');
      
      // Explosive arrived shock state for "ALLOW ME!"
      masterTl.fromTo(
        '.reveal-punch',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' },
        'revealPayoff'
      );

      // Completion structure unrolls inline
      const remainingWords = headingRef.current?.querySelectorAll('.reveal-rest');
      if (remainingWords && remainingWords.length > 0) {
        masterTl.fromTo(
          remainingWords,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, stagger: 0.025, ease: 'power3.out' },
          '-=0.1'
        );
      }

      // Slide and clear heading workspace structure entirely
      masterTl.to(headingRef.current, {
        opacity: 0,
        y: -20,
        filter: 'blur(6px)',
        duration: 0.4,
        ease: 'power3.inOut',
        display: 'none' 
      }, '+=0.45'); 

      // Activate narrative context text layout space nodes smoothly
      masterTl.to(bodyRef.current, {
        display: 'block',
        opacity: 1,
        duration: 0.01
      }, '-=0.3');

      // Automated character typewriter mapping proxy loops
      const textObj = { textLength: 0 };
      masterTl.to(textObj, {
        textLength: bioText.length,
        duration: 2.4, 
        ease: 'none',  
        onUpdate: () => {
          if (bodyRef.current) {
            bodyRef.current.textContent = bioText.slice(0, Math.floor(textObj.textLength));
          }
        }
      }, '-=0.5');

      // Call-to-action pointer anchor entry displays neatly
      masterTl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { display: 'flex', scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' },
        '+=0.05'
      );

      // Clean up body scroll styles safely on lifecycle unmount
      return () => {
        unlockScroll();
      };
    },
    { scope: sectionRef }
  );


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-12 text-white sm:py-16 md:px-8 md:py-24"
    >
      <div
        ref={cardRef}
        className="relative z-10 grid w-full grid-cols-1 items-center gap-8 rounded-3xl border border-zinc-800/80 bg-[#1a1a1a] p-5 shadow-2xl sm:gap-10 sm:p-8 md:p-14 lg:grid-cols-12 lg:gap-12"
      >
        {/* Left Column: Polaroid Visual Frame */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={polaroidRef}
            className="group bg-white text-zinc-900 p-4 pb-6 rounded-sm shadow-2xl transform transition-all duration-500 hover:rotate-0 hover:scale-[1.03] max-w-sm w-full cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 rounded-xs mb-4 relative">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                alt="Lugene Red Stylized Creative Figure"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="text-center font-mono text-xs md:text-sm tracking-wider text-zinc-700 font-semibold uppercase">
              lugene.creatives
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Animation Execution Engine Space */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left min-h-[380px] relative">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-sans font-normal text-zinc-200 tracking-tight select-none"
          >
            <div className="block mb-1">
              <span className="inline-block reveal-question">What</span>{' '}
              <span className="inline-block reveal-question">i</span>{' '}
              <span className="inline-block reveal-question">do</span>{' '}
              <span className="inline-block reveal-question">as</span>{' '}
              <span className="inline-block reveal-question">a</span>
            </div>

            <div className="block font-black text-[#3ec1b0] mb-3">
              <span className="inline-block reveal-question">multimedia</span>{' '}
              <span className="inline-block reveal-question">designer?</span>
            </div>

            <div className="relative min-h-[1.2em] flex items-center justify-center lg:justify-start mb-1">
              <span className="reveal-cough absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 italic font-serif text-zinc-500 font-light text-xl sm:text-2xl lg:text-3xl origin-center lg:origin-left select-none whitespace-nowrap">
                *clears throat*
              </span>
              <span className="reveal-punch mx-auto lg:mx-0 block font-black text-[#3ec1b0] uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl origin-center opacity-0">
                ALLOW ME!
              </span>
            </div>

            <div className="block mt-1">
              <span className="inline-block reveal-rest">to</span>{' '}
              <span className="inline-block reveal-rest">enlighten</span>{' '}
              <span className="inline-block reveal-rest">you.</span>
            </div>
          </h2>

          <p
            ref={bodyRef}
            className="hidden w-full max-w-2xl break-words text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl font-sans font-light mx-auto lg:mx-0 min-h-[12lh] md:min-h-[8lh] after:content-['█'] after:animate-pulse after:ml-1 after:text-[#3ec1b0] after:text-base"
          />

          <div ref={buttonRef} className="hidden flex-wrap gap-3 pt-6 justify-center lg:justify-start">
            <a
              href="/gallery"
              className="px-7 py-3 rounded-full border border-[#3ec1b0] text-[#3ec1b0] font-mono text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-[#3ec1b0] hover:text-[#111111] hover:shadow-[0_0_20px_rgba(62,193,176,0.3)] active:scale-95"
            >
              Gallery
            </a>
            <a
              href="/illustration"
              className="px-7 py-3 rounded-full border border-[#3ec1b0] text-[#3ec1b0] font-mono text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-[#3ec1b0] hover:text-[#111111] hover:shadow-[0_0_20px_rgba(62,193,176,0.3)] active:scale-95"
            >
              Illustration
            </a>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default About;
