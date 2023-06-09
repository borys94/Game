import type Game from '../..'
import Enemy from '../enemy'
import CalmEnemyStateManager from '../../states/calmEnemy/calmEnemyStateManager'
import EnemySpriteManager from '../../sprites/enemy/enemySpriteManager'

class RatEnemy extends Enemy {
  type = 'rat1' as const
  maxSpeed = 1
  speed = this.maxSpeed

  paddingLeft: number = 0
  paddingRight: number = 4

  stateManager: CalmEnemyStateManager = new CalmEnemyStateManager(this)
  spriteManager: EnemySpriteManager = new EnemySpriteManager(this, 'rat1')

  constructor(game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 32,
      height: 32,
      maxVy: 10,
      maxHealth: 4
    })
  }
}

export default RatEnemy
