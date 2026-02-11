'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Intersection Observer for scroll reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <div className="status-dot"></div>
          <span>TWOLABS</span>
        </div>
        <span>SAN FRANCISCO, CA</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-logo mono">TWOLABS</div>
        <nav className="hero-nav">
          <a href="#mission">Mission</a>
          <a href="#what">What We Do</a>
          <a href="#vision">Vision</a>
          <a href="#scaling">Scaling</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="container">
          <div className="label reveal">TRAINING DATA FOR AGRICULTURAL ROBOTICS</div>
          <h1 className="tagline reveal reveal-delay-1">We capture what<br/>robots need to learn.</h1>
          <p className="subline reveal reveal-delay-2">Building the foundational datasets that teach machines to work alongside us in the fields.</p>
          <div className="location reveal reveal-delay-3">
            <span className="location-dot"></span>
            San Francisco, CA
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission">
        <div className="container">
          <div className="label reveal">MISSION</div>
          <p className="mission-text reveal reveal-delay-1">Eight billion people need to eat. <em>Robots will help us feed them.</em></p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what">
        <div className="container">
          <div className="label reveal">WHAT WE DO</div>
          <div className="what-content">
            <p className="body-text reveal reveal-delay-1">Agricultural robots are coming. But they need training data that doesn't exist yet. Real-world footage of human hands harvesting crops, handling livestock, processing food.</p>
            <p className="body-text reveal reveal-delay-2">We put wearable cameras on farm workers in Central Asia and India, capture POV footage of real labor, label it, and sell it to robotics companies.</p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision">
        <div className="container">
          <div className="label reveal">VISION</div>
          <div className="vision-text reveal reveal-delay-1">
            The infrastructure layer for physical AI in agriculture.
          </div>
        </div>
      </section>

      {/* SCALING */}
      <section id="scaling">
        <div className="container">
          <div className="label reveal">CURRENTLY SCALING TO</div>
          <div className="scaling-grid reveal reveal-delay-1">
            <div className="scaling-card">
              <span className="card-label">Hardware</span>
              <span className="card-value">TL-1</span>
              <span className="card-desc">Wearable Camera System</span>
            </div>
            <div className="scaling-card">
              <span className="card-label">Dataset</span>
              <span className="card-value">10K+</span>
              <span className="card-desc">Hours of Footage</span>
            </div>
            <div className="scaling-card">
              <span className="card-label">Network</span>
              <span className="card-value">100+</span>
              <span className="card-desc">Workers Deployed</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="container" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div className="label reveal">GET IN TOUCH</div>
          <p className="cta-text reveal reveal-delay-1">Looking for robotics companies, research labs, and investors who share our vision.</p>
          <a href="mailto:team@twolabs.ai" className="btn reveal reveal-delay-2"><span>Partner With Us</span></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">TWOLABS</div>
          <div className="footer-info">
            <span>San Francisco, CA</span>
            <a href="mailto:team@twolabs.ai">team@twolabs.ai</a>
          </div>
        </div>
        <div className="footer-line">© 2026 TWOLABS — Training Data for Agricultural Robotics</div>
      </footer>

      <div style={{height: '40px'}}></div>
    </>
  );
}
