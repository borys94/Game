
import tiles, { type TileType } from './tiles'

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

  getAssetCount = (): number => tiles.filter(tile => tile).length

  loadAllAssets (): void {
    const allTiles = this.getAssetCount()

    for (const sprite of tiles) {
      if (!sprite) continue
      const img = new Image()
      img.src = sprite.asset
      this.assets[sprite.id] = {
        img,
        id: sprite.id,
        width: sprite.width,
        height: sprite.height,
        frames: sprite.frames,
        type: sprite.type
      }
      img.onload = () => {
        this.loadedAssets++
        if (this.loadedAssets === allTiles) {
          this.loaded = true
        }
      }
    }
  }

  getById = (id: number): AssetType => this.assets[id]
}

export default Assets
