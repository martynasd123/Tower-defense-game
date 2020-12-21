import {PerspectiveCamera, Scene} from "three";


export default function Core(){

  this.setUpCamera = function(){
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
  }

  this.init = function(renderer) {
    this.renderer = renderer;

    const scene = new Scene();
  }

}