import {Component} from "../../engine/core/Component";
import {globals} from "../Core";
import CameraControls from 'camera-controls';
import {Vector3} from "three";

/**
 * Component, responsible for controlling the camera movement.
 */
export class CameraControlsManager extends Component {

  /**
   * Sets camera position to match rotation of cannon
   * @param enableTransition If true, camera is moved with a smooth transition
   */
  setCameraPosition(enableTransition) {
    const worldPos = new Vector3();
    const {x, y, z} = this.pipe.getWorldPosition(worldPos);
    this.cameraControls.rotateTo(globals.player.visual.rotation.y + Math.PI / 2,
        -this.pipe.rotation.z + Math.PI * 0.3, enableTransition);
    this.cameraControls.setTarget(x, y, z, enableTransition);
  }

  constructor(entity, camera, domElement) {
    super(entity);

    const {player} = globals;

    //Creating an instance of CameraControls
    this.cameraControls = new CameraControls(camera, domElement);

    //Retrieving main player's cannon
    this.pipe = player.visual.getObjectByName("Pipe");

    this.isCameraMoving = false;

    this.cameraControls.addEventListener('controlStart', () => {
      this.isCameraMoving = true;
    });

    this.cameraControls.addEventListener('sleep', () => {
      this.isCameraMoving = false;
    });

    //Setting camera position initially
    this.setCameraPosition(false);
  }

  update() {
    const {inputManager} = globals;

    this.cameraControls.update(globals.deltaTime);

    //Moving camera when cannon is moving
    if (!this.isCameraMoving &&
        (inputManager.keys.down.down ||
            inputManager.keys.up.down ||
            inputManager.keys.right.down ||
            inputManager.keys.left.down)) {
      this.setCameraPosition(true);
    }

  }
}