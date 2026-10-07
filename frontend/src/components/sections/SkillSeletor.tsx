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
  // Skill 02 is "Motion Graphics" (index 1) default
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS_DATA[1]);
  const [activeIdx, setActiveIdx] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const expBarRef = useRef<HTMLDivElement>(null);
  const strBarRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. ScrollTrigger Sequence: Pins section and cycles through skills as user scrolls
  useGSAP(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.5,
      snap: 1 / (SKILLS_DATA.length - 1),
      onUpdate: (self) => {
        const rawIndex = Math.round(self.progress * (SKILLS_DATA.length - 1));
        const clampedIndex = Math.min(Math.max(rawIndex, 0), SKILLS_DATA.length - 1);

        setActiveIdx((prevIdx) => {
          if (prevIdx !== clampedIndex) {
            setActiveSkill(SKILLS_DATA[clampedIndex]);
            return clampedIndex;
          }
          return prevIdx;
        });
      },
    });

    return () => {
      st.kill();
    };
  }, { scope: containerRef });

  // 2. Animate Center Showcase Card & Progress Bars whenever activeSkill changes (via scroll or hover)
  useGSAP(() => {
    // Center Preview Image Transition
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.3, scale: 1.08, filter: 'blur(6px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
      );
    }

    // EXP Bar animation
    if (expBarRef.current) {
      gsap.fromTo(
        expBarRef.current,
        { width: '0%' },
        { width: `${activeSkill.exp}%`, duration: 0.55, ease: 'power3.out' }
      );
    }

    // STR Bar animation
    if (strBarRef.current) {
      gsap.fromTo(
        strBarRef.current,
        { width: '0%' },
        { width: `${activeSkill.str}%`, duration: 0.55, ease: 'power3.out', delay: 0.05 }
      );
    }

    // Card subtle pulse
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
      className="py-20 px-4 md:px-8 bg-[#111111] text-white min-h-screen flex flex-col justify-center items-center font-sans relative overflow-hidden"
    >

      <div data-scroll-content className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header Title with Scroll Tracker */}
        <div className="mb-10 flex justify-center border-b border-neutral-800 pb-6 text-center">
          <div className="w-full">
          
            <h2 className="mt-3 text-center font-header text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
             <span className="text-[#52C3C1]"> SELECT YOUR POWER UP . . . . </span>
            </h2>
          </div>

          {/* Progress Tracker Pill */}
          {/* <div className="flex items-center space-x-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full self-start md:self-auto">
            <span className="text-xs font-mono text-neutral-400">SKILL</span>
            <span className="text-sm font-mono font-bold text-[#52C3C1]">
              {activeSkill.number} / 08
            </span>
            <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#52C3C1] transition-all duration-300"
                style={{ width: `${((activeIdx + 1) / SKILLS_DATA.length) * 100}%` }}
              />
            </div>
          </div> */}
        </div>

        {/* Main Grid Layout: Center Showcase + Surrounding Skill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cards 01 - 04 */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-4">
            {SKILLS_DATA.slice(0, 4).map((skill, index) => {
              const isActive = activeSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => {
                    setActiveSkill(skill);
                    setActiveIdx(index);
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-start justify-between gap-2 group ${
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
                </div>
              );
            })}
          </div>

          {/* Center Column: Dynamic Showcase Card (Active Skill) */}
          <div ref={cardRef} className="lg:col-span-4 bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Banner Preview Image */}
            <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-6 border border-neutral-800 bg-neutral-900">
              <img
                ref={imageRef}
                src={activeSkill.image}
                alt={activeSkill.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
              
              {/* Overlay Badge & Number */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="text-xs font-mono px-3 py-1 bg-black/80 backdrop-blur-md border border-[#52C3C1]/50 text-[#52C3C1] font-bold rounded-md">
                  #{activeSkill.number}
                </span>
                <span className="text-xs font-mono px-3 py-1 bg-[#E94E77]/20 border border-[#E94E77]/50 text-[#E94E77] font-bold rounded-md uppercase">
                  {activeSkill.badge}
                </span>
              </div>
            </div>

            {/* Active Skill Title & Description */}
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

            {/* EXP & STR Stats Bars */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              {/* EXP Bar */}
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

              {/* STR Bar */}
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
          <div className="grid grid-cols-2 gap-3 lg:col-span-4">
            {SKILLS_DATA.slice(4, 8).map((skill, index) => {
              const actualIndex = index + 4;
              const isActive = activeSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => {
                    setActiveSkill(skill);
                    setActiveIdx(actualIndex);
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-start justify-between gap-2 group ${
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
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Helper */}
        <div className="mt-8 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center justify-center space-x-2">
          <span>SCROLL TO CYCLE SKILLS • HOVER TO INSPECT MANUALLY</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#52C3C1] animate-ping" />
        </div>
      </div>
    </section>
  );
};

export default SkillSelector;
