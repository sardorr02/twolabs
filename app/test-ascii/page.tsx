'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TestPOV() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
    scene.fog = new THREE.Fog(0x87ceeb, 50, 300);

    // First-person camera looking down at crops
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 60, 0);
    camera.rotation.x = -Math.PI / 3; // Look down at 60 degrees

    // Lighting - bright outdoor sun
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(100, 200, 100);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Ground - dark soil
    const groundGeometry = new THREE.PlaneGeometry(500, 500, 50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3d2817,
      roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create tomato plants - dense vegetation
    const plants: THREE.Group[] = [];
    
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        const plantGroup = new THREE.Group();
        
        // Main stem
        const stemGeometry = new THREE.CylinderGeometry(0.5, 1, 25, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x3d5a27 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.y = 12.5;
        stem.castShadow = true;
        plantGroup.add(stem);
        
        // Leaves - many small leafy bits
        for (let i = 0; i < 15; i++) {
          const leafGeometry = new THREE.SphereGeometry(
            3 + Math.random() * 2, 
            6, 
            6
          );
          const leafMaterial = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color().setHSL(0.3, 0.6 + Math.random() * 0.2, 0.3 + Math.random() * 0.1),
            roughness: 0.8
          });
          const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
          leaf.position.set(
            (Math.random() - 0.5) * 12,
            10 + Math.random() * 15,
            (Math.random() - 0.5) * 12
          );
          leaf.scale.set(1.2, 0.6, 1);
          leaf.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          leaf.castShadow = true;
          plantGroup.add(leaf);
        }
        
        // Add tomatoes to some plants
        if (Math.random() > 0.4) {
          for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
            const tomatoGeometry = new THREE.SphereGeometry(2.5, 16, 16);
            const tomatoMaterial = new THREE.MeshStandardMaterial({ 
              color: 0xff3333,
              roughness: 0.3,
              metalness: 0.1
            });
            const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
            tomato.position.set(
              (Math.random() - 0.5) * 10,
              12 + Math.random() * 8,
              (Math.random() - 0.5) * 10
            );
            tomato.castShadow = true;
            plantGroup.add(tomato);
          }
        }
        
        plantGroup.position.set(
          -70 + col * 20 + (Math.random() - 0.5) * 5,
          0,
          30 + row * 25 + (Math.random() - 0.5) * 5
        );
        plantGroup.rotation.y = Math.random() * Math.PI * 2;
        scene.add(plantGroup);
        plants.push(plantGroup);
      }
    }

    // Create realistic hands
    const handMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd4a574,
      roughness: 0.7
    });
    
    // Right hand (main picking hand)
    const rightHand = new THREE.Group();
    
    const palmGeometry = new THREE.BoxGeometry(8, 12, 5);
    const palm = new THREE.Mesh(palmGeometry, handMaterial);
    palm.position.set(0, 0, 0);
    rightHand.add(palm);
    
    // Fingers
    const rightFingers: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const fingerGeometry = new THREE.CylinderGeometry(0.8, 1, 7, 8);
      const finger = new THREE.Mesh(fingerGeometry, handMaterial);
      finger.position.set(-3 + i * 1.5, 8, 0);
      finger.rotation.z = 0.2;
      rightHand.add(finger);
      rightFingers.push(finger);
    }
    
    rightHand.position.set(20, 35, 10);
    scene.add(rightHand);

    // Left hand holding bowl (partially visible)
    const leftHand = new THREE.Group();
    const leftPalm = new THREE.Mesh(
      new THREE.BoxGeometry(7, 10, 4),
      handMaterial
    );
    leftHand.add(leftPalm);
    leftHand.position.set(-25, 30, 5);
    leftHand.rotation.z = 0.3;
    scene.add(leftHand);

    // Bowl/basket
    const bowlGeometry = new THREE.CylinderGeometry(10, 8, 6, 16, 1, true);
    const bowlMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe0e0e0,
      side: THREE.DoubleSide,
      roughness: 0.6
    });
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowl.position.set(-22, 28, 8);
    bowl.rotation.x = 0.2;
    scene.add(bowl);

    // Tomatoes in bowl
    const tomatoesInBowl: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const tomatoGeometry = new THREE.SphereGeometry(2, 12, 12);
      const tomatoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff3333,
        roughness: 0.4
      });
      const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      tomato.position.set(
        -22 + (Math.random() - 0.5) * 8,
        28 + Math.random() * 2,
        8 + (Math.random() - 0.5) * 8
      );
      scene.add(tomato);
      tomatoesInBowl.push(tomato);
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.015;

      // Realistic picking motion
      const pickCycle = Math.sin(time * 1.3);
      const isPicking = pickCycle < 0;
      
      // Right hand reaches down to pick
      rightHand.position.y = 35 + pickCycle * 12;
      rightHand.position.z = 10 + (isPicking ? -pickCycle * 18 : 0);
      rightHand.rotation.x = (isPicking ? -pickCycle * 0.5 : 0);
      rightHand.rotation.z = -0.1 + pickCycle * 0.15;

      // Fingers curl when picking
      rightFingers.forEach((finger, i) => {
        const curlAmount = isPicking ? Math.abs(pickCycle) * 0.6 : 0;
        finger.rotation.z = 0.2 + curlAmount + i * 0.05;
      });

      // Plant sway in breeze
      plants.forEach((plant, i) => {
        plant.rotation.z = Math.sin(time * 0.4 + i * 0.2) * 0.06;
      });

      // Subtle breathing camera movement
      camera.position.y = 60 + Math.sin(time * 0.4) * 1.5;
      camera.rotation.x = -Math.PI / 3 + Math.sin(time * 0.3) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
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
