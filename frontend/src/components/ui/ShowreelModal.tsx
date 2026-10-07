import React from 'react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="relative w-full max-w-5xl bg-bg-card border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-black/60">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="font-header font-bold text-white text-sm">SHOWREEL 2024 // LUGENE MOTION</span>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white font-mono text-sm px-2 py-1 border border-neutral-800 hover:border-neutral-600 rounded"
          >
            ESC ✕
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-16/9 bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Lugene Showreel 2024"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-black/40 border-t border-neutral-800 text-xs font-mono text-text-muted flex justify-between">
          <span>3D ANIMATION / COMPOSITING / VISUAL EFFECTS</span>
          <span className="text-primary">4K 60FPS</span>
        </div>
      </div>
    </div>
  );
};
