import { type Sprite } from './types'

const tiles: Record<number, Sprite & { id: number, hill?: true }> = {}

for (let i = 1; i <= 64; i++) {
  tiles[i] = {
    id: i,
    width: 32,
    height: 32,
    frames: 1,
    asset: `assets/tiles/Tile_${i.toString().padStart(2, '0')}.png`
  }
}

tiles[33].hill = true
tiles[34].hill = true

export default tiles
