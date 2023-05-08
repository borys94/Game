import type Character from '../characters/character'
import { type InputType } from '../inputHandler'

// type CommonStateTypes = 'hurt' | 'standing'

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

// export class BasePlayerState<T extends string> extends State<T | CommonStateTypes> {
//   performed = false
//   animate = false
//   time = 0
//   timestamp = 0
//   deltaTime = 300

//   constructor (public character: Character<T | CommonStateTypes, State<T | CommonStateTypes>>) {
//     super('hurt')
//   }

//   enter (): void {
//     this.time = Date.now()
//     this.performed = false
//     this.character.frameX = 1
//     this.character.speed = 0
//   }

//   handleInput (inputs: InputType[]): void {
//     this.timestamp = Date.now()
//     if (this.timestamp - this.time >= this.deltaTime) {
//       this.character.frameX = 0
//       this.character.setState('standing')
//     }
//   }
// }
