import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" data-scroll-section className="py-20 px-4 md:px-8 bg-[#111111] text-white flex justify-center items-center min-h-screen">
      {/* Container: Dark charcoal rounded card background with generous padding */}
      <div
        data-scroll-content
        className="w-full max-w-full bg-[#1a1a1a] rounded-2xl p-8 md:p-14 shadow-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
      >
        {/* Left Column (Media): Polaroid Frame */}
        <div className="flex justify-center items-center">
          <div
            className="bg-white text-zinc-900 p-4 pb-6 rounded-sm shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 max-w-sm w-full"
          >
            <div className="aspect-4/5 overflow-hidden bg-zinc-900 rounded-xs mb-4">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                alt="Lugene Cyberpunk Gamer/Designer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-sans text-sm tracking-wide text-zinc-700 font-medium">
              lugene.creatives
            </p>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Main Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3ec1b0] leading-tight font-sans"
          >
            What i do as a multimedia designer? <span className="italic font-normal text-teal-200/90">*clears throat*</span> Allow me! to enlighten you.
          </h2>

          {/* Body Copy */}
          <p
            className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans font-normal"
          >
            Hi! I'm Lugene Serandon, a 25-year-old multimedia artist with nearly 6 years of experience. I'm passionate about creating impactful designs and constantly improving my skills. Outside of work, I'm a gamer, movie buff, and music lover. I enjoy drawing and experimenting with new techniques. I believe in learning from setbacks and always pushing my creative limits.
          </p>

          {/* Call to Action Button */}
          <div className="pt-2">
            <button
              className="px-6 py-2.5 rounded-full border border-[#3ec1b0] text-[#3ec1b0] hover:bg-[#3ec1b0]/10 transition-all duration-300 text-sm font-medium tracking-wide uppercase cursor-pointer"
            >
              the creation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
