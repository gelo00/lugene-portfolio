import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
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
    description: 'An exploration of futuristic urban landscapes driven by audio-reactive lighting and cinematic camera paths.',
    tags: ['#Cinema4D', '#AfterEffects', '#Octane'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '02',
    number: '#02',
    title: 'SHINJUKU MIDNIGHT',
    category: '3D Design & VFX',
    year: '2024',
    description: 'High-octane atmospheric visuals inspired by Tokyo nocturnal subcultures, combining procedural texturing with complex lighting builds.',
    tags: ['#Blender', '#Substance', '#DaVinci'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '03',
    number: '#03',
    title: 'CYBERNETIC VOID',
    category: 'Brand Storytelling',
    year: '2023',
    description: 'Experimental brand reveal sequence focusing on organic cybernetic transformations and fluid dynamic simulations.',
    tags: ['#Houdini', '#UnrealEngine', '#Redshift'],
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '04',
    number: '#04',
    title: 'AETHERIAL REALMS',
    category: 'Campaign Visuals',
    year: '2023',
    description: 'Surreal visual identity campaign exploring abstract geometric landscapes and metallic light reflections.',
    tags: ['#Blender', '#AfterEffects', '#Premiere'],
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200&auto=format&fit=crop',
  },
];

export const EditorialProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      mediaRefs.current.forEach((el, idx) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => updateActiveProject(idx),
          onEnterBack: () => updateActiveProject(idx),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const updateActiveProject = (index: number) => {
    if (detailPanelRef.current) {
      // Fade out left detail panel, swap active index, fade back in
      gsap.to(detailPanelRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
          setActiveIndex(index);
          gsap.to(detailPanelRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    } else {
      setActiveIndex(index);
    }
  };

  const currentProject = PROJECTS[activeIndex];

  return (
    <section ref={containerRef} className="w-full bg-[#0d0f12] text-white px-6 py-20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
          Selected <span className="text-cyan-400">Projects</span>
        </h2>
        <div className="text-xs tracking-widest text-gray-400 font-mono">
          0{activeIndex + 1} / 0{PROJECTS.length}
        </div>
      </div>

      {/* 2-Column Asymmetric Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Sticky Detail Panel (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div ref={detailPanelRef} className="space-y-6">
            
            {/* Project Number & Category */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                {currentProject.number}
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                {currentProject.category} • {currentProject.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              {currentProject.title}
            </h3>

            {/* Narrative Description */}
            <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
              {currentProject.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors">
                View Case Study <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Canvas List (7 cols) */}
        <div className="lg:col-span-7 space-y-16 lg:space-y-28">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (mediaRefs.current[idx] = el)}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                activeIndex === idx
                  ? 'border-cyan-500/40 shadow-2xl shadow-cyan-950/30 scale-[1.01]'
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              {/* Media Aspect Container (16:9) */}
              <div className="relative w-full aspect-video bg-[#181a20] overflow-hidden group cursor-pointer">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Mobile Fallback Overlay */}
                <div className="lg:hidden absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
                  <span className="text-xs font-mono text-cyan-400">{project.number}</span>
                  <h4 className="text-lg font-bold uppercase">{project.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};