import Game from '../../game'
import Assets, { type AssetType } from '../../game/assets'
import config from '../../game/config'
import { buildElement } from '../../game/Element'
import { clamp } from '../../game/utils'
import easyMap from '../../maps/easy'
import mediumMap from '../../maps/medium'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

type Layer = 'tiles' | 'bgTiles' | 'interactive'

interface MapType {
  tiles: number[][]
  bgTiles: number[][]
  interactive: number[][]
}

class Editor extends Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  // map: Map
  // background: Background
  assets: Assets

  currentAsset: AssetType | null = null

  layer: Layer = 'tiles'

  lastTime = 0

  hoverX = 0
  hoverY = 0

  constructor () {
    super()
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.ctx.imageSmoothingEnabled = false

    this.assets = new Assets()
    // this.map = new Map(this.assets)
    // this.background = new Background()

    this.animate(0)

    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.hoverX = e.clientX
      this.hoverY = e.clientY
    })

    // this.onMouseDown.bind(this)
    this.canvas.addEventListener('mousedown', this.onMouseDown)

    window.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault()
      this.camera.x = clamp(this.camera.x + e.deltaX, 0, this.map.width - this.canvas.width)
      this.camera.y = clamp(this.camera.y + e.deltaY, 0, this.map.height - this.canvas.height)
    }, { passive: false })
  }

  onMouseDown = (): void => {
    if (this.layer === 'tiles') this.fillFgTile()
    if (this.layer === 'bgTiles') this.fillBgTile()
    if (this.layer === 'interactive') this.fillInteractiveTile()
  }

  loadMap = (value: string): MapType => {
    if (value === 'easy') {
      return easyMap
    } else if (value === 'medium') {
      return mediumMap
    }
    return easyMap
  }

  animate = (timestamp: number): void => {
    super.animate(timestamp)
    // const deltaTime = timestamp - this.lastTime
    // this.lastTime = timestamp

    if (this.currentAsset) {
      this.ctx.drawImage(
        this.currentAsset.img,
        0,
        0,
        this.currentAsset.width,
        this.currentAsset.height,
        Math.floor((this.hoverX + this.camera.x) / 32) * 32 - this.camera.x,
        Math.floor((this.hoverY + this.camera.y) / 32) * 32 - this.camera.y + 32 - this.currentAsset.height,
        this.currentAsset.width,
        this.currentAsset.height
      )
    }

    requestAnimationFrame(this.animate)
  }

  setCurrentAsset = (asset: AssetType | null): void => {
    this.currentAsset = asset
  }

  fillFgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset) {
      this.map.images[b][a] = this.currentAsset.id
    } else {
      this.map.images[b][a] = 0
    }
  }

  fillBgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset) {
      this.map.bgImages[b][a] = this.currentAsset.id
    } else {
      this.map.bgImages[b][a] = 0
    }
  }

  fillInteractiveTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset) {
      this.map.elements[b][a] = buildElement(this, this.currentAsset.id, b, a)
    } else {
      this.map.elements[b][a] = buildElement(this, 0, b, a)
    }
  }

  setLayer (layer: Layer): void {
    this.layer = layer
  }
}

export default Editor
