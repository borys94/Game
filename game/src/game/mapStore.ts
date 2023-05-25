import { EnemyObject } from '../game/characters/enemy'

export type MapType = {
  tiles: number[][]
  bgTiles: number[][]
  decorations: number[][]
  interactive: number[][]
  enemies: EnemyObject[]
}

export type MapDetails = {
  name: string
  map: MapType
}

class MapStore {
  maps: MapDetails[] = []

  constructor() {
    const maps = JSON.parse(localStorage.getItem('maps') ?? '[]') as MapDetails[]
    this.maps = maps
  }

  getMapByName(name: string) {
    return this.maps.find((details) => details.name === name)
  }

  getMaps() {
    return this.maps
  }

  addMap(name: string, map: MapType): MapDetails[] {
    this.maps = [...this.maps.filter((map) => map.name !== name), { name, map }]

    localStorage.setItem('maps', JSON.stringify(this.maps))
    return this.maps
  }

  deleteMap(name: string): MapDetails[] {
    this.maps = this.maps.filter((map) => map.name !== name)

    localStorage.setItem('maps', JSON.stringify(this.maps))
    return this.maps
  }
}

export default new MapStore()
