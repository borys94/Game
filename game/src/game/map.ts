import easyMap from '../maps/medium'
import type Element from './Element'
import { buildElement } from './Element'
import { TILE_SIZE } from './config'
import type Game from '.'

class Map {
  width: number
  height: number

  images: number[][]
  bgImages: number[][]
  interactive: number[][]

  elements: Element[][] = []

  constructor (private readonly game: Game) {
    this.images = easyMap.tiles
    this.bgImages = easyMap.bgTiles
    this.interactive = easyMap.interactive

    this.width = this.images[0].length * TILE_SIZE
    this.height = this.images.length * TILE_SIZE
    this.initInteractiveElements()
  }

  initInteractiveElements (): void {
    for (let i = 0; i < this.interactive.length; i++) {
      for (let j = 0; j < this.interactive[0].length; j++) {
        if (!this.elements[i]) {
          this.elements[i] = []
        }

        this.elements[i][j] = buildElement(this.game, this.interactive[i][j], i, j)//  new Element(this.assets, this.interactive[i][j], i, j)
      }
    }
  }

  hasElementToCollect = (x: number, y: number): boolean => {
    return !!this.interactive[Math.floor(x / TILE_SIZE)][Math.floor(y / TILE_SIZE)]
  }

  getElement = (x: number, y: number): Element | null => {
    const element = this.elements[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)]
    if (element.asset && element.active) {
      return element
    }
    return null
  }

  hasObstacle (x: number, y: number): boolean {
    if (y < 0 || y % TILE_SIZE === 0 || x % TILE_SIZE === 0) return false
    return !!(this.images[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)])
  }

  draw = (deltaTime: number): void => {
    this.drawTiles(this.game.ctx, easyMap.bgTiles)
    this.drawTiles(this.game.ctx, easyMap.tiles)
    this.drawInteractiveElement(this.game.ctx, deltaTime)
  }

  drawInteractiveElement (ctx: CanvasRenderingContext2D, deltaTime: number): void {
    for (const row of this.elements) { for (const element of row) element.draw(ctx, deltaTime) }
  }

  drawTiles (ctx: CanvasRenderingContext2D, tiles: number[][]): void {
    if (!this.game.assets.isLoaded()) {
      return
    }
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        const asset = this.game.assets.getById(tiles[i][j])
        if (asset) {
          const { img, width, height } = asset
          if (img) {
            ctx.drawImage(
              img,
              0,
              0,
              width,
              height,
              j * TILE_SIZE - this.game.camera.x,
              i * TILE_SIZE - this.game.camera.y + TILE_SIZE - height,
              width,
              height
            )
          }
        }
      }
    }
  }
}

export default Map
