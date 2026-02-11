'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type ModalType = 'overview' | 'stats' | 'contact' | null;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const cubes: THREE.Mesh[] = [];
    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);

    // Ground grid
    for (let x = -15; x <= 15; x += 3) {
      for (let z = -15; z <= 15; z += 3) {
        const height = Math.random() * 4 + 1;
        const material = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          roughness: 0.9,
          metalness: 0.1,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, -8 + height / 2, z);
        cube.scale.y = height;
        cube.userData = {
          baseY: cube.position.y,
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.2 + Math.random() * 0.3,
          speed: 0.5 + Math.random() * 0.5,
        };
        scene.add(cube);
        cubes.push(cube);
      }
    }

    // Floating cubes
    for (let i = 0; i < 30; i++) {
      const size = 0.8 + Math.random() * 2;
      const material = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.8,
        metalness: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 20 - 5,
        (Math.random() - 0.5) * 50
      );
      cube.scale.set(size, size, size);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      cube.userData = {
        baseY: cube.position.y,
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.3 + Math.random() * 0.5,
        speed: 0.3 + Math.random() * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      };
      scene.add(cube);
      cubes.push(cube);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(20, 30, 20);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4466ff, 0.5, 60);
    pointLight1.position.set(-20, 10, -20);
    scene.add(pointLight1);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      cubes.forEach((cube) => {
        const { baseY, phase, amplitude, speed, rotSpeed } = cube.userData;
        cube.position.y = baseY + Math.sin(time * speed + phase) * amplitude;
        if (rotSpeed) {
          cube.rotation.x += rotSpeed;
          cube.rotation.y += rotSpeed * 0.7;
        }
      });

      camera.position.x = Math.sin(time * 0.1) * 3;
      camera.position.z = 35 + Math.cos(time * 0.08) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center">
          <span className="font-mono text-xs tracking-[0.2em] text-gray-400">TWOLABS</span>
          <a href="mailto:hello@twolabs.so" className="font-mono text-xs tracking-[0.1em] text-gray-500 hover:text-white transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Hero - Bottom Left */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-10 pb-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-2">
            TWOLABS
          </h1>
          <p className="font-mono text-sm text-gray-500 mb-6 flex items-center gap-2">
            <span>📍</span> San Francisco, CA
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveModal('overview')}
              className="font-mono text-xs tracking-[0.05em] px-4 py-2.5 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
            >
              <span className="text-gray-600">📄</span> OVERVIEW.MD
            </button>
            <button 
              onClick={() => setActiveModal('stats')}
              className="font-mono text-xs tracking-[0.05em] px-4 py-2.5 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
            >
              <span className="text-gray-600">📄</span> STATS.MD
            </button>
            <button 
              onClick={() => setActiveModal('contact')}
              className="font-mono text-xs tracking-[0.05em] px-4 py-2.5 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
            >
              <span className="text-gray-600">📄</span> CONTACT.MD
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveModal(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal */}
          <div 
            className="relative bg-[#111111] border border-gray-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#111111] border-b border-gray-800 px-6 md:px-8 py-4 flex justify-between items-center">
              <span className="font-mono text-sm text-gray-400 flex items-center gap-2">
                <span className="text-gray-600">📄</span>
                {activeModal === 'overview' && 'OVERVIEW.MD'}
                {activeModal === 'stats' && 'STATS.MD'}
                {activeModal === 'contact' && 'CONTACT.MD'}
              </span>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-white transition-colors text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 md:px-8 py-8">
              {activeModal === 'overview' && (
                <>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
                    <span className="text-gray-500">#</span> Overview
                  </h2>

                  <div className="space-y-10">
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">WHAT</p>
                      <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        Training datasets for agricultural robotics. We put wearable cameras on farm workers 
                        in India and Central Asia, capture POV footage of real labor, label it, and sell it 
                        to robotics companies.
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">WHY</p>
                      <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        Eight billion people need to eat. Robots will help us feed them. Agricultural robots 
                        are coming, but they need training data that doesn't exist — real-world footage of 
                        human hands harvesting crops, handling livestock, processing food.
                      </p>
                      <p className="text-lg md:text-xl text-gray-200 leading-relaxed mt-4">
                        We're building the infrastructure layer for physical AI in agriculture.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-6">
                      <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">FOCUS</p>
                        <p className="font-mono text-base text-white">Egocentric Video</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">REGIONS</p>
                        <p className="font-mono text-base text-white">India, Central Asia</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">CUSTOMERS</p>
                        <p className="font-mono text-base text-white">Robotics Labs</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">STAGE</p>
                        <p className="font-mono text-base text-white">Pre-Seed</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'stats' && (
                <>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
                    <span className="text-gray-500">#</span> Stats
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">CAMERA</p>
                      <p className="text-4xl md:text-5xl font-light text-white">TL-1</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">TARGET HOURS</p>
                      <p className="text-4xl md:text-5xl font-light text-white">10,000+</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">WORKERS</p>
                      <p className="text-4xl md:text-5xl font-light text-white">100+</p>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'contact' && (
                <>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
                    <span className="text-gray-500">#</span> Contact
                  </h2>

                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
                    Building the foundation for agricultural robotics. Looking for robotics companies, 
                    research labs, and investors who share our vision.
                  </p>

                  <a 
                    href="mailto:hello@twolabs.so"
                    className="inline-block px-6 py-3 bg-white text-black font-mono text-sm tracking-[0.05em] hover:bg-gray-200 transition-colors"
                  >
                    PARTNER WITH US
                  </a>

                  <div className="mt-10 pt-8 border-t border-gray-800">
                    <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">EMAIL</p>
                    <a href="mailto:hello@twolabs.so" className="font-mono text-base text-white hover:text-gray-300 transition-colors">
                      hello@twolabs.so
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
