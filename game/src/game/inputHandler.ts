

// const INPUTS = ['PRESS_RIGHT', 'PRESS_LEFT', 'RELEASE_RIGHT', 'RELEASE_LEFT', 'PRESS_UP', 'RELEASE_UP'] as const
const INPUTS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', '1', '2', '3'] as const
export type InputType = typeof INPUTS[number]

class InputHandler {
  lastKey?: InputType
  activeKeys: InputType[] = []

  constructor() {
    window.addEventListener("keydown", (e) => {
      console.log(e.key)
      switch(e.key) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "3":
        case "2":
        case "1":
          this.lastKey = e.key
          this.activeKeys.push(e.key)
          break
      }
    })

    window.addEventListener("keyup", (e) => {
      switch(e.key) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "3":
        case "2":
        case "1":
          this.lastKey = e.key
          this.activeKeys = this.activeKeys.filter(key => key !== e.key)
          break
      }
    })
  }

  hasInput = (input: InputType) => this.activeKeys.includes(input)
}

export function drawText(ctx: CanvasRenderingContext2D, message: string) {
  ctx.font = "10px Helvetica"
  ctx.fillText("Input: " + message, 10, 10)
}

export default InputHandler