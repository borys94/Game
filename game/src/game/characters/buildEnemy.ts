import type Game from '..'
import CatEnemy from './enemies/cat'
import DogEnemy from './enemies/dog'
import RatEnemy from './enemies/rat'
import { type EnemyObject } from './enemy'
import type Enemy from './enemy'

export const buildEnemy = (game: Game, enemy: EnemyObject): Enemy => {
  if (enemy.type === 'dog') {
    return new DogEnemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'rat') {
    return new RatEnemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'cat') {
    return new CatEnemy(game, enemy.x, enemy.y)
  }
  throw new Error('Enemy not found')
}
