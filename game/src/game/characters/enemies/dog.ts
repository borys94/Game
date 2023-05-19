import Enemy from '../enemy'
import type Game from '../..'
import EnemyStateManager from '../../states/enemy/enemyStateManager'
import EnemySpriteManager from '../../sprites/enemy/enemySpriteManager'

class DogEnemy extends Enemy {
  type = 'dog' as const

  stateManager: EnemyStateManager = new EnemyStateManager(this)
  spriteManager: EnemySpriteManager = new EnemySpriteManager(this, 'dog')

  paddingLeft = 4
  paddingRight = 12

  constructor (game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 48,
      height: 48,
      maxVy: 10,
      maxHealth: 10
    })
  }
}

export default DogEnemy
