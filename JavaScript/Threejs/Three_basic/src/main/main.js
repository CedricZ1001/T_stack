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
camera.position.set(0, 0, 2);
scene.add(camera);

// ##load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./texture/kuriipa.jpg");

texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestMipMapLinearFilter;

// ##add object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
console.log(cubeGeometry);
// cube.position.set(3,0,0);
// cube.rotation.set(Math.PI/4,0,0);
scene.add(cube);

//##light
const light = new THREE.AmbientLight(0xffffff,1);
scene.add(light);

// #bufferGeometry
// for (let i = 0; i < 50; i++) {
//   const geometry = new THREE.BufferGeometry();
//   const positionarray = new Float32Array(9);
//   for (let j = 0; j < 9; j++) {
//     positionarray[j] = Math.random() * 10 - 5;
//   }
//   geometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(positionarray, 3)
//   );
//   let color = new THREE.Color(Math.random(), Math.random(), Math.random());
//   const material = new THREE.MeshBasicMaterial({
//     color: color,
//     transparent: true,
//     opacity: 0.5,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   console.log(mesh);
//   scene.add(mesh);
// }

// ##GUI
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

const cube_params = {
  cube_color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};

const light_params = {
    ambient_color:"#ffffff",
    
  };


//set color
gui.addColor(cube_params, "cube_color").onChange((value) => {
  console.log("color has been changed", value);
  cube.material.color.set(value);
});

//set visible

gui.add(cube_params, "fn").name("move");

var folder_1 = gui.addFolder("set cube");
folder_1.add(cube.material, "wireframe");
folder_1.add(cube, "visible").name("visible");

var folder_2 = gui.addFolder("set light");
folder_2.addColor(light_params,"ambient_color").onChange((value)=>{
    light.color.set(value);
})
folder_2.add(light,"intensity").min(0).max(1).step(0.01);



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
