import Game from '../../game'
import { type AssetType } from '../../game/assets'
import { type EnemyObject } from '../../game/characters/enemy'
import { buildEnemy } from '../../game/characters/buildEnemy'
import config from '../../game/config'
import { drawDebugInfo } from '../../game/debug'
import { buildElement } from '../../game/Element'
import { clamp } from '../../game/utils'
import easyMap from '../../maps/easy'
import mediumMap from '../../maps/medium'

const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

type Layer = 'tiles' | 'bgTiles' | 'interactive' | 'decorations'

interface MapType {
  tiles: number[][]
  bgTiles: number[][]
  interactive: number[][]
}

class Editor extends Game {
  currentAsset: AssetType | null = null
  currentAssetId = 0

  layer: Layer = 'tiles'
  activeEnemyType: EnemyObject['type'] | null = null

  hoverX = 0
  hoverY = 0

  constructor () {
    super()

    this.camera.update = () => {}
    // this.map.enemies = []
    const rect = this.canvas.getBoundingClientRect()

    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      this.hoverX = e.clientX - rect.left
      this.hoverY = e.clientY - rect.top
    })

    // this.onMouseDown.bind(this)
    this.canvas.addEventListener('mousedown', this.onMouseDown)

    this.canvas.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault()
        this.camera.x = clamp(this.camera.x + e.deltaX, 0, this.map.width - this.canvas.width)
        this.camera.y = clamp(this.camera.y + e.deltaY, 0, this.map.height - this.canvas.height)
      },
      { passive: false }
    )
  }

  onMouseDown = (): void => {
    if (this.activeEnemyType) {
      this.addEnemy(this.activeEnemyType)
      return
    }

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

  update () {

  }

  draw (timestamp: number): void {
    // super.draw(timestamp)

    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    this.background.draw(this.ctx)
    this.map.draw(deltaTime)

    if (!!this.currentAsset || !!this.activeEnemyType) {
      this.ctx.beginPath()
      this.ctx.rect(
        Math.floor((this.hoverX + this.camera.x) / 32) * 32 - this.camera.x,
        Math.floor((this.hoverY + this.camera.y) / 32) * 32 - this.camera.y,
        32,
        32
        // Math.ceil(this.currentAsset.width / 32) * 32,
        // Math.ceil(this.currentAsset.height / 32) * 32
      )
      this.ctx.strokeStyle = 'rgb(0, 255, 0)'
      this.ctx.fillStyle = 'rgba(0,255,0,0.5)'
      this.ctx.fill()
      this.ctx.stroke()
    }

    if (this.currentAsset != null) {
      this.ctx.drawImage(
        this.currentAsset.img,
        0,
        0,
        this.currentAsset.width,
        this.currentAsset.height,
        Math.floor((this.hoverX + this.camera.x) / 32) * 32 - this.camera.x,
        Math.floor((this.hoverY + this.camera.y) / 32) * 32 -
          this.camera.y +
          32 -
          this.currentAsset.height,
        this.currentAsset.width,
        this.currentAsset.height
      )
    }

    drawDebugInfo(this.ctx, this.player, this.inputHandler)
  }

  setCurrentAsset = (asset: AssetType | null): void => {
    console.log(asset)
    this.currentAsset = asset
  }

  fillFgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset != null) {
      this.map.images[b][a] = this.currentAsset.id
    } else {
      this.map.images[b][a] = 0
    }
  }

  fillBgTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    if (this.currentAsset != null) {
      this.map.bgImages[b][a] = this.currentAsset.id
    } else {
      this.map.bgImages[b][a] = 0
    }
  }

  fillDecorationTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    this.map.decorationElements[b][a] = buildElement(this, this.currentAsset?.id ?? 0, b, a)
  }

  fillInteractiveTile = (): void => {
    const a = Math.floor((this.hoverX + this.camera.x) / 32)
    const b = Math.floor((this.hoverY + this.camera.y) / 32)
    this.map.elements[b][a] = buildElement(this, this.currentAsset?.id ?? 0, b, a)
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
    // enemy.setState(enemy.states.standing)
    this.map.enemies.push(enemy)
  }

  setEnemy = (type: EnemyObject['type']) => {
    this.currentAsset = null
    this.activeEnemyType = type
  }

  setLayer (layer: Layer): void {
    this.activeEnemyType = null
    this.layer = layer
  }

  clearMap (): void {
    for (let i = 0; i < this.map.interactive.length; i++) {
      for (let j = 0; j < this.map.interactive[0].length; j++) {
        this.map.elements[i][j] = buildElement(this, 0, i, j)
        this.map.bgImages[i][j] = 0
        this.map.interactive[i][j] = 0
        this.map.images[i][j] = 0
        this.map.decorations[i][j] = 0
      }
    }
  }

  setColumns (columns: number): void {
    const diff = columns - this.map.interactive[0].length
    // console.log(columns, this.map.interactive.length)

    if (diff < 0) {
      for (let i = 0; i < this.map.interactive.length; i++) {
        this.map.elements[i] = this.map.elements[i].slice(0, diff)
        this.map.bgImages[i] = this.map.bgImages[i].slice(0, diff)
        this.map.interactive[i] = this.map.interactive[i].slice(0, diff)
        this.map.images[i] = this.map.images[i].slice(0, diff)
        this.map.decorations[i] = this.map.decorations[i].slice(0, diff)
      }
    }

    for (let i = 0; i < this.map.interactive.length; i++) {
      for (let j = 0; j < diff; j++) {
        const x = this.map.interactive[0].length + j - 1
        this.map.elements[i].push(buildElement(this, 0, i, x))
        this.map.bgImages[i].push(0)
        this.map.interactive[i].push(0)
        this.map.images[i].push(0)
        this.map.decorations[i].push(0)
      }
    }
  }

  setRows (rows: number): void {
    const diff = rows - this.map.interactive.length

    if (diff < 0) {
      this.map.elements = this.map.elements.slice(0, diff)
      this.map.bgImages = this.map.bgImages.slice(0, diff)
      this.map.interactive = this.map.interactive.slice(0, diff)
      this.map.images = this.map.images.slice(0, diff)
      this.map.decorations = this.map.decorations.slice(0, diff)
    }

    for (let i = 0; i < diff; i++) {
      const size = this.map.interactive.length
      const row = i + this.map.interactive.length
      this.map.elements[row] = []
      this.map.bgImages[row] = new Array(size).fill(0)
      this.map.interactive[row] = new Array(size).fill(0)
      this.map.images[row] = new Array(size).fill(0)
      this.map.decorations[row] = new Array(size).fill(0)

      for (let j = 0; j < this.map.interactive[0].length; j++) {
        this.map.elements[row][j] = buildElement(this, 0, i, j)
      }
    }
  }
}

export default Editor
