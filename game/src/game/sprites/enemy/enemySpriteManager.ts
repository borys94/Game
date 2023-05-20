import { DeathSprite, HurtSprite, RunningSprite, StandingSprite, AttackSprite } from './enemySprites'
import SpriteManager from '../spriteManager'
import Enemy from '../../characters/enemy'

const frames = {
  dog: {
    walking: 6
  },
  rat: {
    walking: 4
  }
}

class EnemySpriteManager extends SpriteManager {
  constructor(public player: Enemy, type: string) {
    const sprites = {
      standing: new StandingSprite(player, `assets/enemies/${type}`),
      walking: new RunningSprite(player, `assets/enemies/${type}`, (frames as any)[type].walking), // TODO
      attack: new AttackSprite(player, `assets/enemies/${type}`),
      hurt: new HurtSprite(player, `assets/enemies/${type}`),
      death: new DeathSprite(player, `assets/enemies/${type}`)
    }
    super(player, sprites)

    this.currentSprite = sprites.standing
  }
}

export default EnemySpriteManager
