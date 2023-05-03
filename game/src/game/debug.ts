import InputHandler from "./inputHandler"
import Player from "./player"

function drawText(ctx: CanvasRenderingContext2D, message: string, x: number, y: number) {
  ctx.font = "9px Helvetica"
  ctx.fillText(message, x, y)
}

export function drawDebugInfo(ctx: CanvasRenderingContext2D, player: Player, inputHandler: InputHandler) {
  drawText(ctx, `Last key: ${inputHandler.lastKey}`, 10, 10)
  drawText(ctx, `State: ${player.currentState.state}`, 10, 20)
  drawText(ctx, `Player x, y: ${player.x} ${player.y}`, 10, 30)
}