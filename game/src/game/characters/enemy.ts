import { type State } from '../states/state'
import Character, { type Direction } from './character'

abstract class Enemy<T extends string> extends Character<T, State<T>> {
  direction: Direction = 'right'
  lastAttackTimestamp = 0
  interactionInterval = 2000
  lastInteractionInterval = 0

  canAttack (): boolean {
    return this.lastAttackTimestamp + this.interactionInterval < Date.now() && this.game.player.health > 0
  }
}

export default Enemy
