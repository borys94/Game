import Sprite from './sprite'

abstract class SpriteManager {
  abstract getCurrentFrame(): number
  abstract getCurrentSprite(): Sprite
  abstract setSprite(state: string): void
  abstract draw(ctx: CanvasRenderingContext2D, deltaTime: number): void

  onSetState(state: string) {}
}

export default SpriteManager
