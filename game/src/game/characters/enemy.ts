// import type Assets from './assets'
import { type InputType } from '../inputHandler'
import type Map from '../map'
import { type State } from '../states/state'
import Character, { type Direction } from './character'
import type Player from './player'

abstract class Enemy<T extends string> extends Character<T, State<T>> {
  direction: Direction = 'left'
  player?: Player

  setPlayer (player: Player): void {
    this.player = player
  }

  update (keys: InputType[], map: Map): void {
    super.update([], map)

    // this.
  }
}

export default Enemy
