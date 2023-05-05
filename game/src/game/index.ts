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
import { RatEnemy } from './characters/enemy'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  enemy: RatEnemy
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
    this.map = new Map(this.assets)
    this.background = new Background()
    this.player = new Player(this.map)
    this.enemy = new RatEnemy(this.map, 200, 416 - 100)
    this.enemy.setPlayer(this.player)

    this.inputHandler = new InputHandler()
    this.camera = new Camera(this.player, this.map)

    this.animate(0)
  }

  animate = (timestamp: number): void => {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.camera.update()

    this.map.applyCamera(this.camera.x, this.camera.y)
    this.player.applyCamera(this.camera.x, this.camera.y)
    this.background.applyCamera(this.camera.x, this.camera.y)
    this.enemy.applyCamera(this.camera.x, this.camera.y)

    this.player.update(this.inputHandler.activeKeys, this.map)
    this.enemy.update(this.inputHandler.activeKeys, this.map)

    this.background.draw(this.ctx)
    this.map.draw(this.ctx, deltaTime)
    this.player.draw(this.ctx, deltaTime)
    this.enemy.draw(this.ctx, deltaTime)

    drawDebugInfo(this.ctx, this.player, this.inputHandler)

    requestAnimationFrame(this.animate)
  }
}

export default Game
