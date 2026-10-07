import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export interface Skill {
  id: string;
  number: string;
  title: string;
  exp: number;
  str: number;
  badge: string;
  image: string;
  description?: string;
}

const SKILLS_DATA: Skill[] = [
  {
    id: '01',
    number: '01',
    title: '3D Modeling & Motion',
    exp: 92,
    str: 95,
    badge: 'EXPERT',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
    description: 'High-octane keyframe animation, procedural simulation, and photorealistic rendering.',
  },
  {
    id: '02',
    number: '02',
    title: 'Motion Graphics',
    exp: 98,
    str: 99,
    badge: 'SPECIALIST',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&q=80',
    description: 'Kinetic typography, fluid brand transitions, and vector animation suites.',
  },
  {
    id: '03',
    number: '03',
    title: 'VFX & Compositing',
    exp: 88,
    str: 92,
    badge: 'SENIOR',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80',
    description: 'Particle systems, chroma keying, element integration, and HUD cyberpunk visuals.',
  },
  {
    id: '04',
    number: '04',
    title: 'UI/UX Design',
    exp: 90,
    str: 88,
    badge: 'ADVANCED',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&q=80',
    description: 'Futuristic design systems, micro-interactions, and high-converting frontend interfaces.',
  },
  {
    id: '05',
    number: '05',
    title: 'Brand Identity',
    exp: 86,
    str: 85,
    badge: 'CREATIVE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    description: 'Cyberpunk branding, neon emblem design, and comprehensive style guidelines.',
  },
  {
    id: '06',
    number: '06',
    title: 'Creative Frontend',
    exp: 92,
    str: 94,
    badge: 'CYBER',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&q=80',
    description: 'Hardware-accelerated web experiences, interactive Canvas, and responsive layouts.',
  },
  {
    id: '07',
    number: '07',
    title: 'Digital Sculpting',
    exp: 89,
    str: 94,
    badge: 'ARTIST',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80',
    description: 'High-poly character mesh sculpting, PBR texture mapping, and hard-surface modeling.',
  },
  {
    id: '08',
    number: '08',
    title: 'Character Animation',
    exp: 94,
    str: 96,
    badge: 'MASTER',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&q=80',
    description: 'Futuristic character movement rigging, expressive facial capture, and stylized motion.',
  },
];

export const SkillSelector: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS_DATA[1]);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftGridRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const expBarRef = useRef<HTMLDivElement>(null);
  const strBarRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef<number>(1);

  // Option 1 Arcade Pin & Reveal Entrance Transition
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: window.matchMedia('(min-width: 768px)').matches ? '+=250%' : 'bottom top',
          pin: window.matchMedia('(min-width: 768px)').matches,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (window.matchMedia('(min-width: 768px)').matches) {
              const rawIndex = Math.round(self.progress * (SKILLS_DATA.length - 1));
              const clampedIndex = Math.min(Math.max(rawIndex, 0), SKILLS_DATA.length - 1);

              if (activeIndexRef.current !== clampedIndex) {
                activeIndexRef.current = clampedIndex;
                setActiveSkill(SKILLS_DATA[clampedIndex]);
              }
            }
          },
        },
      });

      // 1. Arcade Title Decode / Drop
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
      );

      // 2. Left Cards Stagger In (from Left)
      tl.fromTo(
        leftGridRef.current?.children || [],
        { x: -70, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' },
        '-=0.2'
      );

      // 3. Right Cards Stagger In (from Right)
      tl.fromTo(
        rightGridRef.current?.children || [],
        { x: 70, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' },
        '-=0.7'
      );

      // 4. Center Inspect Card Scale In
      tl.fromTo(
        cardRef.current,
        { scale: 0.82, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  // Animate Center Showcase Content Updates
  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.3, scale: 1.08, filter: 'blur(6px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
      );
    }

    if (expBarRef.current) {
      gsap.fromTo(
        expBarRef.current,
        { width: '0%' },
        { width: `${activeSkill.exp}%`, duration: 0.55, ease: 'power3.out' }
      );
    }

    if (strBarRef.current) {
      gsap.fromTo(
        strBarRef.current,
        { width: '0%' },
        { width: `${activeSkill.str}%`, duration: 0.55, ease: 'power3.out', delay: 0.05 }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 5 },
        { y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [activeSkill]);

  return (
    <section
      id="services"
      ref={containerRef}
      data-scroll-section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111111] px-4 py-12 font-sans text-white sm:py-16 md:px-8 md:py-20"
    >
      <div data-scroll-content className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header Title */}
        <div ref={titleRef} className="mb-10 flex justify-center border-b border-neutral-800 pb-6 text-center">
          <div className="w-full">
            <h2 className="mt-3 text-center font-header text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
              <span className="text-[#52C3C1]"> SELECT YOUR POWER UP . . . . </span>
            </h2>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cards 01 - 04 */}
          <div ref={leftGridRef} className="grid grid-cols-2 gap-3 lg:col-span-4">
            {SKILLS_DATA.slice(0, 4).map((skill) => {
              const isActive = activeSkill.id === skill.id;
              return (
                <button
                  type="button"
                  key={skill.id}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  className={`w-full p-3 text-left sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-start justify-between gap-2 group ${
                    isActive
                      ? 'bg-[#1a1a1a] border-[#52C3C1] shadow-[0_0_20px_rgba(82,195,193,0.25)] translate-x-2'
                      : 'bg-[#141414] border-neutral-800 hover:border-neutral-600 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                    <img
                      src={skill.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex min-w-0 items-center space-x-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#52C3C1]' : 'text-neutral-500'}`}>
                      [{skill.number}]
                    </span>
                    <h3 className={`break-words text-xs font-bold tracking-wide transition-colors sm:text-sm ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                      {skill.title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                    isActive
                      ? 'bg-[#52C3C1]/20 border-[#52C3C1] text-[#52C3C1]'
                      : 'bg-neutral-900 border-neutral-800 text-zinc-500'
                  }`}>
                    {skill.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center Column: Dynamic Showcase Card */}
          <div ref={cardRef} className="lg:col-span-4 bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-6 border border-neutral-800 bg-neutral-900">
              <img
                ref={imageRef}
                src={activeSkill.image}
                alt={activeSkill.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="text-xs font-mono px-3 py-1 bg-black/80 backdrop-blur-md border border-[#52C3C1]/50 text-[#52C3C1] font-bold rounded-md">
                  #{activeSkill.number}
                </span>
                <span className="text-xs font-mono px-3 py-1 bg-[#E94E77]/20 border border-[#E94E77]/50 text-[#E94E77] font-bold rounded-md uppercase">
                  {activeSkill.badge}
                </span>
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SELECTED ABILITY</span>
                <div className="px-3 py-1 bg-[#52C3C1]/10 border border-[#52C3C1]/30 rounded-full">
                  <span className="text-xs font-mono text-[#52C3C1] font-bold uppercase tracking-wider">
                    ACTIVE
                  </span>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
                {activeSkill.title}
              </h3>
              {activeSkill.description && (
                <p className="text-neutral-400 text-xs md:text-sm mt-2 leading-relaxed font-light">
                  {activeSkill.description}
                </p>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">EXP (EXPERIENCE)</span>
                  <span className="text-[#52C3C1] font-bold">{activeSkill.exp}%</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-0.5">
                  <div
                    ref={expBarRef}
                    className="h-full bg-gradient-to-r from-[#52C3C1] to-[#3ec1b0] rounded-full"
                    style={{ width: `${activeSkill.exp}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs font-mono">
                  <span className="text-zinc-400 uppercase tracking-wider">STR (MASTERY & POWER)</span>
                  <span className="text-[#E94E77] font-bold">{activeSkill.str}%</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-0.5">
                  <div
                    ref={strBarRef}
                    className="h-full bg-gradient-to-r from-[#E94E77] to-[#FFC007] rounded-full"
                    style={{ width: `${activeSkill.str}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards 05 - 08 */}
          <div ref={rightGridRef} className="grid grid-cols-2 gap-3 lg:col-span-4">
            {SKILLS_DATA.slice(4, 8).map((skill) => {
              const isActive = activeSkill.id === skill.id;
              return (
                <button
                  type="button"
                  key={skill.id}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  className={`w-full p-3 text-left sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-start justify-between gap-2 group ${
                    isActive
                      ? 'bg-[#1a1a1a] border-[#52C3C1] shadow-[0_0_20px_rgba(82,195,193,0.25)] -translate-x-2'
                      : 'bg-[#141414] border-neutral-800 hover:border-neutral-600 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                    <img
                      src={skill.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex min-w-0 items-center space-x-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#52C3C1]' : 'text-neutral-500'}`}>
                      [{skill.number}]
                    </span>
                    <h3 className={`break-words text-xs font-bold tracking-wide transition-colors sm:text-sm ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                      {skill.title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                    isActive
                      ? 'bg-[#52C3C1]/20 border-[#52C3C1] text-[#52C3C1]'
                      : 'bg-neutral-900 border-neutral-800 text-zinc-500'
                  }`}>
                    {skill.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper */}
        <div className="mt-8 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center justify-center space-x-2">
          <span>SCROLL TO CYCLE ON DESKTOP • TAP OR HOVER TO INSPECT</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#52C3C1] animate-ping" />
        </div>
      </div>
    </section>
  );
};

export default SkillSelector;