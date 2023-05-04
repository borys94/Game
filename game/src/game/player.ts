import { type State, Standing, Running, Jumping, Falling, StrongAttack, DoubleHit, Hit, Use, type StateType, Hurt } from './state'
import { type InputType } from './inputHandler'
import type Map from './map'
import { clamp } from './utils'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

type Direction = 'left' | 'right'

class Player {
  gameWidth: number
  gameHeight: number
  states: Record<StateType, State> = {
    standing: new Standing(this),
    running: new Running(this),
    jumping: new Jumping(this),
    falling: new Falling(this),
    hit: new Hit(this),
    doubleHit: new DoubleHit(this),
    strongAttack: new StrongAttack(this),
    use: new Use(this),
    hurt: new Hurt(this)
  }

  currentState: State = this.states.standing
  map: Map
  direction: Direction = 'right'

  width = 48
  height = 48

  frameX = 0
  frameY = 0

  cameraX = 0
  cameraY = 0

  x = 0
  y = 0

  speed = 0
  maxSpeed = 5

  vy = 0
  maxVy = 15
  weight = 1.5

  frameTimer = 0
  frameInterval = 100// 1000/this.fps

  loadedAssets = 0
  loaded = false

  cards = 0

  sprites: Record<StateType, Sprite> = {
    standing: {
      frames: 4,
      asset: 'assets/heroes/punk/idle.png'
    },
    running: {
      frames: 4,
      asset: 'assets/heroes/punk/run.png'
    },
    jumping: {
      frames: 4,
      framesX: [0],
      asset: 'assets/heroes/punk/jump.png'
    },
    falling: {
      frames: 4,
      framesX: [3],
      asset: 'assets/heroes/punk/jump.png'
    },
    hit: {
      frames: 6,
      asset: 'assets/heroes/punk/attack1.png'
    },
    doubleHit: {
      frames: 8,
      asset: 'assets/heroes/punk/attack2.png'
    },
    strongAttack: {
      frames: 8,
      asset: 'assets/heroes/punk/attack3.png'
    },
    use: {
      frames: 6,
      asset: 'assets/heroes/punk/use.png'
    },
    hurt: {
      frames: 2,
      asset: 'assets/heroes/punk/hurt.png'
    }
  }

  constructor (gameWidth: number, gameHeight: number, map: Map) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.map = map

    this.x = 30// this.gameWidth / 2 - this.width / 2;
    this.y = 400// this.gameHeight/2 - this.height

    this.loadAllAssets()
  }

  loadAllAssets (): void {
    const spritesCount = Object.keys(this.sprites).length

    for (const s of Object.keys(this.sprites)) {
      const state = s as StateType
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

  draw = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
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

  update = (keys: InputType[], map: Map): void => {
    this.currentState.handleInput(keys)

    this.handleHorizontalMovement()
    this.handleVerticalMovement()

    this.collectObjects()
    this.interactObjects(keys)
  }

  setState = (state: StateType, direction?: Direction): void => {
    if (direction) {
      this.direction = direction
    }
    this.currentState = this.states[state]
    this.currentState.enter()
  }

  onGround = (): boolean => {
    return (
      this.map.hasObstacle(this.x + 1, this.y + this.height + 1) ||
      this.map.hasObstacle(this.x + this.width / 2 - 1, this.y + this.height + 1)
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
      this.map.hasObstacle(this.x, this.y) ||
      this.map.hasObstacle(this.x + this.width / 2, this.y)
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
      this.y = Math.floor((this.y - 1) / 32) * 32 + 16
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

  applyCamera = (x: number, y: number): void => {
    this.cameraX = x
    this.cameraY = y
  }

  interactObjects = (inputs: InputType[]): void => {
    const element = this.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.handleInput(this, inputs)
    }
  }

  collectObjects = (): void => {
    const element = this.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.enter(this)
    }
  }
}

export default Player
