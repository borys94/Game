import type Game from '..'
import { TILE_SIZE } from '../config'
import { type State } from '../states/state'
import { clamp } from '../utils'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

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
  abstract sprites: Record<CharacterState['state'], Sprite>

  // character positions
  x: number
  y: number

  width = 48
  height = 48

  frameX = 0

  speed = 0
  maxSpeed = 5

  maxHealth: number
  health: number

  direction: Direction = 'right'

  vy = 0
  maxVy: number
  weight = 1.5

  frameTimer = 0
  frameInterval = 100

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

  loadAllAssets (): void {
    const spritesCount = Object.keys(this.sprites).length

    for (const s of Object.keys(this.sprites)) {
      const state = s as CharacterState['state']
      const img = new Image()
      this.sprites[state].img = img
      img.src = this.sprites[state].asset
      img.onload = () => {
        this.loadedAssets++

        if (spritesCount === this.loadedAssets) {
          this.loaded = true
        }
      }
    }
  }

  draw (deltaTime: number): void {
    const width = this.width
    const height = this.height
    const image = this.sprites[this.currentState.state].img
    const scaleX = this.direction === 'left' ? -1 : 1
    const ctx = this.game.ctx

    if (this.frameTimer > this.frameInterval && this.currentState.animate) {
      if (this.frameX < this.sprites[this.currentState.state].frames - 1) {
        this.frameX++
      } else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }

    if ((window as any).debug) {
      ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, width, height)
      ctx.strokeRect(this.x + 4 - this.game.camera.x, this.y - this.game.camera.y, width / 2 - 4, height)
    }

    if (!image) {
      return
    }

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#00FF00'
    ctx.lineWidth = 2
    ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, width, 5)
    ctx.fillRect(this.x - this.game.camera.x, this.y - this.game.camera.y, width * (this.health / this.maxHealth), 5)
    ctx.restore()

    ctx.save()
    ctx.scale(scaleX, 1)
    ctx.drawImage(
      image,
      width * this.frameX,
      0,
      width,
      height,
      this.x * scaleX - 14 * (scaleX * -1 + 1) - this.game.camera.x * scaleX,
      this.y - this.game.camera.y,
      width,
      height
    )
    ctx.restore()
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

    this.currentState = this.states[state]
    this.currentState.enter()
  }

  onGround = (): boolean => {
    return (
      this.game.map.hasObstacle(this.x + 1, this.y + this.height + 0.1) ||
      this.game.map.hasObstacle(this.x + this.width / 2 - 1, this.y + this.height + 0.1)
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
      this.y = Math.floor((this.y) / 32 + 1) * 32
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
      this.game.map.hasObstacle(this.x + this.width / 2, this.y) ||
      this.game.map.hasObstacle(this.x + this.width / 2, this.y + this.height) ||
      this.game.map.hasObstacle(this.x + this.width / 2, this.y + this.height / 2)
    ) {
      this.x = Math.floor((this.x) / 32) * 32 + 8
    } else if (
      this.game.map.hasObstacle(this.x, this.y) ||
      this.game.map.hasObstacle(this.x, this.y + this.height) ||
      this.game.map.hasObstacle(this.x, this.y + this.height / 2)
    ) {
      this.x = Math.floor((this.x) / 32 + 0.5) * 32
    }

    if (this.x < 0) {
      this.x = 0
    }
    if (this.x >= this.game.map.width - this.width) {
      this.x = this.game.map.width - this.width
    }
  }

  // hurt = (hurtValue: number): void => {
  //   this.health = Math.max(this.health - hurtValue, 0)
  //   // this.setState()
  // }
}

export default Character
