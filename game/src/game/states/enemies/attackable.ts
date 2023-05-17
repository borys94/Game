import type Enemy from '../../characters/enemy'
import { type InputType } from '../../inputHandler'
import { shouldChangeDirection } from './helpers'
import EnemyState from './state'

const STATES = ['standing', 'walking', 'attack', 'hurt', 'death'] as const
type StateType = (typeof STATES)[number]

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
    const { player } = this.character.game

    if (this.character.lastInteractionInterval + this.character.interactionInterval > Date.now()) {
      return
    }

    if (
      Math.abs(player.x - this.character.x) < 64 &&
      Math.abs(player.y - this.character.y) < 64 &&
      this.character.canAttack()
    ) {
      this.character.setState('attack')
    } else {
      this.character.setState('walking')
    }
  }
}

export class Walking extends AttackableEnemyState {
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
    const player = this.character.game.player

    // if (
    //   !this.character.game.map.hasObstacle(
    //     this.character.x + this.character.paddingLeft + this.character.speed + 0.1,
    //     this.character.y + this.character.height + 16.5
    //   ) ||
    //   !this.character.game.map.hasObstacle(
    //     this.character.x +
    //       this.character.width -
    //       this.character.paddingRight +
    //       this.character.speed +
    //       0.1,
    //     this.character.y + this.character.height + 16.5
    //   ) ||
    //   this.character.game.map.hasObstacle(
    //     this.character.x + this.character.speed * 2,
    //     this.character.y + this.character.height / 2
    //   ) ||
    //   this.character.x <= 0
    // ) {
    if (shouldChangeDirection(this.character)) {
      this.character.speed *= -1
      this.character.direction = this.character.direction === 'right' ? 'left' : 'right'
    }

    if (
      Math.abs(player.x - this.character.x) < 60 &&
      Math.abs(player.y - this.character.y) < 32 &&
      this.character.canAttack()
    ) {
      this.character.setState('attack')
    }
  }
}

export class Attack extends AttackableEnemyState {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 200
  hit = false

  constructor (character: Enemy<StateType>) {
    super(character, 'attack')
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.animate = true
    this.character.speed = 0
    this.hit = false

    this.character.lastAttackTimestamp = Date.now()
    this.character.lastInteractionInterval = Date.now()
  }

  handleInput (inputs: InputType[]): void {
    const { player } = this.character.game

    if (player.x - this.character.x > 0) {
      this.character.direction = 'right'
    } else {
      this.character.direction = 'left'
    }

    if (this.character.currentSprite.frameX === 3) {
      this.animate = false
      this.hit = false
      this.character.setState('standing')
    } else if (
      this.character.currentSprite.frameX === 2 &&
      !this.hit &&
      Math.abs(player.y - this.character.y) < 32
    ) {
      if (
        (this.character.direction === 'left' &&
          this.character.x - player.x < 60 &&
          this.character.x - player.x > 0) ||
        (this.character.direction === 'right' &&
          player.x - this.character.x < 60 &&
          player.x - this.character.x > 0)
      ) {
        this.hit = true
        player.hurt(2)
      }
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

export class Death extends AttackableEnemyState {
  constructor (public character: Enemy<StateType>) {
    super(character, 'death')
  }

  enter (): void {
    // this.performed = false
    // this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {}
}
