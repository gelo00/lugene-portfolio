import React from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  return (
    <footer id="footer" data-scroll-section className="bg-bg-dark text-white">
      {/* Full-bleed CTA Banner */}
      <div className="bg-gradient-to-r from-primary via-emerald-400 to-primary text-black py-16 px-6 text-center relative overflow-hidden">
        <div data-scroll-content className="max-w-4xl mx-auto z-10 relative">
          <h2 className="text-3xl md:text-5xl font-header font-extrabold uppercase tracking-tight mb-4">
            LET'S MAKE SOMETHING AWESOME
          </h2>
          <p className="text-black/80 font-body max-w-xl mx-auto mb-8 font-medium">
            Have an upcoming motion graphics project, 3D visual reel, or brand refresh? Let's connect and collaborate.
          </p>
        </div>
      </div>

      {/* Footer Bottom Nav & Back to Top */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-xs font-mono">
        <div>
          <span className="text-primary font-bold font-header text-sm">LUGENE</span>
          <p className="mt-1 text-neutral-500">© 2026 Lugene Portfolio. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-primary transition-colors">INSTAGRAM</a>
        </div>

        <button
          onClick={scrollToTop}
          className="px-4 py-2 border border-neutral-800 hover:border-primary text-text-primary rounded font-mono hover:text-primary transition-colors flex items-center gap-2"
        >
          <span>BACK TO TOP</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
};
