import {State, Standing, Running, Jumping, Falling, StrongAttack, DoubleHit, Hit, StateType} from './state'
import {InputType} from "./inputHandler"
import Map from './map'

type Sprite = {
  width: number
  height: number
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
    // standingLeft: new StandingLeft(this),
    running: new Running(this),
    jumping: new Jumping(this),
    falling: new Falling(this),
    hit: new Hit(this),
    doubleHit: new DoubleHit(this),
    strongAttack: new StrongAttack(this),
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

  fps = 30
  frameTimer = 0
  frameInterval = 100//1000/this.fps

  loadedAssets = 0
  loaded = false

  sprites: Record<StateType, Sprite> = {
    standing: {
      width: 48,
      height: 48,
      frames: 4,
      asset: 'assets/heroes/punk/idle.png'
    },
    running: {
      width: 48,
      height: 48,
      frames: 4,
      asset: 'assets/heroes/punk/run.png'
    },
    jumping: {
      width: 48,
      height: 48,
      frames: 4,
      framesX: [0],
      asset: 'assets/heroes/punk/jump.png'
    },
    falling: {
      width: 48,
      height: 48,
      frames: 4,
      framesX: [3],
      asset: 'assets/heroes/punk/jump.png'
    },
    hit: {
      width: 48,
      height: 48,
      frames: 8,
      asset: 'assets/heroes/punk/attack1.png'
    },
    doubleHit: {
      width: 48,
      height: 48,
      frames: 8,
      asset: 'assets/heroes/punk/attack2.png'
    },
    strongAttack: {
      width: 48,
      height: 48,
      frames: 8,
      asset: 'assets/heroes/punk/attack3.png'
    },
  }

  constructor(gameWidth: number, gameHeight: number, map: Map) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.map = map

    this.x = 8//this.gameWidth / 2 - this.width / 2;
    this.y = 176//this.gameHeight/2 - this.height

    this.loadAllAssets()
  }

  loadAllAssets() {
    const spritesCount = Object.keys(this.sprites).length
    
    for(let s of Object.keys(this.sprites)) {
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

  draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    
    const width = this.width
    const height = this.height
    const image = this.sprites[this.currentState.state].img!
    const scaleX = this.direction === 'left' ? -1 : 1

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.sprites[this.currentState.state].frames - 1) this.frameX++;
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }

    

    ctx.strokeRect(this.x - this.cameraX, this.y - this.cameraY, width, height)
    ctx.strokeRect(this.x+4 - this.cameraX, this.y - this.cameraY, width/2 - 4, height)
    ctx.save();
    ctx.scale(scaleX, 1);
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
    ctx.restore();
  }

  update = (keys: InputType[], map: Map) => {
    this.currentState.handleInput(keys)
    
    this.handleHorizontalMovement()
    this.handleVerticalMovement()
  }

  setState = (state: StateType, direction?: Direction) => {
    if (direction) {
      this.direction = direction
    }
    this.currentState = this.states[state]
    this.currentState.enter()
  }

  onGround = () => {
    return (
      this.map.hasObstacle(this.x + 1, this.y + this.height + 1) || 
      // this.map.hasObstacle(this.x + this.width, this.y + this.height + 1) ||
      this.map.hasObstacle(this.x + this.width / 2 - 1, this.y + this.height + 1)
    )
  }

  checkCollisionWithMap = (map: Map) => {

  }

  handleVerticalMovement = () => {
    this.y += this.vy
    if (this.y <= 1) {
      this.vy += this.weight
      return
    }

    this.checkTopCollision()
    this.checkBottomCollision()
  }

  checkTopCollision = () => {
    if (
      this.map.hasObstacle(this.x, this.y) || 
      this.map.hasObstacle(this.x + this.width / 2, this.y)
    ) {
      this.y = Math.floor((this.y) / 32 + 1) * 32
      this.vy = 0
    }
  }

  checkBottomCollision = () => {
    if (!this.onGround()) {
      this.vy += this.weight
      this.vy = clamp(this.vy, -this.maxVy, this.maxVy)
    } else {
      this.vy = 0
      this.y = Math.floor((this.y - 1) / 32) * 32 +16
    }
  }

  handleHorizontalMovement = () => {
    this.x += this.speed

    if (
      this.map.hasObstacle(this.x + this.width/2, this.y) ||
      this.map.hasObstacle(this.x + this.width/2, this.y + this.height) || 
      this.map.hasObstacle(this.x + this.width/2, this.y + this.height / 2)
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

  applyCamera = (x: number, y: number) => {
    this.cameraX = x
    this.cameraY = y
  }
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export default Player
