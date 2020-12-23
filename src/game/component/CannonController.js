import {Component} from "../../engine/core/Component";
import {globals} from "../Core";

const MOVEMENT_SPEED_VERTICAL = 0.005;
const MOVEMENT_SPEED_HORIZONTAL = 0.005;

export class CannonController extends Component{

  constructor(entity) {
    super(entity);
    this.pipeMesh = entity.visual.getObjectByName('Pipe');
    this.baseMesh = entity.visual.getObjectByName('Base');
  }

  update() {
    const { inputManager } = globals;
    if(inputManager.keys.up.down)
      this.pipeMesh.rotation.set(0,0,this.pipeMesh.rotation.z - MOVEMENT_SPEED_VERTICAL)
    else if(inputManager.keys.down.down)
      this.pipeMesh.rotation.set(0,0,this.pipeMesh.rotation.z + MOVEMENT_SPEED_VERTICAL)
  }
}