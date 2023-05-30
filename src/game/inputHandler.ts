const INPUTS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'Digit1', 'Digit2', 'Space', 'Enter'] as const
export type InputType = (typeof INPUTS)[number]

class InputHandler {
  lastKey?: InputType
  activeKeys: InputType[] = []

  constructor() {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Digit2':
        case 'Digit1':
        case 'Space':
        case 'Enter':
          this.lastKey = e.code
          this.activeKeys.push(e.code)
          break
      }
    })

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Digit2':
        case 'Digit1':
        case 'Space':
        case 'Enter':
          this.lastKey = e.code
          this.activeKeys = this.activeKeys.filter((key) => key !== e.code)
          break
      }
    })
  }

  hasInput = (input: InputType): boolean => this.activeKeys.includes(input)
}

export default InputHandler
