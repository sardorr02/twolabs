'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

export default function TestAscii() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.set(0, 150, 500);

    // Lighting
    const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    // Create "hand" (box)
    const handGeometry = new THREE.BoxGeometry(40, 80, 30);
    const handMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    hand.position.set(-50, 50, 0);
    scene.add(hand);

    // Create "fingers" (smaller boxes)
    const fingerGeometry = new THREE.BoxGeometry(8, 25, 8);
    const fingers: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(fingerGeometry, handMaterial);
      finger.position.set(-70 + i * 12, 90, 0);
      scene.add(finger);
      fingers.push(finger);
    }

    // Create "tomatoes" (spheres)
    const tomatoGeometry = new THREE.SphereGeometry(20, 16, 16);
    const tomatoMaterial = new THREE.MeshPhongMaterial({ color: 0xff3333 });
    const tomatoes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      tomato.position.set(
        Math.random() * 200 - 100,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      );
      scene.add(tomato);
      tomatoes.push(tomato);
    }

    // Create "ground"
    const groundGeometry = new THREE.PlaneGeometry(600, 600);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3d7a3d, 
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -100;
    scene.add(ground);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // ASCII Effect
    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.color = '#00ff00';
    effect.domElement.style.backgroundColor = 'black';
    container.appendChild(effect.domElement);

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      effect.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Animate hand picking motion
      hand.position.y = 50 + Math.sin(time * 2) * 30;
      hand.rotation.z = Math.sin(time * 2) * 0.2;

      // Animate fingers
      fingers.forEach((finger, i) => {
        finger.position.y = 90 + Math.sin(time * 2 + i * 0.3) * 10;
      });

      // Rotate tomatoes
      tomatoes.forEach((tomato, i) => {
        tomato.rotation.y = time + i;
      });

      // Render with ASCII effect
      effect.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.innerHTML = '';
      renderer.dispose();
      handGeometry.dispose();
      handMaterial.dispose();
      fingerGeometry.dispose();
      tomatoGeometry.dispose();
      tomatoMaterial.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#000',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    />
  );
}
