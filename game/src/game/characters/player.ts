import { type InputType } from '../inputHandler'
import Character from './character'
import type Game from '..'
import PlayerStateManager from '../states/player/playerStateManager'
import PlayerSpriteManager from '../sprites/player/playerSpritesManager'
import GunManager from '../guns/gun'

class Player extends Character {
  stateManager: PlayerStateManager = new PlayerStateManager(this)
  spriteManager: PlayerSpriteManager = new PlayerSpriteManager(this)
  gunManager: GunManager = new GunManager(this)

  paddingLeft = 4
  paddingRight = 24

  cards = 0

  constructor(game: Game) {
    super(game, {
      x: 20,
      y: 316,
      width: 48,
      height: 48,
      maxVy: 15,
      maxHealth: 20
    })

    // this.gunManager.setGun(9)
  }

  hasWeapon() {
    return !!this.gunManager.currentGun
  }

  update = (): void => {
    super.update()

    this.collectObjects()
    this.interactObjects(this.game.inputHandler.activeKeys)

    this.gunManager.update()
  }

  interactObjects = (inputs: InputType[]): void => {
    // TODO: srodek uzytkownika
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.handle(this, inputs)
    }
  }

  collectObjects = (): void => {
    // TODO: srodek uzytkownika
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      // if (element?.asset?.id === 65 || element?.asset?.id === 66) {
      //   this.game.sounds.coinSound()
      // }
      element.enter(this)
    }
  }

  shot = () => {
    this.gunManager.shot()
  }

  draw(deltaTime: number): void {
    this.gunManager.drawBullets(deltaTime)
    super.draw(deltaTime)

    this.drawHealthBar()
    this.drawEnduranceBar()
    this.drawWeapon()
  }

  drawHealthBar() {
    const ctx = this.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#1E8449'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 20, 100, 10)
    ctx.fillRect(20, 20, 100 * (this.health / this.maxHealth), 10)
    ctx.restore()
  }

  drawEnduranceBar() {
    const ctx = this.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#5DADE2'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 35, 100, 10)
    ctx.fillRect(20, 35, 100, 10)
    ctx.restore()
  }

  drawWeapon() {
    if (!this.gunManager.currentGun) {
      return
    }
    const ctx = this.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#1E8449'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 50, 30, 30)
    ctx.fillRect(20, 50, 30, 30)

    // if (this.gunManager.currentGun?.img) {
    //   const img = this.gunManager.currentGun.img
    //   ctx.drawImage(
    //     img,
    //     0,
    //     0,
    //     img.width,
    //     img.height,
    //     20 + 15 - img.width/2,
    //     50 + 15 - img.height/2,
    //     img.width,
    //     img.height
    //   )
    // }

    ctx.restore()
  }
}

export default Player
