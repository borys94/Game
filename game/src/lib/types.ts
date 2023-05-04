export interface Sprite {
  width: number
  height: number
  frames: number
  asset: string
  img?: HTMLImageElement
  hill?: true
}

export type Direction = 'left' | 'right'
