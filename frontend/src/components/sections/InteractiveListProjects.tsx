import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    number: '#01',
    title: 'NEON HORIZON',
    category: 'Motion Design & Concept',
    year: '2024',
    tags: ['#Cinema4D', '#AfterEffects', '#Octane'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '02',
    number: '#02',
    title: 'SHINJUKU MIDNIGHT',
    category: '3D Design & VFX',
    year: '2024',
    tags: ['#Blender', '#Substance', '#DaVinci'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '03',
    number: '#03',
    title: 'CYBERNETIC VOID',
    category: 'Brand Storytelling',
    year: '2023',
    tags: ['#Houdini', '#UnrealEngine', '#Redshift'],
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '04',
    number: '#04',
    title: 'AETHERIAL REALMS',
    category: 'Campaign Visuals',
    year: '2023',
    tags: ['#Blender', '#AfterEffects', '#Premiere'],
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200&auto=format&fit=crop',
  },
];

export const InteractiveListProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Smoothly track cursor coordinates relative to section container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !previewRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - bounds.left;
    const relY = e.clientY - bounds.top;

    gsap.to(previewRef.current, {
      x: relX,
      y: relY,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseEnter = (project: Project) => {
    setActiveProject(project);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0f12] text-white px-6 py-20 min-h-screen overflow-hidden select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 max-w-6xl mx-auto mb-12 z-10 relative">
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
          Selected <span className="text-cyan-400">Projects</span>
        </h2>
        <div className="text-xs tracking-widest text-gray-400 font-mono">
          HOVER TO PREVIEW // [ 04 ]
        </div>
      </div>

      {/* Floating Cursor Preview Frame */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 scale-80 hidden lg:block"
      >
        <div className="w-[380px] h-[240px] rounded-2xl overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-950/50 bg-[#181a20] relative">
          {activeProject && (
            <>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <span className="text-xs font-mono text-cyan-400">{activeProject.number}</span>
                <span className="text-[10px] font-mono text-black font-bold bg-cyan-400 px-2 py-0.5 rounded">
                  VIEW →
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Vertical Interactive List */}
      <div className="max-w-6xl mx-auto divide-y divide-white/10 border-b border-white/10 relative z-20">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={handleMouseLeave}
            className="group py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] px-4 rounded-xl"
          >
            {/* Left Column: Number & Title */}
            <div className="flex items-baseline gap-6 md:gap-12">
              <span className="text-sm font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                {project.number}
              </span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight group-hover:translate-x-3 transition-transform duration-300 group-hover:text-cyan-300">
                {project.title}
              </h3>
            </div>

            {/* Right Column: Category & Tags */}
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                {project.category} • {project.year}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 border border-white/10 text-gray-400 group-hover:border-cyan-500/30 group-hover:text-gray-200 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Image Fallback (Visible on mobile/tablet without hover cursor) */}
            <div className="lg:hidden w-full aspect-video rounded-xl overflow-hidden mt-2 border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};