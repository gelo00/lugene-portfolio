import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const SKILLS_LIST = [
  'MOTION GRAPHICS',
  '3D ANIMATION',
  'CINEMA 4D',
  'AFTER EFFECTS',
  'REACT SPA',
  'TAILWIND CSS',
  'OCTANE RENDER',
  'GSAP SCROLLTRIGGER',
  'VFX COMPOSITING',
  'CYBERPUNK DESIGN',
];

export const MarqueeTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const content = tickerRef.current;
    if (!content) return;

    gsap.to(content, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none',
    });
  }, { scope: tickerRef });

  return (
    <div className="py-4 bg-primary text-black overflow-hidden font-mono text-sm font-bold tracking-widest border-y border-primary/50 relative">
      <div ref={tickerRef} className="flex whitespace-nowrap gap-8 w-max">
        {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, index) => (
          <div key={index} className="flex items-center gap-8">
            <span>{skill}</span>
            <span className="text-black/40">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};
