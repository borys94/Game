import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from './config'
import Game from '.'

class Camera {
  x = 0
  y = 0

  constructor(private readonly game: Game) {}

  update(): void {
    const { map, player } = this.game
    this.x = player.x > CANVAS_WIDTH / 2 ? player.x - CANVAS_WIDTH / 2 : 0
    this.y = player.y > CANVAS_HEIGHT / 2 ? player.y - CANVAS_HEIGHT / 2 : 0

    if (player.x > map.width - CANVAS_WIDTH / 2) {
      this.x = map.width - CANVAS_WIDTH
    }
    if (player.y > map.height - CANVAS_HEIGHT / 2) {
      this.y = map.height - CANVAS_HEIGHT
    }
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
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
