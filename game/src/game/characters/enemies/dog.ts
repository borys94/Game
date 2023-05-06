// import type Assets from './assets'
import { type InputType } from '../../inputHandler'
import type Map from '../../map'
import { type AttackableEnemyState, Standing, Walking, Attack } from '../../states/enemies/attackable'
import Enemy from '../enemy'

interface Sprite {
  frames: number
  asset: string
  img?: HTMLImageElement
}

class DogEnemy extends Enemy<AttackableEnemyState['state']> {
  states: Record<AttackableEnemyState['state'], AttackableEnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this),
    attack: new Attack(this)
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
    }
  }

  constructor (map: Map, x: number, y: number) {
    super(map, x, y, 48, 48, 10)

    this.loadAllAssets()
  }

  update (keys: InputType[], map: Map): void {
    super.update([], map)
    // this.currentState.handleInput()
  }
}

export default DogEnemy
