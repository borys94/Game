import type Enemy from '../../characters/enemy'
import { shouldChangeDirection } from '../helpers'
import { State } from '../state'

export class Standing extends State {
  constructor(public character: Enemy) {
    super('standing')
  }

  enter(): void {
    this.character.speed = 0
  }

  handle(): void {
    const { player } = this.character.game

    if (this.character.lastInteractionInterval + this.character.interactionInterval > Date.now()) {
      return
    }

    if (Math.abs(player.x - this.character.x) < 64 && Math.abs(player.y - this.character.y) < 64 && player.isAlive()) {
      this.character.setState('attack')
    } else {
      this.character.setState('walking')
    }
  }
}

export class Walking extends State {
  constructor(public character: Enemy) {
    super('walking')
  }

  enter(): void {
    this.character.speed = this.character.maxSpeed
    if (this.character.direction === 'left') {
      this.character.speed *= -1
    }
  }

  handle(): void {
    const player = this.getPlayer()

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

export class Attack extends State {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 200
  hit = false

  constructor(public character: Enemy) {
    super('attack')
  }

  enter(): void {
    this.time = Date.now()
    this.performed = false
    this.animate = true
    this.character.speed = 0
    this.hit = false

    this.character.lastAttackTimestamp = Date.now()
    this.character.lastInteractionInterval = Date.now()
    const player = this.getPlayer()

    if (player.x - this.character.x > 0) {
      this.character.direction = 'right'
    } else {
      this.character.direction = 'left'
    }
  }

  handle(): void {
    const player = this.getPlayer()
    const frameX = this.character.spriteManager.defaultSprites[this.character.stateManager.currentState.state].frameX

    if (frameX === 3) {
      this.animate = false
      this.hit = false
      this.character.setState('standing')
    } else if (frameX === 2 && !this.hit && Math.abs(player.y - this.character.y) < 32) {
      if (
        (this.character.direction === 'left' && this.character.x - player.x < 60 && this.character.x - player.x > 0) ||
        (this.character.direction === 'right' && player.x - this.character.x < 60 && player.x - this.character.x > 0)
      ) {
        this.hit = true
        player.hurt(2)
      }
    }
  }
}

export class Hurt extends State {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor(public character: Enemy) {
    super('hurt')
  }

  enter(): void {
    this.time = Date.now()
    this.performed = false
    this.character.speed = 0
  }

  handle(): void {
    this.timestamp = Date.now()
    if (this.character.health <= 0) {
      this.character.setState('death')
    } else if (this.timestamp - this.time >= this.deltaTime) {
      this.character.setState('standing')
    }
  }
}

export class Death extends State {
  constructor(public character: Enemy) {
    super('death')
  }

  enter(): void {
    this.character.speed = 0
    // this.performed = false
    // this.character.frameX = 0
  }

  handle(): void {}
}
