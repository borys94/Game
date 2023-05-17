import type Enemy from '../characters/enemy'
import { SpriteClass } from './playerSprites'

export class StandingSprite extends SpriteClass {
  frameInterval = 200
  constructor (player: Enemy<any>, path: string) {
    super(player, `${path}/idle.png`, 4)
  }
}

export class RunningSprite extends SpriteClass {
  frameInterval = 150
  constructor (player: Enemy<any>, path: string) {
    super(player, `${path}/walk.png`, 4) // TODO
  }
}

export class HurtSprite extends SpriteClass {
  constructor (player: Enemy<any>, path: string) {
    super(player, `${path}/hurt.png`, 2)
  }

  enter (): void {
    super.enter()
    setTimeout(() => {
      this.performed = true
    }, 500)
  }

  animate (): void {
    this.frameX = 1
  }
}

export class DeathSprite extends SpriteClass {
  constructor (player: Enemy<any>, path: string) {
    super(player, `${path}/death.png`, 4, true)
  }
}

export class AttackSprite extends SpriteClass {
  constructor (player: Enemy<any>, path: string) {
    super(player, `${path}/attack.png`, 4)
  }
}
