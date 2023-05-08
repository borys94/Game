import type Enemy from '../../characters/enemy'
import { type InputType } from '../../inputHandler'
import EnemyState from './state'

const STATES = ['standing', 'walking'] as const
type StateType = typeof STATES[number]

export abstract class CowardlyEnemyState extends EnemyState<StateType> {
  constructor (public character: Enemy<StateType>, public state: StateType) {
    super(character, state)
  }
}

export class Standing extends CowardlyEnemyState {
  constructor (character: CowardlyEnemyState['character']) {
    super(character, 'standing')
  }

  enter (): void {
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    const { player } = this.character.game
    if (Math.abs(player.x - this.character.x) < 150 && Math.abs(player.x - this.character.x) > 32) {
      this.character.setState('walking')
    }
  }
}

export class Walking extends CowardlyEnemyState {
  constructor (character: Enemy<StateType>) {
    super(character, 'walking')
  }

  enter (): void {
    this.updateSpeed()
  }

  handleInput (inputs: InputType[]): void {
    this.updateSpeed()

    if (
      Math.abs(this.character.game.player.x - this.character.x) > 150 ||
      Math.abs(this.character.game.player.x - this.character.x) < 32
    ) {
      this.character.setState('standing')
    }
  }

  private updateSpeed (): void {
    const { player } = this.character.game
    this.character.direction = player.x - this.character.x < 0 ? 'left' : 'right'

    if (this.character.direction === 'right') {
      this.character.speed = this.character.maxSpeed / 3
    } else {
      this.character.speed = -this.character.maxSpeed / 3
    }
  }
}
