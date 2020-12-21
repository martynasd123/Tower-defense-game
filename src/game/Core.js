import {Color, PerspectiveCamera, PointLight, Scene} from "three";
import {EntityManager} from "../engine/core/EntityManager";
import {CameraInfo} from "./component/CameraInfo";
import {Player} from "./component/Player";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const globals = {}
export default function Core() {

  this.entityManager = new EntityManager();

  this.scene = new Scene();
  this.scene.background = new Color('white');

  this.setUpCamera = function () {
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    globals.camera = new PerspectiveCamera(fov, aspect, near, far);
    globals.camera.position.set(0, 0, 10);
  }

  this.init = function (renderer) {
    this.renderer = renderer;
    this.setUpCamera();

    {
      const entity = this.entityManager.createEntity(this.scene, 'player');
      entity.addComponent(Player);
    }
    {
      const entity = this.entityManager.createEntity(this.scene, 'point light');
      entity.transform.add(new PointLight(new Color("white"), 5))
      entity.transform.position.set(0,0,40);
    }
    {
      const entity = this.entityManager.createEntity(globals.camera, 'camera');
      globals.cameraInfo = entity.addComponent(CameraInfo);
    }

  }

  this.render = function () {
    this.entityManager.update();
    this.renderer.render(this.scene, globals.camera);
  }

  this.updateRendererDisplaySize = function (width, height) {
    const { camera } = globals;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}