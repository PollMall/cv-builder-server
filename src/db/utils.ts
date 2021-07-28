/**
 * Get the difference from 2 arrays a and b
 * @param a any array
 * @param b any array
 * @returns A new array containing the elements of array a which are not part of array b
 */

const getDifference = (a: any[], b: any[]) => {
  const result = [];
  a.forEach((el) => {
    if (b.indexOf(el) === -1) {
      result.push(el);
    }
  });
  return result;
};

export { getDifference };
