# Lugene Portfolio

A cinematic, cyberpunk-inspired personal portfolio for a multimedia and motion designer, built as a React + TypeScript SPA with immersive GSAP motion and a polished dark visual system.

## Overview

This project presents a designer's brand, services, featured work, and motion-focused showcase in a single-page experience. It emphasizes atmosphere, responsive typography, animated sections, and a modern tech aesthetic.

## Features

- Responsive single-page portfolio experience
- Dark futuristic visual design system
- GSAP-powered scroll and reveal animations
- Showcase sections for services and featured projects
- Interactive motion-focused UI elements
- Vite-based frontend with TypeScript
- Dockerized development and production setup

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP + @gsap/react
- Docker + Docker Compose

## Project Structure

```text
.
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── data/
│       ├── components/
│       ├── types/
│       ├── index.css
│       └── main.tsx
└── README.md
```

## Getting Started

### Install dependencies

```bash
cd frontend
npm install
```

### Run locally in development mode

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

Then open the app in your browser at:

```text
http://localhost:5173
```

### Build for production

```bash
cd frontend
npm run build
```

### Preview a production build

```bash
cd frontend
npm run preview -- --host 0.0.0.0
```

## Docker

### Development environment

```bash
docker compose up dev
```

### Production environment

```bash
docker compose up prod
```

The production container serves the optimized app through Nginx on port 80.

## Scripts

Inside the frontend package, common scripts include:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

This portfolio is designed as a high-impact visual landing page and can be customized by editing the content in the component and data files under `frontend/src/`.
