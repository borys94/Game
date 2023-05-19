export function drawText (
  ctx: CanvasRenderingContext2D,
  message: string,
  x: number,
  y: number
): void {
  ctx.font = '9px Helvetica'
  ctx.fillText(message, x, y)
}

export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max)
