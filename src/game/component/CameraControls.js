import {Component} from "../../engine/core/Component";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {globals} from "../Core";
import {Matrix3, Vector3} from "three";

const OrbitInteractionBreakTime = 2000;

export class CameraControls extends Component{

  constructor(entity, camera, domElement) {
    super(entity);

    const orbitControls = new OrbitControls( camera, domElement );

    const { player } = globals;
    const {x, y, z} = player.transform.getWorldPosition();
    orbitControls.target.set(x,y,z).add(new Vector3(0,1,0));
    orbitControls.maxPolarAngle = Math.PI * 0.5;
    orbitControls.minPolarAngle = -Math.PI * 0.5;
    orbitControls.saveState();


    this.lastOrbitInteractionTime = Date.now();
    this.isInteracting = false;

    orbitControls.addEventListener('end', () => {
      this.lastOrbitInteractionTime = Date.now();
      this.isInteracting = false;
    });
    orbitControls.addEventListener('start', () => {
      this.lastOrbitInteractionTime = Date.now();
      this.isInteracting = true;
    });

    this.orbitControls = orbitControls;
  }

  _resetOrientation(){
    this.orbitControls.reset();
  }

  update() {
    this.orbitControls.update()

    const lastOrbitInteractionTimeAgo = Date.now() - (this.lastOrbitInteractionTime || Date.now());
    if(!this.isInteracting && lastOrbitInteractionTimeAgo > OrbitInteractionBreakTime){
      this._resetOrientation();
      this.lastOrbitInteractionTime = null;
    }
  }
}