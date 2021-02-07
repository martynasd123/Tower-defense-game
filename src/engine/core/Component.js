/**
 * A base component class.
 */
export class Component {

  /**
   * Constructs a component with a given parent entity
   * @param entity The parent entity
   */
  constructor(entity) {
    this.entity = entity;
  }

  getRemoteValue(key){
    return this.entity.getComponentStateValue(this.constructor.name, key);
  }

  /**
   * Update function to be overridden
   */
  update() {}
}