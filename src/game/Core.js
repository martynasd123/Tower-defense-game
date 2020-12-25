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
import {loadedModels, skybox} from "../index";
import {CannonController} from "./component/CannonController";

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
};

export default function Core() {

  let renderer = null;

  this._setUpCamera = function () {
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    globals.camera = new PerspectiveCamera(fov, aspect, near, far);
  }

  this.init = function (GLRenderer) {
    renderer = GLRenderer;

    const { entityManager, scene } = globals;

    scene.background = skybox;

    this._setUpCamera();
    {
      const entity = entityManager.createEntity(globals.camera, 'camera info');
      globals.cameraInfo = entity.addComponent(CameraInfo);
    }
    {
      const playerEntity = entityManager.createEntity(scene, 'Cannon');
      playerEntity.visual.add(loadedModels.cannon.gltf.scene);

      //Positioning the cannon to be on top of the tower
      const cannonPos = [0, 12.3, 0];
      playerEntity.visual.position.set(...cannonPos)
      globals.camera.position.set(...cannonPos).add(new Vector3(5, 5, 0));

      //Adding relevant components
      playerEntity.addComponent(CannonController);
      globals.player = playerEntity;
    }
    {
      const entity = entityManager.createEntity(scene, 'Tower');
      entity.visual.add(loadedModels.tower.gltf.scene);
    }
    {
      const entity = entityManager.createEntity(scene, 'Camera controls');
      entity.addComponent(CameraControlsManager, globals.camera, renderer.domElement);
    }
    {
      const entity = entityManager.createEntity(scene, 'Directional light');
      entity.visual.add(new DirectionalLight(new Color("#abe0f7"), 0.5))
      entity.visual.position.set(0, 5, 10);
    }
    {
      //Adding ambient light to make shadows slightly lighter
      const entity = entityManager.createEntity(scene, 'Ambient light');
      entity.visual.add(new AmbientLight(new Color("white"), 0.05));
      entity.visual.position.set(0, 5, 10);
    }
  }

  this.render = function () {
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