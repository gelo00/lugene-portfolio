import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface ServicePillar {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  deliverables: string[];
  tools: string[];
}

export interface ProcessStage {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  accentColor: string;
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: '1',
    code: '01',
    title: '3D Motion Design',
    subtitle: 'Procedural & Photorealistic Visuals',
    description: 'High-octane 3D motion, procedural particle dynamics, FLIP fluid simulations, and Octane/Redshift photorealistic renders.',
    icon: '🧊',
    deliverables: ['Broadcast Stingers', '3D Product Films', 'Stage Visual Loops', 'Procedural Assets'],
    tools: ['Cinema 4D', 'Houdini', 'Octane', 'Redshift'],
  },
  {
    id: '2',
    code: '02',
    title: 'VFX & Compositing',
    subtitle: 'Cinematic Visual Effects',
    description: 'Deep multi-pass compositing, volumetric lighting, chroma keying, and ACES color space grading for high-end film and commercial spots.',
    icon: '🎬',
    deliverables: ['VFX Shots', 'Color Grading', 'Volumetric Environments', 'Commercial IDs'],
    tools: ['Nuke', 'DaVinci Resolve', 'After Effects', 'Blender'],
  },
  {
    id: '3',
    code: '03',
    title: 'Brand Storytelling',
    subtitle: 'Motion-First Identity Systems',
    description: 'Dynamic kinetic typography, parametric design tokens, animated logos, and cohesive motion guidelines for modern tech brands.',
    icon: '✨',
    deliverables: ['Kinetic Logos', 'Motion Styleguides', 'Social Campaigns', 'Exhibition Visuals'],
    tools: ['After Effects', 'Illustrator', 'Figma', 'Lottie'],
  },
  {
    id: '4',
    code: '04',
    title: 'Interactive Frontend',
    subtitle: 'Zero-Latency Web Experiences',
    description: 'Hardware-accelerated web interfaces powered by React, GSAP ScrollTrigger, WebGL canvas shaders, and tailored dark aesthetics.',
    icon: '💻',
    deliverables: ['Interactive Portfolios', 'WebGL Dashboards', 'GSAP Animation Systems', 'Design Systems'],
    tools: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  },
];

const PROCESS_ROADMAP: ProcessStage[] = [
  {
    step: '01',
    phase: 'DISCOVERY & CONCEPT',
    title: 'Strategic Foundation',
    description: 'Uncovering core brand objectives, audience psychology, and visual references to establish a bulletproof creative direction.',
    deliverables: ['Creative Brief', 'Moodboards', 'Visual Styleboards', 'Technical Scope'],
    accentColor: '#00C2A7',
  },
  {
    step: '02',
    phase: 'DIRECTION & LOOKDEV',
    title: 'Styleframes & Previs',
    description: 'Translating concepts into 3D styleframes, lighting tests, camera animatics, and motion tests for client alignment before full production.',
    deliverables: ['3D Styleframes', 'Camera Animatics', 'Color Palettes', 'Typography Tests'],
    accentColor: '#E94E77',
  },
  {
    step: '03',
    phase: 'PRODUCTION & MOTION',
    title: 'Execution & Simulation',
    description: 'Full-scale 3D rendering, particle physics simulations, kinetic animation keyframing, audio synchronization, and deep compositing.',
    deliverables: ['High-Res Renders', 'VFX Composites', 'Audio Syncing', 'Motion Loops'],
    accentColor: '#52C3C1',
  },
  {
    step: '04',
    phase: 'DELIVERY & HANDOFF',
    title: 'Final Master Delivery',
    description: 'Exporting 4K master ProRes/H.264 files, WebM video assets, code integration bundles, and full documentation for seamless launch.',
    deliverables: ['4K Master Files', 'Social Cutdowns', 'Lottie / WebM Bundles', 'Documentation'],
    accentColor: '#FFC007',
  },
];

export const Servicev2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'process'>('services');

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      gsap.from('.service-card-item', {
        scrollTrigger: {
          trigger: '.services-grid-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 45,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.process-step-item', {
        scrollTrigger: {
          trigger: '.process-roadmap-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });
    },
    { scope: containerRef, dependencies: [activeTab] }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 px-6 md:px-16 bg-[#111111] text-[#F0F0F0] border-t border-[#262626] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00C2A7] animate-pulse" />
              <span className="text-xs font-mono text-[#00C2A7] uppercase tracking-widest px-3 py-1 bg-[#00C2A7]/10 border border-[#00C2A7]/30 rounded-full">
                02 // CAPABILITIES & METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#F0F0F0]">
              SERVICE PILLARS &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A7] to-[#E94E77]">
                WORKFLOW ROADMAP
              </span>
            </h2>
          </div>

          {/* Toggle Switches */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 bg-[#1A1A1A] border border-[#262626] p-1.5 rounded-lg">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === 'services'
                  ? 'bg-[#00C2A7] text-[#111111] shadow-[0_0_15px_rgba(0,194,167,0.3)]'
                  : 'text-[#AAAAAA] hover:text-white'
              }`}
            >
              01 // CORE PILLARS
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === 'process'
                  ? 'bg-[#E94E77] text-white shadow-[0_0_15px_rgba(233,78,119,0.3)]'
                  : 'text-[#AAAAAA] hover:text-white'
              }`}
            >
              02 // 4-STAGE PROCESS
            </button>
          </div>
        </div>

        {/* Tab 1: Core Service Pillars */}
        {activeTab === 'services' && (
          <div className="services-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="service-card-item group relative bg-[#1A1A1A] border border-[#262626] hover:border-[#00C2A7] p-6 rounded-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl p-3 bg-[#111111] border border-[#262626] rounded-xl group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </span>
                    <span className="text-xs font-mono text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-2.5 py-1 rounded-full font-bold">
                      [{pillar.code}]
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-[#E94E77] uppercase tracking-wider mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-xl font-bold uppercase text-white group-hover:text-[#00C2A7] transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed mb-6 font-sans">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-[#262626]">
                    <span className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider block">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-1">
                      {pillar.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-[#F0F0F0] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#00C2A7]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#262626]">
                  {pillar.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-[#AAAAAA] bg-[#111111] border border-[#262626] px-2 py-0.5 rounded"
                    >
                      #{tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: 4-Stage Workflow Roadmap */}
        {activeTab === 'process' && (
          <div className="process-roadmap-container space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {PROCESS_ROADMAP.map((stage, sIdx) => (
                <div
                  key={sIdx}
                  className="process-step-item bg-[#1A1A1A] border border-[#262626] hover:border-[#00C2A7] p-6 rounded-xl relative transition-all duration-300 flex flex-col justify-between shadow-2xl"
                >
                  <div>
                    {/* Header Step Badge */}
                    <div className="flex justify-between items-center mb-6">
                      <span
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                        style={{
                          color: stage.accentColor,
                          borderColor: `${stage.accentColor}50`,
                          backgroundColor: `${stage.accentColor}15`,
                        }}
                      >
                        STAGE // {stage.step}
                      </span>
                      <span className="text-xs font-mono text-[#888888]">
                        0{sIdx + 1} OF 04
                      </span>
                    </div>

                    <div
                      className="text-[10px] font-mono uppercase tracking-wider mb-1 font-bold"
                      style={{ color: stage.accentColor }}
                    >
                      {stage.phase}
                    </div>
                    <h3 className="text-xl font-bold uppercase text-white mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#AAAAAA] leading-relaxed mb-6 font-sans">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#262626]">
                    <span className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider block mb-2">
                      STAGE MILESTONES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.deliverables.map((item, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[10px] font-mono text-[#F0F0F0] bg-[#111111] border border-[#262626] px-2 py-1 rounded"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Workflow Guarantee Banner */}
            <div className="mt-8 bg-[#1A1A1A] border border-[#262626] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#AAAAAA]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00C2A7] animate-ping" />
                <span>
                  TRANSPARENT CLIENT PORTAL • REAL-TIME REVISION TRACKING • 100% TIMELINE COMPLIANCE
                </span>
              </div>
              <a
                href="#footer"
                className="px-5 py-2 bg-[#00C2A7] text-[#111111] font-bold uppercase rounded-lg hover:bg-[#00C2A7]/90 transition-colors"
              >
                START COLLABORATION →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Servicev2;
