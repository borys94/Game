import Enemy from '../../characters/enemy'
import {
  Standing,
  Walking,
  Attack,
  Hurt,
  Death
} from './enemyState'
import StateManager from '../stateManager'

class EnemyStateManager extends StateManager {
  constructor(public player: Enemy) {
    const states = {
      standing: new Standing(player),
      walking: new Walking(player),
      attack: new Attack(player),
      hurt: new Hurt(player),
      death: new Death(player)
    }
    super(player, states)

    this.currentState = states.standing
  }
}

export default EnemyStateManager