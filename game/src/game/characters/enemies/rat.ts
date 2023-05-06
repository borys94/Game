import { type InputType } from '../../inputHandler'
import type Map from '../../map'
import { Standing, Walking, type CowardlyEnemyState } from '../../states/enemies/cowardly'
import Enemy from '../enemy'

interface Sprite {
  frames: number
  asset: string
  img?: HTMLImageElement
}

class RatEnemy extends Enemy<CowardlyEnemyState['state']> {
  states: Record<CowardlyEnemyState['state'], CowardlyEnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this)
  }

  currentState: CowardlyEnemyState = this.states.walking

  sprites: Record<CowardlyEnemyState['state'], Sprite> = {
    standing: {
      frames: 4,
      asset: 'assets/enemies/rat/idle.png'
    },
    walking: {
      frames: 4,
      asset: 'assets/enemies/rat/walk.png'
    }
  }

  constructor (map: Map, x: number, y: number) {
    super(map, x, y, 32, 32, 10)

    this.loadAllAssets()
  }

  update (keys: InputType[], map: Map): void {
    super.update([], map)
    // this.currentState.handleInput()
  }
}

export default RatEnemy
