import './style.css';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const container = document.getElementById('canvas-container');

gsap.registerPlugin(ScrollTrigger);

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

  
  // Model rotation on scroll
    ScrollTrigger.create({
      trigger: "body", // or "body" or a section
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (model) {
          model.rotation.y = self.progress * Math.PI * 2;
        }
      },
    });
  
  


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
  })
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);



let model;
const loader = new GLTFLoader();




loader.load(
  '/shoe.glb',
  (gltf) => {
    console.log('✅ Model loaded successfully');
    model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    model.position.y = -0.5;
    scene.add(model);

    
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); // center the model
  },
  (xhr) => {
    console.log(`📦 Model loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('❌ Failed to load model:', error);
    alert('❌ Model failed to load. Check console.');
  }
);

function animate() {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
