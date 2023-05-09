import React, { useEffect, useState } from 'react'
import Editor from '../lib/editor'
import tileList from '../game/tiles'
import { type Sprite } from '../game/types'
import styles from './Editor.module.scss'
// import config from '../game/config'

// const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
// const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

type DrawingType = 'tiles' | 'bgTiles' | 'interactive'

let ed: Editor | undefined

function EditorComponent (): React.ReactElement {
  const [editor, setEditor] = useState<Editor>()
  const [drawingType, setDrawingType] = useState<DrawingType>('tiles')
  const [activeTile, setActiveTile] = useState<Sprite & { id: number }>()

  useEffect(() => {
    if (!ed) {
      ed = new Editor();
      (window as any).ed = ed
      setEditor(ed)
    }
  }, [])

  // const fillTile = (i: number, j: number): void => {
  //   editor?.fillFgTile(i, j)
  // }

  // const fillBgTile = (i: number, j: number): void => {
  //   editor?.fillBgTile(i, j)
  // }

  // const fillInteractive = (i: number, j: number): void => {
  //   editor?.fillInteractiveTile(i, j)
  // }

  const save = (): void => {
    console.log(
      JSON.stringify({
        tiles: editor?.map.images,
        bgTiles: editor?.map.bgImages,
        interactive: editor?.map.elements.map(el => el.map(e => e.asset?.id ?? 0))
      })
    )
    console.log(editor)
  }

  const onLayerChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value)
    setDrawingType(e.target.value as any)
    editor?.setLayer(e.target.value as any)
  }

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <canvas id="canvas" />
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
                  editor?.setCurrentAsset(editor.assets.getById(tileList[+tile].id))
                }}
              />
            </div>
          ))}
          <div
            onClick={() => {
              setActiveTile(undefined)
              editor?.setCurrentAsset(null)
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

        <select onChange={onLayerChange} value={drawingType}>
          <option value="tiles">fg</option>
          <option value="bgTiles">bg</option>
          <option value="interactive">interactive</option>
        </select>

      </div>
    </div>
  )
}

export default EditorComponent
