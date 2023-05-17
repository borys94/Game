import type Game from '.'
import config from './config'

interface Asset {
  path: string
  img?: HTMLImageElement
}

class Background {
  width = 576
  height = 324

  assets: Asset[] = [
    { path: 'assets/backgrounds/day/1.png' },
    { path: 'assets/backgrounds/day/2.png' },
    { path: 'assets/backgrounds/day/3.png' },
    { path: 'assets/backgrounds/day/4.png' },
    { path: 'assets/backgrounds/day/5.png' }
  ]

  loadedAssets = 0
  loaded = false

  speed = 0.05

  trainSpeed = 0.05
  trainFrameIndex = 3
  trainFrame = 0

  constructor (private readonly game: Game) {
    this.loadAllAssets()
  }

  loadAllAssets (): void {
    for (const asset of this.assets) {
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

  draw (ctx: CanvasRenderingContext2D): void {
    if (!this.loaded) {
      return
    }

    let index = 0

    for (const asset of this.assets) {
      const img = asset.img
      const moved = Math.floor((index++ * this.speed * this.game.camera.x) % this.width)
      if (img != null) {
        ctx.drawImage(
          img,
          moved,
          0,
          this.width,
          this.height,
          0,
          0,
          this.width * config.SCALE,
          this.height * config.SCALE
        )

        ctx.drawImage(
          img,
          0,
          0,
          this.width,
          this.height,
          (this.width - moved) * config.SCALE,
          0,
          this.width * config.SCALE,
          this.height * config.SCALE
        )
      }
    }
    this.trainFrame++
  }
}

export default Background
