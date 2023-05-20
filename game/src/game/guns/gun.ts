import Player from "../characters/player"

enum GunType {
  Gun1 = '1',
  Gun2 = '2',
  Gun3 = '3',
  Gun4 = '4',
  Gun5 = '5',
  Gun6 = '6',
  Gun7 = '7',
  Gun8 = '8',
  Gun9 = '9',
  Gun10 = '10',
}

class GunManager {
  player: Player
  currentGun: Gun | null = null
  guns: Gun[]

  constructor (player: Player) {
    this.player = player
    this.guns = [
      new Gun(player, GunType.Gun1, 1000),
      new Gun(player, GunType.Gun2, 1000),
      new Gun(player, GunType.Gun3, 1000),
      new Gun(player, GunType.Gun4, 100),
      new Gun(player, GunType.Gun5, 100),
      new Gun(player, GunType.Gun6, 100),
      new Gun(player, GunType.Gun7, 100),
      new Gun(player, GunType.Gun8, 100),
      new Gun(player, GunType.Gun9, 100),
      new Gun(player, GunType.Gun10, 100),
    ]
  }

  update() {
    this.currentGun?.update()
  }

  shot() {
    this.currentGun?.shot()
  }

  setGun(level: number) {
    this.currentGun = this.guns[level]
  }

  

  draw(deltaTime: number) {
    if (!this.currentGun || ['hurt', 'death'].includes(this.player.stateManager.currentState.state)) {
      return
    }

    this.currentGun.draw(this.player.game.ctx, deltaTime)
  }
}

class Gun {
  player: Player
  asset: string
  img!: HTMLImageElement
  loaded = false
  bulletAsset: BulletAsset
  bullets: Bullet[] = []

  lastShotTimestamp = 0

  constructor (player: Player, type: GunType, public shotInterval: number) {
    this.player = player
    this.asset = `assets/heroes/guns/${type}_1.png`
    this.bulletAsset = new BulletAsset(player, type)

    this.loadAsset()
  }

  update() {
    for (const bullet of this.bullets) {
      bullet.update()
    }
    this.deleteBullets()
  }

  deleteBullets() {
    this.bullets
      .filter(({x}) => x < 0 || x > this.player.game.map.width)
      .map((b, i) => i)
      .sort((a, b) => b - a)
      .forEach(index => this.bullets.splice(index, 1))
  }

  getSwayShiftX(): number {
    if (this.player.stateManager.currentState.state === 'standing') {
      return +(Math.abs(1.5 - this.player.spriteManager.currentSprite.frameX) === 0.5) * this.getScaleX()
    } else if (this.player.stateManager.currentState.state === 'running') {
      return this.getScaleX() * -1
    } else if (this.player.stateManager.currentState.state === 'jumping' || this.player.stateManager.currentState.state === 'falling') {
      return -2 * this.getScaleX()
    }

    return 0
  }

  getSwayShiftY(): number {
    if (this.player.stateManager.currentState.state === 'standing') {
      return 0
    } else if (this.player.stateManager.currentState.state === 'running') {
      return +(Math.abs(2.5 - this.player.spriteManager.currentSprite.frameX) === 1.5) + 1
    } else if (this.player.stateManager.currentState.state === 'jumping' || this.player.stateManager.currentState.state === 'falling') {
      return [-1, -4, -6, -1][this.player.spriteManager.currentSprite.frameX]
    }

    return 0
  }

  getScaleX() {
    return this.player.direction === 'left' ? -1 : 1
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    this.drawGun(ctx, deltaTime)
    this.drawBullets(ctx, deltaTime)
  }

  drawGun(ctx: CanvasRenderingContext2D, deltaTime: number) {
    if (!this.img) {
      return
    }

    const scaleX = this.player.direction === 'left' ? -1 : 1
    ctx.save()
    ctx.scale(scaleX, 1)

    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      (this.player.getPlayerCenter() - this.getSwayShiftX() - this.player.game.camera.x) * scaleX + 11,
      this.player.y - this.player.game.camera.y + this.getSwayShiftY() - this.img.height + 16 + 11 + 1,
      this.img.width,
      this.img.height
    )
    ctx.restore()

    this.drawBullets(ctx, deltaTime)
  }

  drawBullets(ctx: CanvasRenderingContext2D, deltaTime: number) {
    for (let bullet of this.bullets) {
      bullet.draw(ctx, deltaTime)
    }
  }

  loadAsset (): void {
    const img = new Image()
    this.img = img
    img.src = this.asset
    img.onload = () => {
      this.loaded = true
    }
  }

  shot() {
    if (this.lastShotTimestamp + this.shotInterval > Date.now()) {
      return
    }
    this.lastShotTimestamp = Date.now()

    const halBulletSize = this.bulletAsset.img.width / 2
    const scaleX = this.player.direction === 'left' ? -1 : 1
    const x = (this.player.getPlayerCenter() - this.getSwayShiftX() - halBulletSize) + scaleX * (this.img.width + 11 + halBulletSize)
    // TODO: tak samo jak bron
    const y = this.player.y + this.getSwayShiftY() - this.img.height + 16 + 11 + 1
    this.bullets.push(new Bullet(this.bulletAsset, this.player, 10 * scaleX, x, y))
  }
}

class Bullet {
  constructor(public asset: BulletAsset, public player: Player, public speed: number, public x: number, public y: number) {

  }

  update() {
    this.x += this.speed
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    if (!this.asset) {
      return
    }

    ctx.drawImage(
      this.asset.img,
      0,
      0,
      this.asset.img.width,
      this.asset.img.height,
      this.x - this.player.game.camera.x,
      this.y - this.player.game.camera.y,
      this.asset.img.width,
      this.asset.img.height
    )
  }
}

class BulletAsset {
  player: Player
  asset: string
  img!: HTMLImageElement
  loaded = false

  constructor (player: Player, level: string) {
    this.player = player
    this.asset = `assets/heroes/bullets/${level}.png`

    this.loadAsset()
  }

  loadAsset (): void {
    const img = new Image()
    this.img = img
    img.src = this.asset
    img.onload = () => {
      this.loaded = true
    }
  }
}

export default GunManager
