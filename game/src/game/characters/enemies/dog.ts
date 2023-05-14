// import type Assets from './assets'
import { type AttackableEnemyState, Standing, Walking, Attack, Hurt, Death } from '../../states/enemies/attackable'
import Enemy from '../enemy'
import type Game from '../..'
import type SpriteClass from '../../sprites/playerSprites'
import { AttackSprite, DeathSprite, HurtSprite, RunningSprite, StandingSprite } from '../../sprites/enemySprites'

class DogEnemy extends Enemy<AttackableEnemyState['state']> {
  states: Record<AttackableEnemyState['state'], AttackableEnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this),
    attack: new Attack(this),
    hurt: new Hurt(this),
    death: new Death(this)
  }

  currentState: AttackableEnemyState = this.states.walking

  sprites: Record<AttackableEnemyState['state'], SpriteClass> = {
    standing: new StandingSprite(this, 'assets/enemies/dog'),
    walking: new RunningSprite(this, 'assets/enemies/dog'),
    attack: new AttackSprite(this, 'assets/enemies/dog'),
    hurt: new HurtSprite(this, 'assets/enemies/dog'),
    death: new DeathSprite(this, 'assets/enemies/dog')
  }

  currentSprite: SpriteClass = this.sprites.standing

  paddingLeft: number = 4
  paddingRight: number = 12

  constructor (game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 48,
      height: 48,
      maxVy: 10,
      maxHealth: 10
    })
  }

  // update (keys: InputType[], map: Map): void {
  //   super.update([], map)
  //   // this.currentState.handleInput()
  // }
}

export default DogEnemy
