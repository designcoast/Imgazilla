import { isEqual } from 'lodash';

/**
 * Compare two Redux state objects.
 * @param state1 - The first state object to compare.
 * @param state2 - The second state object to compare.
 * @returns A boolean indicating whether the two states are equal.
 */
export const compareStates = <T>(state1: T, state2: T): boolean => {
  return isEqual(state1, state2);
};