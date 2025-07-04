// // script.js
// import './style.css';
// import Lenis from '@studio-freight/lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// gsap.registerPlugin(ScrollTrigger);

// window.onload = () => {
//   const loadingSpinner = document.createElement('div');
//   loadingSpinner.className = 'loading-spinner';
//   loadingSpinner.innerHTML = '<div class="spinner"></div>';
//   document.body.appendChild(loadingSpinner);

//   const lenis = new Lenis();
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => lenis.raf(time * 1000));
//   gsap.ticker.lagSmoothing(0);

//   const headerSplit = new SplitType(".type-1", { types: "chars" });
//   const titleSplit = new SplitType(".tooltip .title h2", { types: "lines" });
//   const descSplit = new SplitType(".tooltip .description p", { types: "lines" });

//   gsap.set(".type-1 .char", { yPercent: 100 });
//   gsap.set(".tooltip .title .line", { yPercent: 100 });
//   gsap.set(".tooltip .description .line", { yPercent: 100 });

//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top center",
//     onEnter: () => {
//       gsap.to(".type-1 .char", {
//         yPercent: 0,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.025,
//       });
//     },
//   });

//   ScrollTrigger.create({
//     trigger: ".tooltip",
//     start: "top center",
//     onEnter: () => {
//       gsap.to(".tooltip .title .line", {
//         yPercent: 0,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.05,
//       });
//       gsap.to(".tooltip .description .line", {
//         yPercent: 0,
//         duration: 1,
//         ease: "power3.out",
//         delay: 0.3,
//         stagger: 0.05,
//       });
//       gsap.to(".tooltip .divider", {
//         scaleX: 1,
//         duration: 1,
//         ease: "power2.out",
//       });
//     },
//   });

//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setClearColor(0x000000, 0);

//   const container = document.querySelector(".model-container");
//   container.appendChild(renderer.domElement);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//   dirLight.position.set(5, 5, 5);
//   scene.add(dirLight);

//   let model;
//   const loader = new GLTFLoader();
//   loader.load(
//     "/shoe.glb",
//     (gltf) => {
//       model = gltf.scene;
//       model.scale.set(1.5, 1.5, 1.5);
//       model.visible = false;
//       scene.add(model);

//       const box = new THREE.Box3().setFromObject(model);
//       const size = box.getSize(new THREE.Vector3());
//       const center = box.getCenter(new THREE.Vector3());
//       model.position.sub(center);

//       const maxDim = Math.max(size.x, size.y, size.z);
//       camera.position.z = maxDim * 2.5;
//       camera.lookAt(0, 0, 0);

//       loadingSpinner.remove();

//       gsap.fromTo(
//         model.scale,
//         { x: 0, y: 0, z: 0 },
//         {
//           x: 1.5,
//           y: 1.5,
//           z: 1.5,
//           duration: 1,
//           ease: "power3.out",
//           onStart: () => (model.visible = true),
//         }
//       );
//     },
//     (xhr) => console.log(`Model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`),
//     (error) => {
//       console.error("Failed to load model:", error);
//       alert("Model failed to load: Check file path or network tab.");
//     }
//   );

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }
//   animate();

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });

//   // Scroll-based model rotation and mask animation
//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top top",
//     end: "+=2000",
//     scrub: true,
//     pin: true,
//     onUpdate: (self) => {
//       if (model) model.rotation.y = self.progress * Math.PI * 2;
//       const maskSize = gsap.utils.clamp(0, 100, self.progress * 150);
//       document.querySelector(".circular-mask").style.clipPath = `circle(${maskSize}% at 50% 60%)`;
//     },
//   });

//   // Horizontal scroll for text
//   const typeList = document.querySelector(".product-overview ul");
//   gsap.set(typeList, { xPercent: 0 });

//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top top",
//     end: "+=1000",
//     scrub: true,
//     onUpdate: (self) => {
//       gsap.to(typeList, {
//         xPercent: -self.progress * 100,
//         ease: "none",
//         overwrite: true,
//       });
//     },
//   });
// };


// script.js


// import './style.css';
// import Lenis from '@studio-freight/lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// gsap.registerPlugin(ScrollTrigger);

// window.onload = () => {
//   const loadingSpinner = document.createElement('div');
//   loadingSpinner.className = 'loading-spinner';
//   loadingSpinner.innerHTML = '<div class="spinner"></div>';
//   document.body.appendChild(loadingSpinner);

//   const lenis = new Lenis();
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => lenis.raf(time * 1000));
//   gsap.ticker.lagSmoothing(0);

//   const headerSplit = new SplitType(".type-1", { types: "chars" });
  

//   gsap.set(".type-1 .char", { yPercent: 100 });


//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top center",
//     onEnter: () => {
//       gsap.to(".type-1 .char", {
//         yPercent: 0,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.025,
//       });
//     },
//   });



//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setClearColor(0x000000, 0);

//   const container = document.querySelector(".model-container");
//   container.appendChild(renderer.domElement);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//   dirLight.position.set(5, 5, 5);
//   scene.add(dirLight);

//   let model;
//   const loader = new GLTFLoader();
//   loader.load(
//     "/nike_air_zoom_pegasus_36 (1).glb",
//     (gltf) => {
//       model = gltf.scene;
//       model.scale.set(1.5, 1.5, 1.5);
//       model.visible = false;
//       scene.add(model);

//       const box = new THREE.Box3().setFromObject(model);
//       const size = box.getSize(new THREE.Vector3());
//       const center = box.getCenter(new THREE.Vector3());
//       model.position.sub(center);

//       const maxDim = Math.max(size.x, size.y, size.z);
//       camera.position.z = maxDim * 2.5;
//       camera.lookAt(0, 0, 0);

//       loadingSpinner.remove();

//       gsap.fromTo(
//         model.scale,
//         { x: 0, y: 0, z: 0 },
//         {
//           x: 1.5,
//           y: 1.5,
//           z: 1.5,
//           duration: 1,
//           ease: "power3.out",
//           onStart: () => (model.visible = true),
//         }
//       );
//     },
//     (xhr) => console.log(`Model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`),
//     (error) => {
//       console.error("Failed to load model:", error);
//       alert("Model failed to load: Check file path or network tab.");
//     }
//   );


//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   }
//   animate();

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });

//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top top",
//     end: "+=2000",
//     scrub: true,
//     pin: true,
//     onUpdate: (self) => {
//       if (model) model.rotation.y = self.progress * Math.PI * 2;
//       const maskSize = gsap.utils.clamp(0, 100, self.progress * 150);
//       document.querySelector(".circular-mask").style.clipPath = `circle(${maskSize}% at 50% 60%)`;
//     },
//   });

//   const typeList = document.querySelector(".product-overview ul");
//   gsap.set(typeList, { xPercent: 0 });

//   ScrollTrigger.create({
//     trigger: ".product-overview",
//     start: "top top",
//     end: "+=1000",
//     scrub: true,
//     onUpdate: (self) => {
//       gsap.to(typeList, {
//         xPercent: -self.progress * 100,
//         ease: "none",
//         overwrite: true,
//       });
//     },
//   });

//   // Replace intro headline
//   const intro = document.querySelector(".intro .content") || document.querySelector(".intro");
//   if (intro) {
//     intro.innerHTML = `
//       <h1 style="font-size: 8vw; font-weight: 900; color: white; text-align: center; text-transform: uppercase; letter-spacing: -0.05em;">
//         Nike: Built to Move You
//       </h1>
//     `;
//   }
// };







// script.js
import './style.css';
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
  const loader = new GLTFLoader();
  loader.load("/shoe.glb", (gltf) => {
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
  },   (xhr) => {
    console.log(`📦 Model loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('❌ Failed to load model:', error);
    alert('❌ Model failed to load. Check console.');
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