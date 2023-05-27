import type Player from '../../characters/player/player'

import SpriteManager from '../spriteManager'
import Sprite from '../sprite'
import { ArmSprite, GunSprite, PistolGunSprite } from './playerSprites'

class PlayerSpriteManager extends SpriteManager {
  defaultSprites: Record<string, Sprite> = {}
  withoutOneArm: Record<string, Sprite> = {}
  withoutTwoArms: Record<string, Sprite> = {}
  arms: Record<string, ArmSprite> = {}
  guns: GunSprite[] = []

  constructor(public player: Player) {
    super()
    this.defaultSprites = {
      standing: new Sprite(player, 'heroes', 'punk-idle', 200),
      running: new Sprite(player, 'heroes', 'punk-run'),
      jumping: new Sprite(player, 'heroes', 'punk-jump'),
      falling: new Sprite(player, 'heroes', 'punk-jump'),
      hit: new Sprite(player, 'heroes', 'punk-attack1', undefined, true),
      doubleHit: new Sprite(player, 'heroes', 'punk-attack2', undefined, true),
      strongAttack: new Sprite(player, 'heroes', 'punk-attack3', undefined, true),
      use: new Sprite(player, 'heroes', 'punk-use', undefined, true),
      hurt: new Sprite(player, 'heroes', 'punk-hurt', undefined, true),
      death: new Sprite(player, 'heroes', 'punk-death', undefined, true),
      doubleJump: new Sprite(player, 'heroes', 'punk-doublejump', 50),
      happy: new Sprite(player, 'heroes', 'punk-happy', 150, true)
    }

    this.withoutOneArm = {
      standing: new Sprite(player, 'gunPack', 'punk-idle1', 200),
      running: new Sprite(player, 'gunPack', 'punk-run1'),
      jumping: new Sprite(player, 'gunPack', 'punk-jump1'),
      falling: new Sprite(player, 'gunPack', 'punk-jump1')
    }

    this.withoutTwoArms = {
      standing: new Sprite(player, 'gunPack', 'punk-idle2', 200),
      running: new Sprite(player, 'gunPack', 'punk-run2'),
      jumping: new Sprite(player, 'gunPack', 'punk-jump2'),
      falling: new Sprite(player, 'gunPack', 'punk-jump2')
    }

    this.arms = {
      arm1: new ArmSprite(player, 'gunPack', 'punk-arm1'),
      arm2: new ArmSprite(player, 'gunPack', 'punk-arm2'),
      arm3: new ArmSprite(player, 'gunPack', 'punk-arm3'),
      arm4: new ArmSprite(player, 'gunPack', 'punk-arm4'),
      arm5: new ArmSprite(player, 'gunPack', 'punk-arm5')
    }

    this.guns = [
      new PistolGunSprite(player, 'gunPack', 'gun-1'),
      new GunSprite(player, 'gunPack', 'gun-2'),
      new GunSprite(player, 'gunPack', 'gun-3'),
      new GunSprite(player, 'gunPack', 'gun-4'),
      new GunSprite(player, 'gunPack', 'gun-5'),
      new GunSprite(player, 'gunPack', 'gun-6'),
      new GunSprite(player, 'gunPack', 'gun-7'),
      new GunSprite(player, 'gunPack', 'gun-8'),
      new GunSprite(player, 'gunPack', 'gun-9'),
      new GunSprite(player, 'gunPack', 'gun-10')
    ]
  }

  getCurrentFrame() {
    return this.getCurrentSprite().frameX
  }

  getCurrentSprite() {
    const state = this.player.stateManager.currentState.state
    if (
      ['hit', 'doubleHit', 'strongAttack', 'use', 'hurt', 'death', 'doubleJump', 'happy'].includes(state) ||
      !this.player.hasWeapon()
    ) {
      return this.defaultSprites[state]
    }
    return this.withoutOneArm[state]
  }

  setSprite(state: string) {
    this.defaultSprites[state].enter()
    if (this.withoutOneArm[state]) {
      this.withoutOneArm[state].enter()
    }
  }

  update() {
    // this.
    // console.log('update')
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    const state = this.player.stateManager.currentState.state

    if (
      ['hit', 'doubleHit', 'strongAttack', 'use', 'hurt', 'death', 'doubleJump', 'happy'].includes(state) ||
      !this.player.hasWeapon()
    ) {
      // console.log('default', state)
      this.defaultSprites[state].draw(ctx, deltaTime)
      return
    }

    if (this.player.hasWeapon()) {
      this.guns[this.player.gunManager.currentGun?.level! - 1].draw(ctx, deltaTime)
    }
    this.arms.arm3.draw(ctx, deltaTime)
    this.withoutOneArm[state].draw(ctx, deltaTime)
  }
}

export default PlayerSpriteManager
