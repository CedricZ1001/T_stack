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

var div = document.createElement("div");
div.style.width = "200px";
div.style.height = "200px";
div.style.position = "fixed";
div.style.left = 0;
div.style.top = 0;
div.style.color = "#ffffff";
document.body.appendChild(div);

// loadder
let event = {};

event.onLoad = function () {
  console.log("over");
};
event.onProgress = function (url, num, total) {
  console.log("加载图片：", url);
  let value = ((num / total) * 100).toFixed(2) + "%";
  console.log("图片加载进度：", value);
  div.innerHTML = value;
};
event.onError = function (e) {
  console.log("图片加载错误");
  console.log(e);
};

// set loader controller
const loadingMannager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);

// ##load texture
const textureLoader = new THREE.TextureLoader(loadingMannager);
const texture = textureLoader.load("./texture/kuriipa.jpg");
const bricks_col = textureLoader.load(
  "./texture/BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_COL_2K_METALNESS.png"
);
const bricks_nrm = textureLoader.load(
  "./texture/BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_NRM_2K_METALNESS.png"
);
const bricks_bum = textureLoader.load(
    "./texture/BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_BUMP_2K_METALNESS.png"
);
const bricks_ao = textureLoader.load(
  "./texture/BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_AO_2K_METALNESS.png"
);
const bricks_rough = textureLoader.load(
    "./texture/BricksReclaimedWhitewashedOffset001/BricksReclaimedWhitewashedOffset001_ROUGHNESS_2K_METALNESS.png"
);

const bronze_col = textureLoader.load(
    "./texture/MetalBronzeWorn001/MetalBronzeWorn001_COL_2K_METALNESS.png"
);
const bronze_nrm = textureLoader.load(
    "./texture/MetalBronzeWorn001/MetalBronzeWorn001_NRM_2K_METALNESS.png"
);
const bronze_bum = textureLoader.load(
    "./texture/MetalBronzeWorn001/MetalBronzeWorn001_BUMP_2K_METALNESS.png"
);
const bronze_rough = textureLoader.load(
    "./texture/MetalBronzeWorn001/MetalBronzeWorn001_ROUGHNESS_2K_METALNESS.png"
);
const bronze_metal = textureLoader.load(
    "./texture/MetalBronzeWorn001/MetalBronzeWorn001_METALNESS_2K_METALNESS.png"
);


texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestMipMapLinearFilter;

// ##add object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
  map: texture,
  roughness: 0.15,
  metalness: 0.15,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
console.log(cubeGeometry);
// cube.position.set(3,0,0);
// cube.rotation.set(Math.PI/4,0,0);
scene.add(cube);


const circleGeometry = new THREE.SphereGeometry(0.8)
const circleMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map:bricks_col,
    aoMap:bricks_ao,
    aoMapIntensity:1,
    bumpMap:bricks_bum,
    bumpScale:1,
    normalMap:bricks_nrm,
    roughnessMap:bricks_rough
})

const circle = new THREE.Mesh(circleGeometry,circleMaterial);
circle.position.set(0,2,0);
scene.add(circle);


const metalGeometry = new THREE.SphereGeometry(0.8)
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map:bronze_col,
    bumpMap:bronze_bum,
    normalMap:bronze_nrm,
    roughnessMap:bronze_rough,
    metalnessMap:bronze_metal,
    metalness:0.9
})

const metal = new THREE.Mesh(metalGeometry,metalMaterial);
metal.position.set(2,2,0);
scene.add(metal);


//##light
// #ambientlight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);
// #directionlight
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(10, 10, 10);
scene.add(directionLight);

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

var folder_1 = gui.addFolder("set cube");

const cube_params = {
  cube_color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 20, duration: 5, yoyo: true, repeat: 1 });
  },
};

const light_params = {
  ambient_color: "#ffffff",
  direction_color: "#ffffff",
};

//set color
folder_1.addColor(cube_params, "cube_color").onChange((value) => {
  console.log("color has been changed", value);
  cube.material.color.set(value);
});

//set visible

folder_1.add(cube_params, "fn").name("move");
folder_1.add(cube.material, "wireframe");
folder_1.add(cube, "visible").name("visible");
folder_1.add(cube.position, "x").min(0).max(20).step(0.01).name("x轴");
//   .onChange((value) => {
//     console.log("value has been changed", value);
//   })
//   .onFinishChange((value) => {
//     console.log("change is completed", value);
//   });
var material = folder_1.addFolder("material");
material.add(cube.material, "roughness").min(0).max(1).step(0.01);
material.add(cube.material, "metalness").min(0).max(1).step(0.01);

var folder_2 = gui.addFolder("set light");
folder_2.addColor(light_params, "ambient_color").onChange((value) => {
  ambientLight.color.set(value);
});
folder_2
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("ab_intensity");
folder_2.addColor(light_params, "direction_color").onChange((value) => {
  directionLight.color.set(value);
});
folder_2
  .add(directionLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("dr_intensity");

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
