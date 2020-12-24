import {Component} from "../../engine/core/Component";
import {globals} from "../Core";

const MOVEMENT_SPEED_VERTICAL = 0.005;
const MOVEMENT_SPEED_HORIZONTAL = 0.01;

const MAX_VERTICAL_ROTATION_DEGREES = -34;
const MIN_VERTICAL_ROTATION_DEGREES = 0;

/**
 * A component, that is responsible for cannon controls.
 */
export class CannonController extends Component {

  constructor(entity) {
    super(entity);
    this.pipeMesh = entity.visual.getObjectByName('Pipe');
    this.baseMesh = entity.visual.getObjectByName('Base');
  }

  update() {
    const {inputManager} = globals;

    const boundRotation = (rotation) => {
      return Math.max(
          Math.PI * 2 / 360 * MAX_VERTICAL_ROTATION_DEGREES,
          Math.min(
              Math.PI * 2 / 360 * MIN_VERTICAL_ROTATION_DEGREES,
              rotation
          )
      );
    }

    if (inputManager.keys.up.down)
      this.pipeMesh.rotation.set(0, 0, boundRotation(this.pipeMesh.rotation.z - MOVEMENT_SPEED_VERTICAL));
    else if (inputManager.keys.down.down)
      this.pipeMesh.rotation.set(0, 0, boundRotation(this.pipeMesh.rotation.z + MOVEMENT_SPEED_VERTICAL));

    if (inputManager.keys.right.down)
      this.entity.visual.rotation.set(0, this.entity.visual.rotation.y - MOVEMENT_SPEED_HORIZONTAL, 0)
    else if (inputManager.keys.left.down)
      this.entity.visual.rotation.set(0, this.entity.visual.rotation.y + MOVEMENT_SPEED_HORIZONTAL, 0)
  }
}