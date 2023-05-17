import { type State } from '../states/state'
import Character, { type Direction } from './character'

export type EnemyType = 'dog' | 'rat'

export interface EnemyObject {
  type: EnemyType
  x: number
  y: number
}

abstract class Enemy<T extends string> extends Character<T, State<T>> {
  abstract type: EnemyType
  maxSpeed = 2
  direction: Direction = 'right'
  lastAttackTimestamp = 0
  interactionInterval = 2000
  lastInteractionInterval = 0
  speed = this.maxSpeed

  canAttack (): boolean {
    return (
      this.lastAttackTimestamp + this.interactionInterval < Date.now() &&
      this.game.player.health > 0
    )
  }
}

export default Enemy
