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
camera.position.set(-10, 30, 30);
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

initActionKeyboard();

function initActionKeyboard() {
  const onKeyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        canJump = false;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
}

scene.background = new THREE.Color("#A6c098");

const gltfLoader = new GLTFLoader();

gltfLoader.load("./assets/data/sinhnhatbacho.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(100, 100, 100);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}

// INIT 3D
// Check whether the browser has support WebGL
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  document.getElementById("container").appendChild(renderer.domElement);
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
