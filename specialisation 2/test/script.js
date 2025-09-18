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
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// Load Earth model
const loader = new GLTFLoader();
loader.load(
  "./assets/earth.glb",
  (gltf) => {
    const earth = gltf.scene;
    earth.scale.set(2, 2, 2);
    scene.add(earth);
  },
  undefined,
  (error) => {
    console.error("Error loading Earth model:", error);
  }
);

// Add a test sphere to confirm rendering
const testSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
testSphere.position.set(-5, 0, 0);
scene.add(testSphere);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
