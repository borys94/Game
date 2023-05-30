import EnemySpriteManager from '../sprites/enemy/enemySpriteManager'
import Character, { type Direction } from './character'

export type EnemyType = 'dog1' | 'dog2' | 'rat1' | 'rat2' | 'cat1' | 'cat2' | 'bird1' | 'bird2'

export interface EnemyObject {
  type: EnemyType
  x: number
  y: number
}

abstract class Enemy extends Character {
  abstract type: EnemyType
  abstract spriteManager: EnemySpriteManager
  maxSpeed = 2
  direction: Direction = 'right'
  lastAttackTimestamp = 0
  interactionInterval = 2000
  lastInteractionInterval = 0
  speed = this.maxSpeed

  canAttack(): boolean {
    return this.lastAttackTimestamp + this.interactionInterval < Date.now() && this.game.player.health > 0
  }

  draw(deltaTime: number): void {
    super.draw(deltaTime)
    this.drawHealthBar()
  }

  drawHealthBar() {
    const ctx = this.game.ctx

    if (this.isAlive()) {
      ctx.save()
      ctx.strokeStyle = '#000000'
      ctx.fillStyle = '#B03A2E'
      ctx.lineWidth = 2
      ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, 5)
      ctx.fillRect(
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        this.width * (this.health / this.maxHealth),
        5
      )
      ctx.restore()
    }
  }
}

export default Enemy
