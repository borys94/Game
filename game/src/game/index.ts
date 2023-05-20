import Player from './characters/player'
import Assets from './assets'
import InputHandler from './inputHandler'
import config from './config'
import Map from './map'
import Background from './background'
import Camera from './camera'
import { drawDebugInfo } from './debug'
import store from '../store'
import { pause, unpause } from '../store/game'

const CANVAS_WIDTH = config.CANVAS_WIDTH
const CANVAS_HEIGHT = config.CANVAS_HEIGHT

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  player: Player
  map: Map
  background: Background
  inputHandler: InputHandler
  camera: Camera
  assets: Assets

  lastTime = 0
  active = true
  paused = false

  scale: number = CANVAS_WIDTH

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.ctx.imageSmoothingEnabled = false

    this.assets = new Assets()
    this.map = new Map(this)
    this.background = new Background(this)
    this.player = new Player(this)

    this.inputHandler = new InputHandler()
    this.camera = new Camera(this.player, this.map)
    this.map.loadEnemies()
    this.animate = this.animate.bind(this)
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.setupListeners = this.setupListeners.bind(this)

    this.animate(0)
  }

  setupListeners() {
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keydown', this.onKeyPress)
    this.onResize()
  }

  onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.paused) {
        store.dispatch(unpause())
      } else {
        store.dispatch(pause())
      }
    }
  }

  onResize = () => {
    this.scale = Math.min(window.innerWidth / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT)
    this.canvas.width = CANVAS_WIDTH * this.scale
    this.canvas.height = CANVAS_HEIGHT * this.scale
  }

  animate(timestamp: number): void {
    if (!this.active) {
      return
    }
    this.draw(timestamp)
    requestAnimationFrame(this.animate)
  }

  // TODO: ogarnac to
  destroy(): void {
    this.active = false
    window.removeEventListener('resize', this.onResize)
  }

  update() {
    this.camera.update()
    this.player.update()
    this.map.update()
  }

  draw(timestamp: number): void {
    if (this.paused || !this.assets.loaded) {
      return
    }

    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.update()

    this.ctx.save()
    this.ctx.scale(this.scale, this.scale)

    this.background.draw(this.ctx)
    this.map.draw(deltaTime)
    this.player.draw(deltaTime)

    this.ctx.restore()

    if ((window as any).debug || true) {
      // drawDebugInfo(this.ctx, this.player, this.inputHandler)
    }
  }
}

export default Game
