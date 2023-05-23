import { type AssetType } from './assets'
import { type InputType } from './inputHandler'
import type Player from './characters/player'
import type Game from '.'
import sounds from './sounds'
import { TILE_SIZE } from './config'

export default class Element {
  asset: AssetType | null
  x: number
  y: number
  active: boolean
  frames = 0
  frameX = 0

  game: Game

  frameTimer = 0
  frameInterval = 200

  animate = true

  constructor(game: Game, assetId: number, y: number, x: number) {
    this.game = game
    this.asset = game.assets.getById(assetId)
    this.x = x
    this.y = y

    this.active = !(this.asset == null)
    if (this.asset != null) {
      this.frames = this.asset.frames
    }
  }

  public enter(player: Player): void {}

  public handle(player: Player, inputs: InputType[]): void {}

  // TODO
  public leave(player: Player): void {}

  draw(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    if (this.asset == null || !this.active) {
      return
    }
    this.updateFrameIfNeeded(deltaTime)

    const { img, width, height } = this.asset
    if (img) {
      ctx.drawImage(
        img,
        width * this.frameX,
        0,
        width,
        height,
        this.x * 32 - this.game.camera.x,
        this.y * 32 - this.game.camera.y + 32 - height,
        width,
        height
      )
    }
  }

  updateFrameIfNeeded(deltaTime: number): void {
    if (!this.animate) {
      return
    }
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.frames - 1) this.frameX++
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
}

export const buildElement = (game: Game, assetId: number, y: number, x: number): Element => {
  const asset = game.assets.getById(assetId)

  if (asset == null) {
    return new Element(game, assetId, y, x)
  }

  if (asset.type === 'interactive') {
    if (asset.interactiveType === 'chest') {
      return new ChestElement(game, assetId, y, x)
    } else if (asset.interactiveType === 'trap') {
      return new TrapElement(game, assetId, y, x)
    } else if (asset.interactiveType === 'money' || asset.interactiveType === 'card') {
      return new CollectableElement(game, assetId, y, x)
    } else if (asset.interactiveType === 'gun') {
      return new GunElement(game, assetId, y, x, asset.gunLevel!)
    }
  }

  return new Element(game, assetId, y, x)
}

export class ChestElement extends Element {
  animate = false
  opened = false

  enter(player: Player): void {}

  handle(player: Player, inputs: InputType[]): void {
    if (inputs.includes('Enter')) {
      this.animate = true
      this.opened = true
    }
    if (this.frameX === this.frames - 1) {
      this.animate = false
    }
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    if (!this.asset) {
      return
    }
    if (!this.opened) {
      this.ligthenGradient(
        ctx,
        this.x * 32 - this.game.camera.x + this.asset.width / 2,
        this.y * 32 - this.game.camera.y + 32 - this.asset.height,
        8
      )
    }

    super.draw(ctx, deltaTime)
  }

  ligthenGradient(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    var rnd = 0.1 * Math.sin((1.1 * Date.now()) / 300)
    const shiftY = Math.sin((1.1 * Date.now()) / 300) * 5
    radius = radius * (1 + rnd)
    var radialGradient = ctx.createRadialGradient(x, y + shiftY, 0, x, y + shiftY, radius)
    radialGradient.addColorStop(0.0, '#BB9')
    radialGradient.addColorStop(0.2 + rnd, '#AA8')
    radialGradient.addColorStop(0.7 + rnd, '#330')
    radialGradient.addColorStop(0.9, '#110')
    radialGradient.addColorStop(1, '#000')
    ctx.fillStyle = radialGradient
    ctx.beginPath()
    ctx.arc(x, y + shiftY, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }
}

export class TrapElement extends Element {
  enter(player: Player): void {
    if (!player.isAlive()) {
      return
    }
    player.hurt(2)
    if (player.direction === 'left') player.speed = 1
    else player.speed = -1
  }

  handle(player: Player, inputs: InputType[]): void {}
}

export class CollectableElement extends Element {
  enter(player: Player): void {
    player.cards++
    this.active = false
    sounds.unlockSound()
  }

  handle(player: Player, inputs: InputType[]): void {}
}

export class GunElement extends Element {
  constructor(game: Game, assetId: number, y: number, x: number, public gunLevel: number) {
    super(game, assetId, y, x)
  }

  enter(player: Player): void {
    if (!player.gunManager.gunLevel || player.gunManager.gunLevel < this.gunLevel) {
      this.active = false
      player.gunManager.setGun(this.gunLevel - 1)
      sounds.unlockSound()
    }
  }

  handle(player: Player, inputs: InputType[]): void {}

  draw(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    if (this.asset == null || !this.active) {
      return
    }

    const { img, width, height } = this.asset
    const shiftY = Math.sin((1.1 * Date.now()) / 300) * 5
    if (img) {
      this.ligthenGradient(
        ctx,
        this.x * 32 - this.game.camera.x + TILE_SIZE / 2,
        this.y * 32 - this.game.camera.y + TILE_SIZE / 2 + height / 2,
        8
      )
      ctx.drawImage(
        img,
        width * this.frameX,
        0,
        width,
        height,
        this.x * 32 - this.game.camera.x + TILE_SIZE / 2 - width / 2,
        this.y * 32 - this.game.camera.y + TILE_SIZE / 2 + shiftY,
        width,
        height
      )
    }
  }

  ligthenGradient(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    var rnd = 0.1 * Math.sin((1.1 * Date.now()) / 300)
    const shiftY = Math.sin((1.1 * Date.now()) / 300) * 5
    radius = radius * (1 + rnd)
    var radialGradient = ctx.createRadialGradient(x, y + shiftY, 0, x, y + shiftY, radius)
    radialGradient.addColorStop(0.0, '#BB9')
    radialGradient.addColorStop(0.2 + rnd, '#AA8')
    radialGradient.addColorStop(0.7 + rnd, '#330')
    radialGradient.addColorStop(0.9, '#110')
    radialGradient.addColorStop(1, '#000')
    ctx.fillStyle = radialGradient
    ctx.beginPath()
    ctx.arc(x, y + shiftY, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }
}
