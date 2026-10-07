import React, { useRef } from 'react';

const LETTERS = ['L', 'U', 'G', 'E', 'N', 'E'];

export const Hero: React.FC = () => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);


  return (
    <section
      id="hero"
      data-scroll-section
      className="relative min-h-screen w-full bg-[#111111] overflow-hidden flex flex-col items-center justify-end text-center"
    >
      <h1 data-hero-title className="mb-28 text-[17vw] sm:text-[18vw] tracking-tighter uppercase font-dela-gothic text-primary select-none flex justify-center items-center">
        {LETTERS.map((letter, idx) => (
          <span
            key={idx}
            ref={(el) => {
              lettersRef.current[idx] = el;
            }}
            data-hero-letter
            className="inline-block transition-colors duration-300 cursor-pointer drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            {letter}
          </span>
        ))}
      </h1>
       <div className="fixed bottom-10 right-6 z-40 flex flex-col items-end space-y-2 text-text-muted text-[10px] font-mono tracking-widest uppercase opacity-70">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-4 h-7 border border-neutral-700 rounded-full flex justify-center p-1">
          <div className="w-1 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
