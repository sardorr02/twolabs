'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0f0d]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f0d]/90 backdrop-blur-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-lg font-medium tracking-widest">
            <span className="text-white/90">TWOLABS</span>
          </div>
          <a 
            href="mailto:hello@twolabs.so" 
            className="text-sm text-white/50 hover:text-white/90 transition-colors tracking-wide"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Forest Background */}
      <section className="relative min-h-screen flex flex-col justify-center items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/forest-bg.jpg)' }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-6 leading-tight">
            Training Data for
            <br />
            <span className="font-normal">Agricultural Robotics</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-12 font-light tracking-wide">
            We capture what robots need to learn.
          </p>
          
          <a 
            href="#mission" 
            className="inline-block px-8 py-4 border border-white/30 text-white/90 text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
          >
            Explore
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="min-h-screen flex flex-col justify-center items-center px-6 py-32 bg-[#0a0f0d]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed mb-16">
            Eight billion people need to eat.
            <br />
            <span className="text-emerald-400/80">Robots will help us feed them.</span>
          </p>
          
          <div className="text-base md:text-lg text-white/50 leading-loose space-y-8 font-light">
            <p>
              Agricultural robots are coming. But they need training data 
              that doesn't exist — real-world footage of human hands 
              harvesting crops, handling livestock, processing food.
            </p>
            
            <p>
              We're building the largest dataset of agricultural labor.
              <span className="text-white/70"> POV footage from farms in India and Central Asia.</span>
            </p>
            
            <p className="text-emerald-400/70 text-xl md:text-2xl pt-8">
              The infrastructure layer for physical AI in agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-[#080c0a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-5xl font-light text-emerald-400/80 mb-2">TL-1</div>
              <div className="text-white/40 text-sm tracking-widest uppercase">Camera</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-light text-white/90 mb-2">10K+</div>
              <div className="text-white/40 text-sm tracking-widest uppercase">Hours</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-light text-white/90 mb-2">100+</div>
              <div className="text-white/40 text-sm tracking-widest uppercase">Workers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 bg-[#0a0f0d]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-light text-white/70 mb-12">
            Building the foundation for agricultural robotics.
          </p>
          
          <a 
            href="mailto:hello@twolabs.so" 
            className="inline-block px-10 py-4 bg-emerald-600/80 text-white text-sm tracking-widest uppercase hover:bg-emerald-600 transition-all duration-300"
          >
            Partner With Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#080c0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm tracking-widest text-white/50">
            TWOLABS
          </div>
          
          <div className="text-white/30 text-sm">
            San Francisco
          </div>
          
          <a href="mailto:hello@twolabs.so" className="text-white/30 text-sm hover:text-white/60 transition-colors">
            hello@twolabs.so
          </a>
        </div>
      </footer>
    </div>
  );
}
