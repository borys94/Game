import Game from '..'
import Element, { buildElement } from './Element'
import { TILE_SIZE } from '../config'
import { MapType } from '../mapStore'
import { AssetFrameDetail } from '../assetLoader'

class Elements {
  decorationElements: Element[][] = []
  elements: Element[][] = []

  tiles: number[][] = []
  bgTiles: number[][] = []
  decorations: number[][] = []
  interactive: number[][] = []

  constructor(public game: Game, public mapDetails: MapType) {
    this.tiles = [...mapDetails.tiles]
    this.bgTiles = [...mapDetails.bgTiles]
    this.decorations = [...mapDetails.decorations]
    this.interactive = [...mapDetails.interactive]
    this.initInteractiveElements()
  }

  initInteractiveElements(): void {
    for (let i = 0; i < this.mapDetails.interactive.length; i++) {
      for (let j = 0; j < this.mapDetails.interactive[0].length; j++) {
        if (!this.elements[i]) {
          this.elements[i] = []
        }
        if (!this.decorationElements[i]) {
          this.decorationElements[i] = []
        }

        this.decorationElements[i][j] = buildElement(this.game, this.mapDetails.decorations[i][j], i, j)
        this.elements[i][j] = buildElement(this.game, this.mapDetails.interactive[i][j], i, j)
      }
    }
  }

  getElement = (x: number, y: number): Element | null => {
    const element = this.elements[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)]
    if (element.asset != null && element.active) {
      return element
    }
    return null
  }

  draw = (deltaTime: number): void => {
    this.drawTiles(this.game.ctx, this.bgTiles)
    this.drawTiles(this.game.ctx, this.tiles)
    this.drawElements(this.game.ctx, deltaTime)
    this.drawFinish(this.game.ctx)
  }

  drawTiles(ctx: CanvasRenderingContext2D, tiles: number[][]): void {
    if (!this.game.assetLoader.isLoaded()) {
      console.log('no loaded')
      return
    }
    let [x, y, width, height] = this.game.camera.getVisibleArea()

    for (let i = y; i < Math.min(y + height, tiles.length); i++) {
      for (let j = x; j < Math.min(x + width, tiles[0].length); j++) {
        const asset = this.game.assetLoader.getById(tiles[i][j]) || null
        this.drawAsset(ctx, asset, i, j)
      }
    }
  }

  drawElements(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    let [x, y, width, height] = this.game.camera.getVisibleArea()

    for (let i = Math.max(y - 3, 0); i < Math.min(y + height, this.decorationElements.length); i++) {
      for (let j = Math.max(x - 3, 0); j < Math.min(x + width, this.decorationElements[0].length); j++) {
        this.decorationElements[i][j].draw(ctx, deltaTime)
        this.elements[i][j].draw(ctx, deltaTime)
      }
    }
  }

  drawFinish(ctx: CanvasRenderingContext2D) {
    const asset = this.game.assetLoader.getByName('finish-decoration-flag') || null

    if (asset && this.mapDetails.finish) {
      // console.log(this.mapDetails.finish)
      this.drawAsset(ctx, asset, this.mapDetails.finish.y, this.mapDetails.finish.x)
    }
  }

  drawAsset(ctx: CanvasRenderingContext2D, asset: AssetFrameDetail | null, i: number, j: number) {
    if (!asset) {
      return
    }
    // console.log('-----')
    const img = this.game.assetLoader.getImage('map')
    const { w, h, x, y } = asset.frame
    if (img) {
      ctx.drawImage(
        img,
        x,
        y,
        w,
        h,
        j * TILE_SIZE - this.game.camera.x,
        i * TILE_SIZE - this.game.camera.y + TILE_SIZE - h,
        w,
        h
      )
    }
  }
}

export default Elements
