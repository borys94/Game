import type Game from '../..'
import type SpriteClass from '../../sprites/playerSprites'
import { Standing, Walking, Hurt, Death, type CowardlyEnemyState } from '../../states/enemies/cowardly'
import Enemy from '../enemy'
import { HurtSprite, RunningSprite, StandingSprite, DeathSprite } from '../../sprites/enemySprites'

class RatEnemy extends Enemy<CowardlyEnemyState['state']> {
  type = 'rat' as const
  maxSpeed = 1
  speed = this.maxSpeed
  states: Record<CowardlyEnemyState['state'], CowardlyEnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this),
    hurt: new Hurt(this),
    death: new Death(this)
  }

  currentState: CowardlyEnemyState = this.states.walking

  sprites: Record<CowardlyEnemyState['state'], SpriteClass> = {
    standing: new StandingSprite(this, 'assets/enemies/rat'),
    walking: new RunningSprite(this, 'assets/enemies/rat'),
    hurt: new HurtSprite(this, 'assets/enemies/rat'),
    death: new DeathSprite(this, 'assets/enemies/rat')
  }

  currentSprite: SpriteClass = this.sprites.walking

  constructor (game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 32,
      height: 32,
      maxVy: 10,
      maxHealth: 5
    })
  }

  // update (keys: InputType[], map: Map): void {
  //   super.update([], map)
  //   // this.currentState.handleInput()
  // }
}

export default RatEnemy
