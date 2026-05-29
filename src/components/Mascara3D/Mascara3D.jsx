"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function createGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, "#9b7fd4");
  gradient.addColorStop(0.3, "#7c5cbf");
  gradient.addColorStop(0.6, "#51398D");
  gradient.addColorStop(1, "#3d2a6b");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

const Mascara3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x51398D, 0.5);
    scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0x8A75B8, 2);
    dir1.position.set(5, 5, 5);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xC4B5D9, 1.5);
    dir2.position.set(-5, 3, -5);
    scene.add(dir2);

    const dir3 = new THREE.DirectionalLight(0x51398D, 1);
    dir3.position.set(0, -5, 3);
    scene.add(dir3);

    let model = null;
    let rotationTarget = 0;
    let currentRotation = 0;

    const gradientTexture = createGradientTexture();

    const loader = new GLTFLoader();
    loader.load("/home/mascara.glb", (gltf) => {
      model = gltf.scene;
      model.rotation.y = 0;
      scene.add(model);

      model.traverse((node) => {
        if (node.isMesh) {
          node.material = node.material.clone();
          node.material.map = gradientTexture;
          node.material.metalness = 0.3;
          node.material.roughness = 0.4;
          node.material.envMapIntensity = 0.8;
          node.material.needsUpdate = true;
        }
      });
    });

    const handleScroll = () => {
      rotationTarget = window.scrollY * 0.005;
    };
    window.addEventListener("scroll", handleScroll);

    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (model) {
        currentRotation += (rotationTarget - currentRotation) * 0.08;
        model.rotation.y = currentRotation;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: "0",
        right: "1rem",
        width: "150px",
        height: "150px",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    />
  );
};

export default Mascara3D;
