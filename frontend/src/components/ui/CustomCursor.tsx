import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only disable if device is strictly touch-only without fine pointer
    const isTouchOnly = window.matchMedia('(pointer: coarse) and not (pointer: fine)').matches;
    if (isTouchOnly) return;

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // High-performance GSAP quickSetters for 60 FPS cursor tracking
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate response for inner precision dot
      setDotX(mouseX);
      setDotY(mouseY);

      // Smooth lerping follower for outer ring
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Hover state detection for interactive UI elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"], .service-card, .project-card, .cursor-pointer'
      );

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Hide native browser cursor on desktop */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-primary rounded-full shadow-[0_0_8px_#00C2A7] pointer-events-none transition-opacity duration-300"
      />

      {/* Outer Cyberpunk Crosshair Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'scale-150 border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(233,78,119,0.5)]'
            : isMouseDown
            ? 'scale-75 border-accent bg-accent/20'
            : 'border-primary/60 bg-transparent shadow-[0_0_10px_rgba(0,194,167,0.2)]'
        }`}
      >
        {/* Cyberpunk Crosshair Ticks when Hovering Interactive Elements */}
        {isHovered && (
          <>
            <span className="absolute -top-1.5 w-0.5 h-1.5 bg-secondary" />
            <span className="absolute -bottom-1.5 w-0.5 h-1.5 bg-secondary" />
            <span className="absolute -left-1.5 h-0.5 w-1.5 bg-secondary" />
            <span className="absolute -right-1.5 h-0.5 w-1.5 bg-secondary" />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
