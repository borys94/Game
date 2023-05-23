import type Map from './map'
import type Player from './characters/player'

class Camera {
  x = 0
  y = 0

  constructor(private readonly player: Player, private readonly map: Map) {}

  update(): void {
    const canvasWidth = this.player.game.canvas.width / this.player.game.scale
    const canvasHeight = this.player.game.canvas.height / this.player.game.scale
    this.x = this.player.x > canvasWidth / 2 ? this.player.x - canvasWidth / 2 : 0
    this.y = this.player.y > canvasHeight / 2 ? this.player.y - canvasHeight / 2 : 0

    if (this.player.x > this.map.width - canvasWidth / 2) {
      this.x = this.map.width - canvasWidth
    }
    if (this.player.y > this.map.height - canvasHeight / 2) {
      this.y = this.map.height - canvasHeight
    }
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
  }

  getVisibleArea() {
    const canvasWidth = this.player.game.canvas.width / this.player.game.scale
    const canvasHeight = this.player.game.canvas.height / this.player.game.scale

    return [
      Math.floor(this.x / 32),
      Math.floor(this.y / 32),
      Math.ceil(canvasWidth) + 1,
      Math.ceil(canvasHeight) + 1
    ] as const
  }
}

export default Camera
