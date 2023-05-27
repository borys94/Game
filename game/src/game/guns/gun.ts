import Player from '../characters/player/player'
import sounds from '../sounds'

class GunManager {
  player: Player
  currentGun: Gun | null = null
  guns: Gun[]
  gunInBackpack: Gun | null = null

  constructor(player: Player) {
    this.player = player
    this.guns = [
      new Gun(player, 1, 1000, 4),
      new Gun(player, 2, 900, 5),
      new Gun(player, 3, 750, 6),
      new Gun(player, 4, 600, 7),
      new Gun(player, 5, 500, 8),
      new Gun(player, 6, 500, 9),
      new Gun(player, 7, 400, 11),
      new Gun(player, 8, 300, 13),
      new Gun(player, 9, 200, 16),
      new Gun(player, 10, 150, 20),
      new Gun(player, 11, 150, 24),
      new Gun(player, 12, 150, 30),
      new Gun(player, 13, 150, 38),
      new Gun(player, 14, 150, 48),
      new Gun(player, 15, 150, 60),
      new Gun(player, 16, 150, 74),
      new Gun(player, 17, 150, 90),
      new Gun(player, 18, 150, 108),
      new Gun(player, 19, 150, 130),
      new Gun(player, 20, 150, 154)
    ]
  }

  update() {
    this.currentGun?.update()
  }

  shot() {
    this.currentGun?.shot()
  }

  hideGun() {
    this.currentGun = null
  }

  showGun() {
    this.currentGun = this.gunInBackpack
  }

  setGun(level: number) {
    this.gunInBackpack = this.guns[level]
    this.currentGun = this.gunInBackpack
  }

  drawBullets(deltaTime: number) {
    if (!this.currentGun || ['hurt', 'death'].includes(this.player.stateManager.currentState.state)) {
      return
    }

    this.currentGun.drawBullets(this.player.game.ctx, deltaTime)
  }
}

class Gun {
  player: Player
  bulletId: string
  gunId: string
  bullets: Bullet[] = []
  lastShotTimestamp = 0

  constructor(player: Player, public level: number, public shotInterval: number, public hurtValue: number) {
    this.player = player
    this.bulletId = `bullet-${level}`
    this.gunId = `gun-${level}`
  }

  update() {
    for (const bullet of this.bullets) {
      bullet.update()
    }
    this.deleteBullets()
  }

  deleteBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      if (!this.bullets[i].active) {
        this.bullets.splice(i, 1)
      }
    }
  }

  // TODO
  getSwayShiftX(): number {
    return this.player.spriteManager.arms.arm1.getSwayShiftX()
  }

  // TODO
  getSwayShiftY(): number {
    return this.player.spriteManager.arms.arm1.getSwayShiftY()
  }

  drawBullets(ctx: CanvasRenderingContext2D, deltaTime: number) {
    for (let bullet of this.bullets) {
      bullet.draw(ctx, deltaTime)
    }
  }

  shot() {
    if (this.lastShotTimestamp + this.shotInterval > Date.now()) {
      return
    }
    this.lastShotTimestamp = Date.now()

    const [x, y] = this.calculateStartBulletPoint()
    this.bullets.push(new Bullet(this.player, this.getBulletSpeed(), x, y, this.hurtValue, this.bulletId))
    if (this.level <= 5) {
      sounds.pistolSound()
    } else if (this.level === 8) {
      sounds.rifleSound()
    } else {
      sounds.laserGunSound()
    }
  }

  getBulletSpeed() {
    return 10 * this.player.getScaleX()
  }

  calculateStartBulletPoint() {
    const bulletAsset = this.player.game.assetLoader?.getByName(this.bulletId)
    const gunAsset = this.player.game.assetLoader?.getByName(this.gunId)
    if (!bulletAsset || !gunAsset) {
      throw new Error(`Cannot find asset for gun or bullet! id=${this.bulletId}`)
    }
    const twoHandedGun = this.level >= 10
    const scaleX = this.player.getScaleX()
    const halfBulletSize = bulletAsset.frame.w / 2
    const x =
      this.player.getPlayerCenter() -
      this.getSwayShiftX() -
      halfBulletSize +
      scaleX * (gunAsset.frame.w + (twoHandedGun ? 0 : 11) + halfBulletSize)

    // TODO: tak samo jak bron
    const y = this.player.y + this.getSwayShiftY() - gunAsset.frame.h + 16 + (twoHandedGun ? 20 : 11) + 1
    return [x, y]
  }
}

export class Bullet {
  active = true

  constructor(
    public player: Player,
    public speed: number,
    public x: number,
    public y: number,
    public hurtValue: number,
    public bulletId: string
  ) {}

  update() {
    const img = this.player.game.assetLoader?.getImage('gunPack')
    const asset = this.player.game.assetLoader?.getByName(this.bulletId)
    if (!img || !asset || !this.active) {
      return
    }

    this.x += this.speed
    const map = this.player.game.map

    if (
      this.x < 0 ||
      this.x > map.width ||
      map.hasObstacle(this.x, this.y) ||
      map.hasObstacle(this.x, this.y + asset.frame.h)
    ) {
      this.active = false
    }

    for (let enemy of map.enemies) {
      if (
        enemy.isAlive() &&
        enemy.x + enemy.width > this.x &&
        enemy.x < this.x &&
        enemy.y + enemy.height > this.y &&
        enemy.y < this.y
      ) {
        enemy.hurt(this.hurtValue)
        this.active = false
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    const img = this.player.game.assetLoader?.getImage('gunPack')
    const asset = this.player.game.assetLoader?.getByName(this.bulletId)
    if (!img || !asset) {
      return
    }

    ctx.drawImage(
      img,
      asset.frame.x,
      asset.frame.y,
      asset.frame.w,
      asset.frame.h,
      this.x - this.player.game.camera.x,
      this.y - this.player.game.camera.y,
      asset.frame.w,
      asset.frame.h
    )
  }
}

export default GunManager
