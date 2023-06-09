import Player from './characters/player/player'
import InputHandler from './inputHandler'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config'
import Map from './map/map'
import Camera from './camera'
import { drawDebugInfo } from './debug'
import AssetLoader from './assetLoader'
import level1 from '../maps/level1'
import level2 from '../maps/medium'
import level3 from '../maps/level2'
import level4 from '../maps/level4'
import { MapType } from './mapStore'

const levels = [level1, level2, level3, level4]

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  map: Map
  inputHandler: InputHandler
  camera: Camera
  assetLoader: AssetLoader

  lastTime = 0
  active = true
  paused = true

  protected scale: number = 1

  private level = 1
  private state: 'PAUSED' | 'PLAYING' | 'WINNING' = 'PLAYING'

  constructor(map?: MapType) {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT

    this.assetLoader = new AssetLoader()
    this.assetLoader.load()

    this.map = new Map(this, map ?? levels[this.level - 1])
    this.player = new Player(this)

    this.inputHandler = new InputHandler()
    this.camera = new Camera(this)

    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.onResize = this.onResize.bind(this)
    this.setupListeners = this.setupListeners.bind(this)

    this.setupListeners()
    this.animate(0)
  }

  getLevel() {
    return this.level
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  onResize() {
    this.scale = Math.min(window.innerWidth / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT)
    this.canvas.width = CANVAS_WIDTH * this.scale
    this.canvas.height = CANVAS_HEIGHT * this.scale
  }

  checkIfFinished = () => {
    const finish = this.map.elements.mapDetails.finish
    if (
      this.state === 'PLAYING' &&
      this.player.x < finish.x * 32 + 32 &&
      this.player.x + this.player.width > finish.x * 32 &&
      this.player.y < finish.y * 32 + 32 &&
      this.player.y + this.player.height > finish.y * 32
    ) {
      this.player.setState('happy')
      this.state = 'WINNING'

      setTimeout(() => {
        this.loadLevel(this.level + 1)
      }, 2000)
    }
  }

  loadLevel(level: number) {
    this.level = level
    this.map = new Map(this, levels[this.level - 1])
    this.state = 'PLAYING'
    this.player.x = this.map.elements.mapDetails.player.x
    this.player.y = this.map.elements.mapDetails.player.y
    this.player.setState('standing')
  }

  animate(timestamp: number): void {
    if (!this.active) {
      return
    }
    this.draw(timestamp)
    requestAnimationFrame(this.animate)
  }

  destroy(): void {
    this.active = false
    window.removeEventListener('resize', this.onResize)
  }

  update() {
    this.camera.update()
    if (this.state === 'PLAYING') {
      this.player.update()
      this.map.update()
    }

    this.checkIfFinished()
  }

  draw(timestamp: number): void {
    if (this.paused || !this.assetLoader.isLoaded()) {
      return
    }

    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.imageSmoothingEnabled = false
    this.update()

    this.ctx.save()
    this.ctx.scale(this.scale, this.scale)

    this.map.drawBackground()
    this.ctx.translate(-this.camera.x, -this.camera.y)
    this.map.draw(deltaTime)
    this.player.draw(deltaTime)
    this.ctx.translate(this.camera.x, this.camera.y)
    this.player.drawBars()

    this.ctx.restore()

    if ((window as any).debug) {
      drawDebugInfo(this.ctx, this.player, this.inputHandler)
    }
  }
}

export default Game
