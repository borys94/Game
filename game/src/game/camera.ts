import Map from "./map"
import Player from "./player"
import config from './config'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

class Camera {
  x: number = 0
  y: number = 0

  constructor(private player: Player, private map: Map) {

  }

  update() {
    this.x = this.player.x > CANVAS_WIDTH/2 ? this.player.x - CANVAS_WIDTH/2 : 0
    this.y = this.player.y > CANVAS_HEIGHT/2 ? this.player.y - CANVAS_HEIGHT/2 : 0

    if (this.player.x > this.map.width - CANVAS_WIDTH/2) {
      this.x = this.map.width - CANVAS_WIDTH
    }
    if (this.player.y > this.map.height - CANVAS_HEIGHT/2) {
      this.y = this.map.height - CANVAS_HEIGHT
    }
  }
}

export default Camera