import * as THREE from "three";

// import controller
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";

import * as dat from "dat.gui";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"

// console.log(THREE)

//load hrd 
// const rgbeloader = new RGBELoader();
// rgbeloader.loadAsync("texture/duoduo.jpg").then((texture)=>{
//   scene.background = texture;
// });




// Scene
const scene = new THREE.Scene();



// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);



// set position of camera
camera.position.set(0, 0, 2);
scene.add(camera);


//##light
// #ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
// #directionlight
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(10, 10, 10);
scene.add(directionLight);

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const spmaterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry,spmaterial);

sphere.position.set(10,0,0);
scene.add(sphere);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// renderer.render(scene,camera);

// create contoller
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// add axes
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);


// fill scrne
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// gsap.to(cube.position,{y: 5, duration: 5, ease: 'circ'});
// gsap.to(cube.rotation,{y: -2*Math.PI, duration: 5, ease: 'circ'});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render(time) {
  controls.update();

  // let time = clock.getElapsedTime();
  // let deltatime = clock.getDelta();
  // console.log(time);
  // console.log(deltatime);
  // console.log(time);
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;
  // if(cube.position.x>=5){
  //     cube.position.x=0;
  // }

  // let t = time/1000 % 5;
  // cube.position.x = t*1;
  // cube.rotation.x = t*1;
  // if(cube.position.x>=5){
  //     cube.position.x=0;
  // }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
