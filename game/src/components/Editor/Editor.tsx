import React, { useEffect, useRef, useState } from 'react'
import Editor from '../../lib/editor'
import tileList, { type TileType, type Tile, type MapSet } from '../../tiles'
import styles from './Editor.module.scss'
// import { NativeSelect, InputNumber, Typography, Button } from 'tiny-ui'
import EnemyTiles from './EnemyTiles'
import { type EnemyObject } from '../../game/characters/enemy'
import { EditorButton } from '../common/EditorButton'
import mapStore, { MapDetails, MapType } from '../../game/mapStore'
import Map from '../../game/map/map'
import Header from './Header'
import useFetch from '../../hooks/useFetch'
import { AssetFrameDetail } from '../../game/assetLoader'
import mapConfig from '../../game/config/map.json'
import gunsConfig from '../../game/config/gunPack.json'

let ed: Editor | undefined

function EditorComponent() {
  const [editor, setEditor] = useState<Editor>()
  const [mapSet, setMapSet] = useState<MapSet>('powerStation')
  const [activeFrame, setActiveFrame] = useState<AssetFrameDetail | null>()
  const [activeEnemy, setActiveEnemy] = useState<EnemyObject['type'] | null>(null)
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)
  const [savedMaps, setSavedMaps] = useState<MapDetails[]>([])
  const [curentMap, setCurrentMap] = useState<MapDetails>()
  const [name, setName] = useState('Nazwa mapy')

  useEffect(() => {
    if (ed != null) {
      return
    }
    ed = new Editor()
    ;(window as any).ed = ed
    setEditor(ed)
    setColumns(ed.map.elements.tiles[0].length)
    setRows(ed.map.elements.tiles.length)

    const maps = mapStore.getMaps()

    setSavedMaps(maps)
    if (maps.length) {
      setCurrentMap(maps[0])
      setName(maps[0].name)

      ed.map = new Map(ed.player.game, maps[0].map)
      ed.map.loadEnemies()
    }

    return () => {
      editor?.destroy()
    }
  }, [])

  const save = async (): Promise<void> => {
    const map = {
      tiles: editor?.map.elements.tiles!,
      decorations: editor?.map.elements.decorationElements.map((el) => el.map((e) => e.asset?.id ?? 0))!,
      bgTiles: editor?.map.elements.bgTiles!,
      enemies: editor?.map.enemies.map((enemy) => ({
        type: enemy.type,
        x: enemy.x,
        y: enemy.y
      }))!,
      interactive: editor?.map.elements.elements.map((el) => el.map((e) => e.asset?.id ?? 0))!
    }


    setSavedMaps([...mapStore.addMap(name, map)])

    try {
      await navigator.clipboard.writeText(JSON.stringify(map))
    } catch (e) {
      console.error(e)
    }
  }

  const onMapSetChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMapSet(e.target.value as any)
    editor?.setLayer(e.target.value as any)
  }

  const setEnemy = (type: EnemyObject['type']) => {
    setActiveEnemy(type)
    editor?.setEnemy(type)
  }

  const deleteCurrentMap = () => {
    if (!curentMap) {
      return
    }
    const newMaps = mapStore.deleteMap(curentMap.name)
    setSavedMaps([...newMaps])
    setCurrentMap(newMaps[0])
    setName(newMaps[0]?.name ?? 'Nazwa mapy')
  }

  return (
    <div className={styles.container}>
      <Header editor={editor} />
      <div className={styles.content}>
        <div className={styles.editor}>
          <canvas id="canvas" />
        </div>

        <div className={styles.edit}>
          <EditorButton onClick={save}>Save</EditorButton>
          <p>Zapisane mapy:</p>
          <div>
            <div>
              <span>Nazwa mapy:</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <button onClick={deleteCurrentMap}>Delete this map</button>
          </div>

          <hr />

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
            <EditorButton onClick={() => editor?.clearMap()}>Clear</EditorButton>
          </div>

          <EnemyTiles setEnemy={setEnemy} enemy={activeEnemy} />
          {editor && <AllTiles setActiveFrame={setActiveFrame} editor={editor} frames={mapConfig.frames} />}

          <hr />
          <h3>Current tile</h3>
          {/* <div className={styles.activeElement}>
            <img src={activeTile?.asset} alt={activeTile?.asset} width="100%" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

const AllTiles = ({
  frames,
  editor,
  setActiveFrame
}: {
  editor: Editor
  frames: AssetFrameDetail[]
  setActiveFrame: (tile: AssetFrameDetail | null) => void
}) => {
  const [ready, setReady] = useState(false)
  const [img, setImg] = useState<HTMLImageElement>()
  const [gunsImg, setGunsImg] = useState<HTMLImageElement>()

  const tiles = frames.filter((f) => f.name.includes('tile'))
  const bgTiles = frames.filter((f) => f.name.includes('bgTile'))
  const decorations = frames.filter((f) => f.name.includes('decoration'))
  const animatedDecoration = frames.filter((f) => f.name.includes('animatedDecoration'))
  const interactive = frames.filter((f) => f.name.includes('interactive'))
  const guns = gunsConfig.frames.filter((f) => f.name.startsWith('gun-'))

  // console.log(img)
  // const { w, h } = ed!.assetLoader.get

  const getData = () => {
    const img = editor.assetLoader.getImage('map')
    const gunsImg = editor.assetLoader.getImage('gunPack')
    if (!img) {
      console.error('wtf????')
      return
    }

    setReady(true)
    setGunsImg(gunsImg)
    setImg(img)
    if (!img) {
      return
    }
  }

  useEffect(() => {
    // TODO
    setTimeout(getData, 500)
  }, [])

  console.log(guns)

  return (
    <div>
      <p>Tiles</p>
      {ready &&
        img &&
        tiles.map((f) => (
          <SingleTile
            editor={editor}
            tileType="obstacle"
            key={f.id}
            setActiveFrame={setActiveFrame}
            img={img}
            frame={f}
          />
        ))}
      <SingleTile editor={editor} tileType="obstacle" setActiveFrame={() => setActiveFrame(null)} />
      <p>Background tiles</p>
      {ready &&
        img &&
        bgTiles.map((f) => (
          <SingleTile
            editor={editor}
            tileType="backgroundTile"
            key={f.id}
            setActiveFrame={setActiveFrame}
            img={img}
            frame={f}
          />
        ))}
      <SingleTile editor={editor} tileType="backgroundTile" setActiveFrame={() => setActiveFrame(null)} />
      <p>Decorations</p>
      {ready &&
        img &&
        decorations.map((f) => (
          <SingleTile
            editor={editor}
            tileType="decoration"
            key={f.id}
            setActiveFrame={setActiveFrame}
            img={img}
            frame={f}
          />
        ))}
      <SingleTile editor={editor} tileType="decoration" setActiveFrame={() => setActiveFrame(null)} />
      <p>Animated decorations</p>
      {ready &&
        img &&
        animatedDecoration.map((f) => (
          <SingleTile
            editor={editor}
            tileType="decoration"
            key={f.id}
            setActiveFrame={setActiveFrame}
            img={img}
            frame={f}
          />
        ))}
      <SingleTile editor={editor} tileType="decoration" setActiveFrame={() => setActiveFrame(null)} />
      <p>Interactive</p>
      {ready &&
        img &&
        interactive.map((f) => (
          <SingleTile
            editor={editor}
            tileType="interactive"
            key={f.id}
            setActiveFrame={setActiveFrame}
            img={img}
            frame={f}
          />
        ))}
      <SingleTile editor={editor} tileType="interactive" setActiveFrame={() => setActiveFrame(null)} />

      <p>Guns</p>
      {ready &&
        img &&
        guns.map((f) => (
          <SingleTile
            type="guns"
            editor={editor}
            tileType="interactive"
            key={f.name}
            setActiveFrame={setActiveFrame}
            img={gunsImg}
            frame={f}
          />
        ))}
      <SingleTile type="guns" editor={editor} tileType="interactive" setActiveFrame={() => setActiveFrame(null)} />
    </div>
  )
}

type SingleTileProps = {
  img?: HTMLImageElement
  frame?: AssetFrameDetail
  tileType: TileType
  editor: Editor
  type?: 'guns'
  setActiveFrame: (tile: AssetFrameDetail | null) => void
}

const SingleTile = ({ img, frame, tileType, editor, type, setActiveFrame }: SingleTileProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !img) {
      return
    }

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !frame) {
      return
    }

    ctx.drawImage(
      img,
      frame.frame.x,
      frame.frame.y,
      frame.frame.w / (frame.frames ?? 1),
      frame.frame.h,
      0,
      0,
      frame.frame.w / (frame.frames ?? 1),
      frame.frame.h
    )

    return () => ctx.clearRect(0, 0, frame.frame.w / (frame.frames ?? 1), frame.frame.h)
  }, [img])

  const onClick = () => {
    setActiveFrame(frame ?? null)
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

    if (type === 'guns') {
      editor.assetPack = 'guns'
      editor?.setCurrentAsset((frame && editor.assetLoader.getByName(frame.name)) || null)
      // console.log(frame, frame && editor.assetLoader.getByName(frame.name) || null)
    } else {
      editor.assetPack = 'map'
      editor?.setCurrentAsset((frame?.id && editor.assetLoader.getById(frame.id)) || null)
    }
  }

  if (!frame) {
    return <div onClick={onClick}>CLEAR</div>
  }

  return (
    <canvas
      title={frame.name}
      onClick={onClick}
      ref={canvasRef}
      width={frame.frame.w / (frame.frames ?? 1)}
      height={frame.frame.h}
    />
  )
}

const Guns = ({ editor }: { editor: Editor }) => {
  return <div>Guns</div>
}

export default EditorComponent
