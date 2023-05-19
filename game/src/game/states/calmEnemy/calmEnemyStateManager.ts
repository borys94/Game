import Enemy from '../../characters/enemy'
import { Standing, Walking, Hurt, Death } from './calmEnemyState'

import StateManager from '../stateManager'

class CalmEnemyStateManager extends StateManager {
  constructor(public player: Enemy) {
    const states = {
      standing: new Standing(player),
      walking: new Walking(player),
      hurt: new Hurt(player),
      death: new Death(player)
    }
    super(player, states)

    this.currentState = states.standing
  }
}

export default CalmEnemyStateManager