import {DefaultLoadingManager, WebGLRenderer} from "three";
import Core from "./game/Core";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import './styles.css';

//Finding the canvas element
const canvas = document.querySelector('#frame');
//Initializing WebGL renderer
const renderer = new WebGLRenderer({canvas});

const game = new Core();

//Initializing the loading manager
const loadingManager = DefaultLoadingManager;

loadingManager.onLoad = () => {
  //Hiding the loader
  document.querySelector('#loadingContainer').style.display = "none";
  //Starting the actual game
  game.init(renderer);
};

//Specifying 3D models to load
const modelsToLoad = {
  cannon: {
    path: './assets/models/Cannon.gltf'
  },
}

const gltfLoader = new GLTFLoader(loadingManager);
for (const model of Object.values(modelsToLoad)) {
  gltfLoader.load(model.path, (gltf) => {
    model.gltf = gltf;
  });
}