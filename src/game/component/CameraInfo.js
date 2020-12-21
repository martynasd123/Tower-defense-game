import {Frustum, Matrix4} from "three";
import {globals} from "../Core";
import {Component} from "../../engine/core/Component";

export class CameraInfo extends Component {
  constructor(entity) {
    super(entity);
    this.projScreenMatrix = new Matrix4();
    this.frustum = new Frustum();
  }
  update() {
    const { camera } = globals;
    this.projScreenMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
  }
}