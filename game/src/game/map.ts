import { Sprite } from './types'
import config from './config'
import tiles from './tiles'

import easyMap from '../maps/easy'

class Map {
  loaded = false
  frame = 0
  loadedAssets = 0
  positionX = 0
  positionY = 0

  cameraX = 0
  cameraY = 0

  width: number
  height: number

  images: Sprite[][]
  bgImages: Sprite[][]

  constructor() {
    this.images = new Array(easyMap.tiles.length).fill(0).map(x => new Array(easyMap.tiles[0].length).fill(0))
    this.bgImages = new Array(easyMap.bgTiles.length).fill(0).map(x => new Array(easyMap.bgTiles[0].length).fill(0))
    this.loadAllAssets()

    this.width = this.images[0].length * 32
    this.height = this.images.length * 32
  }

  applyCamera = (x: number, y: number) => {
    this.cameraX = x
    this.cameraY = y
  }


  loadAllAssets() {
    let i = 0;
    let j = 0
    
    for(let row of easyMap.bgTiles) {
      for (let tileIndex of row) {
        if (!tileIndex) {
          j++
          continue
        }
        const img = new Image()
        img.src = tiles[tileIndex].asset
        img.onload = () => {
          this.loadedAssets++

        }
        this.bgImages[i][j] = tiles[tileIndex]
        this.bgImages[i][j].img = img
        
        j++
      }
      i++;
      j = 0
      
    }

    i = 0;
    j = 0;

    for(let row of easyMap.tiles) {
      for (let tileIndex of row) {
        if (!tileIndex) {
          j++
          continue
        }
        const img = new Image()
        img.src = tiles[tileIndex].asset
        img.onload = () => {
          this.loadedAssets++

        }
        this.images[i][j] = tiles[tileIndex]
        this.images[i][j].img = img
        
        j++
      }
      i++;
      j = 0
      
    }
  }

  hasObstacle(x: number, y: number) {
    if (y % 32 === 0 || x % 32 === 0) return false
    return (this.images[Math.floor(y/32)][Math.floor(x/32)])
  }

  nextSprite() {
    // this.frame = this.frame < this.sprites[this.state].frames - 1 ? this.frame + 1 : 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    // if (!this.loaded) {
    //   return
    // }

    for (let i = 0;i < this.images.length; i++) {
      for (let j = 0;j < this.images[0].length; j++) {
        const {width, height, img} = this.bgImages[i][j]
        if (img) {
          ctx.drawImage(img!, width * this.frame, 0, width, height, j * width - this.cameraX, i * height + this.positionY - this.cameraY, width, height)
        }
      }
    }
    

    for (let i = 0;i < this.images.length; i++) {
      for (let j = 0;j < this.images[0].length; j++) {
        const {width, height, img} = this.images[i][j]
        if (img) {
          ctx.drawImage(img!, width * this.frame, 0, width, height, j * width - this.cameraX, i * height + this.positionY - this.cameraY, width, height)
        }
      }
    }
    
  }
}

export default Map