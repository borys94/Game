import type Map from './map'
import type Player from './characters/player'
import config from './config'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Camera {
  x = 0
  y = 0

  constructor(private readonly player: Player, private readonly map: Map) {}

  update(): void {
    this.x = this.player.x > CANVAS_WIDTH / 2 ? this.player.x - CANVAS_WIDTH / 2 : 0
    this.y = this.player.y > CANVAS_HEIGHT / 2 ? this.player.y - CANVAS_HEIGHT / 2 : 0

    if (this.player.x > this.map.width - CANVAS_WIDTH / 2) {
      this.x = this.map.width - CANVAS_WIDTH
    }
    if (this.player.y > this.map.height - CANVAS_HEIGHT / 2) {
      this.y = this.map.height - CANVAS_HEIGHT
    }
  }
}

export default Camera