import type Game from '..'

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

  trainSpeed = 0.05
  trainFrameIndex = 3
  trainFrame = 0

  constructor(private readonly game: Game) {
    this.loadAllAssets()
  }

  loadAllAssets(): void {
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

    const width = this.game.canvas.width / this.game.scale
    const height = this.game.canvas.height / this.game.scale

    let index = 0

    for (const asset of this.assets) {
      const img = asset.img
      const moved = Math.floor((index++ * this.speed * this.game.camera.x) % (img?.width ?? 1))
      if (img != null) {
        ctx.drawImage(img, (moved / width) * img.width, 0, img.width, img.height, 0, 0, width, height)

        ctx.drawImage(img, 0, 0, img.width, img.height, width - moved, 0, width, height)
      }
    }
    this.trainFrame++
  }
}

export default Background
