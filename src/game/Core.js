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

const towerPositions = [new Vector3(25,15,25), new Vector3(-25,15,-25), new Vector3(-25,15,25), new Vector3(25,15,-25) ]

const controllableTower = 0;

export default function Core() {

  const { models, skyboxes } = Assets;

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

    scene.background = skyboxes.sky.skybox;

    this._setUpCamera();
    {
      const entity = entityManager.createEntity(globals.camera, 'camera info');
      globals.cameraInfo = entity.addComponent(CameraInfo);
    }
    towerPositions.forEach((towerPosition, index) => {
      const tower = entityManager.createEntity(scene, `Tower-${index + 1}`);
      tower.visual.add(SkeletonUtils.clone(models.tower.gltf.scene));

      const playerEntity = entityManager.createEntity(scene, `Cannon-${index + 1}`);

      //Cannon is a child of tower
      tower.visual.attach(playerEntity.visual);

      playerEntity.visual.add(SkeletonUtils.clone(models.cannon.gltf.scene));

      const cannonPos = [0, 12.3, 0];
      playerEntity.visual.position.set(...cannonPos)
      globals.camera.position.set(...cannonPos).add(new Vector3(5, 5, 0));

      tower.visual.position.set(towerPosition.x, towerPosition.y, towerPosition.z);

      //Adding relevant components
      if(index === controllableTower) {
        playerEntity.addComponent(CannonController);
        globals.player = playerEntity;
      }
    })

    {
      const entity = entityManager.createEntity(scene, 'Camera controls');
      entity.addComponent(CameraControlsManager, globals.camera, renderer.domElement);
    }
    {
      const entity = entityManager.createEntity(scene, 'Directional light');
      entity.visual.add(new DirectionalLight(new Color("#abe0f7"), 0.6))
      entity.visual.position.set(0, 5, 10);
    }
    {
      //Adding ambient light to make shadows slightly lighter
      const entity = entityManager.createEntity(scene, 'Ambient light');
      entity.visual.add(new AmbientLight(new Color("white"), 0.2));
      entity.visual.position.set(0, 5, 10);
    }
    {
      const entity = entityManager.createEntity(scene, 'Terrain');
      entity.visual.add(models.terrain.gltf.scene);
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