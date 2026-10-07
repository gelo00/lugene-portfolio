import React, { useEffect, useRef } from 'react';

interface CyberpunkBackgroundProps {
  showGrid?: boolean;
  showGlowOrbs?: boolean;
  showScanlines?: boolean;
  showParticles?: boolean;
}

export const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({
  showGrid = true,
  showGlowOrbs = true,
  showScanlines = true,
  showParticles = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle System Canvas (Option 4)
  useEffect(() => {
    if (!showParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes configuration
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? '#00C2A7' : '#E94E77',
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-bg-dark">
      {/* 1. Ambient Neon Glow Orbs */}
      {showGlowOrbs && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow" />
          <div className="absolute top-2/3 -left-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[130px]" />
        </>
      )}

      {/* 2. Cyberpunk Dot Matrix / Grid */}
      {showGrid && (
        <div className="absolute inset-0 bg-[radial-gradient(#00C2A7_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07]" />
      )}

      {/* 3. Hardware-Accelerated Canvas Micro-Particles */}
      {showParticles && (
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />
      )}

      {/* 4. Subtle CRT Scanlines Overlay */}
      {showScanlines && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
      )}
    </div>
  );
};

export default CyberpunkBackground;
