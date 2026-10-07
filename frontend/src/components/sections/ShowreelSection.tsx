import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ShowreelSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackError(null);
    video.play().catch(() => {
      setPlaybackError('Showreel playback could not start automatically.');
    });
  };

  const pausePlayback = () => {
    videoRef.current?.pause();
  };

  // Option 1: Scale-Up Expansion Transition
  useGSAP(() => {
    if (!containerRef.current || !panelRef.current || !videoCardRef.current) return;

    const revealTimeline = gsap.timeline();

    revealTimeline
      // 1. Unveil the section panel
      .fromTo(
        panelRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'none' }
      )
      // 2. Expand video card from compact card to full-screen viewport scale
      .fromTo(
        videoCardRef.current,
        {
          scale: 0.82,
          borderRadius: '1.5rem',
          filter: 'blur(8px)',
        },
        {
          scale: 1,
          borderRadius: '0.75rem',
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      // 3. Trigger video playback once expanded
      .call(startPlayback)
      // 4. Hold section in view briefly while video plays
      .to(panelRef.current, { yPercent: 0, duration: 1, ease: 'none' });

    ScrollTrigger.create({
      id: 'showreel-transition',
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
      animation: revealTimeline,
      onEnterBack: startPlayback,
      onLeaveBack: () => {
        pausePlayback();
        // Reset scale state when scrolling back up above section
        gsap.set(videoCardRef.current, { scale: 0.82, borderRadius: '1.5rem' });
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="relative z-20 h-screen w-full overflow-hidden select-none"
    >
      <div
        ref={panelRef}
        className="relative flex h-full w-full flex-col items-center justify-center bg-[#111111] px-6 py-12 text-white shadow-[0_-20px_50px_rgba(0,0,0,0.9)] md:px-16"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Scale-Up Video Container Card */}
          <div
            ref={videoCardRef}
            className="relative w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl group transition-all duration-300"
          >
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden max-h-[65vh]">
              <video
                ref={videoRef}
                src="https://samplelib.com/mp4/sample-10s.mp4"
                loop
                playsInline
                muted
                onError={() => setPlaybackError('The showreel video could not be loaded.')}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {playbackError && (
                <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-end">
                  <p role="alert" className="text-xs text-red-300 text-right">
                    {playbackError}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;