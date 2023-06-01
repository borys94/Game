import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from './config'
import Game from '.'
import { clamp } from './utils'

class Camera {
  x = 0
  y = 0

  constructor(private readonly game: Game) {}

  update(): void {
    const { map, player } = this.game
    this.x = Math.floor(clamp(player.x - CANVAS_WIDTH / 2, 0, map.width - CANVAS_WIDTH))
    this.y = Math.floor(clamp(player.y - CANVAS_HEIGHT / 2, 0, map.height - CANVAS_HEIGHT))
  }

  getVisibleArea() {
    return [
      Math.floor(this.x / TILE_SIZE),
      Math.floor(this.y / TILE_SIZE),
      Math.ceil(CANVAS_WIDTH / TILE_SIZE) + 1,
      Math.ceil(CANVAS_HEIGHT / TILE_SIZE) + 1
    ] as const
  }
}

export default Camera
