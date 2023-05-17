import type Game from '..'
import { TILE_SIZE } from '../config'
import type SpriteClass from '../sprites/playerSprites'
import { type State } from '../states/state'
import { clamp } from '../utils'
// eslint-disable-next-line
import Player from './player'
// import Player from './player'

interface CharacterOptions {
  x: number
  y: number
  width: number
  height: number
  maxVy: number
  maxHealth: number
}

export type Direction = 'left' | 'right'

abstract class Character<T extends string, CharacterState extends State<T>> {
  mapWidth: number
  mapHeight: number

  game: Game

  abstract states: Record<CharacterState['state'], CharacterState>
  abstract currentState: CharacterState

  abstract sprites: Record<CharacterState['state'], SpriteClass>
  abstract currentSprite: SpriteClass

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

  loadedAssets = 0
  loaded = false

  constructor (game: Game, options: CharacterOptions) {
    if (options.maxVy > TILE_SIZE) {
      throw new Error(`maxVy cannot be larger than TILE_SIZE=${TILE_SIZE}`)
    }

    this.game = game
    this.mapWidth = this.game.map.width
    this.mapHeight = this.game.map.height

    this.width = options.width
    this.height = options.height

    this.maxVy = options.maxVy
    this.maxHealth = options.maxHealth
    this.health = this.maxHealth

    this.x = options.x
    this.y = options.y
  }

  draw (deltaTime: number): void {
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

    if (this.isAlive()) {
      ctx.save()
      ctx.strokeStyle = '#000000'
      ctx.fillStyle = '#00FF00'
      ctx.lineWidth = 2
      ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, width, 5)
      ctx.fillRect(
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        width * (this.health / this.maxHealth),
        5
      )
      ctx.restore()
    }

    this.currentSprite.draw(ctx, deltaTime)
  }

  update (): void {
    this.currentState.handleInput(this.game.inputHandler.activeKeys)

    this.handleHorizontalMovement()
    this.handleVerticalMovement()
  }

  setState = (state: CharacterState['state'], direction?: Direction): void => {
    if (direction) {
      this.direction = direction
    }

    this.currentSprite.leave()
    this.currentSprite = this.sprites[state]
    this.currentSprite.enter()

    this.currentState = this.states[state]
    this.currentState.enter()
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
      // console.log('in the air')

      // const wasPrevDownUpHill = this.isOnDownHill(this.y - this.weight)
    } else {
      this.vy = 0
      this.y = Math.floor((this.y + this.height) / 32) * 32 - this.height
    }
  }

  handleHorizontalMovement = (): void => {
    this.x += this.speed

    if (
      this.game.map.hasObstacle(this.x + this.width / 2, this.y) ||
      this.game.map.hasObstacle(this.x + this.width / 2, this.y + this.height) ||
      this.game.map.hasObstacle(this.x + this.width / 2, this.y + this.height / 2)
    ) {
      this.x = Math.floor(this.x / 32) * 32 + 8
    } else if (
      this.game.map.hasObstacle(this.x, this.y) ||
      this.game.map.hasObstacle(this.x, this.y + this.height) ||
      this.game.map.hasObstacle(this.x, this.y + this.height / 2)
    ) {
      this.x = Math.floor(this.x / 32 + 0.5) * 32
    }

    if (this.x < 0) {
      this.x = 0
    }
    if (this.x >= this.game.map.width - this.width) {
      this.x = this.game.map.width - this.width
    }
  }

  isAlive (): boolean {
    return this.health > 0
  }

  // hurt = (hurtValue: number): void => {
  //   if ('hurt' in this.states) {
  //     this.health = Math.max(this.health - hurtValue, 0)
  //     this.setState('hurt')
  //   }
  // }
}

export default Character
