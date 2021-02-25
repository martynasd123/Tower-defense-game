import {
  PerspectiveCamera,
  Scene,
} from "three";
import {EntityManager} from "../engine/core/EntityManager";
import {CameraInfo} from "./component/CameraInfo";
import {InputManager} from "../engine/core/InputManager";
import Assets from "./Assets";
import ServerManager from "../engine/core/network/ServerManager";

export let globals = {

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
    up: {
      keyCode: 'KeyW',
      value: 2,
    },
    down: {
      keyCode: 'KeyS',
      value: 3,
    },
    right: {
      keyCode: 'KeyD',
      value: 1,
    },
    left: {
      keyCode: 'KeyA',
      value: 0,
    },
    shoot: {
      keyCode: 'Space',
      value: 4,
    },
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
  moves: {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
    SHOOT: 4,
  },
};

let moveTracked = -1;
let moveTrackedTimes = new Date().getTime();

export default function Core() {

  const { models, skyboxes } = Assets;

  let renderer = null;

  let receivedGameState = false;
  let gameEnded = false;
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
      if (stateParsed?.enumState === 3 && stateParsed?.endScreenTime <= 0) {
        gameEnded = true;
      }
    });

    this._setUpCamera();
  }

  this.getMoveIndex = function (id) {
    const { moves } = globals;
    switch(id) {
      case -1:
      case 0:
        return -1;
      case 1:
          return moves.RIGHT;
      case 2:
          return moves.LEFT;
      case 3:
          return moves.UP;
      case 4:
          return moves.DOWN;
      case 5:
          return moves.SHOOT;  
    }
  }
  
  this.onFingerCount = function (fingerCount) {
    let moveIndex = this.getMoveIndex(fingerCount);
    if (moveTracked !== moveIndex) {
      moveTrackedTimes = new Date().getTime();
      moveTracked = moveIndex;
    }
    // after 1 sec make a move
    if (new Date().getTime() - moveTrackedTimes > 1000 && moveIndex !== -1) {
      globals.serverManager.send("player_input", [moveIndex]);
    }
  
  }

  this.render = function (onEnd, controller) {
    if(!receivedGameState)
      return;
    if (gameEnded) {
      console.log("gameEnded = true")
      onEnd();
      return;
    }
    globals.entityManager.update();
    globals.inputManager.update();
    if (controller === 0) {
      const pressedValues = globals.inputManager.getPressedKeysValues();
      globals.serverManager.send("player_input", pressedValues);
    }
    renderer.render(globals.scene, globals.camera);
  }

  this.updateRendererDisplaySize = function (width, height) {
    const {camera} = globals;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}