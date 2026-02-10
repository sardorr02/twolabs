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
    <div className="grain">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F2027]/90 backdrop-blur-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">TWO</span>
            <span className="text-[#2ECC71]">/</span>
            <span className="text-[#2ECC71]">LABS</span>
          </div>
          <a 
            href="mailto:hello@twolabs.so" 
            className="text-sm text-[#7f8c8d] hover:text-[#5DADE2] transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex flex-col justify-center items-center px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="animate-fade-in animate-delay-1 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-8">
            <span className="text-white">TRAINING DATA FOR</span>
            <br />
            <span className="text-[#2ECC71] glow-green">AGRICULTURAL ROBOTICS</span>
          </h1>
          
          <p className="animate-fade-in animate-delay-2 text-xl md:text-2xl text-[#7f8c8d] mb-12 max-w-2xl mx-auto">
            We capture what robots need to learn.
          </p>
          
          <div className="animate-fade-in animate-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary text-lg">
              Partner With Us
            </a>
            <a href="#mission" className="btn-secondary text-lg">
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#7f8c8d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-[#0a1519]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
            <span className="text-[#5DADE2] glow-blue">Eight billion people</span>
            <br />
            <span className="text-white">need to eat.</span>
          </h2>
          
          <h3 className="text-3xl md:text-5xl font-bold mb-16 text-white">
            Robots will help us feed them.
          </h3>
          
          <div className="text-lg md:text-xl text-[#7f8c8d] leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              Agricultural robots are coming. But they need training data that doesn't exist — 
              <span className="text-[#ECF0F1]"> real-world footage of human hands harvesting crops, 
              handling livestock, processing food.</span>
            </p>
            
            <p>
              We're building the largest dataset of agricultural labor.
              <span className="text-[#2ECC71]"> POV footage from farms in India and Central Asia.</span>
            </p>
            
            <p>
              Labeled, structured, ready for robotics training.
            </p>
            
            <p className="text-[#5DADE2] font-semibold text-2xl pt-8">
              The infrastructure layer for physical AI in agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-24 px-6 bg-[#0F2027]">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 border border-[#203A43] rounded-lg bg-[#0a1519]/50">
              <div className="text-5xl md:text-6xl font-bold text-[#2ECC71] mb-3">TL-1</div>
              <div className="text-[#7f8c8d] text-lg">Custom Camera</div>
            </div>
            <div className="text-center p-8 border border-[#203A43] rounded-lg bg-[#0a1519]/50">
              <div className="text-5xl md:text-6xl font-bold text-[#5DADE2] mb-3">10K+</div>
              <div className="text-[#7f8c8d] text-lg">Hours Target</div>
            </div>
            <div className="text-center p-8 border border-[#203A43] rounded-lg bg-[#0a1519]/50">
              <div className="text-5xl md:text-6xl font-bold text-[#ECF0F1] mb-3">100+</div>
              <div className="text-[#7f8c8d] text-lg">Workers Deploying</div>
            </div>
          </div>

          {/* Tech description */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-[#7f8c8d] mb-8">
              Custom head-mounted cameras. Egocentric POV.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-[#203A43] rounded-full text-sm text-[#ECF0F1]">Pose Estimation</span>
              <span className="px-4 py-2 bg-[#203A43] rounded-full text-sm text-[#ECF0F1]">Action Labels</span>
              <span className="px-4 py-2 bg-[#203A43] rounded-full text-sm text-[#ECF0F1]">Grasp Annotations</span>
              <span className="px-4 py-2 bg-[#203A43] rounded-full text-sm text-[#ECF0F1]">Object Detection</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 bg-[#0a1519]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            We're building the foundation for
            <br />
            <span className="text-[#2ECC71]">agricultural robotics.</span>
          </h2>
          
          <p className="text-xl text-[#7f8c8d] mb-12 max-w-2xl mx-auto">
            Looking for robotics companies, research labs, and investors who share our vision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@twolabs.so" className="btn-primary text-lg">
              Get Early Access
            </a>
            <a href="mailto:hello@twolabs.so" className="btn-secondary text-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0F2027] border-t border-[#203A43]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold tracking-tight mb-2">
              <span className="text-white">TWO</span>
              <span className="text-[#2ECC71]">/</span>
              <span className="text-[#2ECC71]">LABS</span>
            </div>
            <p className="text-[#7f8c8d] text-sm">San Francisco, CA</p>
          </div>
          
          <div className="text-[#7f8c8d] text-sm">
            <a href="mailto:hello@twolabs.so" className="hover:text-[#5DADE2] transition-colors">
              hello@twolabs.so
            </a>
          </div>
          
          <div className="text-[#7f8c8d] text-sm">
            © 2026 Twolabs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
