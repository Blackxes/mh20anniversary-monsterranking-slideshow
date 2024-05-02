/**
 * @Author Alexander Bassov Mon Mar 18 2024
 * @Email blackxes.dev@gmail.com
 */

import { Monster } from "./types";

export const isValidMonster = (monster: Monster) =>
  monster.species || monster.subSpecies;

/**
 * Searches for the closest valid monster rank in a monster collection
 * @param startingRank Search starting point
 * @param monsters Collections of monsters
 * @param negativeDirection Search into the opposite site?
 * @param min Min searching rank threshold
 * @param max Max searching rank threshold
 * @returns Closest valid rank from the starting rank or the starting rank on failure
 */
export const getClosestValidRank = (
  startingRank: number,
  monsters: Monster[],
  negativeDirection?: boolean,
  min?: number,
  max?: number
) => {
  max = max != null ? max : monsters.length;
  let newRank = negativeDirection
    ? Math.max(min || 0, startingRank - 1)
    : Math.min(max || monsters.length, startingRank + 1);

  while (newRank > 0 && newRank <= monsters.length) {
    if (monsters.find((m) => m.rank == newRank && isValidMonster(m))) {
      return newRank;
    }
    negativeDirection ? newRank-- : newRank++;
  }

  return startingRank;
};
