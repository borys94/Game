import type Game from '..'
import { TILE_SIZE } from '../config'
import SpriteManager from '../sprites/spriteManager'
import StateManager from '../states/stateManager'
import { clamp } from '../utils'

interface CharacterOptions {
  x: number
  y: number
  width: number
  height: number
  maxVy: number
  maxHealth: number
}

export type Direction = 'left' | 'right'

abstract class Character {
  game: Game

  abstract stateManager: StateManager
  abstract spriteManager: SpriteManager

  paddingLeft: number = 4 + 6
  paddingRight: number = 24 - 6

  // character positions
  x: number
  y: number

  width = 48
  height = 48

  speed = 0
  maxSpeed = 5

  maxHealth: number
  health: number

  direction: Direction = 'right'

  vy = 0
  maxVy: number
  weight = 1.5

  constructor(game: Game, options: CharacterOptions) {
    if (options.maxVy > TILE_SIZE) {
      throw new Error(`maxVy cannot be larger than TILE_SIZE=${TILE_SIZE}`)
    }

    this.game = game

    this.width = options.width
    this.height = options.height

    this.maxVy = options.maxVy
    this.maxHealth = options.maxHealth
    this.health = this.maxHealth

    this.x = options.x
    this.y = options.y
  }

  get realX() {
    return this.x + this.paddingLeft
  }
  get realWidth() {
    return this.width - this.paddingLeft - this.paddingRight
  }

  getPlayerCenter() {
    return this.x + ((this.width - this.paddingLeft - this.paddingRight) / 2 + this.paddingLeft)
  }

  getScaleX() {
    return this.direction === 'left' ? -1 : 1
  }

  draw(deltaTime: number): void {
    const width = this.width
    const height = this.height
    const ctx = this.game.ctx

    if ((window as any).debug) {
      ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, width, height)
      ctx.strokeRect(
        this.x + this.paddingLeft - this.game.camera.x,
        this.y - this.game.camera.y,
        width - this.paddingRight - this.paddingLeft,
        height
      )
    }

    this.spriteManager.draw(ctx, deltaTime)
  }

  update(): void {
    this.stateManager.handle(this.game.inputHandler.activeKeys)

    this.handleHorizontalMovement()
    this.handleVerticalMovement()
  }

  setState = (state: string, direction?: Direction): void => {
    if (direction) {
      this.direction = direction
    }

    this.spriteManager.setSprite(state)

    this.stateManager.currentState.leave()
    this.stateManager.setState(state)
    this.spriteManager.onSetState(state)
  }

  onGround = (x: number = this.x): boolean => {
    return (
      this.game.map.hasObstacle(x + 1, this.y + this.height + 0.1) ||
      this.game.map.hasObstacle(x + this.width / 2 - 1, this.y + this.height + 0.1)
    )
  }

  handleVerticalMovement = (): void => {
    this.y += this.vy
    if (this.y <= 1) {
      this.vy += this.weight
      return
    }

    this.checkTopCollision()
    this.checkBottomCollision()
  }

  checkTopCollision = (): void => {
    if (
      this.game.map.hasObstacle(this.x + 1, this.y - 1) ||
      this.game.map.hasObstacle(this.x + this.width / 2 - 1, this.y - 1)
    ) {
      this.y = Math.floor(this.y / 32 + 1) * 32
      this.vy = 0
    }
  }

  checkBottomCollision = (): void => {
    if (!this.onGround()) {
      this.vy += this.weight
      this.vy = clamp(this.vy, -this.maxVy, this.maxVy)
    } else {
      this.vy = 0
      this.y = Math.floor((this.y + this.height) / 32) * 32 - this.height
    }
  }

  handleHorizontalMovement = (): void => {
    this.x += this.speed

    if (
      this.game.map.hasObstacle(this.x + this.width - this.paddingRight - 0.01, this.y) ||
      this.game.map.hasObstacle(this.x + this.width - this.paddingRight - 0.01, this.y + this.height) ||
      this.game.map.hasObstacle(this.x + this.width - this.paddingRight - 0.01, this.y + this.height / 2)
    ) {
      this.x = Math.floor(this.x / 32) * 32 + 8
    } else if (
      this.game.map.hasObstacle(this.x + this.paddingLeft + 0.01, this.y) ||
      this.game.map.hasObstacle(this.x + this.paddingLeft + 0.01, this.y + this.height) ||
      this.game.map.hasObstacle(this.x + this.paddingLeft + 0.01, this.y + this.height / 2)
    ) {
      this.x = Math.floor(this.x / 32 + 0.5) * 32
    }

    if (this.x < 0) {
      this.x = 0
    }
    if (this.x >= this.game.map.width - this.width + this.paddingRight) {
      this.x = this.game.map.width - this.width + this.paddingRight
    }
  }

  isAlive(): boolean {
    return this.health > 0
  }

  hurt(hurtValue: number) {
    if (this.health > 0) {
      this.setState('hurt')
    }
    this.health = Math.max(this.health - hurtValue, 0)
  }
}

export default Character
