import type Player from '../../characters/player'
import SpriteClass from '../sprite'

abstract class PlayerSprite extends SpriteClass {
  arm: SpriteClass

  constructor(player: Player, asset: string, frames: number) {
    super(player, asset, frames)
    this.arm = new SpriteClass(player, 'assets/heroes/punk/arms/arm.png', 1)
  }

  abstract getSwayShiftX(): number
  abstract getSwayShiftY(): number

  getScaleX() {
    return this.player.direction === 'left' ? -1 : 1
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    if (!this.arm.img) {
      return
    }

    const scaleX = this.player.direction === 'left' ? -1 : 1
    const swayShiftX = this.getSwayShiftX()
    const swayShiftY = this.getSwayShiftY()

    ctx.save()
    ctx.scale(scaleX, 1)

    ctx.drawImage(
      this.arm.img,
      0,
      0,
      this.arm.width,
      this.arm.height,
      (this.player.getPlayerCenter() - swayShiftX - this.player.game.camera.x) * scaleX - 11,
      this.player.y - this.player.game.camera.y + 11 + swayShiftY,
      this.arm.width,
      this.arm.height
    )

    ctx.restore()
    super.draw(ctx, deltaTime)
  }
}

export class StandingSprite extends PlayerSprite {
  frameInterval = 200

  getSwayShiftX(): number {
    return +(Math.abs(1.5 - this.frameX) === 0.5) * this.getScaleX()
  }

  getSwayShiftY(): number {
    return 0
  }

  constructor(player: Player) {
    super(player, 'assets/heroes/punk/withoutArm/idle.png', 4)
  }
}

export class RunningSprite extends PlayerSprite {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/withoutArm/run.png', 6)
  }

  getSwayShiftX(): number {
    return this.getScaleX() * -1
  }

  getSwayShiftY(): number {
    return +(Math.abs(2.5 - this.frameX) === 1.5) + 1
  }
}

export class JumpingSprite extends PlayerSprite {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/withoutArm/jump.png', 4)
  }

  getSwayShiftX(): number {
    return -2 * this.getScaleX()
  }

  getSwayShiftY(): number {
    if (this.frameX === 0) {
      return -1
    } else if (this.frameX === 1) {
      return -4
    } else if (this.frameX === 2) {
      return -6
    }
    return -1
  }
}

export class FallingSprite extends JumpingSprite {}

export class HitSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/attack1.png', 6, true)
  }
}

export class DoubleHitSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/attack2.png', 8, true)
  }
}

export class StrongHitSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/attack3.png', 8, true)
  }
}

export class UseSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/use.png', 6, true)
  }
}

export class HurtSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/hurt.png', 2)
  }
}

export class DeathSprite extends SpriteClass {
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/death.png', 6, true)
  }
}

export class DoubleJump extends SpriteClass {
  frameInterval = 50
  constructor(player: Player) {
    super(player, 'assets/heroes/punk/doublejump.png', 6, true)
  }
}

export default SpriteClass
