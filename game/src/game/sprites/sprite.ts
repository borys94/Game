import type Character from '../characters/character'

abstract class SpriteClass {
  asset: string
  frames: number
  frameX = 0
  frameTimer = 0
  frameInterval = 100 // TODO: in Sprite class
  player: Character

  img?: HTMLImageElement
  loaded = false

  oneTimeAction: boolean
  performed?: boolean

  constructor (player: Character, asset: string, frames: number, oneTimeAction = false) {
    this.player = player
    this.asset = asset
    this.frames = frames
    this.oneTimeAction = oneTimeAction

    this.loadAllAsset()
  }

  animate (deltaTime: number): void {
    if (this.oneTimeAction && this.frameX === this.frames - 1) {
      return
    }

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.frames - 1) {
        this.frameX++
      } else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }

  enter (): void {
    this.frameX = 0
  }

  leave (): void {}

  loadAllAsset (): void {
    const img = new Image()
    this.img = img
    img.src = this.asset
    img.onload = () => {
      this.loaded = true
    }
  }

  draw (ctx: CanvasRenderingContext2D, deltaTime: number): void {
    if (this.img == null || !this.loaded) {
      return
    }

    this.animate(deltaTime)

    const scaleX = this.player.direction === 'left' ? -1 : 1
    ctx.save()
    ctx.scale(scaleX, 1)
    ctx.drawImage(
      this.img,
      this.player.width * this.frameX,
      0,
      this.player.width,
      this.player.height,
      this.player.x * scaleX -
        ((this.player.width - this.player.paddingLeft - this.player.paddingRight) / 2 +
          this.player.paddingLeft) *
          (scaleX * -1 + 1) -
        this.player.game.camera.x * scaleX,
      this.player.y + 5 - this.player.game.camera.y,
      this.player.width,
      this.player.height
    )
    ctx.restore()
  }
}

export default SpriteClass
