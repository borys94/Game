
import type Player from '../../characters/player'
import SpriteClass from '../sprite'

export class StandingSprite extends SpriteClass {
  frameInterval = 200
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/idle.png', 4)
  }
}

export class RunningSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/run.png', 4)
  }
}

export class JumpingSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/jump.png', 4)
  }
}

export class FallingSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/jump.png', 4)
  }
}

export class HitSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/attack1.png', 6, true)
  }
}

export class DoubleHitSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/attack2.png', 8, true)
  }
}

export class StrongHitSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/attack3.png', 8, true)
  }
}

export class UseSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/use.png', 6, true)
  }
}

export class HurtSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/hurt.png', 2)
  }
}

export class DeathSprite extends SpriteClass {
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/death.png', 6, true)
  }
}

export class DoubleJump extends SpriteClass {
  frameInterval = 50
  constructor (player: Player) {
    super(player, 'assets/heroes/punk/doublejump.png', 6, true)
  }
}

export default SpriteClass
