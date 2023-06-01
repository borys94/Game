import type Player from '../../characters/player/player'

import SpriteManager from '../spriteManager'
import { PlayerSprite, ArmSprite, GunSprite, PistolGunSprite, TwoHandedGunSprite, TwoArmSprite } from './playerSprites'

class PlayerSpriteManager extends SpriteManager {
  defaultSprites: Record<string, PlayerSprite> = {}
  withoutOneArm: Record<string, PlayerSprite> = {}
  withoutTwoArms: Record<string, PlayerSprite> = {}
  arms: Record<string, ArmSprite> = {}
  twoArms: Record<string, ArmSprite> = {}
  guns: GunSprite[] = []

  constructor(public player: Player) {
    super()
    this.defaultSprites = {
      standing: new PlayerSprite(player, 'heroes', `${player.type}-idle`, { frameInterval: 200 }),
      running: new PlayerSprite(player, 'heroes', `${player.type}-run`),
      jumping: new PlayerSprite(player, 'heroes', `${player.type}-jump`),
      falling: new PlayerSprite(player, 'heroes', `${player.type}-jump`),
      hit: new PlayerSprite(player, 'heroes', `${player.type}-attack1`, { oneTimeAction: true }),
      doubleHit: new PlayerSprite(player, 'heroes', `${player.type}-attack2`, { oneTimeAction: true }),
      strongAttack: new PlayerSprite(player, 'heroes', `${player.type}-attack3`, { oneTimeAction: true }),
      use: new PlayerSprite(player, 'heroes', `${player.type}-use`, { oneTimeAction: true }),
      hurt: new PlayerSprite(player, 'heroes', `${player.type}-hurt`, { oneTimeAction: true }),
      death: new PlayerSprite(player, 'heroes', `${player.type}-death`, { oneTimeAction: true }),
      doubleJump: new PlayerSprite(player, 'heroes', `${player.type}-doublejump`, { frameInterval: 50 }),
      happy: new PlayerSprite(player, 'heroes', `${player.type}-happy`, { frameInterval: 150, oneTimeAction: true })
    }

    this.withoutOneArm = {
      standing: new PlayerSprite(player, 'gunPack', `${player.type}-idle1`, { frameInterval: 200 }),
      running: new PlayerSprite(player, 'gunPack', `${player.type}-run1`),
      jumping: new PlayerSprite(player, 'gunPack', `${player.type}-jump1`),
      falling: new PlayerSprite(player, 'gunPack', `${player.type}-jump1`)
    }

    this.withoutTwoArms = {
      standing: new PlayerSprite(player, 'gunPack', `${player.type}-idle2`, { frameInterval: 200 }),
      running: new PlayerSprite(player, 'gunPack', `${player.type}-run2`),
      jumping: new PlayerSprite(player, 'gunPack', `${player.type}-jump2`),
      falling: new PlayerSprite(player, 'gunPack', `${player.type}-jump2`)
    }

    this.arms = {
      arm1: new ArmSprite(player, 'gunPack', `${player.type}-arm1`),
      arm2: new ArmSprite(player, 'gunPack', `${player.type}-arm2`),
      arm3: new ArmSprite(player, 'gunPack', `${player.type}-arm3`),
      arm4: new ArmSprite(player, 'gunPack', `${player.type}-arm4`),
      arm5: new ArmSprite(player, 'gunPack', `${player.type}-arm5`)
    }

    this.twoArms = {
      arm1: new TwoArmSprite(player, 'gunPack', `${player.type}-arm6`),
      arm2: new TwoArmSprite(player, 'gunPack', `${player.type}-arm7`),
      arm3: new TwoArmSprite(player, 'gunPack', `${player.type}-arm8`),
      arm4: new TwoArmSprite(player, 'gunPack', `${player.type}-arm9`),
      arm5: new TwoArmSprite(player, 'gunPack', `${player.type}-arm10`)
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
      new GunSprite(player, 'gunPack', 'gun-10'),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-11'),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-12', { shiftX: -1 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-13'),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-14', { shiftY: 1 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-15', { shiftY: 2 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-16', { shiftY: 3 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-17', { shiftY: 3 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-18', { shiftX: 2, shiftY: 2 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-19', { shiftY: 4 }),
      new TwoHandedGunSprite(player, 'gunPack', 'gun-20', { shiftX: 2, shiftY: 2 })
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
    if (this.player.gunManager.currentGun?.level! <= 10) {
      return this.withoutOneArm[state]
    } else {
      return this.withoutTwoArms[state]
    }
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
      if (this.player.gunManager.currentGun?.level! <= 10) {
        this.guns[this.player.gunManager.currentGun?.level! - 1].draw(ctx, deltaTime)
        this.arms.arm3.draw(ctx, deltaTime)
        this.withoutOneArm[state].draw(ctx, deltaTime)
      } else {
        this.withoutTwoArms[state].draw(ctx, deltaTime)
        this.guns[this.player.gunManager.currentGun?.level! - 1].draw(ctx, deltaTime)
        this.twoArms.arm3.draw(ctx, deltaTime)
      }
    }
  }
}

export default PlayerSpriteManager
