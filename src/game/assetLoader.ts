import mapConfig from './config/map.json'
import heroesConfig from './config/heroes.json'
import enemiesConfig from './config/enemies.json'
import gunsConfig from './config/gunPack.json'

export type AssetFrameDetail = {
  id?: number
  name: string
  frame: {
    x: number
    y: number
    w: number
    h: number
  }
  frames?: number
  extra?: {
    interactiveType?: string
    type?: string
    gunLevel?: number
  }
}

class AssetLoader {
  private assets: Record<string, Assets> = {}

  async load() {
    this.assets = {
      heroes: new Assets('heroes', heroesConfig.frames),
      gunPack: new Assets('gunPack', gunsConfig.frames),
      enemies: new Assets('enemies', enemiesConfig.frames),
      map: new Assets('map', mapConfig.frames)
    }
  }

  isLoaded() {
    return (
      this.assets.heroes.loaded && this.assets.gunPack.loaded && this.assets.enemies.loaded && this.assets.map.loaded
    )
  }

  getByName(id: string): AssetFrameDetail | undefined {
    return (
      this.assets.heroes?.getByName(id) ||
      this.assets.gunPack?.getByName(id) ||
      this.assets.enemies?.getByName(id) ||
      this.assets.map?.getByName(id)
    )
  }

  getById(id: number): AssetFrameDetail | undefined {
    return (
      this.assets.heroes?.getById(id) ||
      this.assets.gunPack?.getById(id) ||
      this.assets.enemies?.getById(id) ||
      this.assets.map?.getById(id)
    )
  }

  getImage(assetPack: string): HTMLImageElement | undefined {
    return this.assets[assetPack].img
  }
}

export default AssetLoader

class Assets {
  public map: Record<string, AssetFrameDetail> = {}
  public sortedById: Record<string, AssetFrameDetail> = {}
  public img?: HTMLImageElement
  public loaded = false

  constructor(private name: string, public details: AssetFrameDetail[]) {
    this.load()
  }

  getByName(id: string): AssetFrameDetail | undefined {
    return this.map[id]
  }

  getById(id: number): AssetFrameDetail | undefined {
    return this.sortedById[id]
  }

  async load() {
    await this.loadDetails()
    this.img = new Image()
    this.img.src = `newAssets/${this.name}.png`

    if (this.img.complete) {
      this.loaded = true
    }

    this.img.onload = () => {
      this.loaded = true
    }

    this.img.onerror = () => {
      console.error(`Error during img loading`)
    }
  }

  async loadDetails() {
    for (let detail of this.details) {
      this.map[detail.name] = detail
      if (detail.id) {
        this.sortedById[detail.id] = detail
      }
    }
  }
}
