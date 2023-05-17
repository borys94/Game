import type InputHandler from './inputHandler'
import type Player from './characters/player'

function drawText (ctx: CanvasRenderingContext2D, message: string, x: number, y: number): void {
  ctx.font = '9px Helvetica'
  ctx.fillText(message, x, y)
}

export function drawDebugInfo (
  ctx: CanvasRenderingContext2D,
  player: Player,
  inputHandler: InputHandler
): void {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 100, 60)
  ctx.fillStyle = 'black'
  drawText(ctx, `Last key: ${inputHandler.lastKey ?? 'none'}`, 10, 10)
  drawText(ctx, `State: ${player.currentState.state}`, 10, 20)
  drawText(ctx, `Player x, y: ${player.x} ${player.y}`, 10, 30)
  drawText(ctx, `cards: ${player.cards}`, 10, 40)
  drawText(
    ctx,
    `map: ${player.game.map.images[0].length} x ${player.game.map.images.length}`,
    10,
    50
  )
}
