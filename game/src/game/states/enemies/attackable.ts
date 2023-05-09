import type Enemy from '../../characters/enemy'
import { type InputType } from '../../inputHandler'
import EnemyState from './state'

const STATES = ['standing', 'walking', 'attack', 'hurt', 'death'] as const
type StateType = typeof STATES[number]

export abstract class AttackableEnemyState extends EnemyState<StateType> {
  constructor (public character: Enemy<StateType>, public state: StateType) {
    super(character, state)
  }
}

export class Standing extends AttackableEnemyState {
  constructor (character: AttackableEnemyState['character']) {
    super(character, 'standing')
  }

  enter (): void {
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    // const { player } = this.character.game

    // if (this.character.lastInteractionInterval + this.character.interactionInterval > Date.now()) {
    //   return
    // }

    // if (Math.abs(player.x - this.character.x) < 60 && this.character.canAttack()) {
    //   this.character.setState('attack')
    // } else if (Math.abs(player.x - this.character.x) < this.sightArea && Math.abs(player.x - this.character.x) > 32) {
    //   this.character.setState('walking')
    // }
  }
}

export class Walking extends AttackableEnemyState {
  constructor (character: Enemy<StateType>) {
    super(character, 'walking')
  }

  enter (): void {
    this.updateSpeed()
  }

  handleInput (inputs: InputType[]): void {
    const player = this.character.game.player
    this.updateSpeed()

    if (Math.abs(player.x - this.character.x) < 60 && this.character.canAttack()) {
      this.character.setState('attack')
    } else if (Math.abs(player.x - this.character.x) > this.sightArea || Math.abs(player.x - this.character.x) < 32) {
      this.character.setState('standing')
    }
  }

  private updateSpeed (): void {
    const player = this.character.game.player
    this.character.direction = player.x - this.character.x < 0 ? 'left' : 'right'

    if (this.character.direction === 'right') {
      this.character.speed = this.character.maxSpeed / 1.5
    } else {
      this.character.speed = -this.character.maxSpeed / 1.5
    }
  }
}

export class Attack extends AttackableEnemyState {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 200

  constructor (character: Enemy<StateType>) {
    super(character, 'attack')
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.animate = true
    this.character.frameX = 0
    this.character.speed = 0

    this.character.lastAttackTimestamp = Date.now()
    this.character.lastInteractionInterval = Date.now()
    this.character.game.player.hurt(2)
  }

  handleInput (inputs: InputType[]): void {
    if (this.character.frameX === 3) {
      this.animate = false
      this.character.setState('standing')
    }
  }
}

export class Hurt extends AttackableEnemyState {
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
    this.character.frameX = 1
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    this.timestamp = Date.now()
    if (this.character.health <= 0) {
      this.character.setState('death')
    } else if (this.timestamp - this.time >= this.deltaTime) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
  }
}

export class Death extends AttackableEnemyState {
  performed = false
  constructor (public character: Enemy<StateType>) {
    super(character, 'death')
  }

  enter (): void {
    // this.performed = false
    // this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {
    if (this.performed) {
      this.animate = false
      return
      // this.character.setState('standing')
    }
    if (this.character.frameX === 3) {
      this.performed = true
    }
  }
}
