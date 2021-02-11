import {Component} from "../../engine/core/Component";
import {globals} from "../Core";
import CameraControls from 'camera-controls';
import {Vector3} from "three";
import {CannonController} from "./CannonController";

/**
 * Component, responsible for controlling the camera movement.
 */
export class CameraControlsManager extends Component {

  /**
   * Sets camera position to match rotation of cannon
   * @param enableTransition If true, camera is moved with a smooth transition
   */
  setCameraPosition(enableTransition) {

    const {x, y, z} = this.entity_to_follow.visual.getWorldPosition(new Vector3())

    if(this.entity_to_follow.getComponent(CannonController) != null){

      //Retrieving main player's cannon
      this.pipe = this.entity_to_follow.visual.getObjectByName("Pipe");
      this.cameraControls.rotateTo(this.entity_to_follow.visual.rotation.y + Math.PI / 2,
          -this.pipe.rotation.z + Math.PI * 0.3, enableTransition);
    }
  }

  constructor(entity, domElement) {
    super(entity);

    const { camera } = globals;

    //Creating an instance of CameraControls
    this.cameraControls = new CameraControls(camera, domElement);

    this.isCameraMoving = false;

    this.cameraControls.addEventListener('controlStart', () => {
      this.isCameraMoving = true;
    });

    this.cameraControls.addEventListener('sleep', () => {
      this.isCameraMoving = false;
    });
  }

  update() {
    const {inputManager} = globals;
    
    const entity = this.getRemoteValue("entity");
    const maxDist = this.getRemoteValue("maxDistance");
    if(maxDist !== this.cameraControls.maxDistance)
      this.cameraControls.maxDistance = maxDist;

    if(this.entity_to_follow == null || this.entity_to_follow !== entity){
      this.entity_to_follow = entity;

      //Setting camera position initially
      this.setCameraPosition(false);
    }

    const target = new Vector3();
    this.cameraControls.getTarget(target)
    const {x, y, z} = entity.visual.position;
    if(x !== target.x || y !== target.y || z !== target.z) {
      this.cameraControls.setTarget(x, y, z, false);
      if(this.cameraControls.distance > this.cameraControls.maxDistance)
        this.cameraControls.distance = this.cameraControls.maxDistance
    }

    this.cameraControls.update(globals.deltaTime);


  }
}