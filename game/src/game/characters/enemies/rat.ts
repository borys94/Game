import type Game from '../..'
import Enemy from '../enemy'
import CalmEnemyStateManager from '../../states/calmEnemy/calmEnemyStateManager'
import EnemySpriteManager from '../../sprites/enemy/enemySpriteManager'

class RatEnemy extends Enemy {
  type = 'rat' as const
  maxSpeed = 1
  speed = this.maxSpeed

  stateManager: CalmEnemyStateManager = new CalmEnemyStateManager(this)
  spriteManager: EnemySpriteManager = new EnemySpriteManager(this, 'rat')

  constructor (game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 32,
      height: 32,
      maxVy: 10,
      maxHealth: 5
    })
  }
}

export default RatEnemy
