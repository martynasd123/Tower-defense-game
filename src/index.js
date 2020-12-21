import {DefaultLoadingManager, WebGLRenderer} from "three";
import Core, {globals} from "./game/Core";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import './styles.css';

//Finding the canvas element
const canvas = document.querySelector('#frame');
//Initializing WebGL renderer
const renderer = new WebGLRenderer({canvas});

const game = new Core();

//Initializing the loading manager
const loadingManager = DefaultLoadingManager;

/**
 * Specifying 3D models to load.
 */
export const loadedModels = {
  cannon: {
    path: './assets/models/Cannon.gltf'
  },
}

loadingManager.onLoad = () => {
  //Hiding the loader
  document.querySelector('#loadingContainer').style.display = "none";
  //Starting the actual game
  game.init(renderer);
  render(Date.now)
};

const gltfLoader = new GLTFLoader(loadingManager);
for (const model of Object.values(loadedModels)) {
  gltfLoader.load(model.path, (gltf) => {
    model.gltf = gltf;
  });
}

let then = 0;

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(now) {
  // convert to seconds
  globals.time = now * 0.001;
  // make sure delta time isn't too big.
  globals.deltaTime = Math.min(globals.time - then, 1 / 20);
  then = globals.time;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    game.updateRendererDisplaySize(canvas.clientWidth, canvas.clientHeight)
  }

  game.render();

  requestAnimationFrame(render);
}