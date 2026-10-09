import React, { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgDomain = ['images', 'unsplash', 'com'].join('.');
const makeImg = (num: string) => 'https://' + imgDomain + '/photo-' + num + '?w=1200';
const AUTOPLAY_INTERVAL_MS = 3500;

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
  tags: string[];
  challenge: string;
  process: string;
  outcome: string;
  metrics?: string;
}

const PORTFOLIO_SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: '3D MOTION LANGUAGE',
    client: 'Culture Brand',
    year: '2024',
    category: 'Motion Graphics',
    image: makeImg('1578632767115-351597cf2477'),
    tags: ['Cinema 4D', 'Octane Render', 'After Effects'],
    challenge: 'Craft a high-energy procedural motion design system for a digital campaign.',
    process: 'Leveraged C4D Mograph cloners and spectral shaders to generate fluid typography.',
    outcome: 'Delivered broadcast video reels that increased engagement by 140%.',
    metrics: '+140% Social Engagement',
  },
  {
    id: '2',
    title: 'NEO TOKYO ENVIRONMENT',
    client: 'Digital Sound',
    year: '2024',
    category: '3D Design & VFX',
    image: makeImg('1618005182384-a83a8bd57fbe'),
    tags: ['Blender', 'Houdini', 'DaVinci Resolve'],
    challenge: 'Build a detailed 3D environment with volumetric fog and particle simulations.',
    process: 'Combined Houdini particle dynamics with color grading for photorealistic cinematic depth.',
    outcome: 'Featured in digital art showcases and served as key campaign imagery.',
    metrics: '2.5M Stream Impressions',
  },
  {
    id: '3',
    title: 'NEO CYBER GRID',
    client: 'Tech Dynamics',
    year: '2023',
    category: 'Interactive UI/UX',
    image: makeImg('1508700115892-45ecd05ae2ad'),
    tags: ['React', 'GSAP', 'WebGL', 'Tailwind'],
    challenge: 'Design an interactive control panel with scroll animations.',
    process: 'Engineered custom GSAP ScrollTrigger timelines synced with GPU canvas layers.',
    outcome: 'Reduced page bounce rate by 38% and won UI design award.',
    metrics: '38% Lower Bounce Rate',
  },
  {
    id: '4',
    title: 'BRAND DESIGN SYSTEM',
    client: 'Global Corp',
    year: '2023',
    category: 'Brand Identity',
    image: makeImg('1550745165-9bc0b252726f'),
    tags: ['Kinetic Typography', 'Brand System', 'Vector'],
    challenge: 'Rebrand an enterprise technology company with a modern motion-first design system.',
    process: 'Created a modular grid token system with animated logo marks and digital guidelines.',
    outcome: 'Successfully launched across international tech expos.',
    metrics: 'Global Brand Rollout',
  },
  {
    id: '5',
    title: 'PHYSICS SIMULATIONS',
    client: 'Audio Labs',
    year: '2024',
    category: 'Procedural 3D',
    image: makeImg('1600585154340-be6161a56a0c'),
    tags: ['Houdini', 'Redshift', 'Unreal Engine 5'],
    challenge: 'Simulate fluid dynamics and acoustic wave refraction for a product launch.',
    process: 'Utilized Houdini FLIP solvers rendered in Redshift with real-time UE5 previews.',
    outcome: 'Used as primary retail display asset across flagship stores.',
    metrics: '100+ Retail Outlets',
  },
  {
    id: '6',
    title: 'COMMERCIAL BROADCAST ID',
    client: 'Media Group',
    year: '2024',
    category: 'Commercial VFX',
    image: makeImg('1518709268805-4e9042af9f23'),
    tags: ['After Effects', 'Compositing', 'Color Grading'],
    challenge: 'Deliver 4K commercial stingers and graphic overlays for a documentary series.',
    process: 'Built parametric motion templates in After Effects integrated with deep compositing.',
    outcome: 'Broadcast to over 4 million viewers on primetime streaming platforms.',
    metrics: '4M+ Viewers',
  },
];

const INFINITE_PROJECTS = [
  ...PORTFOLIO_SHOWCASE_PROJECTS,
  ...PORTFOLIO_SHOWCASE_PROJECTS,
  ...PORTFOLIO_SHOWCASE_PROJECTS,
];

export const Showcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(PORTFOLIO_SHOWCASE_PROJECTS.length);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPageVisible, setIsPageVisible] = useState<boolean>(true);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectCount = PORTFOLIO_SHOWCASE_PROJECTS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => setIsPageVisible(!document.hidden);

    updatePageVisibility();
    document.addEventListener('visibilitychange', updatePageVisibility);
    return () => document.removeEventListener('visibilitychange', updatePageVisibility);
  }, []);

  useEffect(() => {
    if (isDragging || selectedProject || !isPageVisible) return;

    const timeout = window.setTimeout(handleNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, handleNext, isDragging, isPageVisible, selectedProject]);

  useGSAP(() => {
    const headingLines = headerRef.current?.querySelectorAll('.showcase-heading-line');
    if (!headingLines?.length) return;

    gsap.fromTo(
      headingLines,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const handleTrackTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;

    if (activeIndex < projectCount || activeIndex >= projectCount * 2) {
      setTransitionEnabled(false);
      setActiveIndex((prev) => projectCount + ((prev % projectCount) + projectCount) % projectCount);
    }
  };

  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => setTransitionEnabled(true));
    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen bg-[#111111] text-white py-16 px-4 md:px-12 overflow-hidden flex flex-col justify-between select-none "
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl w-full flex flex-col md:flex-row md:items-end justify-between">
        <div>
            <h2 className="text-3xl sm:text-4xl md:text-8xl font-black uppercase tracking-tight text-[#00C2A7] leading-tight">
              <span className="showcase-heading-line block">BEYOND DESIGN AND ILLUSTRATION,</span>
              <span className="showcase-heading-line block text-[#00C2A7]">
                CAPTURING MOMENTS
              </span>
            </h2>
        </div>
      </div>
      {/* Infinite Carousel Stage */}
      <div
        className="relative w-full overflow-hidden my-auto py-12 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handlePrev}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          className="absolute left-2 md:left-8 top-[37%] z-40 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white bg-[#111111]/90 hover:bg-[#00C2A7] hover:text-[#111111] border border-[#262626] rounded-lg transition-colors cursor-pointer font-mono font-bold text-lg shadow-md"
          aria-label="Previous Item"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          className="absolute right-2 md:right-8 top-[37%] z-40 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white bg-[#111111]/90 hover:bg-[#00C2A7] hover:text-[#111111] border border-[#262626] rounded-lg transition-colors cursor-pointer font-mono font-bold text-lg shadow-md"
          aria-label="Next Item"
        >
          &gt;
        </button>
        <div
          onTransitionEnd={handleTrackTransitionEnd}
          className={`flex items-center ${transitionEnabled ? 'transition-transform duration-300 ease-out' : ''} gap-6 md:gap-10 w-max mx-auto`}
          style={{
            transform: `translateX(calc(-${activeIndex * 340}px + ${dragOffset}px + 35vw))`,
          }}
        >
          {INFINITE_PROJECTS.map((project, idx) => {
            const isActive = idx === activeIndex;
            const originalIndex = idx % PORTFOLIO_SHOWCASE_PROJECTS.length;

            return (
              <div
                key={`${project.id}-${idx}`}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  } else {
                    setSelectedProject(project);
                  }
                }}
                className={`flex-shrink-0 transition-all duration-500 ease-out ${
                  isActive
                    ? 'scale-105 md:scale-110 z-30 opacity-100'
                    : 'scale-90 opacity-60 hover:opacity-90 z-10'
                }`}
                style={{ width: '310px' }}
              >
                {/* WHITE POLAROID PAPER FRAME */}
                <div
                  className={`bg-white text-neutral-900 rounded-sm p-4 pb-7 shadow-2xl border border-neutral-200 transition-all duration-300 transform relative ${
                    isActive
                      ? 'rotate-0 border-[#00C2A7] shadow-[0_20px_50px_rgba(0,194,167,0.3)]'
                      : idx % 2 === 0
                      ? '-rotate-2'
                      : 'rotate-2'
                  }`}
                >
                  {/* Tape Sticker Accent */}
                  <div className="w-24 h-5 bg-neutral-200/90 backdrop-blur-sm border border-neutral-300 -top-3 left-1/2 -translate-x-1/2 absolute rotate-1 rounded-xs flex items-center justify-center z-10 shadow-xs">
                    <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest font-bold">
                      [LUGENE.0{originalIndex + 1}]
                    </span>
                  </div>

                  {/* Photo Container with Depth-of-Field Blur on Non-Active Cards */}
                  <div className="relative aspect-4/3 rounded-xs overflow-hidden bg-neutral-900 mb-4 border border-neutral-200 shadow-inner group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isActive
                          ? 'filter-none opacity-100 scale-100 group-hover:scale-105'
                          : 'filter blur-[6px] brightness-75 opacity-70'
                      }`}
                    />

                    <span className="absolute top-2 left-2 text-[9px] font-mono font-bold bg-black/80 text-[#00C2A7] border border-[#00C2A7]/40 px-2 py-0.5 rounded uppercase backdrop-blur-md">
                      {project.category}
                    </span>

                    {project.metrics && (
                      <span className="absolute bottom-2 right-2 text-[9px] font-mono font-bold bg-[#E94E77] text-white px-2 py-0.5 rounded shadow-sm">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Polaroid White Bottom Margin Content */}
                  <div className="space-y-1.5 px-1 text-left">
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-500 border-b border-neutral-200 pb-1">
                      <span className="font-bold text-neutral-800">{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight leading-tight line-clamp-1">
                      {project.title}
                    </h3>

                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        0{originalIndex + 1} / 06
                      </span>

                      <span className="text-[10px] font-mono font-bold text-[#00C2A7] uppercase bg-neutral-100 border border-neutral-300 px-2.5 py-1 rounded hover:bg-[#00C2A7] hover:text-[#111111] transition-colors">
                        INSPECT ↑
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation Telemetry Bar */}
      {/* <div className="max-w-7xl w-full mx-auto flex justify-between items-center text-xs font-mono text-[#AAAAAA] mt-6 z-20">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPageVisible && !isDragging && !selectedProject ? 'bg-[#00C2A7] animate-pulse' : 'bg-[#AAAAAA]'}`} />
          <span>{isPageVisible && !isDragging && !selectedProject ? 'AUTO-SCROLL ACTIVE' : 'AUTO-SCROLL PAUSED'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-16 h-0.5 bg-[#00C2A7]/40 relative overflow-hidden rounded-full">
            <span className="absolute inset-0 bg-[#00C2A7] animate-pulse" />
          </span>
          <span>
            {String(((activeIndex % projectCount) + projectCount) % projectCount + 1).padStart(2, '0')} —{' '}
            {String(projectCount).padStart(2, '0')} (INFINITE STREAM)
          </span>
        </div>
      </div> */}

      {/* Slide-out Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-2xl bg-[#161616] border-l border-[#262626] h-full p-6 md:p-10 overflow-y-auto flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-[#00C2A7] border border-[#00C2A7]/30 bg-[#00C2A7]/10 px-3 py-1 rounded-full uppercase">
                  CASE STUDY // {selectedProject.category}
                </span>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#AAAAAA] hover:text-white bg-[#1A1A1A] border border-[#262626] rounded-full transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  X
                </button>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold uppercase text-[#F0F0F0] mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#AAAAAA] mb-6 pb-6 border-b border-[#262626]">
                <span>
                  CLIENT: <strong className="text-white">{selectedProject.client}</strong>
                </span>
                <span>
                  YEAR: <strong className="text-white">{selectedProject.year}</strong>
                </span>
                {selectedProject.metrics && (
                  <span className="text-[#00C2A7] font-bold">{selectedProject.metrics}</span>
                )}
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#262626] mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#E94E77] tracking-wider mb-2">
                    01 // THE CHALLENGE
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-[#00C2A7] tracking-wider mb-2">
                    02 // CREATIVE PROCESS & TECH
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
                    {selectedProject.process}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-yellow-400 tracking-wider mb-2">
                    03 // OUTCOME & IMPACT
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
                    {selectedProject.outcome}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#262626]">
                <h5 className="text-xs font-mono text-[#AAAAAA] uppercase tracking-wider mb-3">
                  TECHNOLOGY STACK
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;
