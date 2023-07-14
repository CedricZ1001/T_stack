import * as THREE from "three";

// import controller
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// console.log(THREE)

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// set position of camera
camera.position.set(0,0,10);
scene.add(camera);

// add object
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// renderer.render(scene,camera);

// create contoller
const controls = new OrbitControls(camera, renderer.domElement);

// add axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();