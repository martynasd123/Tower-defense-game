import {Component} from "../../engine/core/Component";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {loadedModels} from "../../index";
import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";

export class Player extends Component{

  constructor(entity) {
    super(entity);
  }

  update() {

  }

}