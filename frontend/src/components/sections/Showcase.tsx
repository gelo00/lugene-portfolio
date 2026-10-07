import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
}

const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    number: '01',
    title: 'OAKLAND 18',
    category: 'Motion Graphics',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
    tags: ['Cinema 4D', 'Octane', 'AE'],
  },
  {
    id: 'proj-02',
    number: '02',
    title: 'SHINJUKU MIDNIGHT',
    category: '3D Design & VFX',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    tags: ['Blender', 'Substance', 'DaVinci'],
  },
  {
    id: 'proj-03',
    number: '03',
    title: 'NEO CYBER GRID',
    category: 'UI/UX & Interactive',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
    tags: ['React', 'Three.js', 'GLSL'],
  },
  {
    id: 'proj-04',
    number: '04',
    title: 'HEX-TECH BRANDING',
    category: 'Brand Identity',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    tags: ['Illustrator', 'C4D', 'Figma'],
  },
];

export const Showcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Swipe & Cursor drag tracking coordinates
  const dragStartX = useRef<number>(0);
  const dragCurrentX = useRef<number>(0);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.showcase-card');
    const totalCards = cards.length;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalCards * 100}%`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress * (totalCards - 1);
        const currentIndex = Math.min(Math.max(Math.round(progress), 0), totalCards - 1);
        setActiveIndex(currentIndex);

        const xPercent = -((self.progress * (totalCards - 1)) / totalCards) * 100 * 0.82;
        gsap.set(trackRef.current, { xPercent });

        cards.forEach((card, idx) => {
          const distance = Math.abs(progress - idx);

          if (distance < 0.4) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              borderColor: '#52C3C1',
              duration: 0.3,
              overwrite: 'auto',
            });
          } else if (distance < 1.2) {
            gsap.to(card, {
              opacity: 0.4,
              scale: 0.94,
              filter: 'blur(6px)',
              borderColor: '#262626',
              duration: 0.3,
              overwrite: 'auto',
            });
          } else {
            gsap.to(card, {
              opacity: 0.1,
              scale: 0.88,
              filter: 'blur(12px)',
              borderColor: '#171717',
              duration: 0.3,
              overwrite: 'auto',
            });
          }
        });
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, { scope: sectionRef });

  // Swipe / Drag helper method
  const processSwipe = () => {
    if (!scrollTriggerRef.current) return;

    const distance = dragStartX.current - dragCurrentX.current;
    const minSwipeDistance = 40;

    const totalCards = PORTFOLIO_PROJECTS.length;
    const currentProgress = scrollTriggerRef.current.progress;
    const step = 1 / (totalCards - 1);

    if (distance > minSwipeDistance) {
      // Swiped Left -> Move to Next
      const nextProgress = Math.min(currentProgress + step, 1);
      gsap.to(window, {
        scrollTo: scrollTriggerRef.current.start + nextProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start),
        duration: 0.4,
        ease: 'power2.out',
      });
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Move to Previous
      const prevProgress = Math.max(currentProgress - step, 0);
      gsap.to(window, {
        scrollTo: scrollTriggerRef.current.start + prevProgress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start),
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  // Cursor Mouse Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    dragCurrentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      processSwipe();
      setIsDragging(false);
    }
  };

  // Touch Screen Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.targetTouches[0].clientX;
    dragCurrentX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    dragCurrentX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    processSwipe();
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-screen min-h-screen text-white px-6 md:px-16 pt-[8vh] md:pt-[10vh] pb-6 flex flex-col justify-start select-none overflow-hidden font-mono z-10 touch-pan-y ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Title Header - Positioned directly on top of cards */}
      <div className="pb-1 border-b border-white/10 shrink-0 z-20 w-full flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white leading-none">
          SELECTED <span className="text-[#52C3C1]">PROJECTS</span>
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-neutral-500 hidden sm:block">
            DRAG / SWIPE OR SCROLL
          </span>
          <span className="text-xs text-neutral-400 font-bold">
            0{activeIndex + 1} / 0{PORTFOLIO_PROJECTS.length}
          </span>
        </div>
      </div>

      {/* Horizontal Track Container - Tighter vertical margin */}
      <div className="relative w-full flex-1 flex items-center overflow-hidden mt-2 md:mt-3">
        <div
          ref={trackRef}
          className="flex items-center space-x-8 md:space-x-12 px-4 transition-transform ease-out"
          style={{ width: `${PORTFOLIO_PROJECTS.length * 75}vw` }}
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="showcase-card relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-4xl bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 pointer-events-none"
            >
              {/* Media Container */}
              <div className="relative h-[38vh] md:h-[44vh] w-full bg-neutral-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-neutral-700 text-[#52C3C1] text-xs font-bold rounded-full">
                    #{project.number} // {project.category}
                  </span>
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-neutral-700 text-neutral-300 text-xs rounded-full">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Text Info Container */}
              <div className="p-6 bg-[#141414] flex justify-between items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black font-sans uppercase text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1">
                    {project.category}
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;