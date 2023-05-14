import React, { useEffect, useState } from 'react'
import Editor from '../lib/editor'
import tileList, { type TileType, type Tile, type MapSet } from '../tiles'
import styles from './Editor.module.scss'
import { NativeSelect, InputNumber, Typography, Button } from 'tiny-ui'
// import config from '../game/config'

// const CANVAS_WIDTH = config.CANVAS_WIDTH * config.SCALE
// const CANVAS_HEIGHT = config.CANVAS_HEIGHT * config.SCALE

let ed: Editor | undefined

function EditorComponent (): React.ReactElement {
  const [editor, setEditor] = useState<Editor>()
  const [mapSet, setMapSet] = useState<MapSet>('powerStation')
  const [activeTile, setActiveTile] = useState<Tile | null>()
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    if (ed) {
      return
    }
    ed = new Editor();
    (window as any).ed = ed
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
      decorations: editor?.map.decorations,
      bgTiles: editor?.map.bgImages,
      interactive: editor?.map.elements.map(el => el.map(e => e.asset?.id ?? 0))
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

  const onSetColumns = (value: number): void => {
    editor?.setColumns(value)
    setColumns(value)
  }

  const onSetRows = (value: number): void => {
    editor?.setRows(value)
    setRows(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <canvas id="canvas" />
      </div>

      <div className={styles.edit}>

        <Button onClick={save}>Save</Button>

        <div>
          <NativeSelect value={mapSet} onChange={onMapSetChange}>
            <>
              <NativeSelect.Option value="powerStation">Power Station</NativeSelect.Option>
              <NativeSelect.Option value="greenZone">Green zone</NativeSelect.Option>
              <NativeSelect.Option value="industrialZone">Industrial zone</NativeSelect.Option>
            </>
          </NativeSelect>
        </div>

        <div>
          <Typography.Text>Columns</Typography.Text>
          <InputNumber min={1} max={200} value={columns} onChange={onSetColumns} />
        </div>

        <div>
          <Typography.Text>Rows</Typography.Text>
          <InputNumber min={1} max={200} value={rows} onChange={onSetRows} />
        </div>
        <div>
          <Button onClick={() => editor?.clearMap()}>Clear</Button>
        </div>

        <Tiles mapSet={mapSet} editor={editor} tileType='obstacle' setActiveTile={setActiveTile} />
        <Tiles mapSet={mapSet} editor={editor} tileType='backgroundTile' setActiveTile={setActiveTile} />
        <Tiles mapSet={mapSet} editor={editor} tileType='decoration' setActiveTile={setActiveTile} />
        <Tiles mapSet="none" editor={editor} tileType='interactive' setActiveTile={setActiveTile} />
        <Tiles mapSet="none" editor={editor} tileType='decoration' setActiveTile={setActiveTile} />

        <hr />
        <Typography.Heading level={3}>Current tile</Typography.Heading>
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

const Tiles = ({
  mapSet,
  editor,
  tileType,
  setActiveTile
}: TilesProps): React.ReactElement => (
  <>
  <hr />
    <Typography.Heading level={3}>{tileType}</Typography.Heading>
    <div className={styles.elements}>
      {tileList.filter(tile => tile?.set === mapSet).filter(tile => tile?.type === tileType).map((tile) => (
        <div className={styles.imgContainer} key={tile?.asset}>
          <img
            src={tile?.asset}
            alt='tile'
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
