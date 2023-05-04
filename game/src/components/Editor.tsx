import React, { useEffect, useState } from 'react'
import Editor from '../lib/editor'
import tileList from '../game/tiles'
import { type Sprite } from '../game/types'
import styles from './Editor.module.scss'

let editor: Editor

type DrawingType = 'tiles' | 'bgTiles' | 'interactive'

const empty = (): number[][] =>
  new Array(20).fill([]).map((x) => new Array(50).fill(0))

function EditorComponent (): React.ReactNode {
  const [map, setMap] = useState<string>()
  const [tiles, setTiles] = useState<number[][]>(empty())
  const [bgTiles, setBgTiles] = useState<number[][]>(empty())
  const [interactive, setInteractive] = useState<number[][]>(empty())
  const [drawingType, setDrawingType] = useState<DrawingType>('tiles')
  const [activeTile, setActiveTile] = useState<Sprite & { id: number }>()

  useEffect(() => {
    if (!editor) {
      editor = new Editor()
    }
  }, [])

  const fillTile = (i: number, j: number): void => {
    tiles[i][j] = activeTile?.id ?? 0
    setTiles([...tiles])
  }

  const fillBgTile = (i: number, j: number): void => {
    bgTiles[i][j] = activeTile?.id ?? 0
    setBgTiles([...bgTiles])
  }

  const fillInteractive = (i: number, j: number): void => {
    interactive[i][j] = activeTile?.id ?? 0
    setInteractive([...interactive])
  }

  const save = (): void => {
    console.log(
      JSON.stringify({
        tiles,
        bgTiles,
        interactive
      })
    )
  }

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (!e) {
      return
    }
    const value = e.target.value
    const map = editor.loadMap(value)
    setTiles([...map.tiles])
    setBgTiles([...map.bgTiles])
    setInteractive([...map.interactive])
    setMap(value)
  }

  const onLayerChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value)
    setDrawingType(e.target.value as any)
  }

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <div className={styles.tiles}>
          {bgTiles.map((row, i) =>
            row.map((tile, j) => (
              <div
                key={i * row.length + j}
                style={{
                  top: i * 32,
                  left: j * 32,
                  zIndex: drawingType === 'bgTiles' ? 2 : 1,
                  opacity: drawingType === 'bgTiles' ? 1 : 0.5
                }}
                className={styles.tile}
                onClick={() => {
                  fillBgTile(i, j)
                }}
              >
                <img
                  src={tileList[tile]?.asset}
                  alt={tileList[tile]?.asset}
                  width="100%"
                />
              </div>
            ))
          )}

          {tiles.map((row, i) =>
            row.map((tile, j) => (
              <div
                key={i * row.length + j}
                style={{
                  top: i * 32,
                  left: j * 32,
                  zIndex: drawingType === 'tiles' ? 2 : 1,
                  opacity: drawingType === 'tiles' ? 1 : 0.5
                }}
                className={styles.tile}
                onClick={() => {
                  fillTile(i, j)
                }}
              >
                <img
                  src={tileList[tile]?.asset}
                  alt={tileList[tile]?.asset}
                  width="100%"
                />
              </div>
            ))
          )}

          {interactive.map((row, i) =>
            row.map((tile, j) => (
              <div
                key={i * row.length + j}
                style={{
                  top: i * 32,
                  left: j * 32,
                  zIndex: drawingType === 'interactive' ? 2 : 1,
                  opacity: drawingType === 'interactive' ? 1 : 0.5
                }}
                className={styles.tile}
                onClick={() => {
                  fillInteractive(i, j)
                }}
              >
                <img
                  src={tileList[tile]?.asset}
                  alt={tileList[tile]?.asset}
                  width="100%"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className={styles.elements}>
          {Object.keys(tileList).map((tile) => (
            <div className={styles.imgContainer} key={tile}>
              <img
                src={tileList[+tile].asset}
                alt={tile}
                onClick={() => {
                  setActiveTile(tileList[+tile])
                }}
              />
            </div>
          ))}
          <div
            onClick={() => {
              setActiveTile(undefined)
            }}
          >
            empty
          </div>
        </div>
        <div className={styles.activeElement}>
          <img src={activeTile?.asset} alt={activeTile?.asset} width="100%" />
        </div>
        <h2>
          {drawingType === 'tiles' && 'main tiles'}
          {drawingType === 'bgTiles' && 'bg tiles'}
          {drawingType === 'interactive' && 'interactive'}
        </h2>
        <button onClick={save}>Save</button>

        <select onChange={onLayerChange} value={map}>
          <option value="tiles">fg</option>
          <option value="bgTiles">bg</option>
          <option value="interactive">interactive</option>
        </select>

        <select onChange={onChange} value={map}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="empty">Empty</option>
        </select>
      </div>
    </div>
  )
}

export default EditorComponent
