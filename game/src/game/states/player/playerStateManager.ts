import type Player from '../../characters/player'
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
  DoubleJump
} from './playerStates'
import StateManager from '../stateManager'

class PlayerStateManager extends StateManager {
  constructor(public player: Player) {
    const states = {
      standing: new Standing(player),
      running: new Running(player),
      jumping: new Jumping(player),
      falling: new Falling(player),
      hit: new Hit(player),
      doubleHit: new DoubleHit(player),
      strongAttack: new StrongAttack(player),
      use: new Use(player),
      hurt: new Hurt(player),
      death: new Death(player),
      doubleJump: new DoubleJump(player)
    }
    super(player, states)

    this.currentState = states.standing
  }
}

export default PlayerStateManager
