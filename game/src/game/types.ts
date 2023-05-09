export interface Sprite {
  width: number
  height: number
  frames: number
  asset: string
  img?: HTMLImageElement
}

export type Direction = 'left' | 'right'
