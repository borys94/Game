import tiles, { type TileType } from '../tiles'

export interface AssetType {
  img: HTMLImageElement
  width: number
  height: number
  frames: number
  type?: TileType
  id: number
}

class Assets {
  assets: AssetType[] = []

  loadedAssets = 0
  loaded = false

  constructor () {
    this.loadAllAssets()
  }

  isLoaded = (): boolean => this.loaded

  getAssetCount = (): number => tiles.filter((tile) => tile).length

  loadAllAssets (): void {
    const allTiles = this.getAssetCount()

    tiles.forEach((tile, index) => {
      if (tile == null) return
      const img = new Image()
      img.src = tile.asset
      this.assets[tile.id] = {
        img,
        id: tile.id,
        width: tile.width,
        height: tile.height,
        frames: tile.frames,
        type: tile.type
      }
      img.onload = () => {
        this.loadedAssets++
        if (this.loadedAssets === allTiles) {
          this.loaded = true
        }
      }
      img.onerror = () => {
        console.error('error during loading')
      }
    })
  }

  getById = (id?: number): AssetType | null => (id ? this.assets[id] : null)
}

export default Assets
