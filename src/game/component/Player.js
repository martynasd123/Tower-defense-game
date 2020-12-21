import {Component} from "../../engine/core/Component";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {loadedModels} from "../../index";
import {BoxGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";

export class Player extends Component{

  constructor(entity) {
    super(entity);

    // entity.addComponent(Object3D, loadedModels.cannon.gltf.scene)
    // entity.transform.add(new Mesh(new BoxGeometry(10, 10, 10), new MeshBasicMaterial({color: 0x44aa88})))
    entity.transform.add(loadedModels.cannon.gltf.scene)
  }

  update() {

  }

}