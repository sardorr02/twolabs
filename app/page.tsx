'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Voxel cubes
    const cubes: THREE.Mesh[] = [];
    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);

    // Ground grid of voxels
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
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(20, 30, 20);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4466ff, 0.5, 60);
    pointLight1.position.set(-20, 10, -20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6644ff, 0.3, 60);
    pointLight2.position.set(20, 5, 20);
    scene.add(pointLight2);

    // Animation
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
    <div className="relative min-h-screen">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} id="three-canvas" />

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
          <span className="font-mono text-xs tracking-[0.2em] text-gray-400">TWOLABS</span>
          <a href="mailto:hello@twolabs.so" className="font-mono text-xs tracking-[0.1em] text-gray-500 hover:text-white transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-end px-8 pb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-4">
            TWOLABS
          </h1>
          <p className="font-mono text-sm text-gray-500 mb-8 flex items-center gap-2">
            <span>📍</span> San Francisco, CA
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#overview" className="font-mono text-xs tracking-[0.1em] px-5 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
              OVERVIEW.MD
            </a>
            <a href="#stats" className="font-mono text-xs tracking-[0.1em] px-5 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
              STATS.MD
            </a>
            <a href="#contact" className="font-mono text-xs tracking-[0.1em] px-5 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
              CONTACT.MD
            </a>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="min-h-screen px-8 py-24 bg-[#0a0a0a]/95 backdrop-blur-md">
          <div className="max-w-4xl">
            <h2 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2"># Overview</h2>
            
            <div className="mt-12">
              <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-4">WHAT</p>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl">
                Training datasets for agricultural robotics. We put wearable cameras on farm workers 
                in India and Central Asia, capture POV footage of real labor, label it, and sell it 
                to robotics companies.
              </p>
            </div>

            <div className="mt-16">
              <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-4">WHY</p>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl">
                Eight billion people need to eat. Robots will help us feed them. Agricultural robots 
                are coming, but they need training data that doesn't exist — real-world footage of 
                human hands harvesting crops, handling livestock, processing food.
              </p>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl mt-6">
                We're building the infrastructure layer for physical AI in agriculture.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">FOCUS</p>
                <p className="text-white text-lg">Egocentric Video</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">REGIONS</p>
                <p className="text-white text-lg">India, Central Asia</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">CUSTOMERS</p>
                <p className="text-white text-lg">Robotics Labs</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-2">STAGE</p>
                <p className="text-white text-lg">Pre-Seed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="px-8 py-24 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-gray-800/50">
          <div className="max-w-4xl">
            <h2 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-12"># Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-8 py-24 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-gray-800/50">
          <div className="max-w-4xl">
            <h2 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-12"># Contact</h2>
            
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mb-12">
              Building the foundation for agricultural robotics. Looking for robotics companies, 
              research labs, and investors who share our vision.
            </p>
            
            <a 
              href="mailto:hello@twolabs.so"
              className="inline-block px-8 py-4 bg-white text-black font-mono text-sm tracking-[0.1em] hover:bg-gray-200 transition-colors"
            >
              PARTNER WITH US
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-gray-600">© 2026 TWOLABS</span>
          <a href="mailto:hello@twolabs.so" className="font-mono text-xs text-gray-600 hover:text-white transition-colors">
            hello@twolabs.so
          </a>
        </footer>
      </div>
    </div>
  );
}
