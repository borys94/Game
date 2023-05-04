
import tiles, { type TileType } from './tiles'

export interface AssetType {
  img: HTMLImageElement
  width: number
  height: number
  frames: number
  type?: TileType
}

class Assets {
  assets: AssetType[] = []

  loadedAssets = 0
  loaded = false

  constructor () {
    this.loadAllAssets()
  }

  isLoaded = () => this.loaded

  getAssetCount = () => tiles.filter(tile => tile).length

  loadAllAssets () {
    const allTiles = this.getAssetCount()

    for (const sprite of tiles) {
      if (!sprite) continue
      const img = new Image()
      img.src = sprite.asset
      this.assets[sprite.id] = {
        img,
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
    console.log(this.assets)
  }

  getById = (id: number) => this.assets[id]
}

export default Assets
