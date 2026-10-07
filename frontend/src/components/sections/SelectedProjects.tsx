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

export const SelectedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const totalProjects = cards.length;

      // Pin container and animate cards sequentially based on scroll distance
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalProjects * 100}%`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1
            );
            setActiveIndex(index);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // Keep first card visible initially

        // Stagger card transitions: entrance scale/fade and layer depth
        timeline.fromTo(
          card,
          { opacity: 0, scale: 0.88, yPercent: 30 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 1, ease: 'power2.out' },
          i * 1.2
        );

        // Subtly push down previous card to create depth
        if (i > 0) {
          timeline.to(
            cards[i - 1],
            { scale: 0.94, opacity: 0.4, duration: 1, ease: 'power2.inOut' },
            i * 1.2
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen  text-white flex flex-col justify-between px-6 py-8 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 max-w-6xl w-full mx-auto z-20">
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
          Selected <span className="text-cyan-400">Projects</span>
        </h2>
        <div className="text-xs tracking-widest text-gray-400 font-mono">
          SCROLL TO EXPLORE <span className="text-white ml-2">0{activeIndex + 1} / 0{PROJECTS.length}</span>
        </div>
      </div>

      {/* Stacked Cards Area */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-6">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full max-h-[520px] rounded-2xl bg-gradient-to-b from-[#181a20] to-[#111318] border border-cyan-500/20 shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 backdrop-blur-md"
            style={{ zIndex: idx + 1 }}
          >
            {/* Project Frame Header */}
            <div className="flex justify-between items-center z-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                {project.number} // {project.category}
              </span>
              <span className="text-xs font-mono text-gray-400">{project.year}</span>
            </div>

            {/* Visual Media Canvas (16:9 aspect frame) */}
            <div className="relative w-full h-64 md:h-80 my-4 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Interactive Hover CTA */}
              <div className="absolute bottom-4 right-4 bg-cyan-400 text-black text-xs font-bold font-mono px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                VIEW CASE STUDY →
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 z-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide uppercase">
                  {project.title}
                </h3>
                <p className="text-xs text-cyan-400/80 font-mono mt-1">{project.category}</p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="max-w-5xl w-full mx-auto h-1 bg-white/10 rounded-full overflow-hidden z-20">
        <div
          className="h-full bg-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }}
        />
      </div>
    </section>
  );
};