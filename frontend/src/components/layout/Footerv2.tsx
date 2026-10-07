import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export interface FooterProps {
  onStartProject?: () => void;
}

export const Footerv2: React.FC<FooterProps> = ({ onStartProject }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  const letters = ['L', 'U', 'G', 'E', 'N', 'E'];

  useGSAP(
    () => {
      const footer = footerRef.current;
      const letterElems = gsap.utils.toArray<HTMLElement>('.footer-letter');

      if (!footer || !letterElems.length) return;

      // ScrollTrigger: When user reaches the footer, trigger the falling cascade of letters
      gsap.fromTo(
        letterElems,
        {
          y: -300,
          opacity: 0,
          rotation: () => gsap.utils.random(-35, 35),
          scale: 1.4,
        },
        {
          scrollTrigger: {
            trigger: footer,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'bounce.out',
        }
      );
    },
    { scope: footerRef }
  );

  // Interactive Physics: Hover Squish
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: 25,
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

  // Interactive Physics: Click Launch
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    gsap.timeline()
      .to(target, {
        y: -200,
        rotation: gsap.utils.random(-30, 30),
        color: '#E94E77',
        duration: 0.4,
        ease: 'power3.out',
      })
      .to(target, {
        y: 0,
        rotation: 0,
        color: '#F0F0F0',
        duration: 0.8,
        ease: 'bounce.out',
      });
  };

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  return (
    <footer
      ref={footerRef}
      className=" text-white relative overflow-hidden pt-16 pb-12"
    >
      {/* Falling Letter Cascade Zone */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        {/* LUGENE Animated Falling Letters */}
        <div
          ref={lettersRef}
          className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 my-6 select-none overflow-visible"
        >
          {letters.map((char, index) => (
            <span
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="footer-letter text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tight text-[#F0F0F0] inline-block cursor-pointer font-header transition-colors leading-none"
              style={{
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 194, 167, 0.2)',
                willChange: 'transform, opacity',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Full-bleed CTA Banner */}
      <div className="max-w-5xl mx-auto px-6 bg-gradient-to-r from-[#00C2A7] via-[#22d3ee] to-[#E94E77] p-[1px] rounded-2xl mb-12 shadow-2xl">
        <div className="bg-[#111111] rounded-2xl py-12 px-8 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto z-10 relative">
            <span className="text-xs font-mono text-[#00C2A7] border border-[#00C2A7]/30 bg-[#00C2A7]/10 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4">
              READY TO COLLABORATE?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
              LET'S MAKE SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A7] to-[#E94E77]">AWESOME</span>
            </h2>
            <p className="text-[#AAAAAA] font-mono text-xs md:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              Have an upcoming motion graphics project, 3D visual reel, or brand refresh? Let's connect and build a cinematic experience.
            </p>
           
          </div>
        </div>
      </div>

      {/* Footer Bottom Nav & Back to Top */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-6 text-[#AAAAAA] text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm tracking-wider">LUGENE</span>
          <span className="text-[#262626]">|</span>
          <p className="text-[#888888]">© 2026 Lugene Portfolio v5.0. All rights reserved.</p>
        </div>

        <div className="flex gap-6 text-xs">
          <a href="#" className="hover:text-[#00C2A7] transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-[#00C2A7] transition-colors">INSTAGRAM</a>
        </div>

        <button
          onClick={scrollToTop}
          className="px-4 py-2 border border-[#262626] hover:border-[#00C2A7] text-white rounded-lg font-mono hover:text-[#00C2A7] transition-colors flex items-center gap-2 bg-[#141414]"
        >
          <span>BACK TO TOP</span>
          <span className="text-[#00C2A7]">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footerv2;
