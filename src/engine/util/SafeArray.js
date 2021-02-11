/**
 * An array, that can be safely looped through
 * while it is being changed asynchronously.
 */
export class SafeArray {

  /**
   * Creates an instance of this class.
   * Initially, the array and all queues are empty.
   */
  constructor() {
    this.array = [];
    this.addQueue = [];
    this.removeQueue = new Set();
  }

  /**
   * Checks whether the array is empty. Takes into account queued items.
   * @return {boolean} True if array is empty
   */
  get isEmpty() {
    return this.addQueue.length + this.array.length > 0;
  }

  /**
   * Queues the element to be added to array.
   * @param element The element to add.
   */
  add(element) {
    this.addQueue.push(element);
  }

  /**
   * Queues the element to be removed from array
   * @param element Element to remove.
   */
  remove(element) {
    this.removeQueue.add(element);
  }

  /**
   * Queues the element to be removed from array
   * @param predicate Predicate, which determines which element to remove
   */
  removeByPredicate(predicate) {
    this.forEach((element) => {
      if(predicate(element)) {
        this.remove(element);
      }
    })
  }

  /**
   * Loops through the array.
   * Maintains a version of array, that has been observed at the moment of calling this function.
   * This means that elements, which were added asynchronously
   * to this array while looping will not be iterated.
   * @param fn function to call on each iteration.
   */
  forEach(fn) {
    this._addQueued();
    this._removeQueued();
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      fn(element);
    }
    this._removeQueued();
  }

  /**
   * Works similarly to forEach, except this is used to find element
   * @param predicate the predicate to find element with
   */
  find(predicate){
    let found = null;
    this.forEach((element) => {
      if(predicate(element))
        found = element;
    })
    return found;
  }

  _addQueued() {
    if (this.addQueue.length) {
      this.array.splice(this.array.length, 0, ...this.addQueue);
      this.addQueue = [];
    }
  }

  _removeQueued() {
    if (this.removeQueue.size) {
      this.array = this.array.filter(element => !this.removeQueue.has(element));
      this.removeQueue.clear();
    }
  }

}