import easyMap from '../maps/medium'
import type Element from './Element'
import { buildElement } from './Element'
import { TILE_SIZE } from './config'
import type Game from '.'
import type Enemy from './characters/enemy'
import { buildEnemy } from './characters/buildEnemy'
import { AssetType } from './assets'

class Map {
  images: number[][]
  bgImages: number[][]
  decorations: number[][]
  interactive: number[][]

  decorationElements: Element[][] = []
  elements: Element[][] = []

  enemies: Array<Enemy> = []

  // eslint-disable-next-line
  constructor(private readonly game: Game) {
    this.images = easyMap.tiles
    this.bgImages = easyMap.bgTiles
    this.interactive = easyMap.interactive
    this.decorations = easyMap.decorations

    this.initInteractiveElements()

    this.update = this.update.bind(this)
  }

  get width(): number {
    return this.images[0].length * TILE_SIZE
  }

  get height(): number {
    return this.images.length * TILE_SIZE
  }

  loadEnemies(): void {
    for (const enemy of easyMap.enemies) {
      this.enemies.push(buildEnemy(this.game, enemy))
    }
  }

  initInteractiveElements(): void {
    for (let i = 0; i < this.interactive.length; i++) {
      for (let j = 0; j < this.interactive[0].length; j++) {
        if (!this.elements[i]) {
          this.elements[i] = []
        }
        if (!this.decorationElements[i]) {
          this.decorationElements[i] = []
        }

        this.decorationElements[i][j] = buildElement(this.game, this.decorations[i][j], i, j)
        this.elements[i][j] = buildElement(this.game, this.interactive[i][j], i, j)
      }
    }
  }

  hasElementToCollect = (x: number, y: number): boolean => {
    return !!this.interactive[Math.floor(x / TILE_SIZE)][Math.floor(y / TILE_SIZE)]
  }

  getElement = (x: number, y: number): Element | null => {
    const element = this.elements[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)]
    if (element.asset != null && element.active) {
      return element
    }
    return null
  }

  hasObstacle(x: number, y: number): boolean {
    if (y < 0 || y % TILE_SIZE === 0 || x % TILE_SIZE === 0) return false
    return !!this.images[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)]
  }

  draw = (deltaTime: number): void => {
    this.drawTiles(this.game.ctx, this.bgImages)
    this.drawTiles(this.game.ctx, this.images)
    this.drawElements(this.game.ctx, deltaTime)

    for (const enemy of this.enemies) {
      enemy.draw(deltaTime)
    }
  }

  update() {
    for (const enemy of this.enemies) {
      enemy.update()
    }
  }

  drawElements(ctx: CanvasRenderingContext2D, deltaTime: number): void {
    let [x, y, width, height] = this.game.camera.getVisibleArea()

    for (let i = Math.max(y - 3, 0); i < Math.min(y + height, this.decorationElements.length); i++) {
      for (let j = Math.max(x - 3, 0); j < Math.min(x + width, this.decorationElements[0].length); j++) {
        this.decorationElements[i][j].draw(ctx, deltaTime)
        this.elements[i][j].draw(ctx, deltaTime)
      }
    }
  }

  drawTiles(ctx: CanvasRenderingContext2D, tiles: number[][]): void {
    if (!this.game.assets.isLoaded()) {
      return
    }
    let [x, y, width, height] = this.game.camera.getVisibleArea()

    for (let i = y; i < Math.min(y + height, tiles.length); i++) {
      for (let j = x; j < Math.min(x + width, tiles[0].length); j++) {
        const asset = this.game.assets.getById(tiles[i][j])
        this.drawAsset(ctx, asset, i, j)
      }
    }
  }

  drawAsset(ctx: CanvasRenderingContext2D, asset: AssetType | null, i: number, j: number) {
    if (!asset) {
      return
    }
    const { img, width, height } = asset
    if (img) {
      ctx.drawImage(
        img,
        0,
        0,
        width,
        height,
        j * TILE_SIZE - this.game.camera.x,
        i * TILE_SIZE - this.game.camera.y + TILE_SIZE - height,
        TILE_SIZE,
        TILE_SIZE
      )
    }
  }
}

export default Map
