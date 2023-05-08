import Player from './characters/player'
// import Lava from './Lava'
// import Background from './Background'
import Assets from './assets'
import InputHandler from './inputHandler'
import config from './config'
import Map from './map'
import Background from './background'
import Camera from './camera'
import { drawDebugInfo } from './debug'
// import RatEnemy from './characters/enemies/rat/rat'
import DogEnemy from './characters/enemies/dog'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  enemy: DogEnemy
  map: Map
  background: Background
  inputHandler: InputHandler
  camera: Camera
  assets: Assets

  lastTime = 0

  constructor () {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.ctx.imageSmoothingEnabled = false

    this.assets = new Assets()
    this.map = new Map(this)
    this.background = new Background(this)
    this.player = new Player(this)
    this.enemy = new DogEnemy(this, 200, 416 - 100)

    this.inputHandler = new InputHandler()
    this.camera = new Camera(this.player, this.map)
    this.animate = this.animate.bind(this)

    this.animate(0)
  }

  animate (timestamp: number): void {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.camera.update()
    this.player.update()
    this.enemy.update()

    this.background.draw(this.ctx)
    this.map.draw(deltaTime)
    this.player.draw(deltaTime)
    this.enemy.draw(deltaTime)

    drawDebugInfo(this.ctx, this.player, this.inputHandler)

    requestAnimationFrame(this.animate)
  }
}

export default Game
