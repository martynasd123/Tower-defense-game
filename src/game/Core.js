import {
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import {EntityManager} from "../engine/core/EntityManager";
import {CameraInfo} from "./component/CameraInfo";
import {InputManager} from "../engine/core/InputManager";
import {CameraControlsManager} from "./component/CameraControlsManager";
import {CannonController} from "./component/CannonController";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import Assets from "./Assets";
import ServerManager from "../engine/core/network/ServerManager";

export const globals = {

  /**
   * Primary camera for this game
   */
  camera: PerspectiveCamera || null,

  /**
   * Global CameraInfo component instance
   */
  cameraInfo: CameraInfo || null,

  /**
   * Global input manager that manages key events.
   */
  inputManager: new InputManager({
    up: [
      'ArrowUp',
    ],
    down: [
      'ArrowDown',
    ],
    right: [
      'ArrowRight',
    ],
    left: [
      'ArrowLeft',
    ],
    shoot: [
      'Space',
    ],
  }),

  /**
   * Class that manages all the entities
   */
  entityManager: new EntityManager(),

  /**
   * Scene in which all objects are rendered
   */
  scene: new Scene(),

  domElement: HTMLElement || null,

  serverManager: ServerManager || null,
};

const towerPositions = [new Vector3(25,15,25), new Vector3(-25,15,-25), new Vector3(-25,15,25), new Vector3(25,15,-25) ]

const controllableTower = 0;

export default function Core() {

  const { models, skyboxes } = Assets;

  let renderer = null;

  let receivedGameState = false;

  this._setUpCamera = function () {
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    globals.camera = new PerspectiveCamera(fov, aspect, near, far);
  }

  this.init = function (GLRenderer, serverManager) {
    renderer = GLRenderer;

    globals.domElement = renderer.domElement;
    globals.serverManager = serverManager;

    const { entityManager, scene } = globals;

    scene.background = skyboxes.sky.skybox;

    serverManager.onRoomStateChange((state) => {
      const stateParsed = JSON.parse(JSON.stringify(state)).gameState;
      entityManager.updateState(stateParsed);
      receivedGameState = true;
    })

    this._setUpCamera();
  }

  this.render = function () {
    if(!receivedGameState)
      return;

    globals.entityManager.update();
    globals.inputManager.update();
    renderer.render(globals.scene, globals.camera);
  }

  this.updateRendererDisplaySize = function (width, height) {
    const {camera} = globals;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}