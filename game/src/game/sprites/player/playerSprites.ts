import Player from '../../characters/player/player'
import Sprite from '../sprite'

const ARM_WIDTH = 11

export class PlayerSprite extends Sprite {
  drawImage(ctx: CanvasRenderingContext2D): void {
    this.drawInvisibleIfNeeded(ctx)
    super.drawImage(ctx)
  }

  drawInvisibleIfNeeded(ctx: CanvasRenderingContext2D) {
    if (this.player instanceof Player && this.player.invisible && this.frameX % 2) {
      ctx.globalAlpha = 0.5
    }
  }
}

abstract class PlayeExtendedBodySpite extends PlayerSprite {
  getSwayShiftX(): number {
    const { state } = this.player.stateManager.currentState
    const frameX = this.player.game.player.spriteManager.getCurrentFrame()
    if (state === 'standing') {
      return +(Math.abs(1.5 - frameX) === 0.5) * this.player.getScaleX()
    } else if (state === 'running') {
      return this.player.getScaleX() * -1
    } else if (state === 'jumping') {
      return -2 * this.player.getScaleX()
    }

    return 0
  }

  getSwayShiftY(): number {
    const { state } = this.player.stateManager.currentState
    const frameX = this.player.game.player.spriteManager.getCurrentFrame()
    if (state === 'standing') {
      return 0
    } else if (state === 'running') {
      return +(Math.abs(2.5 - frameX) === 1.5) + 1
    } else if (state === 'jumping') {
      if (frameX === 0) {
        return -1
      } else if (frameX === 1) {
        return -4
      } else if (frameX === 2) {
        return -6
      }
      return -1
    }

    return 0
  }

  drawImage(ctx: CanvasRenderingContext2D): void {
    const img = this.player.game.assetLoader?.getImage(this.assetPack)
    const asset = this.player.game.assetLoader?.getByName(this.id)

    if (!asset || !img) {
      throw new Error()
    }

    this.drawInvisibleIfNeeded(ctx)
    ctx.drawImage(
      img,
      asset.frame.x,
      asset.frame.y,
      asset.frame.w,
      asset.frame.h,
      this.getPositionX(),
      this.getPositionY(),
      asset.frame.w,
      asset.frame.h
    )
  }

  abstract getPositionX(): number
  abstract getPositionY(): number
}

export class ArmSprite extends PlayeExtendedBodySpite {
  getPositionX() {
    const scaleX = this.player.getScaleX()
    const swayShiftX = this.getSwayShiftX()
    return (this.player.getPlayerCenter() - swayShiftX - this.player.game.camera.x) * scaleX - ARM_WIDTH
  }

  getPositionY() {
    const swayShiftY = this.getSwayShiftY()
    return this.player.y - this.player.game.camera.y + 11 + swayShiftY
  }
}

export class TwoArmSprite extends PlayeExtendedBodySpite {
  getPositionX() {
    const scaleX = this.player.getScaleX()
    const swayShiftX = this.getSwayShiftX()
    return (this.player.getPlayerCenter() - swayShiftX - this.player.game.camera.x) * scaleX - ARM_WIDTH + 2
  }

  getPositionY() {
    const swayShiftY = this.getSwayShiftY()
    return this.player.y - this.player.game.camera.y + 15 + swayShiftY
  }
}

export class GunSprite extends PlayeExtendedBodySpite {
  getPositionX() {
    const scaleX = this.player.getScaleX()
    const swayShiftX = this.getSwayShiftX()
    return (this.player.getPlayerCenter() - swayShiftX - this.player.game.camera.x) * scaleX + ARM_WIDTH
  }

  getPositionY() {
    const swayShiftY = this.getSwayShiftY()
    const asset = this.player.game.assetLoader?.getByName(this.id)!
    return this.player.y - this.player.game.camera.y + swayShiftY - asset.frame.h + 16 + ARM_WIDTH + 1
  }
}

export class PistolGunSprite extends GunSprite {
  getPositionY() {
    return super.getPositionY() - 1
  }

  getPositionX() {
    return super.getPositionX() + 1
  }
}

export class TwoHandedGunSprite extends GunSprite {
  // constructor(...args: any[]) {
  //   super(...args as any)
  // }

  getPositionX() {
    const scaleX = this.player.getScaleX()
    const swayShiftX = this.getSwayShiftX()
    return (this.player.getPlayerCenter() - swayShiftX - this.player.game.camera.x) * scaleX - 6 + this.shiftX
  }

  getPositionY() {
    const swayShiftY = this.getSwayShiftY()
    const asset = this.player.game.assetLoader?.getByName(this.id)!
    return this.player.y - this.player.game.camera.y + swayShiftY - asset.frame.h + 16 + ARM_WIDTH + 7 + this.shiftY
  }
}
