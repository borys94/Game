import Character from '../characters/character'
import SpriteClass from './sprite'

abstract class SpriteManager {
  sprites: Record<string, SpriteClass>
  currentSprite: SpriteClass

  constructor(public player: Character, sprites: Record<string, SpriteClass>) {
    this.sprites = sprites
    this.currentSprite = this.sprites.standing
  }

  setSprite = (state: string): void => {
    this.currentSprite.leave()
    this.currentSprite = this.sprites[state]
    this.currentSprite.enter()
  }
}

export default SpriteManager
