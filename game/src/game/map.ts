import Assets from "./assets"
import easyMap from '../maps/easy'
import Element, { ElementBuilder } from "./Element"
import Player from "./player"

class Map {
  cameraX = 0
  cameraY = 0

  width: number
  height: number

  images: number[][]
  bgImages: number[][]
  interactive: number[][]

  elements: Element[][] = []

  framesX: number[][] = []

  constructor(private assets: Assets) {
    this.images = easyMap.tiles
    this.bgImages = easyMap.bgTiles
    this.interactive = easyMap.interactive

    this.width = this.images[0].length * 32
    this.height = this.images.length * 32

    for (let i = 0;i < this.interactive.length; i++) {
      for (let j = 0;j < this.interactive[0].length; j++) {

        if (!this.elements[i]) {
          this.elements[i] = []
        }

        this.elements[i][j] = ElementBuilder.build(this.assets, this.interactive[i][j], i, j)//  new Element(this.assets, this.interactive[i][j], i, j)
      }
    }
  }

  hasElementToCollect = (x: number, y: number) => {
    return this.interactive[Math.floor(x /32)][Math.floor(y/32)]
  }

  getElement = (x: number, y: number) => {
    const element = this.elements[Math.floor(y /32)][Math.floor(x/32)]
    if (element.asset && element.active) {
      return element
    }
  }

  applyCamera = (x: number, y: number) => {
    this.cameraX = x
    this.cameraY = y
    for (let i = 0;i < this.interactive.length; i++) {
      for (let j = 0;j < this.interactive[0].length; j++) {
        this.elements[i][j].applyCamera(x, y)
      }
    }
  }

  hasObstacle(x: number, y: number) {
    if (y % 32 === 0 || x % 32 === 0) return false
    return (this.images[Math.floor(y/32)][Math.floor(x/32)])
  }

  draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    this.drawTiles(ctx, easyMap.bgTiles)
    this.drawTiles(ctx, easyMap.tiles)

    for (let i = 0;i < this.elements.length; i++) {
      for (let j = 0;j < this.elements[0].length; j++) {
        this.elements[i][j].draw(ctx, deltaTime)
      }
    }
  }

  drawTiles(ctx: CanvasRenderingContext2D, tiles: number[][]) {
    if (!this.assets.isLoaded()) {
      return
    }
    for (let i = 0;i < tiles.length; i++) {
      for (let j = 0;j < tiles[0].length; j++) {
        const asset = this.assets.getById(tiles[i][j])
        if (asset) {
          let {img, width, height} = asset
          // width = 32
          //  height = 32
          if (img) {
            ctx.drawImage(
              img, 
              0, 
              0, 
              width, 
              height,
              j * 32 - this.cameraX, 
              i * 32 - this.cameraY, 
              32, 
              32
            )
          }
        }
      }
    }
  }
}

export default Map