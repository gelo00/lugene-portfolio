import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Interface for gallery mock data
interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

// Live, validated high-res production images from Unsplash
const col1Images: GalleryItem[] = [
  { id: "c1-1", url: "https://unsplash.com", title: "Elena", category: "Portrait" },
  { id: "c1-2", url: "https://unsplash.com", title: "Marcus", category: "Studio" },
  { id: "c1-3", url: "https://unsplash.com", title: "Sonia", category: "Fashion" },
  { id: "c1-4", url: "https://unsplash.com", title: "Chloe", category: "Editorial" },
];

const col2Images: GalleryItem[] = [
  { id: "c2-1", url: "https://unsplash.com", title: "Glass Horizon", category: "Urban" },
  { id: "c2-2", url: "https://unsplash.com", title: "Neon Pulse", category: "City" },
  { id: "c2-3", url: "https://unsplash.com", title: "Monolith", category: "Architecture" },
  { id: "c2-4", url: "https://unsplash.com", title: "Brutal Lines", category: "Design" },
];

const col3Images: GalleryItem[] = [
  { id: "c3-1", url: "https://unsplash.com", title: "Vast Horizons", category: "Nature" },
  { id: "c3-2", url: "https://unsplash.com", title: "Canopy Paths", category: "Landscape" },
  { id: "c3-3", url: "https://unsplash.com", title: "Alpine Glow", category: "Wild" },
  { id: "c3-4", url: "https://unsplash.com", title: "Mountain Peak", category: "Adventure" },
];

const col4Images: GalleryItem[] = [
  { id: "c4-1", url: "https://unsplash.com", title: "Avant-Garde", category: "Fashion" },
  { id: "c4-2", url: "https://unsplash.com", title: "Woven Textures", category: "Apparel" },
  { id: "c4-3", url: "https://unsplash.com", title: "Noir Portrait", category: "Studio" },
  { id: "c4-4", url: "https://unsplash.com", title: "Vogue Silhouette", category: "Editorial" },
];

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !col1Ref.current || !col2Ref.current || !col3Ref.current || !col4Ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", 
        pin: true,
        scrub: 1, 
        invalidateOnRefresh: true,
      },
    });

    // Column 1 Track: Scrolls UP
    tl.to(col1Ref.current, {
      y: () => -(col1Ref.current!.scrollHeight - window.innerHeight),
      ease: "none",
    }, 0);

    // Column 2 Track: Scrolls DOWN
    tl.fromTo(col2Ref.current, 
      { y: () => -(col2Ref.current!.scrollHeight - window.innerHeight) },
      { y: 0, ease: "none" }, 
      0
    );

    // Column 3 Track: Scrolls UP
    tl.to(col3Ref.current, {
      y: () => -(col3Ref.current!.scrollHeight - window.innerHeight),
      ease: "none",
    }, 0);

    // Column 4 Track: Scrolls DOWN
    tl.fromTo(col4Ref.current, 
      { y: () => -(col4Ref.current!.scrollHeight - window.innerHeight) },
      { y: 0, ease: "none" }, 
      0
    );

  }, { scope: containerRef });

  const columns = [
    { ref: col1Ref, items: col1Images, hideOnMobile: false },
    { ref: col2Ref, items: col2Images, hideOnMobile: true },
    { ref: col3Ref, items: col3Images, hideOnMobile: true },
    { ref: col4Ref, items: col4Images, hideOnMobile: true },
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen antialiased select-none font-sans overflow-x-hidden">
      <section 
        ref={containerRef} 
        className="h-screen w-full overflow-hidden relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12 py-6 bg-neutral-900"
      >
        {columns.map((column, idx) => (
          <div 
            key={idx} 
            ref={column.ref} 
            className={`flex flex-col gap-6 will-change-transform ${column.hideOnMobile ? "hidden md:flex" : "flex"}`}
          >
            {column.items.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-xl bg-neutral-800 aspect-[3/4] w-full">
                <img 
                  src={item.url} 
                  alt={item.title}
                  loading="eager"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase mb-1">{item.category}</span>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Gallery;
