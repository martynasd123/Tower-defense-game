import {Object3D} from "three";

/**
 * A base entity class. Contains a list of components, a name and an instance of Object3D.
 * Name is only used for debugging purposes and clarity.
 */
export class Entity{

  /**
   * Constructs an instance of Entity
   * @param parent The parent entity
   * @param name Name of this entity (for debugging purposes)
   */
  constructor(parent, name) {
    this.name = name;
    this.components = [];
    this.transform = new Object3D();
    parent.add(this.transform);
  }

  /**
   * Adds a component to this entity
   * @param ComponentType Type of component
   * @param args
   * @return {*}
   */
  addComponent(ComponentType, ...args) {
    const component = new ComponentType(this, ...args);
    this.components.push(component);
    return component;
  }
  removeComponent(component) {
    removeArrayElement(this.components, component);
  }
  getComponent(ComponentType) {
    return this.components.find(c => c instanceof ComponentType);
  }
  update(){
    for (const component of this.components) {
      component.update();
    }
  }
}