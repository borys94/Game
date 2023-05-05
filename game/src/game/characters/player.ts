import { Standing, Running, Jumping, Falling, StrongAttack, DoubleHit, Hit, Use, type PlayerStateTypes, Hurt, type PlayerState } from '../states/playerStates'
import { type InputType } from '../inputHandler'
import type Map from '../map'
import Character from './character'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

class Player extends Character<PlayerStateTypes, PlayerState> {
  states: Record<PlayerState['state'], PlayerState> = {
    standing: new Standing(this),
    running: new Running(this),
    jumping: new Jumping(this),
    falling: new Falling(this),
    hit: new Hit(this),
    doubleHit: new DoubleHit(this),
    strongAttack: new StrongAttack(this),
    use: new Use(this),
    hurt: new Hurt(this)
  }

  currentState: PlayerState = this.states.standing

  sprites: Record<PlayerStateTypes, Sprite> = {
    standing: {
      frames: 4,
      asset: 'assets/heroes/punk/idle.png'
    },
    running: {
      frames: 4,
      asset: 'assets/heroes/punk/run.png'
    },
    jumping: {
      frames: 4,
      framesX: [0],
      asset: 'assets/heroes/punk/jump.png'
    },
    falling: {
      frames: 4,
      framesX: [3],
      asset: 'assets/heroes/punk/jump.png'
    },
    hit: {
      frames: 6,
      asset: 'assets/heroes/punk/attack1.png'
    },
    doubleHit: {
      frames: 8,
      asset: 'assets/heroes/punk/attack2.png'
    },
    strongAttack: {
      frames: 8,
      asset: 'assets/heroes/punk/attack3.png'
    },
    use: {
      frames: 6,
      asset: 'assets/heroes/punk/use.png'
    },
    hurt: {
      frames: 2,
      asset: 'assets/heroes/punk/hurt.png'
    }
  }

  cards = 0

  constructor (map: Map) {
    super(map, 20, 400, 48, 48, 15)

    this.loadAllAssets()
  }

  update = (keys: InputType[], map: Map): void => {
    super.update(keys, map)

    this.currentState.handleInput(keys)

    this.collectObjects()
    this.interactObjects(keys)
  }

  interactObjects = (inputs: InputType[]): void => {
    const element = this.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.handleInput(this, inputs)
    }
  }

  collectObjects = (): void => {
    const element = this.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.enter(this)
    }
  }
}

export default Player
