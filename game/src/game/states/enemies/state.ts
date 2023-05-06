import type Enemy from '../../characters/enemy'
import type Player from '../../characters/player'
import { State } from '../state'

abstract class EnemyState<T extends string> extends State<T> {
  sightArea = 150
  constructor (public character: Enemy<T>, public state: T) {
    super(state)
  }

  enter (): void {
  }

  getPlayer (): Player {
    if (!this.character.player) {
      throw new Error()
    }
    return this.character.player
  }
}

export default EnemyState
