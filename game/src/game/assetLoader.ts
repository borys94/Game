export type AssetFrameDetail = {
  id: string
  frame: {
    x: number
    y: number
    w: number
    h: number
  }
  frames: number
}

class AssetLoader {
  heroes?: Assets
  enemies?: Assets
  gunPack?: Assets

  assets: Record<string, Assets> = {}

  async load() {
    this.assets = {
      heroes: new Assets('heroes'),
      gunPack: new Assets('gunPack'),
      enemies: new Assets('enemies')
    }
  }

  getById(id: string): AssetFrameDetail | undefined {
    return this.assets.heroes?.getById(id) || this.assets.gunPack?.getById(id) || this.assets.enemies?.getById(id)
  }

  getImage(assetPack: string): HTMLImageElement | undefined {
    return this.assets[assetPack].img
  }
}

export default AssetLoader

class Assets {
  public map: Record<string, AssetFrameDetail> = {}
  public details!: AssetFrameDetail[]
  public img?: HTMLImageElement
  public loaded = false

  constructor(private name: string) {
    this.load()
  }

  getById(id: string): AssetFrameDetail | undefined {
    return this.map[id]
  }

  async load() {
    await this.loadDetails()
    this.img = new Image()
    this.img.src = `newAssets/${this.name}.png`

    this.img.onload = () => {
      this.loaded = true
      // TODO
      // store.dispatch(setLoadedAssets())
    }

    this.img.onerror = () => {
      console.error(`Error during img loading`)
    }
  }

  async loadDetails() {
    this.details = (await (await fetch(`newAssets/${this.name}.json`)).json()).frames as AssetFrameDetail[]
    for (let detail of this.details) {
      this.map[detail.id] = detail
    }
  }
}
