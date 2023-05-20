import React, { useEffect, useState } from 'react'
import Editor from '../../lib/editor'
import tileList, { type TileType, type Tile, type MapSet } from '../../tiles'
import styles from './Editor.module.scss'
// import { NativeSelect, InputNumber, Typography, Button } from 'tiny-ui'
import EnemyTiles from './EnemyTiles'
import { type EnemyObject } from '../../game/characters/enemy'
import { EditorButton } from '../common/EditorButton'
import Sounds from '../../game/sounds'
// import config from '../game/config'

// const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
// const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

let ed: Editor | undefined

function EditorComponent(): React.ReactElement {
  const [editor, setEditor] = useState<Editor>()
  const [mapSet, setMapSet] = useState<MapSet>('powerStation')
  const [activeTile, setActiveTile] = useState<Tile | null>()
  const [activeEnemy, setActiveEnemy] = useState<EnemyObject['type'] | null>(null)
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    if (ed != null) {
      return
    }
    ed = new Editor()
    ;(window as any).ed = ed
    setEditor(ed)
    setColumns(ed.map.images[0].length)
    setRows(ed.map.images.length)

    return () => {
      editor?.destroy()
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

  const save = async (): Promise<void> => {
    const map = JSON.stringify({
      tiles: editor?.map.images,
      decorations: editor?.map.decorationElements.map((el) => el.map((e) => e.asset?.id ?? 0)),
      bgTiles: editor?.map.bgImages,
      enemies: editor?.map.enemies.map((enemy) => ({
        type: enemy.type,
        x: enemy.x,
        y: enemy.y
      })),
      interactive: editor?.map.elements.map((el) => el.map((e) => e.asset?.id ?? 0))
    })

    try {
      await navigator.clipboard.writeText(map)
    } catch (e) {
      console.error(e)
    }
  }

  const onMapSetChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMapSet(e.target.value as any)
    editor?.setLayer(e.target.value as any)
  }

  const onSetColumns = (e: React.ChangeEvent<HTMLInputElement>): void => {
    editor?.setColumns(+e.target.value)
    setColumns(+e.target.value)
  }

  const onSetRows = (e: React.ChangeEvent<HTMLInputElement>): void => {
    editor?.setRows(+e.target.value)
    setRows(+e.target.value)
  }

  const setEnemy = (type: EnemyObject['type']) => {
    setActiveEnemy(type)
    editor?.setEnemy(type)
  }

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <canvas id="canvas" />
      </div>

      <div className={styles.edit}>
        <EditorButton onClick={save}>Save</EditorButton>

        <div>
          <select value={mapSet} onChange={onMapSetChange}>
            <>
              <option value="powerStation">Power Station</option>
              <option value="greenZone">Green zone</option>
              <option value="industrialZone">Industrial zone</option>
            </>
          </select>
        </div>

        <div>
          <p>Columns</p>
          <input type="number" min={1} max={200} value={columns} onChange={onSetColumns} />
        </div>

        <div>
          <p>Rows</p>
          <input type="number" min={1} max={200} value={rows} onChange={onSetRows} />
        </div>
        <div>
          <EditorButton onClick={() => editor?.clearMap()}>Clear</EditorButton>
        </div>

        <EnemyTiles setEnemy={setEnemy} enemy={activeEnemy} />

        <Tiles mapSet={mapSet} editor={editor} tileType="obstacle" setActiveTile={setActiveTile} />
        <Tiles mapSet={mapSet} editor={editor} tileType="backgroundTile" setActiveTile={setActiveTile} />
        <Tiles mapSet={mapSet} editor={editor} tileType="decoration" setActiveTile={setActiveTile} />
        <Tiles mapSet="none" editor={editor} tileType="interactive" setActiveTile={setActiveTile} />
        <Tiles mapSet="none" editor={editor} tileType="decoration" setActiveTile={setActiveTile} />

        <hr />
        <h3>Current tile</h3>
        <div className={styles.activeElement}>
          <img src={activeTile?.asset} alt={activeTile?.asset} width="100%" />
        </div>
      </div>
    </div>
  )
}

interface TilesProps {
  mapSet: MapSet
  tileType: TileType
  editor?: Editor
  setActiveTile: (tile: Tile | null) => void
}

const Tiles = ({ mapSet, editor, tileType, setActiveTile }: TilesProps): React.ReactElement => (
  <>
    <hr />
    <h3>{tileType}</h3>
    <div className={styles.elements}>
      {tileList
        .filter((tile) => tile?.set === mapSet)
        .filter((tile) => tile?.type === tileType)
        .map((tile) => (
          <div className={styles.imgContainer} key={tile?.asset}>
            <img
              src={tile?.asset}
              alt="tile"
              onClick={() => {
                setActiveTile(tile)
                if (tileType === 'backgroundTile') {
                  editor?.setLayer('bgTiles')
                } else if (tileType === 'decoration') {
                  editor?.setLayer('decorations')
                } else if (tileType === 'obstacle') {
                  editor?.setLayer('tiles')
                } else if (tileType === 'interactive') {
                  editor?.setLayer('interactive')
                } else {
                  console.error('no layer!!!')
                }
                editor?.setCurrentAsset(editor.assets.getById(tile?.id))
              }}
            />
          </div>
        ))}
      <div
        onClick={() => {
          setActiveTile(null)
          editor?.setCurrentAsset(null)
        }}
      >
        empty
      </div>
    </div>
  </>
)

export default EditorComponent
