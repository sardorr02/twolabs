'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-gray-900">
        <span className="font-mono text-xs tracking-[0.2em] text-gray-400">TWOLABS</span>
        <a href="mailto:hello@twolabs.so" className="font-mono text-xs tracking-[0.1em] text-gray-500 hover:text-white transition-colors">
          CONTACT
        </a>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
          TWOLABS
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-4">
          Training Data for Agricultural Robotics
        </p>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mb-12">
          We capture what robots need to learn.
        </p>
        <a 
          href="#about"
          className="font-mono text-xs tracking-[0.1em] px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
        >
          LEARN MORE
        </a>
      </section>

      {/* Mission Section */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center border-t border-gray-900">
        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-8">MISSION</p>
        <p className="text-2xl md:text-4xl font-light text-gray-100 max-w-3xl leading-relaxed mb-6">
          Eight billion people need to eat.
        </p>
        <p className="text-2xl md:text-4xl font-light text-gray-400 max-w-3xl leading-relaxed">
          Robots will help us feed them.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center border-t border-gray-900">
        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-8">WHAT WE DO</p>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
          Agricultural robots are coming. But they need training data that doesn't exist — 
          real-world footage of human hands harvesting crops, handling livestock, processing food.
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
          We put wearable cameras on farm workers in India and Central Asia, capture POV footage 
          of real labor, label it, and sell it to robotics companies.
        </p>
      </section>

      {/* The Vision Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center border-t border-gray-900">
        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-8">THE VISION</p>
        <p className="text-2xl md:text-3xl font-light text-white max-w-2xl leading-relaxed">
          The infrastructure layer for physical AI in agriculture.
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-12 text-center">STATS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-light text-white mb-2">TL-1</p>
              <p className="font-mono text-xs tracking-[0.2em] text-gray-500">CAMERA</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-white mb-2">10K+</p>
              <p className="font-mono text-xs tracking-[0.2em] text-gray-500">HOURS TARGET</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-white mb-2">100+</p>
              <p className="font-mono text-xs tracking-[0.2em] text-gray-500">WORKERS</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-24 text-center border-t border-gray-900">
        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-8">PARTNER</p>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
          Looking for robotics companies, research labs, and investors who share our vision.
        </p>
        <a 
          href="mailto:hello@twolabs.so"
          className="px-8 py-4 bg-white text-black font-mono text-sm tracking-[0.1em] hover:bg-gray-200 transition-colors"
        >
          PARTNER WITH US
        </a>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-gray-900">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gray-600 mb-1">TWOLABS</p>
            <p className="font-mono text-xs text-gray-600">San Francisco, CA</p>
          </div>
          <a 
            href="mailto:hello@twolabs.so" 
            className="font-mono text-xs text-gray-500 hover:text-white transition-colors"
          >
            hello@twolabs.so
          </a>
        </div>
      </footer>
    </div>
  );
}
