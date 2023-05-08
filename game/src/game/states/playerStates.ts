import type Player from '../characters/player'
import { type InputType } from '../inputHandler'
import { State } from './state'

const STATES = ['standing', 'running', 'jumping', 'falling', 'strongAttack', 'doubleHit', 'hit', 'use', 'hurt', 'death'] as const
type PlayerStateTypes = typeof STATES[number]

export abstract class PlayerState extends State<PlayerStateTypes> {
  constructor (public character: Player, public state: PlayerStateTypes) {
    super(state)
  }

  enter (): void {
  }
}

export class Standing extends PlayerState {
  constructor (public character: Player) {
    super(character, 'standing')
  }

  enter (): void {
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    if (inputs.includes('ArrowRight')) this.character.setState('running', 'right')
    else if (inputs.includes('ArrowLeft')) this.character.setState('running', 'left')// this.character.setState("standingLeft")
    else if (inputs.includes('ArrowUp')) this.character.setState('jumping')
    else if (inputs.includes('Digit1')) this.character.setState('hit')
    else if (inputs.includes('Digit2')) this.character.setState('doubleHit')
    else if (inputs.includes('Digit3')) this.character.setState('strongAttack')
    else if (inputs.includes('Space')) this.character.setState('use')
    else if (inputs.includes('Digit4')) this.character.setState('hurt')
  }
}

export class Running extends State<PlayerStateTypes> {
  constructor (public character: Player) {
    super('running')
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
    ) this.character.setState('standing')
    else if (inputs.includes('ArrowUp')) this.character.setState('jumping')
  }
}

export class Jumping extends State<PlayerStateTypes> {
  constructor (public character: Player) {
    super('jumping')
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
  constructor (public character: Player) {
    super('falling')
  }

  enter (): void {

  }

  handleInput (inputs: InputType[]): void {
    if (this.character.direction === 'left' && inputs.includes('ArrowRight')) this.character.direction = 'right'
    if (this.character.direction === 'right' && inputs.includes('ArrowLeft')) this.character.direction = 'left'
    else if (this.character.onGround()) this.character.setState('standing')
  }
}

export class StrongAttack extends State<PlayerStateTypes> {
  performed = false
  constructor (public character: Player) {
    super('strongAttack')
  }

  enter (): void {
    this.performed = false
    this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {
    if (this.performed) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
    if (this.character.frameX === 7) {
      this.performed = true
    }
  }
}

export class DoubleHit extends State<PlayerStateTypes> {
  performed = false
  constructor (public character: Player) {
    super('doubleHit')
  }

  enter (): void {
    this.performed = false
    this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {
    if (this.performed) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
    if (this.character.frameX === 7) {
      this.performed = true
    }
  }
}

export class Hit extends State<PlayerStateTypes> {
  performed = false
  constructor (public character: Player) {
    super('hit')
  }

  enter (): void {
    this.performed = false
    this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {
    if (this.performed) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
    if (this.character.frameX === 5) {
      this.performed = true
    }
  }
}

export class Use extends State<PlayerStateTypes> {
  performed = false
  constructor (public character: Player) {
    super('use')
  }

  enter (): void {
    this.performed = false
    this.character.frameX = 0
  }

  handleInput (inputs: InputType[]): void {
    if (this.performed) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
    if (this.character.frameX === 5) {
      this.performed = true
    }
  }
}

export class Hurt extends State<PlayerStateTypes> {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor (public character: Player) {
    super('hurt')
  }

  enter (): void {
    this.time = Date.now()
    this.performed = false
    this.character.frameX = 1
    this.character.speed = 0
  }

  handleInput (inputs: InputType[]): void {
    this.timestamp = Date.now()
    if (this.timestamp - this.time >= this.deltaTime) {
      this.character.frameX = 0
      this.character.setState('standing')
    }
  }
}

export class Death extends State<PlayerStateTypes> {
  performed = false
  constructor (public character: Player) {
    super('death')
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
    if (this.character.frameX === 5) {
      this.performed = true
    }
  }
}
