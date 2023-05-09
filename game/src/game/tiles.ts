import { type Sprite } from './types'

export type TileType = 'chest' | 'collectable' | 'trap'
type Tile = Sprite & { id: number, upHill?: true, downHill?: true, interactive?: true, type?: TileType }
const tiles: Tile[] = []

let i = 1
for (; i <= 64; i++) {
  tiles[i] = {
    id: i,
    width: 32,
    height: 32,
    frames: 1,
    asset: `assets/tiles/Tile_${(i).toString().padStart(2, '0')}.png`
  }
}

tiles[33].upHill = true
tiles[34].downHill = true

tiles[i] = {
  id: i,
  width: 24,
  height: 24,
  frames: 8,
  interactive: true,
  type: 'collectable',
  asset: 'assets/interactive/Card.png'
}

tiles[++i] = {
  id: i,
  width: 24,
  height: 24,
  frames: 6,
  interactive: true,
  type: 'collectable',
  asset: 'assets/interactive/Money.png'
}

tiles[++i] = {
  id: i,
  width: 32,
  height: 48,
  frames: 4,
  interactive: true,
  type: 'trap',
  asset: 'assets/interactive/Trap.png'
}

tiles[++i] = {
  id: i,
  width: 32,
  height: 32,
  frames: 4,
  interactive: true,
  type: 'chest',
  asset: 'assets/interactive/Chest.png'
}

i++
tiles[i] = {
  id: i,
  width: 64,
  height: 39,
  frames: 1,
  asset: 'assets/decorations/1.png'
}

i++
tiles[i] = {
  id: i,
  width: 73,
  height: 64,
  frames: 1,
  asset: 'assets/decorations/2.png'
}

i++
tiles[i] = {
  id: i,
  width: 61,
  height: 192,
  frames: 1,
  asset: 'assets/decorations/3.png'
}

i++
tiles[i] = {
  id: i,
  width: 69,
  height: 192,
  frames: 1,
  asset: 'assets/decorations/4.png'
}

export default tiles
