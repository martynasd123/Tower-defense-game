import {Object3D} from "three";
import ComponentName from "../../game/ComponentName";
import {removeArrayElement} from "../util/ArrayUtils";

/**
 * A base entity class. Contains a list of components, a name and an instance of Object3D.
 * Name is only used for debugging purposes and clarity.
 */
export class Entity{

  /**
   * Constructs an instance of Entity
   * @param parent The parent entity
   * @param name Name of this entity (for debugging purposes)
   * @param entityManager entity manager
   */
  constructor(parent, name, entityManager) {
    this.name = name;
    this.components = [];
    this.visual = new Object3D();
    this.entityManager = entityManager;

    parent.add(this.visual);
  }

  addVisual(visual) {
    this.current_visual = visual;
    this.visual.add(visual);
  }

  updateVisual(visual) {
    this.visual.remove(this.current_visual);
    this.visual.add(visual);
    this.visual.
    this.current_visual = visual;
  }

  getComponentStateValue(componentType, key){
    return this.entityManager.parseRef(this.entityManager.state.entities
        .find((ent) => ent.name === this.name)
        .components[Object.keys(ComponentName).find((comp) => ComponentName[comp].name === componentType)][key]);
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

  /**
   * Removes a component from this entity
   * @param component component to remove
   */
  removeComponent(component) {
    removeArrayElement(this.components, component);
  }

  syncComponents(components){
    const componentsToRemove = [];
    
    this.components.forEach((component) => {
      const compName = Object.keys(ComponentName).find((key) => { return component instanceof ComponentName[key]});
      if(components[compName] == null)
        componentsToRemove.push(component);
    })

    componentsToRemove.forEach((comp) => { this.removeComponent(comp) });

    Object.keys(components).forEach((component) => {

      if(this.components.some((comp) => {
        return comp instanceof ComponentName[component]
      }))
        return;

      const componentType = ComponentName[component];
      if(componentType == null){
        console.log('unknown component type', component, ComponentName);
        return;
      }
      let params = [];

      if(components[component].ctor != null){
        params = components[component].ctor.map((param) => {
          return this.entityManager.parseRef(param);
        })
      }
      this.addComponent(componentType, ...params);
    })
  }

  /**
   * Returns component by type.
   * If such component is not found, returns null.
   * @param ComponentType Type of component to find
   * @return {*} Component found or null
   */
  getComponent(ComponentType) {
    return this.components.find(c => c instanceof ComponentType);
  }

  update(){
    for (const component of this.components) {
      component.update();
    }
  }
}