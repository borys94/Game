import styles from './EnemyTile.module.scss'
import { type EnemyObject } from '../../game/characters/enemy'
import Tile from './Tile'
import Editor from '../../lib/editor'
import { useEffect, useState } from 'react'

const enemies: EnemyObject['type'][] = ['dog1', 'dog2', 'rat1', 'rat2', 'cat1', 'cat2', 'bird1', 'bird2']
interface EnemyTilesProps {
  enemy: EnemyObject['type'] | null
  setEnemy: (enemy: EnemyObject['type']) => void
  editor: Editor
}

const EnemyTiles = ({ setEnemy, editor }: EnemyTilesProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // TODO: ogarnac to
    setTimeout(() => setShow(true), 500)
  }, [])

  const img = editor.assetLoader.getImage('enemies')
  if (!img || !show) {
    return null
  }
  return (
    <div className={styles.container}>
      {enemies.map((enemy) => {
        const frame = editor.assetLoader.getByName(`${enemy}-idle`)!
        return <Tile img={img} frame={frame} key={enemy} onSelect={() => setEnemy(enemy)} />
      })}
    </div>
  )
}

export default EnemyTiles
