import Player from './player'
// import Lava from './Lava'
// import Background from './Background'
// import Map from './Map'
import InputHandler from './inputHandler'
import config from './config'
import Map from './map'
import Background from './background'
import { drawDebugInfo } from './debug'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  map: Map
  background: Background
  inputHandler: InputHandler

  cameraX = 0
  cameraY = 0

  lastTime = 0

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.ctx.imageSmoothingEnabled = false;

    this.map = new Map()
    this.background = new Background()
    this.player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, this.map)
    
    this.inputHandler = new InputHandler()

    this.animate(0)
  }

  animate = (timestamp: number) => {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
    // Camera
    this.cameraX = this.player.x > config.CANVAS_WIDTH * config.SCALE/2 ? this.player.x - config.CANVAS_WIDTH * config.SCALE/2 : 0
    this.cameraY = this.player.y > config.CANVAS_HEIGHT * config.SCALE/2 ? this.player.y - config.CANVAS_HEIGHT * config.SCALE/2 : 0

    if (this.player.x > this.map.width - config.CANVAS_WIDTH * config.SCALE/2) {
      this.cameraX = this.map.width - config.CANVAS_WIDTH  * config.SCALE
    }
    if (this.player.y > this.map.height - config.CANVAS_HEIGHT * config.SCALE/2) {
      this.cameraY = this.map.height - config.CANVAS_HEIGHT  * config.SCALE
    }

    this.map.applyCamera(this.cameraX, this.cameraY)
    this.player.applyCamera(this.cameraX, this.cameraY)
    this.background.applyCamera(this.cameraX, this.cameraY)
    
    if (this.inputHandler.lastKey) {
      this.player.update(this.inputHandler.activeKeys, this.map)
    }

    this.background.draw(this.ctx)
    this.map.draw(this.ctx)
    this.player.draw(this.ctx, deltaTime)

    drawDebugInfo(this.ctx, this.player, this.inputHandler)

    requestAnimationFrame(this.animate)
  }
}

export default Game
