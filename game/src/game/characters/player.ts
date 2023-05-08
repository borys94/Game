import { Standing, Running, Jumping, Falling, StrongAttack, DoubleHit, Hit, Use, Hurt, Death, type PlayerState } from '../states/playerStates'
import { type InputType } from '../inputHandler'
import Character from './character'
import type Game from '..'

interface Sprite {
  frames: number
  asset: string
  framesX?: number[]
  img?: HTMLImageElement
}

class Player extends Character<PlayerState['state'], PlayerState> {
  states: Record<PlayerState['state'], PlayerState> = {
    standing: new Standing(this),
    running: new Running(this),
    jumping: new Jumping(this),
    falling: new Falling(this),
    hit: new Hit(this),
    doubleHit: new DoubleHit(this),
    strongAttack: new StrongAttack(this),
    use: new Use(this),
    hurt: new Hurt(this),
    death: new Death(this)
  }

  currentState: PlayerState = this.states.standing

  sprites: Record<PlayerState['state'], Sprite> = {
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
    },
    death: {
      frames: 6,
      asset: 'assets/heroes/punk/death.png'
    }
  }

  cards = 0

  constructor (game: Game) {
    super(game, {
      x: 20,
      y: 400,
      width: 48,
      height: 48,
      maxVy: 15,
      maxHealth: 20
    })

    this.loadAllAssets()
  }

  update = (): void => {
    super.update()

    this.currentState.handleInput(this.game.inputHandler.activeKeys)

    this.collectObjects()
    this.interactObjects(this.game.inputHandler.activeKeys)
  }

  interactObjects = (inputs: InputType[]): void => {
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.handleInput(this, inputs)
    }
  }

  collectObjects = (): void => {
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.enter(this)
    }
  }

  hurt (hurtValue: number): void {
    if (this.health > 0) {
      this.setState('hurt')
    }
    this.health = Math.max(this.health - hurtValue, 0)
  }
}

export default Player
