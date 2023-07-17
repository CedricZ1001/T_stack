import * as THREE from "three";

// import controller
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";

import * as dat from "dat.gui";


// console.log(THREE)

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
camera.position.set(0, 0, 10);
scene.add(camera);

// add object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// cube.position.set(3,0,0);

// cube.rotation.set(Math.PI/4,0,0);

scene.add(cube);
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("x轴")
  .onChange((value) => {
    console.log("value has been changed", value);
  })
  .onFinishChange((value) => {
    console.log("change is completed", value);
  });
const params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};

//set color
gui.addColor(params, "color").onChange((value) => {
  console.log("color has been changed", value);
  cube.material.color.set(value);
});
//set visible
gui.add(cube, "visible").name("visible");

gui.add(params,"fn").name("move");

var folder = gui.addFolder("set cube");
folder.add(cube.material, "wireframe");

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// renderer.render(scene,camera);

// create contoller
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// add axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// set clock
// const clock = new THREE.Clock();

// set animation
// var animate1 = gsap.to(cube.position,{
//     y: -5,
//     duration: 5, ease:'circ',
//     repeat: -1,
//     yoyo: true,
//     ease: 'bounce',
//     onComplete:()=>{
//         console.log("animation complete!");
//     },
//     onStart: () =>{
//         console.log("animation Start !");
//     },
// });
// var animate2 = gsap.to(cube.rotation,{
//     y: 2*Math.PI,
//     duration: 5,
//     repeat: -1,
//     yoyo: true,
//     ease: 'bounce',
//     onComplete:()=>{
//         console.log("animation complete!");
//     },
//     onStart: () =>{
//         console.log("animation Start !");
//     },
// });

// stop the animation
// window.addEventListener("dblclick",() =>{
//     if(animate1.isActive()){
//         animate1.pause();
//         animate2.pause();
//     }
//     else{
//         animate1.resume();
//         animate2.resume();
//     }
// })

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
