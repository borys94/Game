import Character from '../characters/character'
import { type InputType } from '../inputHandler'
import { State } from './state'

abstract class StateManager{
  states: Record<string, State>
  currentState: State

  constructor(public player: Character, states: Record<string, State>) {
    this.states = states
    if (!('standing' in this.states)) {
      throw new Error()
    }
    this.currentState = this.states.standing as State
  }

  setState = (state: string): void => {
    this.currentState = this.states[state]
    this.currentState.enter()
  }

  handle (inputs: InputType[]): void {
    this.currentState.handle(inputs)
  }
}

export default StateManager