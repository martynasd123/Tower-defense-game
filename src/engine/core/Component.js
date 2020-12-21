/**
 * A base component class
 */
export class Component {
  /**
   * Constructs a component with a givent parent gameObject
   * @param entity the parent gameObject
   */
  constructor(entity) {
    this.entity = entity;
  }

  update() {

  }
}