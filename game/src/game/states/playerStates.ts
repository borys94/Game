import type Enemy from '../characters/enemy'
import type Player from '../characters/player'
import { type InputType } from '../inputHandler'
import {
  DeathSprite,
  DoubleHitSprite,
  FallingSprite,
  HitSprite,
  HurtSprite,
  JumpingSprite,
  RunningSprite,
  StandingSprite,
  StrongHitSprite,
  UseSprite
} from '../sprites/playerSprites'
import { State } from './state'

const STATES = [
  'standing',
  'running',
  'jumping',
  'falling',
  'strongAttack',
  'doubleHit',
  'hit',
  'use',
  'hurt',
  'death'
] as const
export type PlayerStateTypes = (typeof STATES)[number]

export abstract class PlayerState extends State<PlayerStateTypes> {
  // eslint-disable-next-line
  constructor(public readonly character: Player, public state: PlayerStateTypes) {
    super(state)
  }

  enter (): void {}
}

export class Standing extends PlayerState {
  sprite: StandingSprite

  constructor (public character: Player) {
    super(character, 'standing')
    this.sprite = new StandingSprite(character)
  }

  enter (): void {
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    if (inputs.includes('ArrowRight')) this.character.setState('running', 'right')
    else if (inputs.includes('ArrowLeft')) this.character.setState('running', 'left')
    else if (inputs.includes('ArrowUp')) this.character.setState('jumping')
    else if (inputs.includes('Digit1')) this.character.setState('hit')
    else if (inputs.includes('Digit2')) this.character.setState('doubleHit')
    else if (inputs.includes('Digit3')) this.character.setState('strongAttack')
    else if (inputs.includes('Space')) this.character.setState('use')
    else if (inputs.includes('Digit4')) this.character.setState('hurt')
  }
}

export class Running extends State<PlayerStateTypes> {
  sprite: RunningSprite
  constructor (public character: Player) {
    super('running')
    this.sprite = new RunningSprite(character)
  }

  enter (): void {
    if (this.character.direction === 'right') {
      this.character.speed = this.character.maxSpeed
    } else {
      this.character.speed = -this.character.maxSpeed
    }
  }

  handleInput (inputs: InputType[]): void {
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
  }
}

export class Jumping extends State<PlayerStateTypes> {
  sprite: JumpingSprite
  constructor (public character: Player) {
    super('jumping')
    this.sprite = new JumpingSprite(character)
  }

  enter (): void {
    if (this.character.onGround()) {
      this.character.vy -= 20
    }
  }

  handleInput (inputs: InputType[]): void {
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
  }
}

export class Falling extends State<PlayerStateTypes> {
  sprite: FallingSprite
  constructor (public character: Player) {
    super('falling')
    this.sprite = new FallingSprite(character)
  }

  enter (): void {}

  handleInput (inputs: InputType[]): void {
    if (this.character.direction === 'left' && inputs.includes('ArrowRight')) {
      this.character.direction = 'right'
    }
    if (this.character.direction === 'right' && inputs.includes('ArrowLeft')) {
      this.character.direction = 'left'
    }
    if (this.character.onGround()) {
      this.character.setState('standing')
    }
  }
}

abstract class BaseHit extends State<PlayerStateTypes> {
  performed = false

  // eslint-disable-next-line
  constructor(public character: Player, state: PlayerStateTypes) {
    super(state)
  }

  enter (): void {
    this.performed = false

    for (const enemy of this.character.game.map.enemies) {
      this.checkEnemy(enemy)
    }
  }

  checkEnemy (enemy: Enemy<any>): void {
    const character = this.character
    if (
      enemy.health > 0 &&
      enemy.y < character.y + character.height / 2 &&
      enemy.y + enemy.height > character.y + character.height / 2 &&
      enemy.x > character.x - 32 &&
      enemy.x < character.x + 32
    ) {
      enemy.health = Math.max(enemy.health - this.getHurtValue(), 0)
      enemy.setState('hurt')
    }
  }

  handleInput (): void {
    if (this.performed) {
      this.character.currentSprite.frameX = 0
      this.character.setState('standing')
    }
    if (this.character.currentSprite.frameX === this.character.currentSprite.frames - 1) {
      this.performed = true
    }
  }

  abstract getHurtValue (): number
}

export class StrongAttack extends BaseHit {
  sprite: StrongHitSprite
  performed = false
  constructor (public character: Player) {
    super(character, 'strongAttack')
    this.sprite = new StrongHitSprite(character)
  }

  getHurtValue (): number {
    return 8
  }
}

export class DoubleHit extends BaseHit {
  sprite: DoubleHitSprite
  constructor (public character: Player) {
    super(character, 'doubleHit')
    this.sprite = new DoubleHitSprite(character)
  }

  getHurtValue (): number {
    return 4
  }
}

export class Hit extends BaseHit {
  sprite: HitSprite
  constructor (public character: Player) {
    super(character, 'hit')
    this.sprite = new HitSprite(character)
  }

  getHurtValue (): number {
    return 2
  }
}

export class Use extends State<PlayerStateTypes> {
  sprite: UseSprite
  performed = false
  constructor (public character: Player) {
    super('use')
    this.sprite = new UseSprite(character)
  }

  enter (): void {
    this.performed = false
    this.sprite.frameX = 0
  }

  handleInput (): void {
    if (this.performed) {
      this.sprite.frameX = 0
      this.character.setState('standing')
    }
    if (this.sprite.frameX === this.sprite.frames - 1) {
      this.performed = true
    }
  }
}

export class Hurt extends State<PlayerStateTypes> {
  sprite: HurtSprite
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor (public character: Player) {
    super('hurt')
    this.sprite = new HurtSprite(character)
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.sprite.frameX = 1
    this.character.speed = 0

    this.character.game.sounds.hurtSound()
  }

  handleInput (): void {
    this.timestamp = Date.now()
    if (this.character.health <= 0) {
      this.character.setState('death')
    } else if (this.timestamp - this.time >= this.deltaTime) {
      this.sprite.frameX = 0
      this.character.setState('standing')
    }
  }
}

export class Death extends State<PlayerStateTypes> {
  sprite: DeathSprite
  performed = false
  constructor (public character: Player) {
    super('death')
    this.sprite = new DeathSprite(character)
  }

  enter (): void {
    // this.performed = false
    this.character.speed = 0
  }

  handleInput (): void {
    if (this.performed) {
      this.animate = false
      return
      // this.character.setState('standing')
    }
    if (this.sprite.frameX === this.sprite.frames - 1) {
      this.performed = true
    }
  }
}
