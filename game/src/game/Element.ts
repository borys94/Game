import { type AssetType } from './assets'
import { type InputType } from './inputHandler'
import type Player from './characters/player'
import type Game from '.'

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

  constructor (game: Game, assetId: number, y: number, x: number) {
    this.game = game
    this.asset = game.assets.getById(assetId)
    this.x = x
    this.y = y

    this.active = !(this.asset == null)
    if (this.asset != null) {
      this.frames = this.asset.frames
    }
  }

  public enter (player: Player): void {}

  public handleInput (player: Player, inputs: InputType[]): void {}

  draw = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
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

  updateFrameIfNeeded (deltaTime: number): void {
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
    }
  }

  return new Element(game, assetId, y, x)
}

export class ChestElement extends Element {
  animate = false
  enter (player: Player): void {}

  handleInput (player: Player, inputs: InputType[]): void {
    if (inputs.includes('Space')) {
      this.animate = true
    }
    if (this.frameX === this.frames - 1) {
      this.animate = false
    }
  }
}

export class TrapElement extends Element {
  enter (player: Player): void {
    if (!player.isAlive()) {
      return
    }
    player.hurt(2)
    if (player.direction === 'left') player.speed = 1
    else player.speed = -1
  }

  handleInput (player: Player, inputs: InputType[]): void {}
}

export class CollectableElement extends Element {
  enter (player: Player): void {
    player.cards++
    this.active = false
  }

  handleInput (player: Player, inputs: InputType[]): void {}
}
