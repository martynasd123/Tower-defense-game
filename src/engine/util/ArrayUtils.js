
/**
 * Removes element from an array.
 * @param array The array to remove element from.
 * @param element The element to remove
 */
export function removeArrayElement(array, element) {
  const ndx = array.indexOf(element);
  if (ndx >= 0) {
    array.splice(ndx, 1);
  }
}