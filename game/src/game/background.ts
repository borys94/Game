import { Sprite } from './types'
import config from "./config"

type Asset = {
  path: string
  img?: HTMLImageElement
}

const width = 576
const height = 324

class Background {
  width = 576
  height = 324

  cameraX = 0
  cameraY = 0

  assets: Asset[] = [
    {path: 'assets/backgrounds/day/1.png'},
    {path: 'assets/backgrounds/day/2.png'},
    {path: 'assets/backgrounds/day/3.png'},
    {path: 'assets/backgrounds/day/4.png'},
    {path: 'assets/backgrounds/day/5.png'},
  ]

  loadedAssets = 0
  loaded = false

  speed = 0.05

  trainSpeed = 0.05
  trainFrameIndex = 3
  trainFrame = 0

  constructor() {    
    this.loadAllAssets()
    
  }

  loadAllAssets() {
    for(let asset of this.assets) {
      const img = new Image()
      asset.img = img
      img.src = asset.path
      img.onload = () => {
        this.loadedAssets++
        if (this.assets.length === this.loadedAssets) {
          this.loaded = true
        }
      }
    }
  }


  draw(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) {
      return
    }

    let index = 0

    for (let asset of this.assets) {
      const img = asset.img!
      const moved = Math.floor(index * this.speed * this.cameraX % width)
      ctx.drawImage(
        img, 
        moved, 
        0, 
        width, 
        height,
        0,
        0,
        width * config.SCALE, 
        height * config.SCALE)

      ctx.drawImage(
        img, 
        0, 
        0, 
        width, 
        height,
        (this.width - moved) * config.SCALE,
        0,
        width * config.SCALE, 
        height * config.SCALE)
      index++
    }
    this.trainFrame++
  }

  applyCamera = (x: number, y: number) => {
    this.cameraX = x
    this.cameraY = y
  }
}


export default Background
