import type Enemy from '../characters/enemy'
import type Player from '../characters/player'
import { type InputType } from '../inputHandler'
import { State } from './state'

const STATES = ['standing', 'walking'] as const
export type StateType = typeof STATES[number]

abstract class EnemyState extends State<StateType> {
  constructor (public character: Enemy<StateType>, public state: StateType) {
    super(state)
  }

  enter (): void {
  }

  // abstract handleInput (): void

  getPlayer (): Player {
    if (!this.character.player) {
      throw new Error()
    }
    return this.character.player
  }
}

export class Standing extends EnemyState {
  constructor (character: Enemy<StateType>) {
    super(character, 'standing')
  }

  enter (): void {
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    const { player } = this.character
    if (!player) {
      return
    }
    if (Math.abs(player.x - this.character.x) < 150 && Math.abs(player.x - this.character.x) > 32) {
      this.character.setState('walking')
    }
  }
}

export class Walking extends EnemyState {
  constructor (character: Enemy<StateType>) {
    super(character, 'walking')
  }

  enter (): void {
    this.updateSpeed()
  }

  handleInput (inputs: InputType[]): void {
    const player = this.getPlayer()
    if (!player) {
      return
    }

    this.updateSpeed()

    if (Math.abs(player.x - this.character.x) > 150 || Math.abs(player.x - this.character.x) < 32) {
      this.character.setState('standing')
    }
  }

  private updateSpeed (): void {
    const player = this.getPlayer()
    this.character.direction = player.x - this.character.x < 0 ? 'left' : 'right'

    if (this.character.direction === 'right') {
      this.character.speed = this.character.maxSpeed / 3
    } else {
      this.character.speed = -this.character.maxSpeed / 3
    }
  }
}
