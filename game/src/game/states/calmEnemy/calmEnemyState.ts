import type Enemy from '../../characters/enemy'
import { shouldChangeDirection } from '../helpers'
import { State } from '../state'

export abstract class CowardlyEnemyState extends State {
  constructor (public character: Enemy, public state: string) {
    super(state)
  }
}

export class Standing extends CowardlyEnemyState {
  constructor (character: CowardlyEnemyState['character']) {
    super(character, 'standing')
  }

  enter (): void {
    this.character.speed = 0
  }

  handle (): void {
    const { player } = this.character.game
    if (Math.abs(player.x - this.character.x) < 150 && Math.abs(player.x - this.character.x) > 32) {
      this.character.setState('walking')
    }
  }
}

export class Walking extends CowardlyEnemyState {
  constructor (character: Enemy) {
    super(character, 'walking')
  }

  enter (): void {
    this.character.speed = this.character.maxSpeed
    if (this.character.direction === 'left') {
      this.character.speed *= -1
    }
  }

  handle (): void {
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

  constructor (public character: Enemy) {
    super(character, 'hurt')
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.character.speed = 0
  }

  handle (): void {
    this.timestamp = Date.now()
    if (this.character.health <= 0) {
      this.character.setState('death')
    } else if (this.timestamp - this.time >= this.deltaTime) {
      this.character.setState('standing')
    }
  }
}

export class Death extends CowardlyEnemyState {
  constructor (public character: Enemy) {
    super(character, 'death')
  }

  enter (): void {
    this.character.speed = 0
    // this.performed = false
    // this.character.frameX = 0
  }

  handle (): void {}
}
