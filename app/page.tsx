'use client';

import { useEffect } from 'react';
import { StatusBar, Hero, Section, ScalingCard, Button, Footer } from '@/components';
import { SCALING_STATS, COPY, SITE } from '@/lib/constants';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <StatusBar />
      <Hero />

      {/* Mission */}
      <Section id="mission" label="MISSION">
        <p className="mission-text reveal reveal-delay-1">
          {COPY.mission.line1} <em>{COPY.mission.line2}</em>
        </p>
      </Section>

      {/* What We Do */}
      <Section id="what" label="WHAT WE DO">
        <div className="what-content">
          {COPY.whatWeDo.map((text, index) => (
            <p key={index} className={`body-text reveal reveal-delay-${index + 1}`}>
              {text}
            </p>
          ))}
        </div>
      </Section>

      {/* Vision */}
      <Section id="vision" label="VISION">
        <div className="vision-text reveal reveal-delay-1">
          {COPY.vision}
        </div>
      </Section>

      {/* Scaling */}
      <Section id="scaling" label="CURRENTLY SCALING TO">
        <div className="scaling-grid reveal reveal-delay-1">
          {SCALING_STATS.map((stat) => (
            <ScalingCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact" label="GET IN TOUCH" className="cta-section">
        <p className="cta-text reveal reveal-delay-1">{COPY.cta}</p>
        <Button href={`mailto:${SITE.email}`} className="reveal reveal-delay-2">
          Partner With Us
        </Button>
      </Section>

      <Footer />
      
      {/* Spacer for status bar */}
      <div style={{ height: 40 }} />
    </>
  );
}
