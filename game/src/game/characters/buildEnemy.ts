import type Game from '..'
import DogEnemy from './enemies/dog'
import RatEnemy from './enemies/rat'
import { type EnemyObject } from './enemy'
import type Enemy from './enemy'

export const buildEnemy = (game: Game, enemy: EnemyObject): Enemy<any> => {
  if (enemy.type === 'dog') {
    return new DogEnemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'rat') {
    return new RatEnemy(game, enemy.x, enemy.y)
  }
  throw new Error('Enemy not found')
}
