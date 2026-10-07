import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const TemporaryLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    if (!isVisible) return;

    const elements = [document.documentElement, document.body];
    const elementsToReset = elements.filter(
      (element) => !element.classList.contains('scrollbar-none')
    );
    elements.forEach((element) => element.classList.add('scrollbar-none'));

    return () => {
      elementsToReset.forEach((element) =>
        element.classList.remove('scrollbar-none')
      );
    };
  }, [isVisible]);

  useGSAP(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const words = loader.querySelectorAll<HTMLElement>('.loader-word');
    const bar = loader.querySelector<HTMLElement>('.loader-bar-fill');

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .fromTo(
        words,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }
      )
      .to(
        bar,
        { width: '100%', duration: 1.2, ease: 'power2.inOut' },
        0.2
      )
      .to(
        loader,
        {
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setIsVisible(false),
        },
        1.3
      );

    return () => {
      timeline.kill();
    };
  }, { scope: loaderRef });

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark "
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="loader-word font-header text-4xl tracking-[0.45em] text-text-primary sm:text-5xl">
          LUGENE
        </div>

        <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10 shadow-[0_0_20px_rgba(82,195,193,0.35)]">
          <div className="loader-bar-fill h-full w-0 rounded-full bg-gradient-to-r from-primary via-primary to-secondary" />
        </div>
      </div>
    </div>
  );
};
