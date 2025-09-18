import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

// 🌌 Starfield
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 2000;
}
starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(starPositions, 3)
);
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// 🎥 Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 20);

camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

// 🕹️ Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 💡 Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // brighter
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 🌍 Earth
let earth;
const loader = new GLTFLoader();
loader.load(
  "assets/earth.glb",
  (gltf) => {
    console.log();
    earth = gltf.scene;
    earth.scale.set(2, 2, 2); // Adjust size if needed
    earth.position.set(0, 0, 0); // Center it
    scene.add(earth);
  },
  undefined,
  (error) => {
    console.error("Error loading GLB:", error);
  }
);

// 🌑 Moon
const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaff });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(5, 0, 0);
scene.add(moon);

// 🎵 Audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
const panner = audioCtx.createStereoPanner();

oscillator.type = "sine";
oscillator.frequency.value = 440;
gainNode.gain.value = 0.2;

oscillator.connect(gainNode).connect(panner).connect(audioCtx.destination);
oscillator.start();

// 🖱️ Dragging
let dragging = false;
window.addEventListener("mousedown", () => {
  dragging = true;
  audioCtx.resume(); // resume context on user gesture
});
window.addEventListener("mouseup", () => (dragging = false));
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, intersection);
  moon.position.copy(intersection);
});

// 🔁 Animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Earth spin
  if (earth) earth.rotation.y += 0.005;

  // Star blink
  const blink = 0.6 + 0.4 * Math.sin(Date.now() * 0.001);
  starMaterial.color.setRGB(blink, blink, blink);

  // Audio mapping
  const delta = moon.position.clone().sub(new THREE.Vector3(0, 0, 0));
  const distance = delta.length();
  const angle = Math.atan2(delta.y, delta.x);

  oscillator.frequency.value = THREE.MathUtils.clamp(
    (1 / distance) * 440,
    220,
    880
  );
  panner.pan.value = Math.sin(angle);

  renderer.render(scene, camera);
}
animate();
