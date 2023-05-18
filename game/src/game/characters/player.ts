import {
  Standing,
  Running,
  Jumping,
  Falling,
  StrongAttack,
  DoubleHit,
  Hit,
  Use,
  Hurt,
  Death,
  type PlayerState
} from '../states/playerStates'
import { type InputType } from '../inputHandler'
import Character from './character'
import type SpriteClass from '../sprites/playerSprites'
import {
  DeathSprite,
  DoubleHitSprite,
  FallingSprite,
  HitSprite,
  HurtSprite,
  JumpingSprite,
  RunningSprite,
  StandingSprite,
  StrongHitSprite,
  UseSprite
} from '../sprites/playerSprites'
import type Game from '..'

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

  sprites: Record<PlayerState['state'], SpriteClass> = {
    standing: new StandingSprite(this),
    running: new RunningSprite(this),
    jumping: new JumpingSprite(this),
    falling: new FallingSprite(this),
    hit: new HitSprite(this),
    doubleHit: new DoubleHitSprite(this),
    strongAttack: new StrongHitSprite(this),
    use: new UseSprite(this),
    hurt: new HurtSprite(this),
    death: new DeathSprite(this)
  }

  currentSprite = this.sprites.standing

  paddingLeft = 4
  paddingRight = 24

  cards = 0

  constructor (game: Game) {
    super(game, {
      x: 20,
      y: 316,
      width: 48,
      height: 48,
      maxVy: 15,
      maxHealth: 20
    })
  }

  update = (): void => {
    super.update()

    this.currentState.handleInput(this.game.inputHandler.activeKeys)

    this.collectObjects()
    this.interactObjects(this.game.inputHandler.activeKeys)
  }

  interactObjects = (inputs: InputType[]): void => {
    // TODO: srodek uzytkownika
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      element.handleInput(this, inputs)
    }
  }

  collectObjects = (): void => {
    // TODO: srodek uzytkownika
    const element = this.game.map.getElement(this.x + this.width / 4, this.y + this.height / 2)
    if (element?.active) {
      if (element?.asset?.id === 65 || element?.asset?.id === 66) {
        this.game.sounds.coinSound()
      }
      element.enter(this)
    }
  }

  hurt (hurtValue: number): void {
    if (this.health > 0) {
      this.setState('hurt')
    }
    this.health = Math.max(this.health - hurtValue, 0)
  }

  draw (deltaTime: number): void {
    super.draw(deltaTime)

    const ctx = this.game.ctx

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#1E8449'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 20, 100, 10)
    ctx.fillRect(
      20,
      20,
      100 * (this.health / this.maxHealth),
      10
    )
    ctx.restore()
  }
}

export default Player
