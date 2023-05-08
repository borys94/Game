// import type Assets from './assets'
import { type AttackableEnemyState, Standing, Walking, Attack, Hurt, Death } from '../../states/enemies/attackable'
import Enemy from '../enemy'
import type Game from '../..'

interface Sprite {
  frames: number
  asset: string
  img?: HTMLImageElement
}

class DogEnemy extends Enemy<AttackableEnemyState['state']> {
  states: Record<AttackableEnemyState['state'], AttackableEnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this),
    attack: new Attack(this),
    hurt: new Hurt(this),
    death: new Death(this)
  }

  currentState: AttackableEnemyState = this.states.walking

  sprites: Record<AttackableEnemyState['state'], Sprite> = {
    standing: {
      frames: 4,
      asset: 'assets/enemies/dog/idle.png'
    },
    walking: {
      frames: 6,
      asset: 'assets/enemies/dog/walk.png'
    },
    attack: {
      frames: 4,
      asset: 'assets/enemies/dog/attack.png'
    },
    hurt: {
      frames: 2,
      asset: 'assets/enemies/dog/hurt.png'
    },
    death: {
      frames: 4,
      asset: 'assets/enemies/dog/death.png'
    }
  }

  constructor (game: Game, x: number, y: number) {
    super(game, {
      x,
      y,
      width: 48,
      height: 48,
      maxVy: 10,
      maxHealth: 10
    })

    this.loadAllAssets()
  }

  // update (keys: InputType[], map: Map): void {
  //   super.update([], map)
  //   // this.currentState.handleInput()
  // }
}

export default DogEnemy
