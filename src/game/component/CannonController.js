import {Component} from "../../engine/core/Component";
import {globals} from "../Core";
import {Color, Euler, Mesh, MeshBasicMaterial, Quaternion, Scene, SphereGeometry, Vector3} from "three";
import Projectile from "./Projectile";

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
    this.pipeMesh = entity.visual.getObjectByName('Pipe');
    this.baseMesh = entity.visual.getObjectByName('Base');
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
    const {inputManager} = globals;

    const boundRotation = (rotation) => {
      return Math.max(
          Math.PI * 2 / 360 * -MAX_VERTICAL_ROTATION_DEGREES,
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

    if(inputManager.keys.shoot.justPressed){
      this.shoot();
    }
  }
}