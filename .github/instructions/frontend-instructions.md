# Frontend Engineering Guidelines & Development Standards: "Lugene" Portfolio SPA

This specification outlines the official frontend engineering guidelines, architecture, and development standards for building the **"Lugene" Personal Portfolio Website**. Engineered as a high-performance Single Page Application (SPA), the site showcases multimedia and motion graphics work through a dark cyberpunk aesthetic. The document serves as the technical reference for senior frontend developers, design system engineers, and AI co-developers working with GitHub Copilot.

---

## 1. Architecture & Technology Stack

The application architecture prioritizes strict type safety, modular component encapsulation, hardware-accelerated animations, and automated containerized builds.

The following table summarizes the core technology stack, specifying versions and primary responsibilities across the application lifecycle:

| Technology | Specification | Version / Pattern | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | `18.x` / `19.x` (Functional) | Core UI component tree, hooks, and state management |
| **Language** | TypeScript | `5.x` (Strict Mode) | Type-safe interfaces, props, refs, and animation targets |
| **Styling Engine** | Tailwind CSS | `3.x` / `4.x` | Token-driven utility styling mapped to design system |
| **Motion Engine** | GSAP | `3.x` (`@gsap/react`) | ScrollTrigger, Flip, and ScrollTo motion timelines |
| **Build Tooling** | Vite | `5.x` | Fast HMR dev server, path aliasing, and production packaging |
| **Unit Testing** | Vitest & React Testing Library | Latest LTS | Component unit testing and hook validation |

### Core Architectural Principles
* **Single Page Application (SPA) Flow:** All section transitions, showreel modals, and project filtering occur within a single page context to maintain seamless GSAP state continuity and eliminate page reloads.
* **Component-Level Encapsulation:** Every component encapsulates its structure, typing, and local animation triggers without leaking side effects to sibling nodes.
* **Immutable Design Tokens:** Color codes, font families, and spacing scales are centrally declared in Tailwind CSS configuration and never hardcoded in component files.

---

## 2. Workspace & Directory Layout Standards

To support clean code separation and seamless build packaging, the codebase adheres to a strict atomic component structure.

The application directory hierarchy is organized as follows:

```
frontend/
├── public/
│   ├── favicon.ico
│   └── assets/                     # Static media assets (showreels, images)
├── src/
│   ├── assets/                     # Raw SVG vectors and inline icon definitions
│   ├── components/
│   │   ├── ui/                     # Reusable atomic UI elements (Button, Input, Badge)
│   │   ├── layout/                 # Structural page components (Header, Navigation, Footer)
│   │   └── sections/               # Modular SPA sections (Hero, About, Services, Showcase)
│   ├── hooks/                      # Custom React hooks (useGSAPAnimation, useScrollTrigger)
│   ├── styles/                     # Tailwind entry point (@tailwind directives, custom utilities)
│   ├── types/                      # TypeScript declarations (portfolio.ts, gsap.d.ts)
│   ├── App.tsx                     # Top-level SPA root component
│   └── main.tsx                    # React DOM initialization and strict mode wrapper
├── index.html                      # SPA entry HTML file
├── package.json                    # Dependency manifest and npm script definitions
├── tailwind.config.js              # Custom token mapping configuration
├── tsconfig.json                   # Strict TypeScript compiler options
└── vite.config.ts                  # Vite bundler configuration with @ path aliases
```

---

## 3. Design System & Tailwind CSS Integration

The visual language relies on a dark-mode-first aesthetic characterized by high-contrast neon accents, dark container fills, and crisp monospace typography.

### 3.1 Color Palette Tokens

Developers must utilize custom Tailwind utility classes corresponding to the design system palette rather than arbitrary hex values.

The table below maps design tokens to their hex codes, utility classes, and functional applications:

| Token Name | Hex Code | Tailwind Utility | Application |
| :--- | :--- | :--- | :--- |
| `bg-dark` | `#111111` / `#161616` | `bg-bg-dark` | Primary application background |
| `bg-card` | `#1F1F1F` | `bg-bg-card` | Background for cards, containers, and modals |
| `primary` | `#00C2A7` | `text-primary`, `bg-primary`, `border-primary` | Cyan/Teal main accent, active states, CTA buttons |
| `secondary` | `#E94E77` | `text-secondary`, `bg-secondary` | Pink sub-accent, category tags, sub-headers |
| `accent` | `#FFC007` | `text-accent`, `bg-accent` | Gold/Yellow warning highlights, status badges |
| `text-primary` | `#F0F0F0` | `text-text-primary` | Primary body and header typography |
| `text-muted` | `#AAAAAA` | `text-text-muted` | Subtitles, metadata, and inactive labels |
| `text-on-primary` | `#FFFFFF` / `#111111` | `text-text-on-primary` | High-contrast text rendered over primary fills |

### 3.2 Typography Stack Tokens

Typography classes are structured into three distinct font families to reinforce technical hierarchy:

```javascript
// tailwind.config.js font family configuration snippet
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        header: ['Montserrat', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        'bg-dark': '#111111',
        'bg-card': '#1F1F1F',
        primary: '#00C2A7',
        secondary: '#E94E77',
        accent: '#FFC007',
        'text-primary': '#F0F0F0',
        'text-muted': '#AAAAAA',
      },
    },
  },
};
```

---

## 4. Component Engineering & TypeScript Patterns

Components must adhere to standard functional patterns using React hooks and explicit type declarations.

### 4.1 Strict TypeScript Rules
* **No Implied `any`:** Disallow explicit or implicit `any` types. All component props must be explicitly typed via TypeScript `interface` or `type` definitions.
* **Element References:** Always strongly type React DOM references used for GSAP targets (e.g., `useRef<HTMLDivElement>(null)`).
* **Prop Immutability:** Utilize `Readonly<Props>` for component input props to prevent internal mutation.
* **Path Aliases:** Always use Vite path aliases (`@/components/...`, `@/hooks/...`, `@/types/...`) for clean imports.

### 4.2 Component Design Example

Below is the standard pattern for atomic UI components, enforcing modular props, accessibility attributes, and type safety:

```tsx
import React from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  icon,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-bg-dark px-6 py-3 font-mono text-sm font-medium text-text-primary transition-all hover:bg-primary hover:text-bg-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark disabled:opacity-50 ${className}`}
    >
      {icon && <span className="text-primary group-hover:text-bg-dark transition-colors">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
```

---

## 5. Motion System & GSAP Animation Guidelines

Motion is a core pillar of the "Lugene" portfolio experience. To ensure fluid 60 FPS performance across diverse hardware, animation logic must strictly follow GSAP lifecycle conventions.

### 5.1 Hardware Acceleration Standards
To prevent layout thrashing and maintain optimal frame rates, animations must be limited strictly to hardware-accelerated CSS properties:
* **Allowed Properties:** `transform` (`x`, `y`, `z`, `scale`, `rotation`), `opacity`, and `filter` (blur).
* **Forbidden Properties:** Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding` directly during scroll sequences.

### 5.2 React Lifecycle Integration (`@gsap/react`)

All GSAP instances must be wrapped inside the official `useGSAP` hook to guarantee proper cleanup and prevent memory leaks:

```tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ServicesGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger animation for grid cards on viewport enter
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 bg-bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Service cards rendered here */}
      </div>
    </section>
  );
};
```

### 5.3 Responsive Motion with `ScrollTrigger.matchMedia()`
Complex multi-layered parallax and stagger sequences must be scaled back or disabled on mobile viewports to preserve battery life and smooth interaction:

```typescript
useGSAP(() => {
  ScrollTrigger.matchMedia({
    // Desktop: full stagger and scroll parallax
    '(min-width: 1024px)': function () {
      gsap.to('.hero-title', {
        yPercent: -20,
        scrollTrigger: { trigger: '.hero-container', scrub: true },
      });
    },
    // Mobile: simplified fade-in without scrub parallax
    '(max-width: 1023px)': function () {
      gsap.from('.hero-title', { opacity: 0, duration: 1 });
    },
  });
});
```

---

## 6. SPA Navigation, State Management & Routing

The application operates as a Single Page Application without multi-page router overhead.

* **Anchor Scrolling:** Navigation links trigger smooth scrolling to section anchors (`#hero`, `#about`, `#services`, `#showcase`, `#showreel`, `#contact`) utilizing GSAP `ScrollToPlugin`.
* **Modal & Overlay State:** Showreel video overlays and detail drawers are managed via local component state or lightweight global state with scroll suppression applied to `document.body`.
* **URL Sync:** Section scrolling updates `window.history.replaceState` quietly to reflect current viewport section without triggering browser reloads.

---

## 7. Performance Engineering & Core Web Vitals

The application targets green Core Web Vitals scores across desktop and mobile devices.

The table below outlines target metrics alongside specific technical implementation strategies:

| Metric | Target Threshold | Implementation Strategy |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | $< 2.5	ext{s}$ | Preload critical hero fonts and inline SVG graphics |
| **First Input Delay (FID) / INP** | $< 100	ext{ms}$ | Offload heavy computations; debounce scroll events |
| **Cumulative Layout Shift (CLS)** | $< 0.1$ | Reserve explicit aspect ratio containers for media assets |
| **Frame Rate** | $60	ext{ FPS}$ | Restrict GSAP properties to `transform` and `opacity` |

### 7.1 Media & Asset Handling
* **SVG Vectors:** All icons and visual accents must be served as inline or optimized SVG symbols rather than external raster PNGs.
* **Video Showreels:** Background and preview videos must be compressed (H.264/WebM), muted by default, and lazy-loaded upon user interaction.
* **Code Splitting:** Dynamic `import()` statements should be utilized for heavy modal dialogs and secondary section overlays.

---

## 8. Accessibility (WCAG 2.1 AA) & Quality Standards

Despite the dark cyberpunk visual aesthetic, the application must remain fully accessible to all users.

* **Color Contrast:** All body text (`text-primary` `#F0F0F0` on `bg-dark` `#111111`) maintains a contrast ratio exceeding $7:1$, satisfying WCAG AAA standards for normal text.
* **Keyboard Navigation:** All interactive cards, primary buttons, and modal overlays must include visible focus rings (`focus:ring-2 focus:ring-primary`).
* **Motion Sensitivity (`prefers-reduced-motion`):** GSAP animations must respect user system preferences by disabling scrub transitions when reduced motion is requested.

---

## 9. Testing & AI Co-Development Guidelines

* **Unit Testing:** Write component unit tests using `vitest` and `@testing-library/react` to verify button click events, prop rendering, and modal visibility states.
* **Static Analysis:** Run `tsc --noEmit` and ESLint before every commit to catch type discrepancies and unhandled React hook dependencies.
* **GitHub Copilot Protocols:** All AI-generated component code must undergo human verification for strict TypeScript typing, Tailwind token adherence, and proper GSAP lifecycle cleanup (`ctx.revert()`).
