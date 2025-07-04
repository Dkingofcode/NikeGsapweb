// import './style.css';
// import Lenis from '@studio-freight/lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// const container = document.getElementById('canvas-container');

// gsap.registerPlugin(ScrollTrigger);

// window.onload = () => {
//    if (typeof Lenis === "undefined") {
//     alert("❌ Lenis not loaded!");
//     return;
//   }
//   // Initialize smooth scroll
//   const lenis = new Lenis();
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => lenis.raf(time * 1000));
//   gsap.ticker.lagSmoothing(0);

//   // Text splitting using SplitType
//   const headerSplit = new SplitType(".type-1", { types: "chars" });
//   const titleSplit = new SplitType(".tooltip .title h2", { types: "lines" });
//   const descSplit = new SplitType(".tooltip .description p", { types: "lines" });

//   // Animate text in
//   gsap.set(".type-1 .char", { yPercent: 100 });
//   gsap.set(".tooltip .title .line", { yPercent: 100 });
//   gsap.set(".tooltip .description .line", { yPercent: 100 });

  
//   // Model rotation on scroll
//     ScrollTrigger.create({
//       trigger: "body", // or "body" or a section
//       start: "top top",
//       end: "bottom bottom",
//       scrub: true,
//       onUpdate: (self) => {
//         if (model) {
//           model.rotation.y = self.progress * Math.PI * 2;
//         }
//       },
//     });
  
  


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
//   })
// }


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   60,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 10;

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// container.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);



// let model;
// const loader = new GLTFLoader();




// loader.load(
//   '/shoe.glb',
//   (gltf) => {
//     console.log('✅ Model loaded successfully');
//     model = gltf.scene;
//     model.scale.set(0.1, 0.1, 0.1);
//     model.position.y = -0.5;
//     scene.add(model);

    
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center); // center the model
//   },
//   (xhr) => {
//     console.log(`📦 Model loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
//   },
//   (error) => {
//     console.error('❌ Failed to load model:', error);
//     alert('❌ Model failed to load. Check console.');
//   }
// );

// function animate() {
//   requestAnimationFrame(animate);
  
//   renderer.render(scene, camera);
// }
// animate();

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });




import './style.css';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const container = document.getElementById('canvas-container');
let model;

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('/shoe.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.position.y = -0.5;
  scene.add(model);

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
}, undefined, (error) => console.error('Model failed to load:', error));

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

ScrollTrigger.create({
  trigger: ".canvas-section",
  start: "top top",
  end: "+=3000",
  scrub: true,
  pin: true,
  onUpdate: (self) => {
    if (model) {
      model.rotation.y = self.progress * Math.PI * 2;
    }
    const circle = document.querySelector(".circular-mask");
    if (circle) {
      if (self.progress > 0.25) {
        const size = gsap.utils.clamp(0, 100, (self.progress - 0.25) * 300);
        circle.style.clipPath = `circle(${size}% at 50% 60%)`;
      } else {
        circle.style.clipPath = `circle(0% at 50% 60%)`;
      }
    }
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onload = () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const headerSplit = new SplitType(".type-1", { types: "chars" });
  const titleSplit = new SplitType(".tooltip .title h2", { types: "lines" });
  const descSplit = new SplitType(".tooltip .description p", { types: "lines" });

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

  // Horizontal scroll for headline text while shoe rotates
  const scrollContainer = document.querySelector(".horizontal-scroll");
  const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

  gsap.to(scrollContainer, {
    x: () => `-${scrollWidth}px`,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-section",
      start: "top top",
      end: `+=${scrollWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // Reveal top left and bottom right text during scroll
  gsap.fromTo(".top-left-text", { opacity: 0, y: -50 }, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".horizontal-section",
      start: "right center",
      end: "right+=300 center",
      scrub: true
    }
  });

  gsap.fromTo(".bottom-right-text", { opacity: 0, y: 50 }, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".horizontal-section",
      start: "right center",
      end: "right+=300 center",
      scrub: true
    }
  });

  // Transition to final vertical scroll
  gsap.to(".final-section", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".final-section",
      start: "top bottom",
      end: "top center",
      scrub: true
    }
  });
};




// import './style.css';
// import Lenis from '@studio-freight/lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// gsap.registerPlugin(ScrollTrigger);

// const container = document.getElementById('canvas-container');
// let model;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   60,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 10;

// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// container.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// const loader = new GLTFLoader();
// loader.load(
//   '/shoe.glb',
//   (gltf) => {
//     model = gltf.scene;
//     model.scale.set(0.1, 0.1, 0.1);
//     model.position.y = -0.5;
//     scene.add(model);

//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center);
//   },
//   (xhr) => console.log(`Model loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`),
//   (error) => console.error('Model failed to load:', error)
// );

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
// animate();

// ScrollTrigger.create({
//   trigger: ".canvas-section",
//   start: "top top",
//   end: "+=5000",
//   scrub: true,
//   pin: true,
//   onUpdate: (self) => {
//     if (model) {
//       model.rotation.y = self.progress * Math.PI * 2;
//       model.position.x = self.progress * 5 - 2.5; // horizontal move
//     }
//     const circle = document.querySelector(".circular-mask");
//     if (circle) {
//       if (self.progress > 0.25) {
//         const size = gsap.utils.clamp(0, 100, (self.progress - 0.25) * 300);
//         circle.style.clipPath = `circle(${size}% at 50% 60%)`;
//       } else {
//         circle.style.clipPath = `circle(0% at 50% 60%)`;
//       }
//     }
//   }
// });

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// window.onload = () => {
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

//   gsap.to("body", {
//     backgroundColor: "#000",
//     scrollTrigger: {
//       trigger: ".canvas-section",
//       start: "top top",
//       end: "bottom center",
//       scrub: true
//     }
//   });

//   gsap.fromTo(".canvas-section .headline", {
//     opacity: 0,
//     y: 60,
//     color: "#000"
//   }, {
//     opacity: 1,
//     y: 0,
//     color: "#000",
//     scrollTrigger: {
//       trigger: ".canvas-section",
//       start: "top center",
//       end: "center center",
//       scrub: true
//     }
//   });

//   gsap.fromTo(".top-left-text", {
//     opacity: 0,
//     y: -50
//   }, {
//     opacity: 1,
//     y: 0,
//     scrollTrigger: {
//       trigger: ".canvas-section",
//       start: "60% center",
//       end: "bottom center",
//       scrub: true
//     }
//   });

//   gsap.fromTo(".bottom-right-text", {
//     opacity: 0,
//     y: 50
//   }, {
//     opacity: 1,
//     y: 0,
//     scrollTrigger: {
//       trigger: ".canvas-section",
//       start: "60% center",
//       end: "bottom center",
//       scrub: true
//     }
//   });
// };
