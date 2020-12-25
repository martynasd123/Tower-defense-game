import {Component} from "../../engine/core/Component";

export default class Projectile extends Component{

  constructor(entity, speed) {
    super(entity);
    this.speed = speed;
  }

  update() {
    this.entity.visual.position.add(this.speed);
  }
}