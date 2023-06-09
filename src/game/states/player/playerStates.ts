import type Enemy from '../../characters/enemy'
import type Player from '../../characters/player/player'
import { type InputType } from '../../inputHandler'
import { State } from '../state'
import Sounds from '../../sounds'
import sounds from '../../sounds'

export class Standing extends State {
  constructor(public character: Player) {
    super('standing')
  }

  enter(): void {
    this.character.speed = 0
  }

  handle(inputs: InputType[]): void {
    if (inputs.includes('ArrowRight')) this.character.setState('running', 'right')
    else if (inputs.includes('ArrowLeft')) this.character.setState('running', 'left')
    else if (inputs.includes('ArrowUp')) this.character.setState('jumping')
    else if (inputs.includes('Digit1')) this.character.gunManager.hideGun()
    else if (inputs.includes('Digit2')) this.character.gunManager.showGun()
    else if (inputs.includes('Enter')) this.character.setState('use')
    else if (inputs.includes('Space')) this.character.shot()
  }
}

export class Running extends State {
  constructor(public character: Player) {
    super('running')
  }

  enter(): void {
    sounds.footSound()
    if (this.character.direction === 'right') {
      this.character.speed = this.character.maxSpeed
    } else {
      this.character.speed = -this.character.maxSpeed
    }
  }

  leave() {
    sounds.stopFootSound()
  }

  handle(inputs: InputType[]): void {
    if (this.character.direction === 'right' && inputs.includes('ArrowLeft')) {
      this.character.setState('standing', 'left')
    } else if (this.character.direction === 'left' && inputs.includes('ArrowRight')) {
      this.character.setState('standing', 'right')
    } else if (
      (this.character.direction === 'right' && !inputs.includes('ArrowRight')) ||
      (this.character.direction === 'left' && !inputs.includes('ArrowLeft'))
    ) {
      this.character.setState('standing')
    } else if (inputs.includes('ArrowUp')) this.character.setState('jumping')
    else if (inputs.includes('Space')) {
      if (this.character.gunManager.currentGun) {
        this.character.shot()
      } else {
        this.character.setState('doubleJump')
      }
    } else if (inputs.includes('Digit1')) this.character.gunManager.hideGun()
    else if (inputs.includes('Digit2')) this.character.gunManager.showGun()
  }
}

export class Jumping extends State {
  constructor(public character: Player) {
    super('jumping')
  }

  enter(): void {
    sounds.jumpSound()
    if (this.character.onGround()) {
      this.character.vy -= 20
    }
  }

  handle(inputs: InputType[]): void {
    if (inputs.includes('ArrowRight')) {
      this.character.speed = this.character.maxSpeed
      this.character.direction = 'right'
    } else if (inputs.includes('ArrowLeft')) {
      this.character.speed = -this.character.maxSpeed
      this.character.direction = 'left'
    } else {
      this.character.speed = 0
    }
    if (this.character.onGround()) this.character.setState('standing')
    if (this.character.vy > 0) this.character.setState('falling')
    else if (inputs.includes('Space')) {
      if (this.character.gunManager.currentGun) {
        this.character.shot()
      } else {
        this.character.setState('doubleJump')
      }
    } else if (inputs.includes('Digit1')) this.character.gunManager.hideGun()
    else if (inputs.includes('Digit2')) this.character.gunManager.showGun()
  }
}

export class Falling extends State {
  constructor(public character: Player) {
    super('falling')
  }

  enter(): void {}

  handle(inputs: InputType[]): void {
    if (inputs.includes('ArrowRight')) {
      this.character.speed = this.character.maxSpeed
      this.character.direction = 'right'
    } else if (inputs.includes('ArrowLeft')) {
      this.character.speed = -this.character.maxSpeed
      this.character.direction = 'left'
    } else {
      this.character.speed = 0
    }
    if (this.character.onGround()) {
      this.character.setState('standing')
    } else if (inputs.includes('Space')) {
      if (this.character.gunManager.currentGun) {
        this.character.shot()
      } else {
        this.character.setState('doubleJump')
      }
    } else if (inputs.includes('Digit1')) this.character.gunManager.hideGun()
    else if (inputs.includes('Digit2')) this.character.gunManager.showGun()
  }
}

abstract class BaseHit extends State {
  performed = false
  hit: Enemy[] = []
  abstract hitFrame: number

  // eslint-disable-next-line
  constructor(public character: Player, state: string) {
    super(state)
  }

  enter(): void {
    this.performed = false
    this.hit = []
  }

  checkEnemy(enemy: Enemy): void {
    const character = this.character
    if (
      enemy.health > 0 &&
      enemy.y < character.y + character.height / 2 &&
      enemy.y + enemy.height > character.y + character.height / 2 &&
      enemy.x > character.x - 32 &&
      enemy.x < character.x + 32 &&
      character.spriteManager.getCurrentFrame() === this.hitFrame &&
      !this.hit.includes(enemy)
    ) {
      this.hit.push(enemy)
      enemy.hurt(this.getHurtValue())
    }
  }

  handle(): void {
    if (this.character.spriteManager.getCurrentSprite().performed) {
      this.character.setState('standing')
    }
    // if (this.performed) {
    //   this.character.setState('standing')
    // }
    // if (this.character.spriteManager.getCurrentFrame() === this.character.spriteManager.getCurrentSprite().getFrames() - 1) {
    //   this.performed = true
    // }

    for (const enemy of this.character.game.map.enemies) {
      this.checkEnemy(enemy)
    }
  }

  abstract getHurtValue(): number
}

export class StrongAttack extends BaseHit {
  performed = false
  hitFrame = 5
  constructor(public character: Player) {
    super(character, 'strongAttack')
  }

  getHurtValue(): number {
    return 8
  }
}

export class DoubleHit extends BaseHit {
  hitFrame = 4
  constructor(public character: Player) {
    super(character, 'doubleHit')
  }

  getHurtValue(): number {
    return 4
  }
}

export class Hit extends BaseHit {
  hitFrame = 4
  constructor(public character: Player) {
    super(character, 'hit')
  }

  getHurtValue(): number {
    return 2
  }
}

export class Use extends State {
  constructor(public character: Player) {
    super('use')
  }

  enter(): void {}

  handle(): void {
    if (this.character.spriteManager.getCurrentSprite().performed) {
      this.character.setState('standing')
    }
  }
}

export class Hurt extends State {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor(public character: Player) {
    super('hurt')
  }

  enter(): void {
    this.time = Date.now()
    this.performed = false
    this.character.speed = 0
    this.character.invisible = true
    this.character.invisibleStartDate = Date.now()

    Sounds.hurtSound()
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
  performed = false
  constructor(public character: Player) {
    super('death')
  }

  enter(): void {
    // this.performed = false
    this.character.speed = 0
  }

  handle(): void {
    if (this.performed) {
      this.animate = false
      return
      // this.character.setState('standing')
    }
    // if (this.character.frameX === this.sprite.frames - 1) {
    //   this.performed = true
    // }
  }
}

export class DoubleJump extends State {
  performed = false
  hit: Enemy[] = []
  constructor(public character: Player) {
    super('doubleJump')
  }

  enter(): void {
    this.hit = []
    this.character.vy = 0
    this.performed = false
    // this.character.speed = this.character.maxSpeed * 1.5
  }

  handle(): void {
    if (this.character.spriteManager.getCurrentFrame() < 5 && !this.performed) {
      this.character.vy = 2
      this.character.speed = this.character.maxSpeed * 2
      if (this.character.direction === 'left') {
        this.character.speed *= -1
      }
    }

    if (
      this.character.spriteManager.getCurrentFrame() ===
      this.character.spriteManager.getCurrentSprite().getFrames() - 1
    ) {
      this.character.setState('standing')
    }

    for (const enemy of this.character.game.map.enemies) {
      this.checkEnemy(enemy)
    }
  }

  checkEnemy(enemy: Enemy): void {
    const character = this.character
    if (
      enemy.health > 0 &&
      enemy.y < character.y + character.height / 2 &&
      enemy.y + enemy.height > character.y + character.height / 2 &&
      enemy.x > character.x - 32 &&
      enemy.x < character.x + 32 &&
      character.spriteManager.getCurrentFrame() < 5 &&
      !this.hit.includes(enemy)
    ) {
      this.hit.push(enemy)
      this.performed = true
      enemy.hurt(2)
      enemy.speed = 2 * this.character.getScaleX()
      this.character.speed = 0
      // enemy
    }
  }
}

export class Happy extends State {
  constructor(public character: Player) {
    super('happy')
  }

  enter(): void {
    console.log('enter happy')
    this.character.speed = 0
  }

  handle(): void {
    console.log('handle happy')
    console.log(this.character.spriteManager.getCurrentSprite())
    if (this.character.spriteManager.getCurrentSprite().performed) {
      this.character.setState('standing')
    }
    // if (this.character.frameX === this.sprite.frames - 1) {
    //   this.performed = true
    // }
  }
}
