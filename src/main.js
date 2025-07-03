// script.js

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Your full logic using Lenis and Three.js here...


window.onload = () => {
   if (typeof Lenis === "undefined") {
    alert("❌ Lenis not loaded!");
    return;
  }
  // Initialize smooth scroll
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Text splitting using SplitType
  const headerSplit = new SplitType(".type-1", { types: "chars" });
  const titleSplit = new SplitType(".tooltip .title h2", { types: "lines" });
  const descSplit = new SplitType(".tooltip .description p", { types: "lines" });

  // Animate text in
  gsap.set(".type-1 .char", { yPercent: 100 });
  gsap.set(".tooltip .title .line", { yPercent: 100 });
  gsap.set(".tooltip .description .line", { yPercent: 100 });

  ScrollTrigger.create({
    trigger: ".product-overview",
    start: "top center",
    onEnter: () => {
      gsap.to(".type-1 .char", {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.025,
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".tooltip",
    start: "top center",
    onEnter: () => {
      gsap.to(".tooltip .title .line", {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      });
      gsap.to(".tooltip .description .line", {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        stagger: 0.05,
      });
      gsap.to(".tooltip .divider", {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
      });
    },
  });

  // THREE.js Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);

  const container = document.querySelector(".model-container");
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Load model
  let model;
  const loader = new THREE.GLTFLoader();
  loader.load("shoe.glb", (gltf) => {
    console.log("✅ Model Loaded");
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.x += (model.position.x - center.x);
    model.position.y += (model.position.y - center.y);
    model.position.z += (model.position.z - center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 2.5;
    camera.lookAt(0, 0, 0);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
