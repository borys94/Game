import type Element from './Element'
import { TILE_SIZE } from '../config'
import type Game from '..'
import type Enemy from '../characters/enemy'
import { buildEnemy } from '../characters/buildEnemy'
import { MapType } from '../mapStore'
import Elements from './elements'
import Background from './background'

class Map {
  background: Background
  elements: Elements
  enemies: Array<Enemy> = []

  // eslint-disable-next-line
  constructor(private readonly game: Game, public map: MapType) {
    this.elements = new Elements(game, map)
    this.background = new Background(game)

    this.update = this.update.bind(this)

    this.loadEnemies()
  }

  get width(): number {
    return this.elements.tiles[0].length * TILE_SIZE
  }

  get height(): number {
    return this.elements.tiles.length * TILE_SIZE
  }

  private loadEnemies(): void {
    for (const enemy of this.map.enemies) {
      this.enemies.push(buildEnemy(this.game, enemy))
    }
  }

  hasElementToCollect = (x: number, y: number): boolean => {
    return !!this.elements.interactive[Math.floor(x / TILE_SIZE)][Math.floor(y / TILE_SIZE)]
  }

  getElement = (x: number, y: number): Element | null => {
    return this.elements.getElement(x, y)
  }

  hasObstacle(x: number, y: number): boolean {
    if (y < 0 || y % TILE_SIZE === 0 || x % TILE_SIZE === 0) return false
    return !!this.elements.tiles[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)]
  }

  update() {
    for (const enemy of this.enemies) enemy.update()
  }

  draw = (deltaTime: number): void => {
    this.background.draw(this.game.ctx)
    this.elements.draw(deltaTime)
    for (const enemy of this.enemies) enemy.draw(deltaTime)
  }
}

export default Map
