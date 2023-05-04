import Assets, {AssetType} from "./assets"
import { InputType } from "./inputHandler"
import Player from "./player"

export default class Element {

  asset: AssetType
  x: number
  y: number
  active: boolean
  frames: number = 0
  frameX = 0

  cameraX = 0
  cameraY = 0

  frameTimer = 0
  frameInterval = 200

  animate = true

  constructor(assets: Assets, assetId: number, y: number, x: number) {
    this.asset = assets.getById(assetId)
    this.x = x;
    this.y = y

    this.active = !!this.asset
    if (this.asset) {
      this.frames = this.asset.frames
    }
  }

  public enter(player: Player): void {

  }
  public handleInput(player: Player, inputs: InputType[]) {

  }

  draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    if (!this.asset || !this.active) {
      return
    }

    if (this.frameTimer > this.frameInterval && this.animate) {
      if (this.frameX < this.frames - 1) this.frameX++;
      else this.frameX = 0
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }


    let {img, width, height} = this.asset

    if(height > 150 || width > 150) {
      console.log(this.asset)
    }

    if (img) {
      ctx.drawImage(
        img, 
        width * this.frameX, 
        0, 
        width, 
        height,
        this.x * 32 - this.cameraX, 
        this.y * 32 - this.cameraY + 32 - height, 
        width, 
        height
      )
    }
  }

  applyCamera = (x: number, y: number) => {
    this.cameraX = x
    this.cameraY = y
  }
}

export class ElementBuilder {
  static build(assets: Assets, assetId: number, y: number, x: number): Element {
    const asset = assets.getById(assetId)

    if (!asset) {
      return new Element(assets, assetId, y, x)
    }

    if (asset.type === 'chest') {
      return new ChestElement(assets, assetId, y, x)
    } else if (asset.type === 'trap') {
      return new TrapElement(assets, assetId, y, x)
    } else if (asset.type === 'collectable') {
      return new CollectableElement(assets, assetId, y, x)
    } else {
      return new Element(assets, assetId, y, x)
    }
  }
}

export class ChestElement extends Element {
  animate = false
  enter(player: Player) {

  }
  handleInput(player: Player, inputs: InputType[]) {
    if (inputs.includes('Space')) {
      this.animate = true
    }
    if (this.frameX === this.frames - 1) {
      this.animate = false
    }
  }
}

export class TrapElement extends Element {
  enter(player: Player) {
    player.setState('hurt')
    if (player.direction === 'left') player.speed = 1
    else player.speed = -1
  }
  handleInput(player: Player, inputs: InputType[]) {
    if (inputs.includes('Space')) {

    }
  }
}

export class CollectableElement extends Element {
  enter(player: Player) {
    player.cards++
    this.active = false
  }
  handleInput(player: Player, inputs: InputType[]) {
    if (inputs.includes('Space')) {

    }
  }
}