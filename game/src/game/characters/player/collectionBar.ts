import { AssetFrameDetail } from '../../assetLoader'
import { CANVAS_WIDTH } from '../../config'
import Player from './player'

class PlayerCollectionBar {
  constructor(private player: Player) {}

  draw() {
    const { game } = this.player
    const { ctx } = game

    const cardAsset = game.assetLoader.getByName('interactive-Card')
    const moneyAsset = game.assetLoader.getByName('interactive-Money')
    const img = game.assetLoader.getImage('map')

    if (!img || !cardAsset || !moneyAsset) {
      console.log('no card')
      return
    }
    ctx.fillStyle = 'white'
    drawText(ctx, `Level: ${this.player.game.level}`, CANVAS_WIDTH - 120, 10 + 18)

    this.drawAsset(cardAsset, this.player.cards, 30)
    this.drawAsset(moneyAsset, this.player.money, 50)
  }

  drawAsset(frameDetail: AssetFrameDetail, value: number, positionY: number) {
    const img = this.player.game.assetLoader.getImage('map')
    const { ctx } = this.player.game
    const { x, y, w, h } = frameDetail.frame
    const frames = frameDetail.frames ?? 1

    if (!img) {
      return
    }
    drawText(ctx, value.toString(), CANVAS_WIDTH - 90, positionY + 18)
    ctx.drawImage(img, x, y, w / frames, h, CANVAS_WIDTH - 120, positionY, w / frames, h)
  }
}

export default PlayerCollectionBar

function drawText(ctx: CanvasRenderingContext2D, message: string, x: number, y: number): void {
  ctx.font = '18px "Cyberpunk Is Not Dead"'
  ctx.fillText(message, x, y)
}
