import type Game from '..'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../config'

interface Asset {
  path: string
  img?: HTMLImageElement
}

class Background {
  assets: Asset[] = [
    { path: 'assets/backgrounds/night/1.png' },
    { path: 'assets/backgrounds/night/2.png' },
    { path: 'assets/backgrounds/night/3.png' },
    { path: 'assets/backgrounds/night/4.png' },
    { path: 'assets/backgrounds/night/5.png' }
  ]

  loadedAssets = 0
  loaded = false

  speed = 0.05

  constructor(private readonly game: Game) {
    this.loadAssets()
  }

  loadAssets(): void {
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

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.loaded) {
      return
    }

    let index = 0
    for (const asset of this.assets) {
      const { img } = asset
      const moved = Math.floor((index++ * this.speed * this.game.camera.x) % (img?.width ?? 1))
      if (img != null) {
        ctx.drawImage(
          img,
          (moved / CANVAS_WIDTH) * img.width,
          0,
          img.width,
          img.height,
          0,
          0,
          CANVAS_WIDTH,
          CANVAS_HEIGHT
        )

        ctx.drawImage(img, 0, 0, img.width, img.height, CANVAS_WIDTH - moved, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      }
    }
  }
}

export default Background
