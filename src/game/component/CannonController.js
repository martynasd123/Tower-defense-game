import {Component} from "../../engine/core/Component";
import {globals} from "../Core";
import {Color, Euler, Mesh, MeshBasicMaterial, Quaternion, Scene, SphereGeometry, Vector3} from "three";
import Projectile from "./Projectile";
import {CameraControlsManager} from "./CameraControlsManager";

const MOVEMENT_SPEED_VERTICAL = 0.005;
const MOVEMENT_SPEED_HORIZONTAL = 0.01;

const MAX_VERTICAL_ROTATION_DEGREES = 34;
const MIN_VERTICAL_ROTATION_DEGREES = 0;

/**
 * A component, that is responsible for cannon behavior.
 */
export class CannonController extends Component {

  constructor(entity) {
    super(entity);
    this.getMeshes();
  }

  getMeshes(){
    this.pipeMesh = this.entity.visual.getObjectByName('Pipe');
    this.baseMesh = this.entity.visual.getObjectByName('Base');
  }


  shoot(){
    //Spawning a new projectile entity
    const projectile = globals.entityManager.createEntity(globals.scene, `projectile-${Math.random()}`);
    projectile.visual.add(new Mesh(new SphereGeometry(0.2), new MeshBasicMaterial({color: new Color("gray")})));

    //Determining projectile position
    const pipePosition = new Vector3();
    this.pipeMesh.getWorldPosition(pipePosition);
    projectile.visual.position.set(pipePosition.x, pipePosition.y, pipePosition.z)

    //Determining the projectile speed (and thus the direction)
    const rotation = new Quaternion();
    this.pipeMesh.getWorldQuaternion(rotation);
    projectile.addComponent(Projectile, new Vector3(-1,0,0).applyQuaternion(rotation));
  }

  update() {
    this.getMeshes();

    const {inputManager} = globals;

    const pitch = this.getRemoteValue('pitch');
    const yaw = this.getRemoteValue('yaw');

    this.pipeMesh.rotation.set(0,0, pitch);
    this.entity.visual.rotation.set(0,yaw, 0);

    if((this.pitch != null && this.pitch !== pitch) || (this.yaw != null && this.yaw !== yaw)){
      const cameraControlsEntity = this.entity.entityManager.findEntityByName('cameraControls')
      if(cameraControlsEntity != null){
          const cameraControlsManager = cameraControlsEntity.getComponent(CameraControlsManager);
          if(cameraControlsManager != null && cameraControlsManager.entity_to_follow === this.entity){
            cameraControlsManager.setCameraPosition(true);
          }
      }
    }

    this.pitch = pitch;
    this.yaw = yaw;

    if(inputManager.keys.shoot.justPressed){
      //this.shoot();
    }
  }
}