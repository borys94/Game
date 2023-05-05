// import type Assets from './assets'
import { type InputType } from '../inputHandler'
import type Map from '../map'
import { Standing, Walking, type EnemyState } from '../states/enemyStates'
import Character, { type Direction } from './character'
import type Player from './player'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

abstract class Enemy extends Character<RatEnemyState, EnemyState> {
  direction: Direction = 'left'
  player?: Player

  setPlayer (player: Player): void {
    this.player = player
  }
}

type RatEnemyState = 'standing' | 'walking'

export class RatEnemy extends Enemy {
  states: Record<RatEnemyState, EnemyState> = {
    standing: new Standing(this),
    walking: new Walking(this)
  }

  currentState: EnemyState = this.states.walking

  sprites: Record<RatEnemyState, Sprite> = {
    standing: {
      frames: 4,
      asset: 'assets/enemies/rat/idle.png'
    },
    walking: {
      frames: 4,
      asset: 'assets/enemies/rat/walk.png'
    }
  }

  direction: Direction = 'left'

  constructor (map: Map, x: number, y: number) {
    super(map, x, y, 32, 32, 10)

    this.loadAllAssets()
  }

  update (keys: InputType[], map: Map): void {
    super.update([], map)
    // this.currentState.handleInput()
  }
}

export default Enemy
