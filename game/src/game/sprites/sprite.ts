import type Character from '../characters/character'
import Player from '../characters/player/player'

type Options = {
  frameInterval?: number
  oneTimeAction?: boolean
  shiftX?: number
  shiftY?: number
}
export default class Sprite {
  frameX = 0
  frameTimer = 0
  performed = false
  frameInterval = 100
  oneTimeAction = false
  shiftY = 0
  shiftX = 0

  constructor(public player: Character, public assetPack: string, public id: string, public options?: Options) {
    this.frameInterval = options?.frameInterval ?? this.frameInterval
    this.oneTimeAction = options?.oneTimeAction ?? this.oneTimeAction
    this.shiftX = options?.shiftX ?? this.shiftX
    this.shiftY = options?.shiftY ?? this.shiftY
  }

  enter() {
    this.frameX = 0
    this.performed = false
  }

  getFrames(): number {
    return this.player.game.assetLoader?.getByName(this.id)?.frames ?? 0
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    const img = this.player.game.assetLoader?.getImage(this.assetPack)
    const asset = this.player.game.assetLoader?.getByName(this.id)

    if (!asset || !img) {
      return
    }

    this.animate(deltaTime)
    const scaleX = this.player.getScaleX()

    ctx.save()
    ctx.scale(scaleX, 1)

    this.drawImage(ctx)

    ctx.restore()
  }

  drawImage(ctx: CanvasRenderingContext2D) {
    const img = this.player.game.assetLoader?.getImage(this.assetPack)
    const asset = this.player.game.assetLoader?.getByName(this.id)
    const scaleX = this.player.getScaleX()

    if (!asset || !img) {
      throw new Error()
    }

    const width = asset.frame.w / (asset.frames ?? 1)
    ctx.drawImage(
      img,
      asset.frame.x + width * this.frameX,
      asset.frame.y,
      width,
      asset.frame.h,
      (this.player.getPlayerCenter() - this.player.game.camera.x) * scaleX -
        (this.player.getPlayerCenter() - this.player.x),
      this.player.y - this.player.game.camera.y,
      width,
      asset.frame.h
    )
  }

  animate(deltaTime: number): void {
    const asset = this.player.game.assetLoader?.getByName(this.id)!

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < (asset.frames ?? 1) - 1) {
        this.frameX++
      } else {
        if (this.oneTimeAction) {
          this.performed = true
          return
        }
        this.frameX = 0
      }
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
}
