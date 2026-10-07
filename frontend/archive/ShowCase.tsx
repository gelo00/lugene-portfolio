import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  videoUrl?: string;
  description: string;
  tags: string[];
  year: string;
  client: string;
}

const PORTFOLIO_SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: '01',
    title: 'OAKLAND 18 CINEMATICS',
    category: '3D MOTION & VFX',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
    description: 'A dark, high-octane 3D motion sequence built with procedural simulations and Octane lighting for urban streetwear visuals.',
    tags: ['Cinema 4D', 'Octane Render', 'After Effects'],
    year: '2024',
    client: 'Oakland Athletics',
  },
  {
    id: '02',
    title: 'SHINJUKU MIDNIGHT',
    category: 'CYBERPUNK VISUALS',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    description: 'Neo-Tokyo volumetric environment design featuring custom GLSL shaders, neon ray-tracing, and atmospheric particles.',
    tags: ['Blender 4.0', 'GLSL Shaders', 'DaVinci Resolve'],
    year: '2024',
    client: 'Neos Tokyo',
  },
  {
    id: '03',
    title: 'NEO CYBER GRID UI',
    category: 'INTERACTIVE FRONTEND',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
    description: 'Hardware-accelerated web experience featuring 60FPS GSAP ScrollTrigger animations and Three.js canvas shaders.',
    tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    year: '2023',
    client: 'Aether Systems',
  },
  {
    id: '04',
    title: 'HEX-TECH BRANDING',
    category: 'ART DIRECTION',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    description: 'Comprehensive brand identity and motion design guidelines for futuristic web3 and tech gaming organizations.',
    tags: ['Brand Identity', 'Vector Emblem', 'Art Direction'],
    year: '2023',
    client: 'Hex-Tech Labs',
  },
];

interface ShowcaseProps {
  onSelectProject?: (project: ProjectItem) => void;
  onOpenVideoReel?: () => void;
}

export const ShowCase: React.FC<ShowcaseProps> = ({ onSelectProject, onOpenVideoReel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    // Timeline for Horizontal Scroll & Reel Zoom-In
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      },
    });

    // 1. Horizontal Scroll across cards
    mainTl.to(trackRef.current, {
      xPercent: -75,
      ease: 'none',
      duration: 3,
    });

    // 2. Transition at end of scroll -> Video Reel Section Zoom-In
    if (videoSectionRef.current) {
      mainTl.fromTo(
        videoSectionRef.current,
        { opacity: 0, scale: 0.6, yPercent: 40 },
        { opacity: 1, scale: 1, yPercent: 0, ease: 'power2.out', duration: 1.5 }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#111111] text-white overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Background Subtle Accent Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#52C3C1]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#E94E77]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="px-8 md:px-16 pt-10 pb-4 z-10 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-[#52C3C1] border border-[#52C3C1]/30 bg-[#52C3C1]/10 px-3 py-1 rounded-full uppercase tracking-widest">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl md:text-5xl font-header font-black tracking-tight text-white mt-3 uppercase">
            FEATURED <span className="text-[#52C3C1]">WORKS</span>
          </h2>
        </div>
        <div className="text-right hidden sm:block font-mono text-xs text-neutral-400">
          <span>SCROLL HORIZONTALLY TO EXPLORE</span>
          <div className="text-[#52C3C1] mt-1 font-bold">[ 01 — 04 ]</div>
        </div>
      </div>

      {/* Horizontal Cards Reel Track */}
      <div className="relative w-full overflow-hidden py-6 z-10">
        <div
          ref={trackRef}
          className="flex space-x-8 md:space-x-12 px-8 md:px-20 w-max items-center"
        >
          {PORTFOLIO_SHOWCASE_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                if (onSelectProject) onSelectProject(project);
              }}
              className="group relative w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-4xl h-[65vh] bg-[#1a1a1a] border border-neutral-800 hover:border-[#52C3C1] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Zoom and Hover Overlay */}
              <div className="relative w-full h-[68%] overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />

                {/* Badges Overlay */}
                <div className="absolute top-6 left-6 flex items-center space-x-3">
                  <span className="text-xs font-mono bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#52C3C1]/40 text-[#52C3C1] font-bold">
                    #{project.id}
                  </span>
                  <span className="text-xs font-mono bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-700 text-neutral-300 uppercase">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-mono bg-[#52C3C1] text-black font-extrabold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(82,195,193,0.6)]">
                    CLICK TO INSPECT ↗
                  </span>
                </div>
              </div>

              {/* Card Details Section */}
              <div className="p-6 md:p-8 flex flex-col justify-between h-[32%] bg-[#1a1a1a]">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#52C3C1] transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500">{project.year}</span>
                  </div>
                  <p className="text-neutral-300 text-sm mt-2 line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-800/80">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 rounded"
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

      {/* Video Reels Zoom-In Transition Section at end of horizontal scroll */}
      <div
        ref={videoSectionRef}
        className="absolute inset-x-6 bottom-10 z-20 bg-[#1f1f1f]/95 backdrop-blur-xl border border-[#52C3C1]/40 rounded-2xl p-8 max-w-4xl mx-auto text-center shadow-[0_0_40px_rgba(0,0,0,0.8)] opacity-0 pointer-events-auto"
      >
        <span className="text-xs font-mono text-[#E94E77] border border-[#E94E77]/30 bg-[#E94E77]/10 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
          🎬 NEXT LEVEL SHOWREEL
        </span>
        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
          READY FOR THE <span className="text-[#52C3C1]">MOTION REEL '24</span>?
        </h3>
        <p className="text-neutral-300 text-sm mt-2 max-w-xl mx-auto font-light">
          Experience 60 seconds of high-impact 3D cinematics, VFX breakdowns, and interactive graphics.
        </p>
        <button
          onClick={() => {
            if (onOpenVideoReel) onOpenVideoReel();
          }}
          className="mt-6 px-8 py-3.5 bg-[#52C3C1] hover:bg-[#3ec1b0] text-black font-extrabold text-sm uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(82,195,193,0.5)] transition-all transform hover:scale-105 cursor-pointer"
        >
          PLAY SHOWREEL VIDEO 🎬
        </button>
      </div>

      {/* Modal for Clicked Project */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a1a] border border-[#52C3C1] rounded-2xl max-w-3xl w-full p-6 md:p-8 relative shadow-[0_0_50px_rgba(82,195,193,0.3)] text-white"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm font-mono"
            >
              ✕
            </button>
            <div className="aspect-16/9 rounded-xl overflow-hidden mb-6 border border-neutral-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-mono text-[#52C3C1] uppercase tracking-widest block mb-1">
              {selectedProject.category} • {selectedProject.year}
            </span>
            <h3 className="text-3xl font-black uppercase text-white mb-3">
              {selectedProject.title}
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-neutral-900 border border-neutral-800 text-[#52C3C1] px-3 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowCase;
