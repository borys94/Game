import type Enemy from '../../characters/enemy'
import { type InputType } from '../../inputHandler'
import { shouldChangeDirection } from './helpers'
import EnemyState from './state'

const STATES = ['standing', 'walking', 'hurt', 'death'] as const
type StateType = (typeof STATES)[number]

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
    this.character.speed = this.character.maxSpeed
    if (this.character.direction === 'left') {
      this.character.speed *= -1
    }
  }

  handleInput (inputs: InputType[]): void {
    if (shouldChangeDirection(this.character)) {
      this.character.speed *= -1
      this.character.direction = this.character.direction === 'right' ? 'left' : 'right'
    }
  }
}

export class Hurt extends CowardlyEnemyState {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor (public character: Enemy<StateType>) {
    super(character, 'hurt')
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    this.timestamp = Date.now()
    if (this.character.health <= 0) {
      this.character.setState('death')
    } else if (this.timestamp - this.time >= this.deltaTime) {
      this.character.setState('standing')
    }
  }
}

export class Death extends CowardlyEnemyState {
  constructor (public character: Enemy<StateType>) {
    super(character, 'death')
  }

  enter (): void {
    // this.performed = false
    // this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {}
}
