import React, { useEffect, useRef } from 'react'
import styles from './EnemyTile.module.scss'
import { type EnemyObject } from '../../game/characters/enemy'

interface TileEnemy {
  type: EnemyObject['type']
  width: number
  height: number
}

const enemies: TileEnemy[] = [
  {
    type: 'dog',
    width: 48,
    height: 48
  },
  {
    type: 'rat',
    width: 32,
    height: 32
  }
]
interface EnemyTilesProps {
  enemy: EnemyObject['type'] | null
  setEnemy: (enemy: EnemyObject['type']) => void
}

const EnemyTiles = ({ setEnemy }: EnemyTilesProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      {enemies.map((enemy) => {
        return <Tile enemy={enemy} key={enemy.type} onClick={() => setEnemy(enemy.type)} />
      })}
    </div>
  )
}

interface TileProps {
  enemy: TileEnemy
  onClick: () => void
}

const Tile = ({ enemy, onClick }: TileProps): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const img = new Image()
    img.src = `assets/enemies/${enemy.type}/idle.png`
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
      }
    }
  }, []) // eslint-disable-line

  return (
    <canvas onClick={onClick} className={styles.canvas} ref={canvasRef} width={enemy.width} height={enemy.height} />
  )
}

export default EnemyTiles
