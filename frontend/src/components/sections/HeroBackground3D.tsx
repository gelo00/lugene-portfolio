import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MousePos {
  current: [number, number];
}

// 1. Interactive 3D Floating Particle Field
function ParticleField({ mouse }: { mouse: MousePos }) {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 1400;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00C2A7');
    const pink = new THREE.Color('#E94E77');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;

      const mixed = Math.random() > 0.4 ? cyan : pink;
      col[i * 3] = mixed.r;
      // col[i * 3 + 1] = mixed.g;{}
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.015;

    // Smooth mouse tilt dampening
    const targetX = mouse.current[0] * 0.4;
    const targetY = mouse.current[1] * 0.4;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.04;
    pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 2. Interactive Floating Wireframe Geometry
function FloatingGeometry({ mouse }: { mouse: MousePos }) {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.18;
      outerMeshRef.current.rotation.y += delta * 0.25;
      outerMeshRef.current.position.x = THREE.MathUtils.lerp(
        outerMeshRef.current.position.x,
        mouse.current[0] * 1.8,
        0.04
      );
      outerMeshRef.current.position.y = THREE.MathUtils.lerp(
        outerMeshRef.current.position.y,
        mouse.current[1] * 1.8,
        0.04
      );
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.35;
      innerMeshRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial wireframe color="#00C2A7" transparent opacity={0.22} />
      </mesh>

      {/* Inner Glowing Torus Knot Core */}
      <mesh ref={innerMeshRef}>
        <torusKnotGeometry args={[0.9, 0.28, 96, 16]} />
        <meshStandardMaterial
          color="#E94E77"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// 3. Main R3F Canvas Export Component
export const HeroBackground3D: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = [x, y];
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden bg-[#111111]"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} color="#00C2A7" intensity={2.5} />
        <pointLight position={[-10, -10, -10]} color="#E94E77" intensity={2.5} />

        <ParticleField mouse={mouse} />
        <FloatingGeometry mouse={mouse} />
      </Canvas>

      {/* Cyberpunk Radial Vignette Masking for Clean Solid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#111111_85%)]" />
    </div>
  );
};

export default HeroBackground3D;
