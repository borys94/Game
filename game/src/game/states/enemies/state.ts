import type Enemy from '../../characters/enemy'
import { State } from '../state'

abstract class EnemyState<T extends string> extends State<T> {
  sightArea = 150
  constructor (public character: Enemy<T>, public state: T) {
    super(state)
  }

  enter (): void {

  }
}

export default EnemyState
