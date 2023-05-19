import type Player from '../../characters/player'
import {
  DeathSprite,
  DoubleHitSprite,
  DoubleJump,
  FallingSprite,
  HitSprite,
  HurtSprite,
  JumpingSprite,
  RunningSprite,
  StandingSprite,
  StrongHitSprite,
  UseSprite
} from './playerSprites'
import SpriteManager from '../spriteManager'

class PlayerSpriteManager extends SpriteManager {
  constructor(public player: Player) {
    const sprites = {
      standing: new StandingSprite(player),
      running: new RunningSprite(player),
      jumping: new JumpingSprite(player),
      falling: new FallingSprite(player),
      hit: new HitSprite(player),
      doubleHit: new DoubleHitSprite(player),
      strongAttack: new StrongHitSprite(player),
      use: new UseSprite(player),
      hurt: new HurtSprite(player),
      death: new DeathSprite(player),
      doubleJump: new DoubleJump(player)
    }
    super(player, sprites)

    this.currentSprite = sprites.standing
  }
}

export default PlayerSpriteManager