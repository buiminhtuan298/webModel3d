import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 0.5, 2);
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//aaaa
function light() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-60, 100, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;
  scene.add(dirLight);
}
light();

scene.background = new THREE.Color("#A6c098");

const gltfLoader = new GLTFLoader();

let mixer;
const clock = new THREE.Clock();
gltfLoader.load("./assets/data/face2.glb", (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0, -0.5, 0);

  mixer = new THREE.AnimationMixer(model);
  const animation = mixer.clipAction(gltf.animations[0]);

  animation.play();
});

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.minDistance = 0;
control.maxDistance = 100;
control.enablePan = false;
control.maxPolarAngle = Math.PI / 2 - 0.05;
control.update();

// ANIMATION
function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}
let addd = 20;
// INIT 3D
// Check whether the browser has support WebGL
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  document.getElementById("container").appendChild(renderer.domElement);
  addd = 2;
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
