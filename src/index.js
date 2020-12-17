import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

const canvas = document.querySelector('#frame');

const renderer = new WebGLRenderer({canvas});

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new MeshBasicMaterial({color: 0x44aa88});

const cube = new Mesh(geometry, material);

scene.add(cube);

renderer.render(scene, camera);
