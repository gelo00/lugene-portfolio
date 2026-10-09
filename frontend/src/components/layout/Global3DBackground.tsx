import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Global3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111111');
    scene.fog = new THREE.FogExp2('#111111', 0.015);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Dual Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight('#00C2A7', 2.5, 25);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight('#E94E77', 2.2, 25);
    pinkLight.position.set(-5, -5, -5);
    scene.add(pinkLight);

    // 3. Central Morphing Geometry Group
    const coreGroup = new THREE.Group();

    // Outer Wireframe Icosahedron (Hero / General)
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: '#111111',
      emissive: '#00C2A7',
      emissiveIntensity: 0.35,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner Torus Knot Core
    const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.25, 128, 32);
    const torusMat = new THREE.MeshBasicMaterial({
      color: '#E94E77',
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    coreGroup.add(torusMesh);

    scene.add(coreGroup);

    // 4. Floating Procedural Particle Field (1,800 Particles)
    const particleCount = 1800;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color('#00C2A7');
    const colorPink = new THREE.Color('#E94E77');

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;

      const mixedColor = Math.random() > 0.5 ? colorCyan : colorPink;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Z-Axis Tunnel Rings (30 Rings extending into depth)
    const ringGroup = new THREE.Group();
    const ringGeom = new THREE.TorusGeometry(3.5, 0.03, 16, 64);

    for (let r = 0; r < 30; r++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? '#00C2A7' : '#E94E77',
        wireframe: true,
        transparent: true,
        opacity: Math.max(0.15, 0.8 - r * 0.025),
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.z = -r * 6 - 10;
      ringGroup.add(ringMesh);
    }
    scene.add(ringGroup);

    // 6. Interactive Mouse Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Scroll Target State Pipeline
    const scrollState = {
      progress: 0,
      targetCamZ: 7,
      targetCamX: 0,
      targetCamY: 0,
      targetRotX: 0,
      targetRotY: 0,
    };

    // Connect GSAP ScrollTrigger to global page scroll
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        scrollState.progress = self.progress;

        // Stage 01: Hero (0.0 -> 0.2)
        if (self.progress <= 0.2) {
          const p = self.progress / 0.2;
          scrollState.targetCamZ = 7 - p * 2;
          scrollState.targetCamX = p * 1.2;
          scrollState.targetCamY = -p * 0.5;
        } 
        // Stage 02: About (0.2 -> 0.45)
        else if (self.progress <= 0.45) {
          const p = (self.progress - 0.2) / 0.25;
          scrollState.targetCamZ = 5 - p * 4;
          scrollState.targetCamX = 1.2 - p * 2.4;
          scrollState.targetCamY = -0.5 + p * 1.0;
        } 
        // Stage 03: Skill Selector (0.45 -> 0.7)
        else if (self.progress <= 0.7) {
          const p = (self.progress - 0.45) / 0.25;
          scrollState.targetCamZ = 1 - p * 15;
          scrollState.targetCamX = -1.2 + p * 1.2;
          scrollState.targetCamY = 0.5 - p * 0.5;
        } 
        // Stage 04: Showcase & Beyond (0.7 -> 1.0)
        else {
          const p = (self.progress - 0.7) / 0.3;
          scrollState.targetCamZ = -14 - p * 120;
          scrollState.targetCamX = 0;
          scrollState.targetCamY = 0;
        }
      },
    });

    // 8. 60 FPS Render Loop with Smooth Inertia Lerp
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Continuous rotation
      coreGroup.rotation.y += 0.005;
      coreGroup.rotation.x += 0.002;
      torusMesh.rotation.z += 0.008;

      // Camera position interpolation based on scroll state + mouse parallax
      camera.position.x += (scrollState.targetCamX + mouse.x * 0.8 - camera.position.x) * 0.06;
      camera.position.y += (scrollState.targetCamY + mouse.y * 0.8 - camera.position.y) * 0.06;
      camera.position.z += (scrollState.targetCamZ - camera.position.z) * 0.06;

      camera.lookAt(0, 0, camera.position.z - 10);

      // Rotate light positions dynamically
      const time = Date.now() * 0.001;
      cyanLight.position.x = Math.sin(time) * 8;
      cyanLight.position.z = camera.position.z + Math.cos(time) * 5;
      pinkLight.position.x = -Math.sin(time) * 8;
      pinkLight.position.z = camera.position.z - Math.cos(time) * 5;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;

      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      trigger.kill();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};

export default Global3DBackground;
