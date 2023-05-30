import type Game from '..'
import CatEnemy from './enemies/cat'
import DogEnemy from './enemies/dog'
import Dog2Enemy from './enemies/dog2'
import RatEnemy from './enemies/rat'
import Rat2Enemy from './enemies/rat2'
import { type EnemyObject } from './enemy'
import type Enemy from './enemy'

export const buildEnemy = (game: Game, enemy: EnemyObject): Enemy => {
  if (enemy.type === 'dog1') {
    return new DogEnemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'dog2') {
    return new Dog2Enemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'rat1') {
    return new RatEnemy(game, enemy.x, enemy.y)
  } else if (enemy.type === 'rat2') {
    return new Rat2Enemy(game, enemy.x, enemy.y)
  }
  //  else if (enemy.type === 'cat1') {
  //   return new CatEnemy(game, enemy.x, enemy.y)
  // }
  throw new Error('Enemy not found')
}
