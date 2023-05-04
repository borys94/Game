

// const INPUTS = ['PRESS_RIGHT', 'PRESS_LEFT', 'RELEASE_RIGHT', 'RELEASE_LEFT', 'PRESS_UP', 'RELEASE_UP'] as const
const INPUTS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'Digit1', 'Digit2', 'Digit3', 'Space', 'Digit4'] as const
export type InputType = typeof INPUTS[number]

class InputHandler {
  lastKey?: InputType
  activeKeys: InputType[] = []

  constructor() {
    window.addEventListener("keydown", (e) => {
      console.log(e.code)
      switch(e.code) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "Digit3":
        case "Digit2":
        case "Digit1":
        case "Space":
        case "Digit4":
          this.lastKey = e.code
          this.activeKeys.push(e.code)
          break
      }
    })

    window.addEventListener("keyup", (e) => {
      switch(e.code) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "Digit3":
        case "Digit2":
        case "Digit1":
        case "Space":
        case "Digit4":
          this.lastKey = e.code
          this.activeKeys = this.activeKeys.filter(key => key !== e.code)
          break
      }
    })
  }

  hasInput = (input: InputType) => this.activeKeys.includes(input)
}

export default InputHandler