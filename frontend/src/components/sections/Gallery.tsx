import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { generateColumn, type GalleryItem } from "../../data/galleryData";
gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {

  const [isAutoMode, setIsAutoMode] = useState<boolean>(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  const tweensMap = useRef<{ [key: number]: gsap.core.Tween }>({});
  const activeTimeline = useRef<{ kill: () => void } | null>(null);

  const masterCollection = useRef<GalleryItem[]>([
    ...generateColumn("c1"), ...generateColumn("c2"), ...generateColumn("c3"), ...generateColumn("c4")
  ]);

  useEffect(() => {
    document.documentElement.classList.add("scrollbar-none");
    return () => document.documentElement.classList.remove("scrollbar-none");
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !col1Ref.current || !col2Ref.current || !col3Ref.current || !col4Ref.current) return;

    Object.values(tweensMap.current).forEach(tween => tween.kill());
    tweensMap.current = {};
    if (activeTimeline.current) {
      activeTimeline.current.kill();
      activeTimeline.current = null;
    }
    
    const allRefs = [col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current];
    allRefs.forEach(ref => gsap.set(ref, { clearProps: "all" }));

    if (isAutoMode) {
      const initAutoLoop = (columnEl: HTMLDivElement, direction: "up" | "down", speed: number, index: number) => {
        const firstCopy = columnEl.firstElementChild;
        if (!(firstCopy instanceof HTMLElement)) return;

        const loopDistance = firstCopy.getBoundingClientRect().height;
        if (loopDistance <= 0) return;

        const fromY = direction === "up" ? 0 : -loopDistance;
        const toY = direction === "up" ? -loopDistance : 0;
        gsap.set(columnEl, { y: fromY });
        tweensMap.current[index] = gsap.to(columnEl, {
          y: toY,
          duration: speed,
          ease: "none",
          repeat: -1,
        });
      };

      initAutoLoop(col1Ref.current, "up", 24, 0);
      initAutoLoop(col2Ref.current, "down", 28, 1);
      initAutoLoop(col3Ref.current, "up", 22, 2);
      initAutoLoop(col4Ref.current, "down", 26, 3);

    } else {
      const getLoopDistance = (columnEl: HTMLDivElement) => {
        const firstCopy = columnEl.firstElementChild;
        return firstCopy instanceof HTMLElement ? firstCopy.getBoundingClientRect().height : 0;
      };
      const loopDistances = allRefs.map(getLoopDistance);
      const cyclesPerRunway = 1000;
      let runwayCycles = cyclesPerRunway;
      let isExtendingRunway = false;

      activeTimeline.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * runwayCycles}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const scrollDistance = Math.max(0, self.scroll() - self.start);
          const cycleProgress = (scrollDistance / window.innerHeight) % 1;
          allRefs.forEach((columnEl, index) => {
            const progress = index % 2 === 0 ? cycleProgress : 1 - cycleProgress;
            gsap.set(columnEl, { y: -loopDistances[index] * progress });
          });

          if (!isExtendingRunway && self.progress >= 0.9) {
            isExtendingRunway = true;
            runwayCycles += cyclesPerRunway;
            ScrollTrigger.refresh();
            isExtendingRunway = false;
          }
        },
      });

      ScrollTrigger.refresh();
    }
  }, { scope: containerRef, dependencies: [isAutoMode], revertOnUpdate: true });

  const handleMouseEnter = (idx: number) => {
    if (!isAutoMode || !tweensMap.current[idx]) return;
    gsap.to(tweensMap.current[idx], { timeScale: 0.15, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = (idx: number) => {
    if (!isAutoMode || !tweensMap.current[idx]) return;
    gsap.to(tweensMap.current[idx], { timeScale: 1.0, duration: 0.5, ease: "power2.out" });
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = masterCollection.current.findIndex(item => item.id === activeLightboxItem.id.replace("-dup", ""));
    const prevIndex = (currentIndex - 1 + masterCollection.current.length) % masterCollection.current.length;
    setActiveLightboxItem(masterCollection.current[prevIndex]);
  };

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = masterCollection.current.findIndex(item => item.id === activeLightboxItem.id.replace("-dup", ""));
    const nextIndex = (currentIndex + 1) % masterCollection.current.length;
    setActiveLightboxItem(masterCollection.current[nextIndex]);
  };

  useEffect(() => {
    if (!activeLightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightboxItem(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxItem]);

  const columns = [
    { ref: col1Ref, items: [...generateColumn("c1"), ...generateColumn("c1-dup")], hideOnMobile: false },
    { ref: col2Ref, items: [...generateColumn("c2"), ...generateColumn("c2-dup")], hideOnMobile: true },
    { ref: col3Ref, items: [...generateColumn("c3"), ...generateColumn("c3-dup")], hideOnMobile: true },
    { ref: col4Ref, items: [...generateColumn("c4"), ...generateColumn("c4-dup")], hideOnMobile: true },
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen antialiased select-none font-sans overflow-x-hidden relative">
    
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 shadow-xl flex items-center gap-2">
       <button onClick={() => window.location.assign("/")} className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer`}>
               Home
        </button>
        <button onClick={() => setIsAutoMode(true)} className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase cursor-pointer font-mono transition-all duration-300 ${isAutoMode ? "bg-neutral-100 text-neutral-950 font-bold" : "text-neutral-400"}`}>
          Auto Loop
        </button>
        <button onClick={() => setIsAutoMode(false)} className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase cursor-pointer font-mono transition-all duration-300 ${!isAutoMode ? "bg-neutral-100 text-neutral-950 font-bold" : "text-neutral-400"}`}
        >
          Manual Scroll
        </button>
      </div>

      <section ref={containerRef} className="h-screen w-full overflow-hidden relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12 py-6 bg-neutral-950">
        {columns.map((column, idx) => (
          <div key={idx} onMouseEnter={() => handleMouseEnter(idx)} onMouseLeave={() => handleMouseLeave(idx)} className={`h-full overflow-hidden relative ${column.hideOnMobile ? "hidden md:block" : "block"}`}>
            <div ref={column.ref} className="flex flex-col will-change-transform">
              {[column.items.slice(0, 4), column.items.slice(4)].map((copy, copyIdx) => (
                <div key={copyIdx} className="flex flex-col gap-6 pb-6">
                  {copy.map((item, itemIdx) => (
                    <div key={`${item.id}-${copyIdx}-${itemIdx}`} onClick={() => setActiveLightboxItem(item)} className="relative group overflow-hidden rounded-xl bg-neutral-900 aspect-[3/4] w-full shrink-0 border border-neutral-900 cursor-zoom-in">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase mb-1">{item.category}</span>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

       {activeLightboxItem && (
        <div className="fixed inset-0 bg-neutral-950/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8">
          <button onClick={handlePrev} className="absolute left-6 text-neutral-400 hover:text-neutral-100 bg-neutral-900/60 p-3 rounded-full border border-neutral-800 hidden md:block">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="absolute right-6 text-neutral-400 hover:text-neutral-100 bg-neutral-900/60 p-3 rounded-full border border-neutral-800 hidden md:block">
            <ChevronRight size={24} />
          </button>
          <button onClick={() => setActiveLightboxItem(null)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-100 bg-neutral-900 p-2.5 rounded-full border border-neutral-800">
            <X size={20} />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800/60 shadow-2xl">
            <div className="w-full md:w-1/2 aspect-[3/4] max-h-[70vh] rounded-xl overflow-hidden bg-neutral-950">
              <img src={activeLightboxItem.url} alt={activeLightboxItem.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2">{activeLightboxItem.category}</span>
              <h2 className="text-3xl font-light uppercase tracking-tight mb-4">{activeLightboxItem.title}</h2>
              <p className="text-neutral-400 font-light text-sm leading-relaxed border-t border-neutral-800/80 pt-4">
                Use your keyboard's <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-200">←</kbd> and <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-200">→</kbd> arrows to navigate, or <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-200">Esc</kbd> to exit.
              </p>
            </div>
          </div>
        </div>
      )}

 
    </div>
  );
};

export default Gallery;