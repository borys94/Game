import type Character from '../characters/character'
import { type InputType } from '../inputHandler'

export abstract class State {
  state: string
  animate = true
  abstract character: Character

  constructor (state: string) {
    this.state = state
  }

  abstract enter (): void
  abstract handle (inputs: InputType[]): void

  getPlayer() {
    return this.character.game.player
  }
}
