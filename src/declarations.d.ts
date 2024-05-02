/**
 * @Author Alexander Bassov Sat Mar 16 2024
 * @Email blackxes.dev@gmail.com
 */

import { Monster } from "./MonsterSlideshow/types";

declare module "monsters.json" {
  const monsters: Monster[];
  export = monsters;
}
