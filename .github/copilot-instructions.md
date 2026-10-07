# GitHub Copilot Custom Instructions for "Lugene" Portfolio SPA

## 1. Project Context & Role
You are assisting in the co-development of the **"Lugene" Personal Portfolio Website**, a high-performance Single Page Application (SPA) for a Multimedia & Motion Designer. The application features a dark, futuristic cyberpunk/tech aesthetic driven by interactive 3D/motion graphics and smooth GSAP animations.

---

## 2. Tech Stack & Directory Structure
- **Framework:** React 18+ (Functional components and custom hooks).
- **Language:** TypeScript (Strict mode enabled, no `any` types allowed).
- **Styling:** Tailwind CSS (Custom token mapping, minimal custom CSS).
- **Animation Engine:** GSAP with `@gsap/react` (`ScrollTrigger`, `Flip`, `ScrollTo`).
- **Build System:** Vite.
- **Containerization:** Docker & Docker Compose with multi-stage Nginx builds.
- **Target Root:** All React source code resides under `frontend/src/`.

---

## 3. Design System & Tailwind Tokens
When suggesting styles or JSX elements, strictly adhere to these Tailwind design tokens:

### Color Palette
- **Main Background:** `bg-dark` (`#111111` / `#161616`)
- **Container / Card Background:** `bg-card` (`#1F1F1F`)
- **Primary Accent (Cyan/Teal):** `primary` (`#00C2A7`) - For primary buttons, dynamic borders, and CTA blocks.
- **Secondary Accent (Pink):** `secondary` (`#E94E77`) - For sub-headers and category markers.
- **Highlight Accent (Yellow/Gold):** `accent` (`#FFC007`) - For secondary tags, badges, and warning accents.
- **Text Tones:** `text-primary` (`#F0F0F0`), `text-muted` (`#AAAAAA`), `text-on-primary` (`#FFFFFF` or `bg-dark`).

### Typography Stack
- **Headers:** `font-header` (`Montserrat`, `Inter`)
- **Body Text:** `font-body` (`Inter`, `system-ui`)
- **Monospace Labels/KPIs:** `font-mono` (`Roboto Mono`, `Fira Code`)

---

## 4. GSAP & Motion Standards
All animation logic suggested by Copilot must strictly conform to these rules:

1. **Lifecycle Management:** Always wrap GSAP animations in the `@gsap/react` `useGSAP()` hook or ensure explicit timeline cleanup (`ctx.revert()`).
2. **Hardware Acceleration:** Only animate GPU-accelerated CSS properties (`transform: translate3d/scale/rotate`, `opacity`). **Never** animate layout properties (`top`, `left`, `width`, `height`, `margin`).
3. **Ref Typing:** Always explicitly type target element refs (e.g., `useRef<HTMLDivElement>(null)`).
4. **Responsive Animations:** Use `ScrollTrigger.matchMedia()` or window width checks to disable or simplify heavy stagger effects on mobile devices.

### Example GSAP Pattern:
```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-dark text-primary min-h-screen p-8">
      <h1 className="hero-title font-header text-5xl font-bold">LUGENE</h1>
    </div>
  );
};
```

---

## 5. Coding Standards & Component Organization
- **Component File Structure:**
  - `frontend/src/components/ui/`: Atomic components (`Button.tsx`, `Input.tsx`, `Badge.tsx`).
  - `frontend/src/components/layout/`: Global structure (`Header.tsx`, `Footer.tsx`).
  - `frontend/src/components/sections/`: SPA sections (`HeroSection.tsx`, `ServicesGrid.tsx`, `ShowcaseCarousel.tsx`).
  - `frontend/src/hooks/`: Custom React hooks (`useGSAPAnimation.ts`).
  - `frontend/src/types/`: Interfaces and type declarations.
- **Export Syntax:** Prefer named exports for components (`export const Button = ...`).
- **JSDoc Documentation:** Provide concise TSDoc comments above custom hooks and complex utility functions.

---

## 6. Testing & Quality Assurance
- Write unit and component tests using **Vitest** and **React Testing Library** in `*.test.tsx` files co-located with their components or under `__tests__/`.
- Ensure all component prop interfaces are fully typed and exported where appropriate.
