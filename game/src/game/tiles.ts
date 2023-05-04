import { Sprite } from "./types"

export type TileType = 'chest' | 'collectable' | "trap"
type Tile = Sprite & {id: number, hill?: true, interactive?: true, type?: TileType}
let tiles: Tile[] = []

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

tiles[33].hill = true
tiles[34].hill = true

tiles[i] = {
  id: i,
  width: 24,
  height: 24,
  frames: 8,
  interactive: true,
  type: "collectable",
  asset: `assets/interactive/Card.png`
}

tiles[++i] = {
  id: i,
  width: 24,
  height: 24,
  frames: 6,
  interactive: true,
  type: "collectable",
  asset: `assets/interactive/Money.png`
}

tiles[++i] = {
  id: i,
  width: 32,
  height: 48,
  frames: 4,
  interactive: true,
  type: "trap",
  asset: `assets/interactive/Trap.png`
}

tiles[++i] = {
  id: i,
  width: 32,
  height: 32,
  frames: 4,
  interactive: true,
  type: "chest",
  asset: `assets/interactive/Chest.png`
}


export default tiles