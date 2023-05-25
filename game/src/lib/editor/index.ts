import Game from '../../game'
import { type AssetType } from '../../game/assets'
import { type EnemyObject } from '../../game/characters/enemy'
import { buildEnemy } from '../../game/characters/buildEnemy'
import config from '../../game/config'
import { drawDebugInfo } from '../../game/debug'
import { buildElement } from '../../game/map/Element'
import { clamp } from '../../game/utils'
import easyMap from '../../maps/easy'
import mediumMap from '../../maps/medium'
import { AssetFrameDetail } from '../../game/assetLoader'

const CANVAS_WIDTH = config.CANVAS_WIDTH
const CANVAS_HEIGHT = config.CANVAS_HEIGHT

type Layer = 'tiles' | 'bgTiles' | 'interactive' | 'decorations'

interface MapType {
  tiles: number[][]
  bgTiles: number[][]
  interactive: number[][]
}

class Editor extends Game {
  currentAsset: AssetFrameDetail | null = null
  assetPack: 'map' | 'guns' = 'map'

  layer: Layer = 'tiles'
  activeEnemyType: EnemyObject['type'] | null = null

  hoverX = 0
  hoverY = 0

  rect: DOMRect

  constructor() {
    super()

    this.camera.update = () => {}
    this.rect = this.canvas.getBoundingClientRect()

    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.hoverX = (e.clientX - this.rect.left) / this.scale
      this.hoverY = (e.clientY - this.rect.top) / this.scale
    })

    this.canvas.addEventListener('mousedown', this.onMouseDown)

    this.canvas.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault()
        this.camera.x = clamp(this.camera.x + e.deltaX, 0, this.map.width - this.canvas.width / this.scale)
        this.camera.y = clamp(this.camera.y + e.deltaY, 0, this.map.height - this.canvas.height / this.scale)
      },
      { passive: false }
    )

    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  onResize = () => {
    this.rect = this.canvas.getBoundingClientRect()

    const scale = Math.min((window.innerWidth - 400) / CANVAS_WIDTH, window.innerHeight / CANVAS_HEIGHT)
    this.scale = scale // Math.max(Math.floor(scale), 1)
    this.canvas.width = CANVAS_WIDTH * scale
    this.canvas.height = CANVAS_HEIGHT * scale
  }

  onMouseDown = (): void => {
    if (this.activeEnemyType) {
      this.addEnemy(this.activeEnemyType)
      return
    }

    console.log(this.layer)
    if (this.layer === 'tiles') this.fillFgTile()
    if (this.layer === 'bgTiles') this.fillBgTile()
    if (this.layer === 'interactive') this.fillInteractiveTile()
    if (this.layer === 'decorations') this.fillDecorationTile()
  }

  loadMap = (value: string): MapType => {
    if (value === 'easy') {
      return easyMap
    } else if (value === 'medium') {
      return mediumMap
    }
    return easyMap
  }

  update() {}

  draw(timestamp: number): void {
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    this.ctx.imageSmoothingEnabled = false
    this.ctx.save()
    this.ctx.scale(this.scale, this.scale)
    this.map.draw(deltaTime)

    if (!!this.currentAsset || !!this.activeEnemyType) {
      this.ctx.beginPath()
      this.ctx.rect(
        Math.floor((this.hoverX + this.camera.x) / 32) * 32 - this.camera.x,
        Math.floor((this.hoverY + this.camera.y) / 32) * 32 - this.camera.y,
        32,
        32
      )
      this.ctx.strokeStyle = 'rgb(0, 255, 0)'
      this.ctx.fillStyle = 'rgba(0,255,0,0.5)'
      this.ctx.fill()
      this.ctx.stroke()
    }

    if (this.currentAsset != null) {
      const img = this.assetPack === 'map' ? this.assetLoader.getImage('map') : this.assetLoader.getImage('gunPack')

      this.ctx.drawImage(
        img!,
        this.currentAsset.frame.x,
        this.currentAsset.frame.y,
        this.currentAsset.frame.w / (this.currentAsset.frames ?? 1),
        this.currentAsset.frame.h,
        Math.floor((this.hoverX + this.camera.x) / 32) * 32 - this.camera.x,
        Math.floor((this.hoverY + this.camera.y) / 32) * 32 - this.camera.y + 32 - this.currentAsset.frame.h,
        this.currentAsset.frame.w / (this.currentAsset.frames ?? 1),
        this.currentAsset.frame.h
      )
    }

    this.ctx.restore()

    // drawDebugInfo(this.ctx, this.player, this.inputHandler)
  }

  setCurrentAsset = (asset: AssetFrameDetail | null): void => {
    console.log(asset)
    this.currentAsset = asset
  }

  fillFgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset != null) {
      this.map.elements.tiles[b][a] = this.currentAsset.id ?? 0
    } else {
      this.map.elements.tiles[b][a] = 0
    }
  }

  fillBgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset != null) {
      console.log(a, b, this.currentAsset.id)
      this.map.elements.bgTiles[b][a] = this.currentAsset.id ?? 0
    } else {
      this.map.elements.bgTiles[b][a] = 0
    }
  }

  fillDecorationTile = async () => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    this.map.elements.decorationElements[b][a] = await buildElement(this, this.currentAsset?.id ?? 0, b, a)
  }

  fillInteractiveTile = async () => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    this.map.elements.elements[b][a] = await buildElement(this, this.currentAsset?.id ?? 0, b, a)
  }

  addEnemy = (type: EnemyObject['type']): void => {
    const x = Math.floor((this.hoverX + this.camera.x) / 32) * 32
    const y = Math.floor((this.hoverY + this.camera.y) / 32) * 32
    const enemyObj = {
      type,
      x,
      y
    }
    const enemy = buildEnemy(this, enemyObj)
    enemy.y -= enemy.height - 32
    this.map.enemies.push(enemy)
  }

  setEnemy = (type: EnemyObject['type']) => {
    this.currentAsset = null
    this.activeEnemyType = type
  }

  setLayer(layer: Layer): void {
    this.activeEnemyType = null
    this.layer = layer
  }

  async clearMap() {
    for (let i = 0; i < this.map.elements.interactive.length; i++) {
      for (let j = 0; j < this.map.elements.interactive[0].length; j++) {
        this.map.elements.elements[i][j] = buildElement(this, 0, i, j)
        this.map.elements.decorationElements[i][j] = buildElement(this, 0, i, j)
        this.map.elements.bgTiles[i][j] = 0
        this.map.elements.interactive[i][j] = 0
        this.map.elements.tiles[i][j] = 0
        this.map.elements.decorations[i][j] = 0
      }
    }
    this.map.enemies = []
  }

  async setColumns(columns: number) {
    const diff = columns - this.map.elements.interactive[0].length

    if (diff < 0) {
      for (let i = 0; i < this.map.elements.interactive.length; i++) {
        this.map.elements.elements[i] = this.map.elements.elements[i].slice(0, diff)
        this.map.elements.decorationElements[i] = this.map.elements.decorationElements[i].slice(0, diff)
        this.map.elements.bgTiles[i] = this.map.elements.bgTiles[i].slice(0, diff)
        this.map.elements.interactive[i] = this.map.elements.interactive[i].slice(0, diff)
        this.map.elements.tiles[i] = this.map.elements.tiles[i].slice(0, diff)
        this.map.elements.decorations[i] = this.map.elements.decorations[i].slice(0, diff)
      }
    }

    for (let i = 0; i < this.map.elements.interactive.length; i++) {
      for (let j = 0; j < diff; j++) {
        const x = this.map.elements.interactive[0].length + j - 1
        this.map.elements.elements[i].push(buildElement(this, 0, i, x))
        this.map.elements.decorationElements[i].push(await buildElement(this, 0, i, x))
        this.map.elements.bgTiles[i].push(0)
        this.map.elements.interactive[i].push(0)
        this.map.elements.tiles[i].push(0)
        this.map.elements.decorations[i].push(0)
      }
    }
  }

  async setRows(rows: number) {
    const diff = rows - this.map.elements.interactive.length

    if (diff < 0) {
      this.map.elements.elements = this.map.elements.elements.slice(0, diff)
      this.map.elements.decorationElements = this.map.elements.decorationElements.slice(0, diff)
      this.map.elements.bgTiles = this.map.elements.bgTiles.slice(0, diff)
      this.map.elements.interactive = this.map.elements.interactive.slice(0, diff)
      this.map.elements.tiles = this.map.elements.tiles.slice(0, diff)
      this.map.elements.decorations = this.map.elements.decorations.slice(0, diff)
    }

    for (let i = 0; i < diff; i++) {
      const size = this.map.elements.interactive.length
      const row = i + this.map.elements.interactive.length
      this.map.elements.elements[row] = []
      this.map.elements.decorationElements[row] = []
      this.map.elements.bgTiles[row] = new Array(size).fill(0)
      this.map.elements.interactive[row] = new Array(size).fill(0)
      this.map.elements.tiles[row] = new Array(size).fill(0)
      this.map.elements.decorations[row] = new Array(size).fill(0)

      for (let j = 0; j < this.map.elements.interactive[0].length; j++) {
        this.map.elements.elements[row][j] = buildElement(this, 0, i, j)
        this.map.elements.decorationElements[row][j] = await buildElement(this, 0, i, j)
      }
    }
  }
}

export default Editor
