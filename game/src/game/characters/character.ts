import { TILE_SIZE } from '../config'
import { type InputType } from '../inputHandler'
import type Map from '../map'
import { type State } from '../states/state'
import { clamp } from '../utils'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

export type Direction = 'left' | 'right'

abstract class Character<CharacterState extends string> {
  mapWidth: number
  mapHeight: number
  map: Map

  abstract states: Record<CharacterState, State<CharacterState>>
  abstract currentState: State<CharacterState>
  abstract sprites: Record<CharacterState, Sprite>

  // character positions
  x: number
  y: number

  width = 48
  height = 48

  cameraX = 0
  cameraY = 0

  frameX = 0

  speed = 0
  maxSpeed = 5

  direction: Direction = 'right'

  vy = 0
  maxVy: number
  weight = 1.5

  frameTimer = 0
  frameInterval = 100

  loadedAssets = 0
  loaded = false

  constructor (map: Map, x: number, y: number, width: number, height: number, maxVy: number) {
    if (maxVy > TILE_SIZE) {
      throw new Error(`maxVy cannot be larger than TILE_SIZE=${TILE_SIZE}`)
    }

    this.mapWidth = map.width
    this.mapHeight = map.height
    this.map = map

    this.width = width
    this.height = height

    this.maxVy = maxVy

    this.x = x
    this.y = y
  }

  loadAllAssets (): void {
    const spritesCount = Object.keys(this.sprites).length

    for (const s of Object.keys(this.sprites)) {
      const state = s as CharacterState
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

  draw (ctx: CanvasRenderingContext2D, deltaTime: number): void {
    const width = this.width
    const height = this.height
    const image = this.sprites[this.currentState.state].img
    const scaleX = this.direction === 'left' ? -1 : 1

    if (this.frameTimer > this.frameInterval && this.currentState.animate) {
      if (this.frameX < this.sprites[this.currentState.state].frames - 1) {
        this.frameX++
      } else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }

    if ((window as any).debug) {
      ctx.strokeRect(this.x - this.cameraX, this.y - this.cameraY, width, height)
      ctx.strokeRect(this.x + 4 - this.cameraX, this.y - this.cameraY, width / 2 - 4, height)
    }

    if (!image) {
      return
    }

    ctx.save()
    ctx.scale(scaleX, 1)
    ctx.drawImage(
      image,
      width * this.frameX,
      0,
      width,
      height,
      this.x * scaleX - 14 * (scaleX * -1 + 1) - this.cameraX * scaleX,
      this.y - this.cameraY,
      width,
      height
    )
    ctx.restore()
  }

  applyCamera = (x: number, y: number): void => {
    this.cameraX = x
    this.cameraY = y
  }

  update (keys: InputType[], map: Map): void {
    this.currentState.handleInput(keys)

    this.handleHorizontalMovement()
    this.handleVerticalMovement()
  }

  setState = (state: CharacterState, direction?: Direction): void => {
    if (direction) {
      this.direction = direction
    }

    this.currentState = this.states[state]
    this.currentState.enter()
  }

  onGround = (): boolean => {
    return (
      this.map.hasObstacle(this.x + 1, this.y + this.height + 0.1) ||
      this.map.hasObstacle(this.x + this.width / 2 - 1, this.y + this.height + 0.1)
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
      this.map.hasObstacle(this.x + 1, this.y - 1) ||
      this.map.hasObstacle(this.x + this.width / 2 - 1, this.y - 1)
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
      this.map.hasObstacle(this.x + this.width / 2, this.y) ||
      this.map.hasObstacle(this.x + this.width / 2, this.y + this.height) ||
      this.map.hasObstacle(this.x + this.width / 2, this.y + this.height / 2)
    ) {
      this.x = Math.floor((this.x) / 32) * 32 + 8
    } else if (
      this.map.hasObstacle(this.x, this.y) ||
      this.map.hasObstacle(this.x, this.y + this.height) ||
      this.map.hasObstacle(this.x, this.y + this.height / 2)
    ) {
      this.x = Math.floor((this.x) / 32 + 0.5) * 32
    }

    if (this.x < 0) {
      this.x = 0
    }
    if (this.x >= this.map.width - this.width) {
      this.x = this.map.width - this.width
    }
  }
}

export default Character
