import type Character from '../characters/character'
import { type InputType } from '../inputHandler'

export abstract class State<StateType extends string> {
  state: StateType
  animate = true
  abstract character: Character<StateType, State<StateType>>

  constructor (state: StateType) {
    this.state = state
  }

  abstract enter (): void
  abstract handleInput (inputs: InputType[]): void
}
