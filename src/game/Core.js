import {Camera, Color, DirectionalLight, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer} from "three";
import {EntityManager} from "../engine/core/EntityManager";
import {CameraInfo} from "./component/CameraInfo";
import {Player} from "./component/Player";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {InputManager} from "../engine/core/InputManager";
import {CameraControls} from "./component/CameraControls";
import {loadedModels, skybox} from "../index";

export const globals = {

  /**
   * Primary camera for this game
   */
  camera: null,

  /**
   * Global CameraInfo component instance
   */
  cameraInfo: PerspectiveCamera || null,

  /**
   * Global input manager that manages key events.
   */
  // inputManager: new InputManager([
  //   {
  //     keyCode: 38,
  //     name: 'up'
  //   },
  //   {
  //     keyCode: 40,
  //     name: 'down'
  //   }
  // ]),

};

export default function Core() {

  const entityManager = new EntityManager();


  let renderer = null;

  const scene = new Scene();

  this._setUpCamera = function () {
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    globals.camera = new PerspectiveCamera(fov, aspect, near, far);
  }

  this.init = function(GLRenderer) {
    renderer = GLRenderer;

    scene.background = skybox;

    this._setUpCamera();
    // {
    //   const entity = entityManager.createEntity(globals.camera, 'camera info');
    //   globals.cameraInfo = entity.addComponent(CameraInfo);
    // }
    {
      const playerEntity = entityManager.createEntity(scene, 'player');
      playerEntity.transform.add(loadedModels.cannon.gltf.scene)
      const cannonPos = [0,12.2,0];
      playerEntity.transform.position.set(...cannonPos)
      globals.camera.position.set(...cannonPos).add(new Vector3(5,5,0));
      playerEntity.addComponent(Player);
      globals.player = playerEntity;
    }
    {
      const entity = entityManager.createEntity(scene, 't1');
      entity.transform.add(loadedModels.tower.gltf.scene)
      entity.transform.position.add(new Vector3(0,0,0))
    }
    {
      const entity = entityManager.createEntity(scene, 'Camera controls manager');
      entity.addComponent(CameraControls, globals.camera, renderer.domElement);
    }
    {
      const entity = entityManager.createEntity(scene, 'Directional light');
      entity.transform.add(new DirectionalLight(new Color("white"), 1))
      entity.transform.position.set(0,0,40);
    }
  }

  this.render = function () {
    // globals.inputManager.update();
    entityManager.update();
    renderer.render(scene, globals.camera);
  }

  this.updateRendererDisplaySize = function (width, height) {
    const { camera } = globals;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}