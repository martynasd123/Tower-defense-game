import {SafeArray} from "../util/SafeArray";
import {Entity} from "./Entity";

/**
 * A wrapper class to manage a set of entities.
 */
export class EntityManager {

  /**
   * Constructs an instance of this class
   */
  constructor() {
    this.entities = new SafeArray();
  }

  /**
   * Adds a new entity
   * @param parent The parent entity
   * @param name The name of the entity to be created
   * @return {Entity} The entity created
   */
  createEntity(parent, name) {
    const entity = new Entity(parent, name);
    this.entities.add(entity);
    return entity;
  }

  /**
   * Removes an entity.
   * @param entity The entity to be removed
   */
  removeEntity(entity) {
    this.entities.remove(entity);
  }

  update() {
    this.entities.forEach(entity => entity.update());
  }
}