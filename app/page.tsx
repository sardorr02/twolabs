'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create voxel grid
    const cubes: THREE.Mesh[] = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });

    // Ground plane of voxels
    for (let x = -20; x < 20; x += 2) {
      for (let z = -20; z < 20; z += 2) {
        const height = Math.random() * 3 + 0.5;
        const cube = new THREE.Mesh(geometry, material.clone());
        cube.position.set(x + Math.random() * 0.5, -5, z + Math.random() * 0.5);
        cube.scale.set(1.5, height, 1.5);
        cube.userData = { 
          originalY: cube.position.y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5
        };
        scene.add(cube);
        cubes.push(cube);
      }
    }

    // Floating voxels
    for (let i = 0; i < 50; i++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 15,
        (Math.random() - 0.5) * 40
      );
      cube.scale.set(
        0.5 + Math.random() * 1.5,
        0.5 + Math.random() * 1.5,
        0.5 + Math.random() * 1.5
      );
      cube.userData = { 
        originalY: cube.position.y,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4
      };
      scene.add(cube);
      cubes.push(cube);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a9eff, 0.5, 50);
    pointLight.position.set(-10, 10, -10);
    scene.add(pointLight);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Breathing animation
      cubes.forEach((cube) => {
        const { originalY, phase, speed } = cube.userData;
        cube.position.y = originalY + Math.sin(time * speed + phase) * 0.3;
        cube.rotation.y = time * 0.1 + phase;
      });

      // Slow camera rotation
      camera.position.x = Math.sin(time * 0.1) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* Three.js Background */}
      <div ref={containerRef} className="fixed inset-0 -z-10" />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center">
          <span className="text-sm tracking-widest text-gray-400">TWOLABS</span>
          <a href="mailto:hello@twolabs.so" className="text-sm text-gray-500 hover:text-white transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-end p-6 pb-24">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
            TWOLABS
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            📍 San Francisco, CA
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#about" className="px-4 py-2 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all">
              OVERVIEW
            </a>
            <a href="#stats" className="px-4 py-2 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all">
              STATS
            </a>
            <a href="#contact" className="px-4 py-2 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all">
              CONTACT
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen p-6 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-gray-500 text-xs tracking-widest mb-4">WHAT</p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-12">
              Training datasets for agricultural robotics. We put wearable cameras on farm workers 
              in India and Central Asia, capture POV footage of real labor, label it, and sell it 
              to robotics companies.
            </p>

            <p className="text-gray-500 text-xs tracking-widest mb-4">WHY</p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-12">
              Eight billion people need to eat. Robots will help us feed them. Agricultural robots 
              are coming, but they need training data that doesn't exist — real-world footage of 
              human hands harvesting crops, handling livestock, processing food. We're building 
              the infrastructure layer for physical AI in agriculture.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-16">
              <div>
                <p className="text-gray-500 text-xs tracking-widest mb-2">FOCUS</p>
                <p className="text-white">Egocentric Video</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs tracking-widest mb-2">REGIONS</p>
                <p className="text-white">India, Central Asia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="p-6 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-gray-900">
          <div className="grid grid-cols-3 gap-8 max-w-3xl">
            <div>
              <p className="text-gray-500 text-xs tracking-widest mb-2">CAMERA</p>
              <p className="text-2xl md:text-3xl text-white">TL-1</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs tracking-widest mb-2">TARGET</p>
              <p className="text-2xl md:text-3xl text-white">10K+ Hours</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs tracking-widest mb-2">WORKERS</p>
              <p className="text-2xl md:text-3xl text-white">100+</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="p-6 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-sm border-t border-gray-900">
          <div className="max-w-3xl">
            <p className="text-gray-500 text-xs tracking-widest mb-4">GET IN TOUCH</p>
            <p className="text-lg text-gray-200 mb-8">
              Building the foundation for agricultural robotics. Looking for robotics companies, 
              research labs, and investors who share our vision.
            </p>
            <a 
              href="mailto:hello@twolabs.so" 
              className="inline-block px-6 py-3 bg-white text-black text-sm tracking-widest hover:bg-gray-200 transition-colors"
            >
              PARTNER WITH US
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-900 flex justify-between items-center text-sm text-gray-600">
          <span>© 2026 TWOLABS</span>
          <a href="mailto:hello@twolabs.so" className="hover:text-white transition-colors">
            hello@twolabs.so
          </a>
        </footer>
      </div>
    </div>
  );
}
