import {SafeArray} from "../util/SafeArray";
import {Entity} from "./Entity";
import {globals} from "../../game/Core";
import Assets from "../../game/Assets";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {AmbientLight, Color, DirectionalLight, Mesh, MeshBasicMaterial, SphereGeometry} from "three";

/**
 * A wrapper class to manage a set of entities.
 */
export class EntityManager {

  /**
   * Constructs an instance of this class
   */
  constructor() {
    this.entities = new SafeArray();
    this.state = {entities: []};
  }

  /**
   * Adds a new entity
   * @param parent The parent entity
   * @param name The name of the entity to be created
   * @return {Entity} The entity created
   */
  createEntity(parent, name) {
    const entity = new Entity(parent, name, this);
    this.entities.add(entity);
    return entity;
  }

  parseRef(ref){
    if(typeof ref != 'string')
      return ref;
    if(ref.startsWith('@ref-')) {
      const reference = ref.substring(5, ref.length);
      return globals[reference];
    }else if(ref.startsWith('@entity-')) {
      const entityName = ref.substring(8, ref.length);
      return this.entities.find((entityIter) => { return entityIter.name === entityName })
    }else if(ref.startsWith('@model-')){
      const modelName = ref.substring(7, ref.length);
      return SkeletonUtils.clone(Assets.models[modelName].gltf.scene);
    }else if(ref.startsWith('@light-')){
      const light = ref.substring(7, ref.length);
      if(light.startsWith('ambient-')){
        const intensity = parseFloat(light.substring(8, light.length));
        return new AmbientLight(new Color("white"), intensity);
      }else if(light.startsWith('directional-')){
        const intensity = parseFloat(light.substring(12, light.length));
        return new DirectionalLight(new Color("#abe0f7"), intensity);
      }
      return null;
    }else{
      return ref;
    }
  }

  findEntityByName(name){
    return this.entities.find((ent) => {
      return name === ent.name;
    });
  }

  serializeEntities(){
    const { entities } = this.state;

    entities.forEach((entity) => {

      const ent = this.findEntityByName(entity.name);
 
      if(ent == null){
        //Entity does not exist. Creating a new one, and adding relevant components
        const entityNew = this.createEntity(this.parseRef(entity.parent), entity.name);

        if(entity.visual !== null && entity.visual !== undefined){
          entityNew.visual.add(this.parseRef(entity.visual));
        } else {
          // Super dumb, change this later xd
          entityNew.visual.add(new Mesh(new SphereGeometry(0.2), new MeshBasicMaterial({color: new Color("gray")})));
        }
        const { x, y, z } = entity.position;
        entityNew.visual.position.set(x, y, z)

        if(entity.components != null)
          entityNew.syncComponents(entity.components);

      }else{
        if(entity.components != null)
          ent.syncComponents(entity.components);
        ent.visual = this.parseRef(ent.visual)
        ent.visual.position.set(entity.position.x, entity.position.y, entity.position.z);
      }
    })

    this.entities.forEach((entity) => {
      if(this.findEntityByName(entity.name) == null)
        this.entities.removeByPredicate((el) => {return el.name === entity.name});
    })
  }

  updateState(newState){
    this.state = newState;
  }

  /**
   * Removes an entity.
   * @param entity The entity to be removed
   */
  removeEntity(entity) {
    this.entities.remove(entity);
  }

  update() {
    this.serializeEntities();
    this.entities.forEach(entity => entity.update());
  }
}