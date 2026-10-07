import type { ServiceCard, Project } from '../types';

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: '01',
    title: '3D Motion Design',
    description: 'High-octane Cinema 4D & Octane render animation sequences.',
    icon: '⚡',
    tags: ['C4D', 'Octane', 'After Effects']
  },
  {
    id: '02',
    title: 'Brand Identity',
    description: 'Cyberpunk & modern tech brand guidelines, logos, and design systems.',
    icon: '🎨',
    tags: ['Branding', 'Vector', 'Figma']
  },
  {
    id: '03',
    title: 'VFX & Post-Production',
    description: 'Compositing, keying, particle FX, and color grading for visual media.',
    icon: '✨',
    tags: ['Nuke', 'Premiere Pro', 'DaVinci']
  },
  {
    id: '04',
    title: 'Interactive Web Motion',
    description: 'GSAP, Three.js, and WebGL interactive frontend experiences.',
    icon: '🌐',
    tags: ['GSAP', 'Three.js', 'React']
  }
];

export const PROJECTS_DATA: Project[] = [
  { id: '1', title: 'NEO-TOKYO 2088', category: '3D Motion', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80', featured: true },
  { id: '2', title: 'CYBER-GRID UI', category: 'Interactive', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
  { id: '3', title: 'SYNTH-WAVE FEST', category: 'VFX / Motion', thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80' },
  { id: '4', title: 'HEX-TECH BRAND', category: 'Branding', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' }
];