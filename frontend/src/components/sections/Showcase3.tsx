import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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
  rotation?: string;
}

const PORTFOLIO_SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: '3D MOTION LANGUAGE',
    client: 'Culture Brand',
    year: '2024',
    category: 'Motion Graphics',
    image: '/assets/projects/project1.jpg',
    tags: ['Cinema 4D', 'Octane Render', 'After Effects'],
    challenge: 'Craft a high-energy procedural motion design system for a digital campaign.',
    process: 'Leveraged C4D Mograph cloners and spectral shaders to generate fluid typography and visuals.',
    outcome: 'Delivered broadcast video reels and digital assets that increased engagement by 140%.',
    metrics: '+140% Social Engagement',
    rotation: '-rotate-2',
  },
  {
    id: '2',
    title: 'CYBERPUNK ENVIRONMENT',
    client: 'Digital Sound',
    year: '2024',
    category: '3D Design & VFX',
    image: '/assets/projects/project2.jpg',
    tags: ['Blender', 'Houdini', 'DaVinci Resolve'],
    challenge: 'Build a detailed 3D environment with volumetric fog and particle simulations.',
    process: 'Combined Houdini particle dynamics with color grading for photorealistic cinematic depth.',
    outcome: 'Featured in digital art showcases and served as key campaign imagery.',
    metrics: '2.5M Stream Impressions',
    rotation: 'rotate-1',
  },
  {
    id: '3',
    title: 'NEO CYBER GRID',
    client: 'Tech Dynamics',
    year: '2023',
    category: 'Interactive UI/UX',
    image: '/assets/projects/project3.jpg',
    tags: ['React', 'GSAP', 'WebGL', 'Tailwind'],
    challenge: 'Design an interactive control panel with scroll animations and real-time visualizers.',
    process: 'Engineered custom GSAP ScrollTrigger timelines synced with GPU canvas layers.',
    outcome: 'Reduced page bounce rate by 38% and won UI design award.',
    metrics: '38% Lower Bounce Rate',
    rotation: '-rotate-1',
  },
  {
    id: '4',
    title: 'BRAND DESIGN SYSTEM',
    client: 'Global Corp',
    year: '2023',
    category: 'Brand Identity',
    image: '/assets/projects/project4.jpg',
    tags: ['Kinetic Typography', 'Brand System', 'Vector'],
    challenge: 'Rebrand an enterprise technology company with a modern motion-first design system.',
    process: 'Created a modular grid token system with animated logo marks and digital guidelines.',
    outcome: 'Successfully launched across international tech expos.',
    metrics: 'Global Brand Rollout',
    rotation: 'rotate-2',
  },
  {
    id: '5',
    title: 'PHYSICS SIMULATIONS',
    client: 'Audio Labs',
    year: '2024',
    category: 'Procedural 3D',
    image: '/assets/projects/project5.jpg',
    tags: ['Houdini', 'Redshift', 'Unreal Engine 5'],
    challenge: 'Simulate fluid dynamics and acoustic wave refraction for a product launch.',
    process: 'Utilized Houdini FLIP solvers rendered in Redshift with real-time UE5 previews.',
    outcome: 'Used as primary retail display asset across flagship stores.',
    metrics: '100+ Retail Outlets',
    rotation: '-rotate-2',
  },
  {
    id: '6',
    title: 'COMMERCIAL BROADCAST ID',
    client: 'Media Group',
    year: '2024',
    category: 'Commercial VFX',
    image: '/assets/projects/project6.jpg',
    tags: ['After Effects', 'Compositing', 'Color Grading'],
    challenge: 'Deliver 4K commercial stingers and graphic overlays for a documentary series.',
    process: 'Built parametric motion templates in After Effects integrated with deep compositing.',
    outcome: 'Broadcast to over 4 million viewers on primetime streaming platforms.',
    metrics: '4M+ Viewers',
    rotation: 'rotate-1',
  },
];

const INFINITE_ITEMS = [
  ...PORTFOLIO_SHOWCASE_PROJECTS,
  ...PORTFOLIO_SHOWCASE_PROJECTS,
  ...PORTFOLIO_SHOWCASE_PROJECTS,
];

export const Showcase3: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const speed = 32;

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      gsap.set(track, { xPercent: 0 });

      const tween = gsap.to(track, {
        xPercent: -33.33333,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });

      tweenRef.current = tween;

      if (!isPlaying) {
        tween.pause();
      }
    },
    { scope: containerRef }
  );

  const toggleAutoplay = () => {
    if (tweenRef.current) {
      if (isPlaying) {
        tweenRef.current.pause();
      } else {
        tweenRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setDirection = (direction: 'left' | 'right') => {
    if (tweenRef.current) {
      const currentProgress = tweenRef.current.progress();
      tweenRef.current.revert();

      const track = trackRef.current;
      if (!track) return;

      if (direction === 'left') {
        const tween = gsap.to(track, {
          xPercent: -33.33333,
          duration: speed,
          ease: 'none',
          repeat: -1,
        });
        tween.progress(currentProgress);
        tweenRef.current = tween;
      } else {
        const tween = gsap.to(track, {
          xPercent: 0,
          duration: speed,
          ease: 'none',
          repeat: -1,
        });
        tween.progress(currentProgress);
        tweenRef.current = tween;
      }

      if (!isPlaying) {
        tweenRef.current.pause();
      }
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen bg-[#111111] text-white overflow-hidden border-t border-[#262626] py-16 flex flex-col justify-between"
    >
      {/* Header Bar */}
      <div className="px-6 md:px-16 max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between mb-10 z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00C2A7] animate-pulse" />
            <span className="text-xs font-mono text-[#00C2A7] uppercase tracking-widest px-3 py-1 bg-[#00C2A7]/10 border border-[#00C2A7]/30 rounded-full">
              04 // POLAROID INFINITE CAROUSEL
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F0F0F0]">
            CURATED WORKS &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A7] to-[#E94E77]">
              POLAROID REEL
            </span>
          </h2>
        </div>

        {/* Carousel HUD Controls */}
        <div className="flex items-center gap-3 mt-6 md:mt-0 bg-[#1A1A1A] p-2 rounded-xl border border-[#262626] shadow-lg">
          <button
            onClick={() => setDirection('right')}
            className="px-3.5 py-2 text-xs font-mono font-bold text-[#AAAAAA] hover:text-white bg-[#111111] border border-[#262626] hover:border-[#00C2A7] rounded-lg transition-all cursor-pointer"
            title="Scroll Right"
          >
            ◄ PREV
          </button>
          <button
            onClick={toggleAutoplay}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#00C2A7] text-[#111111] shadow-[0_0_12px_rgba(0,194,167,0.3)]'
                : 'bg-[#E94E77] text-white shadow-[0_0_12px_rgba(233,78,119,0.3)]'
            }`}
          >
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
          <button
            onClick={() => setDirection('left')}
            className="px-3.5 py-2 text-xs font-mono font-bold text-[#AAAAAA] hover:text-white bg-[#111111] border border-[#262626] hover:border-[#00C2A7] rounded-lg transition-all cursor-pointer"
            title="Scroll Left"
          >
            NEXT ►
          </button>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Stage */}
      <div className="w-full overflow-hidden my-auto py-10">
        <div
          ref={trackRef}
          className="flex gap-8 md:gap-10 w-max items-center px-6"
          onMouseEnter={() => {
            if (tweenRef.current && isPlaying) {
              tweenRef.current.timeScale(0.2);
            }
          }}
          onMouseLeave={() => {
            if (tweenRef.current && isPlaying) {
              tweenRef.current.timeScale(1.0);
            }
          }}
        >
          {INFINITE_ITEMS.map((project, index) => {
            const originalIndex = index % PORTFOLIO_SHOWCASE_PROJECTS.length;
            const rotClass = project.rotation || (index % 2 === 0 ? '-rotate-2' : 'rotate-2');

            return (
              <div
                key={`${project.id}-${index}`}
                onClick={() => setSelectedProject(project)}
                className={`group relative w-[80vw] sm:w-[50vw] md:w-[38vw] lg:w-[28vw] bg-[#181818] border border-[#262626] hover:border-[#00C2A7] p-4 pb-6 rounded-2xl shadow-2xl transition-all duration-500 ease-out transform ${rotClass} hover:rotate-0 hover:-translate-y-3 hover:scale-105 cursor-pointer flex-shrink-0 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,194,167,0.25)]`}
              >
                {/* Polaroid Tape Sticker */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#262626]/90 backdrop-blur-md border border-[#3a3a3a] rotate-1 z-20 rounded-sm shadow-sm flex items-center justify-center pointer-events-none">
                  <span className="text-[9px] font-mono text-[#00C2A7] uppercase tracking-wider font-bold">
                    [LUGENE.STUDIO // 0{originalIndex + 1}]
                  </span>
                </div>

                {/* Photo Area Frame */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#262626] bg-[#111111] mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Top Status Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono font-bold text-[#111111] bg-[#00C2A7] px-2.5 py-1 rounded">
                      0{originalIndex + 1} / 0{PORTFOLIO_SHOWCASE_PROJECTS.length}
                    </span>

                    <span className="text-[10px] font-mono text-[#E94E77] bg-black/80 backdrop-blur-md border border-[#E94E77]/30 px-2.5 py-1 rounded-full uppercase">
                      {project.year}
                    </span>
                  </div>

                  {/* Metric Pill Badge */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono font-bold text-[#00C2A7] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#00C2A7]/30">
                      {project.metrics}
                    </div>
                  )}
                </div>

                {/* Polaroid Caption Margin */}
                <div className="pt-2 border-t border-[#262626] flex flex-col justify-between flex-grow">
                  <div>
                    <div className="text-[10px] font-mono text-[#00C2A7] uppercase tracking-wider mb-1">
                      {project.category}
                    </div>

                    <h3 className="text-lg md:text-xl font-black uppercase text-[#F0F0F0] group-hover:text-[#00C2A7] transition-colors mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-[11px] font-mono text-[#AAAAAA] mb-3">
                      CLIENT: <strong className="text-white">{project.client}</strong>
                    </p>
                  </div>

                  {/* Tags & Action Button */}
                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono text-[#AAAAAA] bg-[#111111] border border-[#262626] px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-full text-center py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] bg-[#00C2A7] group-hover:bg-[#00C2A7]/90 rounded-lg transition-all shadow-[0_0_12px_rgba(0,194,167,0.3)]">
                      EXPAND CASE STUDY →
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer HUD Indicator */}
      <div className="px-6 md:px-16 max-w-7xl w-full mx-auto flex justify-between items-center text-xs font-mono text-[#AAAAAA] mt-6 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00C2A7] animate-pulse" />
          <span>POLAROID REEL // HOVER TO INSPECT • CLICK TO EXPAND CASE STUDY</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#00C2A7] font-bold">INFINITE STREAM ACTIVE</span>
          <div className="w-16 h-1.5 bg-[#262626] rounded-full overflow-hidden">
            <div className="h-full bg-[#00C2A7] animate-pulse w-full" />
          </div>
        </div>
      </div>

      {/* Case Study Side Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-2xl bg-[#161616] border-l border-[#262626] h-full p-6 md:p-10 overflow-y-auto flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-[#00C2A7] border border-[#00C2A7]/30 bg-[#00C2A7]/10 px-3 py-1 rounded-full uppercase">
                  POLAROID CASE STUDY // {selectedProject.category}
                </span>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#AAAAAA] hover:text-white bg-[#1A1A1A] border border-[#262626] rounded-full transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  ✕
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

export default Showcase3;
