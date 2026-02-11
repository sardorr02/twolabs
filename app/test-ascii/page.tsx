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
    scene.fog = new THREE.Fog(0x000000, 200, 1000);

    // First-person camera (lower, looking down at crops)
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.set(0, 80, 0);
    camera.rotation.x = -0.3; // Look down slightly

    // Lighting (sun-like)
    const sunLight = new THREE.DirectionalLight(0xffffaa, 2);
    sunLight.position.set(100, 200, 100);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Ground (soil)
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x4a3520,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Create crop rows
    const cropRows: THREE.Mesh[] = [];
    const plantGeometry = new THREE.SphereGeometry(8, 8, 8);
    const plantMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const plant = new THREE.Mesh(plantGeometry, plantMaterial);
        plant.position.set(
          -200 + col * 40,
          4,
          50 + row * 50
        );
        plant.scale.set(1 + Math.random() * 0.3, 0.8 + Math.random() * 0.4, 1 + Math.random() * 0.3);
        scene.add(plant);
        cropRows.push(plant);
      }
    }

    // Add tomatoes on some plants
    const tomatoGeometry = new THREE.SphereGeometry(6, 8, 8);
    const tomatoMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
    const tomatoes: THREE.Mesh[] = [];

    for (let i = 0; i < 15; i++) {
      const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      const randomPlant = cropRows[Math.floor(Math.random() * cropRows.length)];
      tomato.position.set(
        randomPlant.position.x + (Math.random() - 0.5) * 10,
        randomPlant.position.y + 8,
        randomPlant.position.z + (Math.random() - 0.5) * 10
      );
      scene.add(tomato);
      tomatoes.push(tomato);
    }

    // Create hands (first-person view)
    const handGeometry = new THREE.BoxGeometry(15, 30, 12);
    const handMaterial = new THREE.MeshLambertMaterial({ color: 0xd2a679 });
    
    // Left hand
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-40, 40, 30);
    scene.add(leftHand);

    // Right hand
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(40, 40, 30);
    scene.add(rightHand);

    // Fingers for hands
    const fingerGeometry = new THREE.BoxGeometry(4, 12, 4);
    const leftFingers: THREE.Mesh[] = [];
    const rightFingers: THREE.Mesh[] = [];

    for (let i = 0; i < 4; i++) {
      const leftFinger = new THREE.Mesh(fingerGeometry, handMaterial);
      leftFinger.position.set(-45 + i * 5, 55, 30);
      scene.add(leftFinger);
      leftFingers.push(leftFinger);

      const rightFinger = new THREE.Mesh(fingerGeometry, handMaterial);
      rightFinger.position.set(35 + i * 5, 55, 30);
      scene.add(rightFinger);
      rightFingers.push(rightFinger);
    }

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

      // Animate hands reaching down to pick
      const pickMotion = Math.sin(time * 1.5);
      
      leftHand.position.y = 40 + pickMotion * 15;
      leftHand.position.z = 30 - pickMotion * 10;
      leftHand.rotation.x = pickMotion * 0.3;

      rightHand.position.y = 40 + pickMotion * 15;
      rightHand.position.z = 30 - pickMotion * 10;
      rightHand.rotation.x = pickMotion * 0.3;

      // Animate fingers
      leftFingers.forEach((finger, i) => {
        finger.position.y = 55 + pickMotion * 15;
        finger.position.z = 30 - pickMotion * 10;
        finger.rotation.x = pickMotion * 0.4 + i * 0.1;
      });

      rightFingers.forEach((finger, i) => {
        finger.position.y = 55 + pickMotion * 15;
        finger.position.z = 30 - pickMotion * 10;
        finger.rotation.x = pickMotion * 0.4 + i * 0.1;
      });

      // Gentle sway of plants
      cropRows.forEach((plant, i) => {
        plant.rotation.z = Math.sin(time + i * 0.1) * 0.05;
      });

      // Rotate tomatoes slightly
      tomatoes.forEach((tomato) => {
        tomato.rotation.y = time * 0.5;
      });

      // Subtle camera movement (breathing effect)
      camera.position.y = 80 + Math.sin(time * 0.5) * 2;

      // Render with ASCII effect
      effect.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.innerHTML = '';
      renderer.dispose();
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
