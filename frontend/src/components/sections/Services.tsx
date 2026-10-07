import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

const SERVICES_8_GRID: ServiceItem[] = [
  { id: '1', code: '01', title: 'Photography', description: 'Cyberpunk lifestyle, product, and architectural high-contrast photography.', icon: '📷', tags: ['Raw', 'Lightroom', 'Color'] },
  { id: '2', code: '02', title: 'Motion Graphics', description: 'Hardware-accelerated 2D/3D kinetic typography and logo animations.', icon: '⚡', tags: ['After Effects', 'Lottie', 'C4D'] },
  { id: '3', code: '03', title: 'Video Editing', description: 'Paced narrative cuts, promo teasers, and cinematic sound design.', icon: '🎬', tags: ['Premiere', 'DaVinci', 'Sound'] },
  { id: '4', code: '04', title: '3D Design', description: 'Octane & Redshift rendered futuristic 3D assets, environments, and characters.', icon: '🧊', tags: ['Cinema 4D', 'Blender', 'Octane'] },
  { id: '5', code: '05', title: 'Illustration', description: 'Custom digital vector artwork, concept art, and brand mascot designs.', icon: '✏️', tags: ['Illustrator', 'Procreate', 'Vector'] },
  { id: '6', code: '06', title: 'Graphic Design', description: 'Key visuals, print media, social assets, and promotional materials.', icon: '🎨', tags: ['Photoshop', 'Branding', 'Print'] },
  { id: '7', code: '07', title: 'Digital Marketing', description: 'Targeted visual campaign strategy, ad creatives, and conversion assets.', icon: '🚀', tags: ['Campaigns', 'Social', 'Analytics'] },
  { id: '8', code: '08', title: 'UI/UX Design', description: 'Interactive dark-mode web interfaces, design systems, and rapid prototyping.', icon: '💻', tags: ['Figma', 'React', 'Tailwind'] },
];

interface PowerUpCardProps {
  item: ServiceItem;
}

const PowerUpCard: React.FC<PowerUpCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle 3D tilt angles (max +/- 10deg)
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      scale3d: 1.03,
      duration: 0.2,
      ease: 'power1.out',
    });

    // Follow cursor with spotlight radial gradient
    if (glowRef.current) {
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 194, 167, 0.25) 0%, transparent 70%)`;
      glowRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale3d: 1,
      duration: 0.5,
      ease: 'power2.out',
    });

    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card group relative bg-bg-card border border-neutral-800 hover:border-primary p-6 rounded-lg transition-colors duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Interactive Cursor Spotlight Glow Overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-10"
      />

      <div className="relative z-20" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl drop-shadow-[0_0_8px_rgba(0,194,167,0.4)]">{item.icon}</span>
          <span className="text-xs font-mono text-secondary font-bold tracking-widest">{item.code}</span>
        </div>
        <h3 className="text-xl font-header font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-text-muted font-body leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      <div
        className="relative z-20 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/60"
        style={{ transform: 'translateZ(15px)' }}
      >
        {item.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 text-text-muted rounded border border-neutral-800 group-hover:border-primary/40 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-24 px-6 bg-black border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
            CAPABILITIES & EXPERTISE
          </span>
          <h2 className="text-3xl md:text-5xl font-header font-extrabold uppercase tracking-tight text-white mt-4">
            SELECT YOUR <span className="text-primary">POWER UP...</span>
          </h2>
          <p className="text-text-muted mt-3 max-w-xl mx-auto text-sm md:text-base font-body">
            Full-spectrum creative suite designed to elevate your brand through high-impact visual media and digital innovation.
          </p>
        </div>

        {/* 8-Card Interactive Grid with Parallax Mouse Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_8_GRID.map((item) => (
            <PowerUpCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
