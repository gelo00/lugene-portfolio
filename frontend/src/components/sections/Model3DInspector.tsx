import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Model3DInspectorProps {
  category: string;
  title: string;
}

export const Model3DInspector: React.FC<Model3DInspectorProps> = ({ category, title }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<'cyberpunk' | 'monochrome'>('cyberpunk');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const light1Ref = useRef<THREE.PointLight | null>(null);
  const light2Ref = useRef<THREE.PointLight | null>(null);

  // Update wireframe state dynamically
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = wireframe;
      materialRef.current.needsUpdate = true;
    }
  }, [wireframe]);

  // Update lighting mode dynamically
  useEffect(() => {
    if (light1Ref.current && light2Ref.current) {
      if (lightingMode === 'cyberpunk') {
        light1Ref.current.color.set('#00C2A7');
        light1Ref.current.intensity = 2.0;
        light2Ref.current.color.set('#E94E77');
        light2Ref.current.intensity = 1.8;
      } else {
        light1Ref.current.color.set('#FFFFFF');
        light1Ref.current.intensity = 1.5;
        light2Ref.current.color.set('#888888');
        light2Ref.current.intensity = 1.0;
      }
    }
  }, [lightingMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera Setup with expanded viewport padding
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0D0D0D');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.2); // Positioned further back to prevent clipping

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();
    let geometry: THREE.BufferGeometry;

    // 3. Perfectly Scaled 3D Geometries (prevents clipping edges)
    if (category.includes('Motion') || category.includes('C4D')) {
      geometry = new THREE.IcosahedronGeometry(1.2, 2);
    } else if (category.includes('VFX') || category.includes('3D')) {
      geometry = new THREE.TorusKnotGeometry(0.8, 0.22, 128, 32);
    } else if (category.includes('Brand') || category.includes('Identity')) {
      geometry = new THREE.OctahedronGeometry(1.2, 1);
    } else if (category.includes('Interactive') || category.includes('UI')) {
      geometry = new THREE.BoxGeometry(1.35, 1.35, 1.35, 3, 3, 3);
    } else {
      geometry = new THREE.DodecahedronGeometry(1.2, 1);
    }

    const material = new THREE.MeshStandardMaterial({
      color: '#111111',
      emissive: '#00C2A7',
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: wireframe,
    });
    materialRef.current = material;

    const mainMesh = new THREE.Mesh(geometry, material);
    group.add(mainMesh);

    // Inner glowing core
    const innerGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: '#E94E77',
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    scene.add(group);
    meshRef.current = group;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight('#00C2A7', 2, 12);
    light1.position.set(4, 4, 4);
    scene.add(light1);
    light1Ref.current = light1;

    const light2 = new THREE.PointLight('#E94E77', 1.8, 12);
    light2.position.set(-4, -4, -4);
    scene.add(light2);
    light2Ref.current = light2;

    // 5. Drag to Rotate Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshRef.current) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      meshRef.current.rotation.y += deltaX * 0.008;
      meshRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 6. Animation Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (meshRef.current && autoRotate && !isDragging) {
        meshRef.current.rotation.y += 0.007;
        meshRef.current.rotation.x += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. ResizeObserver guarantees full canvas fill on resize/drawer open
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0 && rendererRef.current) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, [category]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] bg-[#0D0D0D] border border-[#262626] rounded-xl overflow-hidden group shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Status Header */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#00C2A7]/30">
          <span className="w-2 h-2 rounded-full bg-[#00C2A7] animate-pulse" />
          <span className="text-[10px] font-mono text-[#00C2A7] tracking-wider uppercase font-bold">
            3D INSPECTOR // {title}
          </span>
        </div>

        <span className="text-[10px] font-mono text-[#AAAAAA] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#262626]">
          DRAG TO ROTATE 360°
        </span>
      </div>

      {/* Bottom Control Overlay Toolbar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-between items-center gap-2 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all bg-[#00C2A7] text-[#111111] shadow-[0_0_10px_rgba(0,194,167,0.3)] hover:opacity-90 cursor-pointer"
          >
            {wireframe ? 'WIREFRAME: ON' : 'SOLID SHADE'}
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all bg-[#E94E77] text-white shadow-[0_0_10px_rgba(233,78,119,0.3)] hover:opacity-90 cursor-pointer"
          >
            {autoRotate ? 'SPIN: ON' : 'SPIN: OFF'}
          </button>
        </div>

        <button
          onClick={() => setLightingMode(lightingMode === 'cyberpunk' ? 'monochrome' : 'cyberpunk')}
          className="px-3 py-1.5 text-[10px] font-mono font-bold bg-black/80 text-[#00C2A7] border border-[#262626] hover:border-[#00C2A7] rounded-lg transition-all cursor-pointer"
        >
          LIGHTING: {lightingMode.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default Model3DInspector;
