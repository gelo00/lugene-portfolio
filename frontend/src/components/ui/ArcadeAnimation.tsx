import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface ArcadeAnimationProps {
  onInsertCoin: () => void;
  className?: string;
}

export const ArcadeAnimation: React.FC<ArcadeAnimationProps> = ({
  onInsertCoin,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coinBtnRef = useRef<HTMLButtonElement>(null);
  const [score, setScore] = useState(0);
  const [credits, setCredits] = useState(0);
  const [isInserting, setIsInserting] = useState(false);

  useGSAP(() => {
    const scope = containerRef.current;
    if (!scope) return;

    // CRT Bootup Flicker
    gsap.fromTo(
      scope,
      { opacity: 0, scale: 0.95, filter: 'brightness(2) contrast(2)' },
      { opacity: 1, scale: 1, filter: 'brightness(1) contrast(1)', duration: 0.8, ease: 'power2.out' }
    );

    // Blinking "INSERT COIN" / "PRESS START"
    gsap.to('.arcade-blink', {
      opacity: 0.15,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'steps(2)',
    });

    // Score Counter Incrementor Animation
    const scoreObj = { val: 0 };
    gsap.to(scoreObj, {
      val: 99990,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => setScore(Math.floor(scoreObj.val)),
    });
  }, { scope: containerRef });

  const handleInsertCoin = () => {
    if (isInserting) return;
    setIsInserting(true);
    setCredits((prev) => prev + 1);

    // Screen Shake & Button Pulse
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: -8 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
      );
    }

    if (coinBtnRef.current) {
      gsap.fromTo(
        coinBtnRef.current,
        { scale: 1.2, boxShadow: '0 0 30px #00C2A7' },
        { scale: 1, boxShadow: '0 0 15px #FFC007', duration: 0.3 }
      );
    }

    // Trigger reveal of Hero section after short arcade coin animation delay
    setTimeout(() => {
      onInsertCoin();
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className={`relative max-w-2xl mx-auto p-8 bg-black/95 border-2 border-accent/80 rounded-xl shadow-[0_0_40px_rgba(255,192,7,0.35)] font-mono text-text-primary overflow-hidden select-none ${className}`}
    >
      {/* Retro CRT Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-80" />

      {/* Arcade Header HUD */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-accent/30 text-xs md:text-sm tracking-widest z-20 relative">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-secondary rounded-full animate-ping" />
          <span className="text-secondary font-bold">1UP</span>
          <span className="text-white">{score.toString().padStart(6, '0')}</span>
        </div>
        <div className="text-accent font-bold">
          HIGH SCORE: <span className="text-primary">999990</span>
        </div>
        <div className="text-primary font-bold">
          CREDITS: <span className="text-accent">{credits.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Center Arcade Cabinet Screen */}
      <div className="text-center py-8 z-20 relative">
        <div className="inline-block px-3 py-1 mb-4 bg-accent/10 border border-accent/40 text-accent text-xs uppercase tracking-widest rounded-sm">
          🕹️ LUGENE PORTFOLIO CABINET
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary tracking-widest uppercase mb-6 drop-shadow-[0_2px_12px_rgba(0,194,167,0.6)]">
          STAGE 01: READY PLAYER LUGENE
        </h2>

        <p className="arcade-blink text-secondary text-base md:text-lg font-black tracking-widest uppercase mb-8">
          {isInserting ? '⚡ ACCESS GRANTED • UNLOCKING HERO SECTION...' : '>> INSERT COIN TO ENTER PORTFOLIO <<'}
        </p>

        {/* Big Arcade Start Button */}
        <button
          ref={coinBtnRef}
          onClick={handleInsertCoin}
          disabled={isInserting}
          className="relative group px-10 py-5 bg-accent hover:bg-accent-hover active:scale-95 text-black font-black text-lg md:text-xl tracking-widest uppercase rounded-lg shadow-[0_0_25px_#FFC007] transition-all cursor-pointer z-30"
        >
          <span className="flex items-center justify-center space-x-3">
            <span>🪙</span>
            <span>{isInserting ? 'LOADING HERO...' : 'INSERT COIN / PRESS START'}</span>
          </span>
        </button>
      </div>

      {/* Arcade Footer Stats */}
      <div className="mt-6 pt-4 border-t border-accent/20 flex justify-between items-center text-xs text-text-muted z-20 relative">
        <div>SYS: READY</div>
        <div className="text-primary">PRESS BUTTON TO DISPLAY HERO</div>
        <div>AUDIO: 8-BIT</div>
      </div>
    </div>
  );
};

export default ArcadeAnimation;
