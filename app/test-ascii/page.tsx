'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TestAscii() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

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
    const fingers = [];
    for (let i = 0; i < 4; i++) {
      const finger = new THREE.Mesh(fingerGeometry, handMaterial);
      finger.position.set(-70 + i * 12, 90, 0);
      scene.add(finger);
      fingers.push(finger);
    }

    // Create "tomatoes" (spheres)
    const tomatoGeometry = new THREE.SphereGeometry(20, 16, 16);
    const tomatoMaterial = new THREE.MeshPhongMaterial({ color: 0xff3333 });
    const tomatoes = [];
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
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3d7a3d, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -100;
    scene.add(ground);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // ASCII Effect setup
    const asciiChars = ' .:-=+*#%@';
    const asciiDiv = document.createElement('div');
    asciiDiv.style.fontFamily = 'monospace';
    asciiDiv.style.fontSize = '10px';
    asciiDiv.style.lineHeight = '10px';
    asciiDiv.style.color = '#00ff00';
    asciiDiv.style.backgroundColor = '#000000';
    asciiDiv.style.whiteSpace = 'pre';
    asciiDiv.style.overflow = 'hidden';
    asciiDiv.style.width = '100%';
    asciiDiv.style.height = '100%';
    container.appendChild(asciiDiv);

    const cols = Math.floor(width / 6);
    const rows = Math.floor(height / 10);

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

      // Render to canvas
      renderer.render(scene, camera);

      // Convert to ASCII
      const imageData = renderer.domElement.toDataURL();
      const img = new Image();
      img.src = imageData;
      
      // Simple ASCII conversion
      renderer.domElement.toBlob((blob) => {
        if (!blob) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = cols;
        canvas.height = rows;
        
        const tempImg = new Image();
        tempImg.onload = () => {
          ctx.drawImage(tempImg, 0, 0, cols, rows);
          const imageData = ctx.getImageData(0, 0, cols, rows);
          let ascii = '';
          
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const i = (y * cols + x) * 4;
              const r = imageData.data[i];
              const g = imageData.data[i + 1];
              const b = imageData.data[i + 2];
              const brightness = (r + g + b) / 3;
              const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
              ascii += asciiChars[charIndex];
            }
            ascii += '\n';
          }
          asciiDiv.textContent = ascii;
        };
        tempImg.src = URL.createObjectURL(blob);
      });
    };

    animate();

    // Cleanup
    return () => {
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
        overflow: 'hidden'
      }}
    />
  );
}
