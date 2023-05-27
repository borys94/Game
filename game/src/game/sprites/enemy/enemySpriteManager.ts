import SpriteManager from '../spriteManager'
import Enemy from '../../characters/enemy'
import Sprite from '../sprite'

class EnemySpriteManager extends SpriteManager {
  defaultSprites: Record<string, Sprite> = {}
  state: string

  constructor(public player: Enemy, type: string) {
    super()

    this.defaultSprites = {
      standing: new Sprite(player, 'enemies', `${type}-idle`, { frameInterval: 200 }),
      walking: new Sprite(player, 'enemies', `${type}-walk`, { frameInterval: 150 }),
      attack: new Sprite(player, 'enemies', `${type}-attack`, { oneTimeAction: true }),
      hurt: new Sprite(player, 'enemies', `${type}-hurt`, { oneTimeAction: true }),
      death: new Sprite(player, 'enemies', `${type}-death`, { frameInterval: 150, oneTimeAction: true })
    }

    this.state = player.stateManager.currentState.state
  }

  getCurrentFrame(): number {
    const state = this.player.stateManager.currentState.state
    return this.defaultSprites[state].frameX
  }

  getCurrentSprite() {
    const state = this.player.stateManager.currentState.state
    return this.defaultSprites[state]
  }

  onSetState(state: string) {
    this.defaultSprites[state].enter()
  }

  setSprite(state: string) {}

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    const state = this.player.stateManager.currentState.state
    this.defaultSprites[state].draw(ctx, deltaTime)
  }
}

export default EnemySpriteManager
