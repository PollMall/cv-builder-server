import { Experience } from './types';

/**
 * Get the difference from 2 arrays a and b
 * @param a any array
 * @param b any array
 * @returns A new array containing the elements of array a which are not part of array b
 */

export const getDifference = (a: any[], b: any[]) => {
  const result = [];
  a?.forEach((el) => {
    if (b?.indexOf(el) === -1) {
      result.push(el);
    }
  });
  return result;
};

export const descSortExperienceByStartAt = (a: Experience, b: Experience) => {
  const aStartAt = a.startAt ? parseInt(a.startAt, 10) : 0;
  const bStartAt = b.startAt ? parseInt(b.startAt, 10) : 0;
  return bStartAt === 0 ? 1 : aStartAt === 0 ? -1 : bStartAt - aStartAt;
};
