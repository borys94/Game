import Player from './characters/player'
// import Lava from './Lava'
// import Background from './Background'
import Assets from './assets'
import InputHandler from './inputHandler'
import config from './config'
import Map from './map'
import Background from './background'
import Camera from './camera'
import Sounds from './sounds'
import { drawDebugInfo } from './debug'
// import RatEnemy from './characters/enemies/rat/rat'
import DogEnemy from './characters/enemies/dog'
import type Enemy from './characters/enemy'
import RatEnemy from './characters/enemies/rat'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  enemies: Array<Enemy<any>>
  map: Map
  background: Background
  inputHandler: InputHandler
  camera: Camera
  assets: Assets
  sounds: Sounds

  lastTime = 0
  active = true

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
    this.enemies = [
      new DogEnemy(this, 200, 416 - 100),
      new RatEnemy(this, 300, 416 - 100)
    ]

    this.inputHandler = new InputHandler()
    this.sounds = new Sounds()
    // eslint-disable-next-line
    // this.sounds.play()
    this.camera = new Camera(this.player, this.map)
    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)

    this.animate(0)
  }

  animate (timestamp: number): void {
    if (!this.active) {
      return
    }
    this.draw(timestamp)
    requestAnimationFrame(this.animate)
  }

  destroy (): void {
    this.active = false
  }

  draw (timestamp: number): void {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.camera.update()
    this.player.update()
    for (const enemy of this.enemies) {
      enemy.update()
    }

    this.background.draw(this.ctx)
    this.map.draw(deltaTime)
    this.player.draw(deltaTime)
    for (const enemy of this.enemies) {
      enemy.draw(deltaTime)
    }

    drawDebugInfo(this.ctx, this.player, this.inputHandler)
  }
}

export default Game
