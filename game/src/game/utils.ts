export function drawText(ctx: CanvasRenderingContext2D, message: string, x: number, y: number) {
  ctx.font = "9px Helvetica"
  ctx.fillText(message, x, y)
}