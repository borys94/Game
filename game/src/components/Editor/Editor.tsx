import React, { useEffect, useRef, useState } from 'react'
import Editor from '../../lib/editor'
import { type TileType, type MapSet } from '../../tiles'
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
import Card from '../common/Card/Card'

// let ed: Editor | undefined

function EditorComponent() {
  const [editor, setEditor] = useState<Editor>()
  const [activeEnemy, setActiveEnemy] = useState<EnemyObject['type'] | null>(null)
  const [curentMap, setCurrentMap] = useState<MapDetails>()

  useEffect(() => {
    const editor = new Editor()
    ;(window as any).ed = editor
    setEditor(editor)

    const maps = mapStore.getMaps()

    if (maps.length) {
      setCurrentMap(maps[0])

      editor.map = new Map(editor.player.game, maps[0].map)
    }

    return () => {
      editor.destroy()
    }
  }, [])

  const setEnemy = (type: EnemyObject['type']) => {
    setActiveEnemy(type)
    editor?.setEnemy(type)
  }

  const deleteCurrentMap = () => {
    if (!curentMap) {
      return
    }
    const newMaps = mapStore.deleteMap(curentMap.name)
    setCurrentMap(newMaps[0])
  }

  return (
    <div className={styles.container}>
      {/* <canvas id="canvas" /> */}
      <Header editor={editor} />
      <div className={styles.content}>
        <div className={styles.editor}>
          <canvas id="canvas" />
        </div>

        <div className={styles.edit}>
          <div>
            <button onClick={deleteCurrentMap}>Delete this map</button>
          </div>

          <Card>
            <span>Enemies</span>
            <EnemyTiles setEnemy={setEnemy} enemy={activeEnemy} />
          </Card>
          {editor && <AllTiles editor={editor} frames={mapConfig.frames} />}
        </div>
      </div>
    </div>
  )
}

const AllTiles = ({ frames, editor }: { editor: Editor; frames: AssetFrameDetail[] }) => {
  const [ready, setReady] = useState(false)
  const [img, setImg] = useState<HTMLImageElement>()
  const [gunsImg, setGunsImg] = useState<HTMLImageElement>()

  const tiles = frames.filter((f) => f.name.includes('tile'))
  const bgTiles = frames.filter((f) => f.name.includes('bgTile'))
  const decorations = frames.filter((f) => f.name.includes('decoration'))
  const animatedDecoration = frames.filter((f) => f.name.includes('animatedDecoration'))
  const interactive = frames.filter((f) => f.name.includes('interactive'))
  const guns = gunsConfig.frames.filter((f) => f.name.startsWith('gun-'))

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

  return (
    <>
      <Card>
        <span>Tiles</span>
        {ready &&
          img &&
          tiles.map((f) => <SingleTile editor={editor} tileType="obstacle" key={f.id} img={img} frame={f} />)}
        <SingleTile editor={editor} tileType="obstacle" />
      </Card>
      <Card>
        <span>Background tiles</span>
        {ready &&
          img &&
          bgTiles.map((f) => <SingleTile editor={editor} tileType="backgroundTile" key={f.id} img={img} frame={f} />)}
        <SingleTile editor={editor} tileType="backgroundTile" />
      </Card>
      <Card>
        <span>Decorations</span>
        {ready &&
          img &&
          decorations.map((f) => <SingleTile editor={editor} tileType="decoration" key={f.id} img={img} frame={f} />)}
        <SingleTile editor={editor} tileType="decoration" />
      </Card>
      <Card>
        <span>Animated decorations</span>
        {ready &&
          img &&
          animatedDecoration.map((f) => (
            <SingleTile editor={editor} tileType="decoration" key={f.id} img={img} frame={f} />
          ))}
        <SingleTile editor={editor} tileType="decoration" />
      </Card>
      <Card>
        <span>Interactive</span>
        {ready &&
          img &&
          interactive.map((f) => <SingleTile editor={editor} tileType="interactive" key={f.id} img={img} frame={f} />)}
        <SingleTile editor={editor} tileType="interactive" />
      </Card>
      <Card>
        <span>Guns</span>
        {ready &&
          img &&
          guns.map((f) => (
            <SingleTile type="guns" editor={editor} tileType="interactive" key={f.name} img={gunsImg} frame={f} />
          ))}
        <SingleTile type="guns" editor={editor} tileType="interactive" />
      </Card>
    </>
  )
}

type SingleTileProps = {
  img?: HTMLImageElement
  frame?: AssetFrameDetail
  tileType: TileType
  editor: Editor
  type?: 'guns'
}

const SingleTile = ({ img, frame, tileType, editor, type }: SingleTileProps) => {
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
