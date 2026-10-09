import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface ProjectItem {
  zPos: number;
  side: "left" | "right";
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
    zPos: -25,
    side: 'left',
    title: '3D MOTION LANGUAGE',
    client: 'Culture Brand',
    year: '2024',
    category: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
    tags: ['Cinema 4D', 'Octane Render', 'After Effects'],
    challenge: 'Craft a high-energy procedural motion design system for a digital campaign.',
    process: 'Leveraged C4D Mograph cloners and spectral shaders to generate fluid typography and visuals.',
    outcome: 'Delivered broadcast video reels and digital assets that increased engagement by 140%.',
    metrics: '+140% Social Engagement',
  },
  {
    id: '2',
    zPos: -50,
    side: 'right',
    title: 'NEO TOKYO ENVIRONMENT',
    client: 'Digital Sound',
    year: '2024',
    category: '3D Design & VFX',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['Blender', 'Houdini', 'DaVinci Resolve'],
    challenge: 'Build a detailed 3D environment with volumetric fog and particle simulations.',
    process: 'Combined Houdini particle dynamics with color grading for photorealistic cinematic depth.',
    outcome: 'Featured in digital art showcases and served as key campaign imagery.',
    metrics: '2.5M Stream Impressions',
  },
  {
    id: '3',
    zPos: -75,
    side: 'left',
    title: 'NEO GRID INTERFACE',
    client: 'Tech Dynamics',
    year: '2023',
    category: 'Interactive UI/UX',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80',
    tags: ['React', 'GSAP', 'WebGL', 'Tailwind'],
    challenge: 'Design an interactive control panel with scroll animations and real-time visualizers.',
    process: 'Engineered custom GSAP ScrollTrigger timelines synced with GPU canvas layers.',
    outcome: 'Reduced page bounce rate by 38% and won UI design award.',
    metrics: '38% Lower Bounce Rate',
  },
  {
    id: '4',
    zPos: -100,
    side: 'right',
    title: 'BRAND DESIGN SYSTEM',
    client: 'Global Corp',
    year: '2023',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    tags: ['Kinetic Typography', 'Brand System', 'Vector'],
    challenge: 'Rebrand an enterprise technology company with a modern motion-first design system.',
    process: 'Created a modular grid token system with animated logo marks and digital guidelines.',
    outcome: 'Successfully launched across international tech expos.',
    metrics: 'Global Brand Rollout',
  },
  {
    id: '5',
    zPos: -125,
    side: 'left',
    title: 'PHYSICS SIMULATIONS',
    client: 'Audio Labs',
    year: '2024',
    category: 'Procedural 3D',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    tags: ['Houdini', 'Redshift', 'Unreal Engine'],
    challenge: 'Simulate fluid dynamics and acoustic wave refraction for a product launch.',
    process: 'Utilized Houdini FLIP solvers rendered in Redshift with real-time UE5 previews.',
    outcome: 'Used as primary retail display asset across flagship stores.',
    metrics: '100+ Retail Outlets',
  },
  {
    id: '6',
    zPos: -150,
    side: 'right',
    title: 'COMMERCIAL BROADCAST ID',
    client: 'Media Group',
    year: '2024',
    category: 'Commercial VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    tags: ['After Effects', 'Compositing', 'Color Grading'],
    challenge: 'Deliver 4K commercial stingers and graphic overlays for a documentary series.',
    process: 'Built parametric motion templates in After Effects integrated with deep compositing.',
    outcome: 'Broadcast to over 4 million viewers on primetime streaming platforms.',
    metrics: '4M+ Viewers',
  },
];


export const Illustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [atVideoEnd, setAtVideoEnd] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const cameraZRef = useRef<number>(10);
  const targetZRef = useRef<number>(10);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0A0A");
    scene.fog = new THREE.FogExp2("#0A0A0A", 0.015);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    const tunnelGroup = new THREE.Group();
    const ringCount = 35;
    const tunnelLength = 200;
    for (let i = 0; i < ringCount; i++) {
      const z = -(i * (tunnelLength / ringCount));
      const ringGeo = new THREE.TorusGeometry(6, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? "#00C2A7" : "#E94E77",
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = z;
      tunnelGroup.add(ringMesh);
    }
    scene.add(tunnelGroup);
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = -Math.random() * 200;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: "#00C2A7",
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    const textureLoader = new THREE.TextureLoader();
    PORTFOLIO_SHOWCASE_PROJECTS.forEach((proj) => {
      const cardGeo = new THREE.PlaneGeometry(5.2, 3.2);
      const cardMat = new THREE.MeshBasicMaterial({
        color: "#222222",
        side: THREE.DoubleSide,
      });
      textureLoader.load(
        proj.image,
        (texture) => {
          cardMat.map = texture;
          cardMat.color.set("#FFFFFF");
          cardMat.needsUpdate = true;
        },
        undefined,
        () => {
          cardMat.color.set("#00C2A7");
        }
      );
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      const xOffset = proj.side === "left" ? -4.2 : 4.2;
      cardMesh.position.set(xOffset, 0, proj.zPos);
      cardMesh.rotation.y = proj.side === "left" ? 0.25 : -0.25;
      const edgesGeo = new THREE.EdgesGeometry(cardGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: proj.side === "left" ? "#00C2A7" : "#E94E77",
      });
      const wireframeBorder = new THREE.LineSegments(edgesGeo, edgesMat);
      cardMesh.add(wireframeBorder);
      scene.add(cardMesh);
    });
    const portalGeo = new THREE.PlaneGeometry(12, 6.75);
    const portalMat = new THREE.MeshBasicMaterial({
      color: "#000000",
      side: THREE.DoubleSide,
    });
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    portalMesh.position.set(0, 0, -180);
    const portalEdges = new THREE.EdgesGeometry(portalGeo);
    const portalEdgesMat = new THREE.LineBasicMaterial({
      color: "#00C2A7",
    });
    const portalBorder = new THREE.LineSegments(portalEdges, portalEdgesMat);
    portalMesh.add(portalBorder);
    scene.add(portalMesh);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cameraZRef.current += (targetZRef.current - cameraZRef.current) * 0.08;
      camera.position.z = cameraZRef.current;
      tunnelGroup.children.forEach((ring, idx) => {
        ring.rotation.z += (idx % 2 === 0 ? 0.002 : -0.002);
      });
      particleSystem.rotation.z += 0.0005;
      renderer.render(scene, camera);
    };
    animate();
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      const trigger = ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: "top top",
        end: "+=600%",
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const minZ = 10;
          const maxZ = -175;
          const currentCamZ = minZ + progress * (maxZ - minZ);
          targetZRef.current = currentCamZ;
          let closestIdx = 0;
          let minDistance = 999;
          PORTFOLIO_SHOWCASE_PROJECTS.forEach((proj, idx) => {
            const dist = Math.abs(currentCamZ - proj.zPos);
            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });
          setActiveNodeIndex(closestIdx);
          const atEnd = currentCamZ <= -160;
          setAtVideoEnd(atEnd);
          if (atEnd && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        },
      });
      scrollTriggerRef.current = trigger;
    },
    { scope: containerRef }
  );
  const jumpToNode = (index: number) => {
    setActiveNodeIndex(index);
    const proj = PORTFOLIO_SHOWCASE_PROJECTS[index];
    if (!proj) return;
    const minZ = 10;
    const maxZ = -175;
    const targetProgress = (proj.zPos - minZ) / (maxZ - minZ);
    if (scrollTriggerRef.current) {
      const start = scrollTriggerRef.current.start;
      const end = scrollTriggerRef.current.end;
      const targetScroll = start + targetProgress * (end - start);
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
  };
  const jumpToVideoEnd = () => {
    if (scrollTriggerRef.current) {
      gsap.to(window, {
        scrollTo: scrollTriggerRef.current.end,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  };
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const currentProject = PORTFOLIO_SHOWCASE_PROJECTS[activeNodeIndex];

  return (
    <section
      id="illustration"
      ref={containerRef}
      className="relative h-screen w-full bg-[#0A0A0A] text-white overflow-hidden flex flex-col justify-between border-t border-[#262626]"
    >
      <a
        href="/"
        className="absolute right-6 top-6 z-30 rounded-lg border border-[#00C2A7]/40 bg-black/80 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00C2A7] transition-colors hover:bg-[#00C2A7] hover:text-[#111111]"
      >
        ← HOME
      </a>
      <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="pt-6 px-6 md:px-12 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-20 pointer-events-auto">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00C2A7] animate-pulse" />
            <span className="text-xs font-mono text-[#00C2A7] uppercase tracking-widest px-3 py-1 bg-black/60 backdrop-blur-md border border-[#00C2A7]/30 rounded-full">
              04 // Z-AXIS TUNNEL FLY-THROUGH
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#F0F0F0]">
            3D VOID FLY-THROUGH &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2A7] to-[#E94E77]">
              END REEL PORTAL
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-black/80 backdrop-blur-md border border-[#262626] rounded-xl overflow-x-auto max-w-full">
          {PORTFOLIO_SHOWCASE_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => jumpToNode(idx)}
              className={
                idx === activeNodeIndex && !atVideoEnd
                  ? "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all bg-[#00C2A7] text-[#111111] shadow-[0_0_12px_rgba(0,194,167,0.3)] cursor-pointer"
                  : "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all text-[#AAAAAA] hover:text-white hover:bg-[#262626] cursor-pointer"
              }
            >
              0{idx + 1} [{proj.side === "left" ? "L" : "R"}]
            </button>
          ))}
          <button
            onClick={jumpToVideoEnd}
            className={
              atVideoEnd
                ? "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all bg-[#E94E77] text-white shadow-[0_0_12px_rgba(233,78,119,0.4)] cursor-pointer flex items-center gap-1"
                : "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all text-[#E94E77] border border-[#E94E77]/40 hover:bg-[#E94E77]/20 cursor-pointer flex items-center gap-1"
            }
          >
            <span>🎬</span>
            <span>SHOWREEL PORTAL</span>
          </button>
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 my-auto z-20 pointer-events-auto">
        {!atVideoEnd ? (
          <div
            className={`max-w-md w-full bg-black/80 backdrop-blur-xl border border-[#262626] rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 ${
              currentProject.side === "left" ? "mr-auto" : "ml-auto"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#111111] bg-[#00C2A7] px-2.5 py-1 rounded">
                  0{activeNodeIndex + 1} // 0{PORTFOLIO_SHOWCASE_PROJECTS.length}
                </span>
                <span className="text-xs font-mono text-[#AAAAAA] bg-[#111111] border border-[#262626] px-3 py-1 rounded">
                  {currentProject.client}
                </span>
              </div>
              <span className="text-xs font-mono text-[#E94E77] bg-[#E94E77]/10 border border-[#E94E77]/30 px-3 py-1 rounded-full uppercase">
                {currentProject.year}
              </span>
            </div>
            <div className="text-xs font-mono text-[#00C2A7] uppercase tracking-wider mb-1">
              {currentProject.category}
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-[#F0F0F0] mb-3">
              {currentProject.title}
            </h3>
            <p className="text-xs text-[#AAAAAA] leading-relaxed mb-4">
              {currentProject.challenge}
            </p>
            {currentProject.metrics && (
              <div className="inline-block text-xs font-mono font-bold text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-3 py-1.5 rounded-lg mb-4">
                {currentProject.metrics}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#262626]">
              <div className="flex flex-wrap gap-1.5">
                {currentProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-[#AAAAAA] bg-[#111111] border border-[#262626] px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(currentProject)}
                className="text-xs font-mono font-bold text-[#111111] bg-[#00C2A7] hover:bg-[#00C2A7]/90 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-[0_0_12px_rgba(0,194,167,0.3)]"
              >
                VIEW CASE STUDY →
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl w-full mx-auto bg-black/90 backdrop-blur-2xl border-2 border-[#00C2A7] rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,194,167,0.25)] text-center transition-all">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-mono font-bold text-[#E94E77] border border-[#E94E77]/40 bg-[#E94E77]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#E94E77] animate-ping" />
              <span>END OF TUNNEL REACHED // 2024 SHOWREEL ACTIVE</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold uppercase text-white mb-6">
              CINEMATIC MOTION & VFX SHOWREEL
            </h3>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#262626] bg-black mb-6 shadow-2xl group">
              <video
                ref={videoRef}
                src="/assets/showreel.mp4"
                poster="/assets/showreel-poster.jpg"
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  onClick={togglePlay}
                  className="px-6 py-3 bg-[#00C2A7] hover:bg-[#00C2A7]/90 text-[#111111] font-mono font-bold text-xs uppercase rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                >
                  {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                </button>
                <button
                  onClick={toggleMute}
                  className="px-6 py-3 bg-[#1A1A1A] border border-[#262626] hover:border-[#E94E77] text-white font-mono font-bold text-xs uppercase rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                >
                  {isMuted ? "🔊 UNMUTE" : "🔇 MUTE"}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center text-xs font-mono text-[#AAAAAA]">
              <span>[ 4K BROADCAST QUALITY // STEREO AUDIO ]</span>
              <span className="text-[#00C2A7]">LUGENE MOTION REEL REEL</span>
            </div>
          </div>
        )}
      </div>
      <div className="pb-6 px-6 md:px-12 max-w-7xl w-full mx-auto flex justify-between items-center text-xs font-mono text-[#AAAAAA] z-20 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00C2A7] animate-pulse" />
          <span>SCROLL DOWN TO FLY DOWN THE TUNNEL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#00C2A7] font-bold">
            {!atVideoEnd
              ? `NODE 0${activeNodeIndex + 1} OF 0${PORTFOLIO_SHOWCASE_PROJECTS.length}`
              : "SHOWREEL PORTAL"}
          </span>
          <div className="w-24 h-1.5 bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00C2A7] transition-all duration-300"
              style={{
                width: !atVideoEnd
                  ? `${((activeNodeIndex + 1) / PORTFOLIO_SHOWCASE_PROJECTS.length) * 100}%`
                  : "100%",
              }}
            />
          </div>
        </div>
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity pointer-events-auto">
          <div className="w-full max-w-2xl bg-[#161616] border-l border-[#262626] h-full p-6 md:p-10 overflow-y-auto flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-[#00C2A7] border border-[#00C2A7]/30 bg-[#00C2A7]/10 px-3 py-1 rounded-full uppercase">
                  CASE STUDY // {selectedProject.category}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-[#AAAAAA] hover:text-white bg-[#1A1A1A] border border-[#262626] rounded-full transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase text-[#F0F0F0] mb-2">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#AAAAAA] mb-6 pb-6 border-b border-[#262626]">
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
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#262626] mb-8">
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
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#00C2A7] tracking-wider mb-2">
                    02 // CREATIVE PROCESS & TECH
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
                    {selectedProject.process}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-yellow-400 tracking-wider mb-2">
                    03 // OUTCOME & IMPACT
                  </h4>
                  <p className="text-sm text-[#F0F0F0] leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-[#262626]">
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
                      className="text-xs font-mono text-[#00C2A7] bg-[#00C2A7]/10 border border-[#00C2A7]/30 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Illustration;
