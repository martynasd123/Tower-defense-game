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
    this.cameraControls.setTarget(x, y, z, enableTransition);
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

    if(this.entity_to_follow == null || this.entity_to_follow !== entity){
      this.entity_to_follow = entity;

      //Setting camera position initially
      this.setCameraPosition(false);
    }

    this.cameraControls.update(globals.deltaTime);

  }
}