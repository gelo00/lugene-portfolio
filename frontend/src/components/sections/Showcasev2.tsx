import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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
    title: 'OAKLAND 18',
    client: 'Oakland Culture Co.',
    year: '2024',
    category: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&q=80',
    tags: ['Cinema 4D', 'Octane Render', 'After Effects'],
    challenge: 'Craft a high-energy, procedural motion language for an urban streetwear and music festival campaign.',
    process: 'Leveraged C4D Mograph cloners and Octane spectral shaders to generate fluid, audio-reactive 3D typography and stage visuals.',
    outcome: 'Delivered a 60-second broadcast reel and live stage loops that boosted social engagement by 140%.',
    metrics: '+140% Social Engagement',
  },
  {
    id: '2',
    title: 'SHINJUKU MIDNIGHT',
    client: 'NeoTokyo Sound',
    year: '2024',
    category: '3D Design & VFX',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
    tags: ['Blender', 'Houdini', 'DaVinci Resolve'],
    challenge: 'Build a hyper-detailed cyberpunk environment with volumetric fog, particle simulations, and dark neon aesthetics.',
    process: 'Combined Houdini Vellum particle dynamics with ACES color grading in DaVinci Resolve for photorealistic cinematic depth.',
    outcome: 'Featured in digital art showcases and served as the key album artwork and music video campaign.',
    metrics: '2.5M Stream Impressions',
  },
  {
    id: '3',
    title: 'NEO CYBER GRID',
    client: 'HexTech Dynamics',
    year: '2023',
    category: 'Interactive UI/UX',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&q=80',
    tags: ['React', 'GSAP', 'WebGL', 'Tailwind'],
    challenge: 'Design a web-based interactive control panel with zero-latency scroll animations and real-time data visualizers.',
    process: 'Engineered custom GSAP ScrollTrigger timelines synced with GPU-accelerated canvas layers.',
    outcome: 'Reduced page bounce rate by 38% and won Best UI Experience at WebDesign Awards 2023.',
    metrics: '38% Lower Bounce Rate',
  },
  {
    id: '4',
    title: 'HEX-TECH BRANDING',
    client: 'HexCorp Global',
    year: '2023',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80',
    tags: ['Kinetic Typography', 'Brand System', 'Vector'],
    challenge: 'Rebrand an enterprise AI security company with a modern, motion-first design system and custom typeface.',
    process: 'Created a modular grid token system with animated logo marks and responsive digital asset guidelines.',
    outcome: 'Successfully launched across 12 international tech expos and unified global marketing collateral.',
    metrics: 'Global Brand Rollout',
  },
  {
    id: '5',
    title: 'AURA SIMULATIONS',
    client: 'Apex Audio Labs',
    year: '2024',
    category: 'Procedural 3D',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    tags: ['Houdini', 'Redshift', 'Unreal Engine 5'],
    challenge: 'Simulate realistic fluid dynamics and acoustic wave refraction for a premium headphone launch video.',
    process: 'Utilized Houdini FLIP solvers rendered in Redshift with real-time UE5 lighting previews.',
    outcome: 'Used as primary retail display asset across flagship electronics stores nationwide.',
    metrics: '100+ Retail Display Outlets',
  },
  {
    id: '6',
    title: 'SOLARIS COMMERCIAL ID',
    client: 'Solaris Media',
    year: '2024',
    category: 'Commercial VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&q=80',
    tags: ['After Effects', 'Nuke', 'Color Grading'],
    challenge: 'Deliver 4K commercial stingers and lower-third graphic overlays for a high-profile sci-fi documentary series.',
    process: 'Built parametric motion templates in After Effects integrated with deep compositing in Nuke.',
    outcome: 'Broadcast to over 4 million viewers on primetime streaming platforms.',
    metrics: '4M+ Primetime Viewers',
  },
];

export const Showcasev2: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const target = targetRef.current;
      const header = headerRef.current;

      if (!track || !target) return;

      const scrollWidth = track.scrollWidth - window.innerWidth;

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${scrollWidth + 600}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (header) {
        mainTimeline.to(
          header,
          {
            scale: 0.92,
            opacity: 0.7,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        );
      }

      mainTimeline.to(
        track,
        {
          x: -scrollWidth,
          ease: 'none',
        },
        0
      );
    },
    { scope: targetRef }
  );

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative min-h-screen bg-[#111111] text-white overflow-hidden"
    >
      <div className="h-screen flex flex-col justify-between py-10 relative z-10">
        <div
          ref={headerRef}
          className="px-6 md:px-16 max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between transition-transform duration-300"
        >
          <div>
        
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F0F0F0]">
              SELECTED
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A7] to-[#E94E77]">
                PROJECT'S
              </span>
            </h2>
          </div>

        </div>

        <div className="w-full overflow-hidden my-auto">
          <div ref={trackRef} className="flex gap-8 px-6 md:px-16 w-max items-center">
            {PORTFOLIO_SHOWCASE_PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="group relative w-[85vw] md:w-[70vw] h-[55vh] md:h-[65vh] bg-[#1A1A1A] border border-[#262626] hover:border-[#00C2A7] rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 md:p-8"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-35 filter blur-[6px] grayscale brightness-75 group-hover:blur-none group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#1A1A1A]/70 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#00C2A7] px-2.5 py-1 rounded">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-mono text-[#AAAAAA] bg-[#111111]/80 backdrop-blur-md border border-[#262626] px-3 py-1 rounded">
                      {project.client}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-[#E94E77] bg-[#E94E77]/10 border border-[#E94E77]/30 px-3 py-1 rounded-full uppercase">
                    {project.year}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="text-xs font-mono text-[#00C2A7] uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase text-[#F0F0F0] group-hover:text-[#00C2A7] transition-colors mb-4">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-[#AAAAAA] bg-[#111111]/90 border border-[#262626] px-2.5 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] bg-[#00C2A7] hover:bg-[#00C2A7]/90 px-5 py-2.5 rounded-lg transition-all"
                  >
                    <span>VIEW CASE STUDY</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-2xl bg-[#161616] border-l border-[#262626] h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-mono text-[#00C2A7] border border-[#00C2A7]/30 bg-[#00C2A7]/10 px-3 py-1 rounded-full uppercase">
                  CASE STUDY // {selectedProject.category}
                </span>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#AAAAAA] hover:text-white bg-[#1A1A1A] border border-[#262626] rounded-full transition-colors"
                  aria-label="Close Case Study"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold uppercase text-[#F0F0F0] mb-2">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-4 text-xs font-mono text-[#AAAAAA] mb-8 pb-6 border-b border-[#262626]">
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

              <div className="relative aspect-video rounded-lg overflow-hidden border border-[#262626] mb-8">
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
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded border border-[#262626]">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-[#00C2A7] tracking-wider mb-2">
                    02 // CREATIVE PROCESS & TECH
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded border border-[#262626]">
                    {selectedProject.process}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-yellow-400 tracking-wider mb-2">
                    03 // OUTCOME & IMPACT
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded border border-[#262626]">
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
                      className="text-xs font-mono text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#262626] flex justify-between items-center">
              <span className="text-xs font-mono text-[#AAAAAA]">LUGENE PORTFOLIO v5.0</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 text-xs font-mono font-bold text-white bg-[#1A1A1A] border border-[#262626] hover:border-[#00C2A7] rounded-lg transition-colors"
              >
                CLOSE DRAWER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
