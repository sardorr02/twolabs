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

    // First-person camera (close, looking down)
    const camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 500);
    camera.position.set(0, 50, 0);
    camera.rotation.x = -0.7; // Look down at plants

    // Strong lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(50, 100, 50);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x808080, 1.5);
    scene.add(ambientLight);

    // Ground (soil/dirt)
    const groundGeometry = new THREE.PlaneGeometry(400, 400);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x3d2817,
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -5;
    scene.add(ground);

    // Create dense vegetation (tomato plants)
    const plants: THREE.Object3D[] = [];
    
    // Main plant structure - use cones for leaves
    for (let i = 0; i < 25; i++) {
      const plantGroup = new THREE.Group();
      
      // Stem
      const stemGeometry = new THREE.CylinderGeometry(1, 2, 20, 6);
      const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5016 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 10;
      plantGroup.add(stem);
      
      // Leaves - multiple cones
      for (let j = 0; j < 8; j++) {
        const leafGeometry = new THREE.ConeGeometry(6, 12, 6);
        const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x4a7c3a });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(
          (Math.random() - 0.5) * 15,
          15 + Math.random() * 10,
          (Math.random() - 0.5) * 15
        );
        leaf.rotation.set(
          Math.random() * 0.5,
          Math.random() * Math.PI * 2,
          Math.random() * 0.5
        );
        plantGroup.add(leaf);
      }
      
      plantGroup.position.set(
        (Math.random() - 0.5) * 100,
        0,
        20 + Math.random() * 80
      );
      plantGroup.rotation.y = Math.random() * Math.PI * 2;
      scene.add(plantGroup);
      plants.push(plantGroup);
    }

    // Add many tomatoes
    const tomatoGeometry = new THREE.SphereGeometry(4, 12, 12);
    const tomatoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff2222,
      shininess: 30
    });
    const tomatoes: THREE.Mesh[] = [];

    for (let i = 0; i < 30; i++) {
      const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      tomato.position.set(
        (Math.random() - 0.5) * 90,
        10 + Math.random() * 15,
        25 + Math.random() * 70
      );
      scene.add(tomato);
      tomatoes.push(tomato);
    }

    // Create realistic hands in foreground
    const handMaterial = new THREE.MeshLambertMaterial({ color: 0xc68b59 });
    
    // Right hand (more prominent)
    const rightPalm = new THREE.Mesh(
      new THREE.BoxGeometry(12, 18, 8),
      handMaterial
    );
    rightPalm.position.set(25, 25, -10);
    scene.add(rightPalm);

    // Right fingers
    const rightFingers: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const finger = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1, 10, 8),
        handMaterial
      );
      finger.position.set(21 + i * 3, 35, -10);
      finger.rotation.z = 0.2;
      scene.add(finger);
      rightFingers.push(finger);
    }

    // Left hand (partially visible, holding bowl)
    const leftPalm = new THREE.Mesh(
      new THREE.BoxGeometry(10, 15, 7),
      handMaterial
    );
    leftPalm.position.set(-35, 20, -15);
    scene.add(leftPalm);

    // Bowl/basket
    const bowlGeometry = new THREE.CylinderGeometry(15, 12, 8, 16, 1, true);
    const bowlMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xcccccc,
      side: THREE.DoubleSide
    });
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowl.position.set(-30, 18, 0);
    scene.add(bowl);

    // Tomatoes in bowl
    for (let i = 0; i < 5; i++) {
      const tomatoInBowl = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      tomatoInBowl.position.set(
        -30 + (Math.random() - 0.5) * 10,
        19 + Math.random() * 3,
        0 + (Math.random() - 0.5) * 10
      );
      scene.add(tomatoInBowl);
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    // ASCII Effect
    const effect = new AsciiEffect(renderer, ' .,:;i1tfLCG08@', { invert: false });
    effect.setSize(width, height);
    effect.domElement.style.color = '#00ff00';
    effect.domElement.style.backgroundColor = 'black';
    effect.domElement.style.lineHeight = '8px';
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
      time += 0.02;

      // Reaching motion for right hand
      const reachCycle = Math.sin(time * 1.2);
      
      rightPalm.position.y = 25 + reachCycle * 8;
      rightPalm.position.z = -10 + reachCycle * 15;
      rightPalm.rotation.x = reachCycle * 0.4;
      rightPalm.rotation.z = -0.1 + reachCycle * 0.15;

      // Fingers curl when reaching
      rightFingers.forEach((finger, i) => {
        finger.position.y = 35 + reachCycle * 8;
        finger.position.z = -10 + reachCycle * 15;
        finger.rotation.z = 0.2 + (reachCycle < 0 ? -reachCycle * 0.3 : 0);
      });

      // Gentle plant sway
      plants.forEach((plant, i) => {
        plant.rotation.z = Math.sin(time * 0.5 + i * 0.3) * 0.08;
      });

      // Tomato rotation
      tomatoes.forEach((tomato, i) => {
        tomato.rotation.y = time * 0.3 + i;
      });

      // Camera subtle movement (breathing)
      camera.position.y = 50 + Math.sin(time * 0.3) * 1.5;
      camera.rotation.x = -0.7 + Math.sin(time * 0.25) * 0.02;

      // Render
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
