import Player from "./player";
import { InputType } from "./inputHandler";

const STATES = ['standing', 'running', 'jumping', 'falling', 'strongAttack', 'doubleHit', 'hit', 'use', 'hurt'] as const
export type StateType = typeof STATES[number]

export abstract class State {
  state: StateType
  animate = true
  abstract player: Player

  constructor(state: StateType) {
    this.state = state
  }

  abstract enter(): void
  abstract handleInput(inputs: InputType[]): void
}

export class Standing extends State {

  constructor(public player: Player) {
    super("standing")
  }

  enter() {
    this.player.speed = 0
  }

  handleInput(inputs: InputType[]) {
    if (inputs.includes('ArrowRight')) this.player.setState("running", "right")
    else if (inputs.includes('ArrowLeft')) this.player.setState("running", "left")// this.player.setState("standingLeft")
    else if (inputs.includes('ArrowUp')) this.player.setState("jumping")
    else if (inputs.includes('Digit1')) this.player.setState("hit")
    else if (inputs.includes('Digit2')) this.player.setState("doubleHit")
    else if (inputs.includes('Digit3')) this.player.setState("strongAttack")
    else if (inputs.includes('Space')) this.player.setState("use")
    else if (inputs.includes('Digit4')) this.player.setState("hurt")
  }
}

export class Running extends State {
  constructor(public player: Player) {
    super("running")
  }

  enter() {
    if (this.player.direction === "right") {
      this.player.speed = this.player.maxSpeed
    } else {
      this.player.speed = -this.player.maxSpeed
    }
  }

  handleInput(inputs: InputType[]) {
    if (this.player.direction === 'right' && inputs.includes('ArrowLeft')) {
      this.player.setState("standing", 'left')
    } else if (this.player.direction === 'left' && inputs.includes('ArrowRight')) {
      this.player.setState("standing", 'right')
    }
    else if (
      (this.player.direction === 'right' && !inputs.includes('ArrowRight')) ||
      (this.player.direction === 'left' && !inputs.includes('ArrowLeft'))
    ) this.player.setState("standing")
    else if (inputs.includes('ArrowUp')) this.player.setState("jumping")
  }
}

export class Jumping extends State {
  constructor(public player: Player) {
    super("jumping")
  }

  enter() {
    if (this.player.onGround()) {
      this.player.vy -= 20
    }    
  }

  handleInput(inputs: InputType[]) {
    if (inputs.includes('ArrowRight')) {
      this.player.speed = this.player.maxSpeed
      this.player.direction = 'right'
    } else if (inputs.includes('ArrowLeft')) {
      this.player.speed = -this.player.maxSpeed
      this.player.direction = 'left'
    } else {
      this.player.speed = 0
    }
    if (this.player.onGround()) this.player.setState("standing")
    if (this.player.vy > 0) this.player.setState("falling")
  }
}

export class Falling extends State {
  constructor(public player: Player) {
    super("falling")
  }

  enter() {
  
  }

  handleInput(inputs: InputType[]) {
    if (this.player.direction === 'left' && inputs.includes('ArrowRight')) this.player.direction = 'right'
    if (this.player.direction === 'right' && inputs.includes('ArrowLeft')) this.player.direction = 'left'
    else if (this.player.onGround()) this.player.setState("standing")
  }
}

export class StrongAttack extends State {
  performed = false
  constructor(public player: Player) {
    super("strongAttack")
  }

  enter() {
    this.performed = false
    this.player.frameX = 0
  }

  handleInput(inputs: InputType[]) {
    if (this.performed) {
      this.player.frameX = 0
      this.player.setState("standing")
    }
    if (this.player.frameX === 7) {
      this.performed = true
    }
  }
}

export class DoubleHit extends State {
  performed = false
  constructor(public player: Player) {
    super("doubleHit")
  }

  enter() {
    this.performed = false
    this.player.frameX = 0
  }

  handleInput(inputs: InputType[]) {
    if (this.performed) {
      this.player.frameX = 0
      this.player.setState("standing")
    }
    if (this.player.frameX === 7) {
      this.performed = true
    }
  }
}

export class Hit extends State {
  performed = false
  constructor(public player: Player) {
    super("hit")
  }

  enter() {
    this.performed = false
    this.player.frameX = 0
  }

  handleInput(inputs: InputType[]) {
    if (this.performed) {
      this.player.frameX = 0
      this.player.setState("standing")
    }
    if (this.player.frameX === 5) {
      this.performed = true
    }
  }
}

export class Use extends State {
  performed = false
  constructor(public player: Player) {
    super("use")
  }

  enter() {
    this.performed = false
    this.player.frameX = 0
  }

  handleInput(inputs: InputType[]) {
    if (this.performed) {
      this.player.frameX = 0
      this.player.setState("standing")
    }
    if (this.player.frameX === 5) {
      this.performed = true
    }
  }
}

export class Hurt extends State {
  performed = false
  animate = false
  time = 0
  timestamp = 0
  deltaTime = 300

  constructor(public player: Player) {
    super("hurt")
  }

  enter() {
    this.time = Date.now()
    this.performed = false
    this.player.frameX = 1
    this.player.speed = 0
  }

  handleInput(inputs: InputType[]) {
    this.timestamp = Date.now()
    if (this.timestamp - this.time >= this.deltaTime) {
      this.player.frameX = 0
      this.player.setState("standing")
    }
  }
}