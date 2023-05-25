import Enemy from '../enemy'
import type Game from '../..'
import EnemyStateManager from '../../states/enemy/enemyStateManager'
import EnemySpriteManager from '../../sprites/enemy/enemySpriteManager'

class CatEnemy extends Enemy {
  type = 'cat' as const

  stateManager: EnemyStateManager = new EnemyStateManager(this)
  spriteManager: EnemySpriteManager = new EnemySpriteManager(this, 'cat1')

  paddingLeft = 2
  paddingRight = 8

  constructor(game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 48,
      height: 48,
      maxVy: 10,
      maxHealth: 7
    })
  }
}

export default CatEnemy
