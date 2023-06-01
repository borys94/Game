import { type InputType } from '../../inputHandler'
import Character from '../character'
import type Game from '../..'
import PlayerStateManager from '../../states/player/playerStateManager'
import PlayerSpriteManager from '../../sprites/player/playerSpritesManager'
import GunManager from './gunManager'
import PlayerCollectionBar from './collectionBar'
import Enemy from '../enemy'
import PlayerBar from './playerBar'

class Player extends Character {
  type = 'punk'
  stateManager: PlayerStateManager = new PlayerStateManager(this)
  spriteManager: PlayerSpriteManager = new PlayerSpriteManager(this)
  gunManager: GunManager = new GunManager(this)

  collectionBar: PlayerCollectionBar = new PlayerCollectionBar(this)
  playerBar: PlayerBar = new PlayerBar(this)

  paddingLeft = 4
  paddingRight = 24

  cards = 0
  money = 0

  invisible = false
  invisibleStartDate = 0
  invisibleTimeout = 3000

  constructor(game: Game) {
    super(game, {
      x: game.map.elements.mapDetails.player.x,
      y: game.map.elements.mapDetails.player.y,
      width: 48,
      height: 48,
      maxVy: 15,
      maxHealth: 20
    })

    // this.gunManager.setGun(19)
  }

  hasWeapon() {
    return !!this.gunManager.currentGun
  }

  update = (): void => {
    super.update()

    this.collectObjects()
    this.interactObjects(this.game.inputHandler.activeKeys)

    this.gunManager.update()

    this.checkCollisionWithEnemies()

    if (this.invisible && this.invisibleStartDate + this.invisibleTimeout < Date.now()) {
      this.invisible = false
    }
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
      element.enter(this)
    }
  }

  shot = () => {
    this.gunManager.shot()
  }

  checkCollisionWithEnemies() {
    for (const enemy of this.game.map.enemies) {
      this.checkCollisionWithEnemy(enemy)
    }
  }

  checkCollisionWithEnemy(enemy: Enemy) {
    if (
      enemy.isAlive() &&
      this.isAlive() &&
      !this.invisible &&
      this.stateManager.currentState.state !== 'doublejump' &&
      this.realX < enemy.realX + enemy.realWidth &&
      this.realX + this.realWidth > enemy.realX &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y
    ) {
      this.hurt(2)
    }
  }

  hurt(value: number) {
    if (this.invisible) {
      return
    }
    super.hurt(value)
  }

  draw(deltaTime: number): void {
    this.gunManager.drawBullets(deltaTime)
    super.draw(deltaTime)

    this.playerBar.draw()
    this.collectionBar.draw()
  }
}

export default Player
