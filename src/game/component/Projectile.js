import {Component} from "../../engine/core/Component";

export default class Projectile extends Component{

  constructor(entity, vector) {
    super(entity);
    this.vector = vector;
  }

  update() {
    this.entity.visual.position.add(this.vector);
  }
}