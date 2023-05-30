import { useEffect, useState } from 'react'
import { EditorButton } from '../common/EditorButton'
import { Select } from '../common/Select/Select'
import styles from './Header.module.scss'
import mapStore, { MapDetails } from '../../game/mapStore'
import Editor from '../../lib/editor'
import Map from '../../game/map/map'
import EditMapModal from './EditMapModal/EditMapModal'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useAddMessage from '../../hooks/useAddMessage'
import CreateMapModal from './CreateMapModal'

type Props = {
  editor: Editor
}

const Header = ({ editor }: Props) => {
  const [maps, setMaps] = useState<MapDetails[]>([])
  const [currentMap, setCurrentMap] = useState<MapDetails>()
  const [mapName, setMapName] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const addMessage = useAddMessage()
  const navigate = useNavigate()

  const onMapChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const mapDetails = maps.find((savedMap) => savedMap.name === e.target.value)!
    setCurrentMap(mapDetails)
    setMapName(mapDetails.name)
    // mapDetails.map.enemies = mapDetails.map.enemies.map(e => ({...e, type: 'dog1'}))
    editor!.map = new Map(editor!.player.game, mapDetails.map)
  }

  const onSave = (name: string, width: number, height: number, clearMap: boolean) => {
    if (!editor) {
      throw new Error('Editor must be defined')
    }
    setHeight(height)
    setWidth(width)
    setMapName(name)
    setCurrentMap(maps.find((map) => map.name === name))
    editor.setRows(height)
    editor.setColumns(width)

    if (clearMap) {
      editor.clearMap()
    }

    addMessage('Map has been updated')
  }

  const deleteCurrentMap = () => {
    if (!currentMap) {
      return
    }
    const newMaps = mapStore.deleteMap(currentMap.name)
    setMaps(newMaps)
    setCurrentMap(newMaps[0])
    addMessage('Map has been deleted')
  }

  const saveToLocalStorage = async (): Promise<void> => {
    const map = getMap()
    setMaps([...mapStore.addMap(mapName, map)])
    addMessage('Map has been saved')

    try {
      await navigator.clipboard.writeText(JSON.stringify(map))
    } catch (e) {
      console.error(e)
    }
  }

  const getMap = () => {
    return {
      tiles: editor.map.elements.tiles!,
      decorations: editor.map.elements.decorationElements.map((el) => el.map((e) => e.asset?.id ?? 0))!,
      bgTiles: editor.map.elements.bgTiles!,
      enemies: editor.map.enemies.map((enemy) => ({
        type: enemy.type,
        x: enemy.x,
        y: enemy.y
      }))!,
      interactive: editor.map.elements.elements.map((el) => el.map((e) => e.asset?.id ?? 0))!,
      // TODO
      finish: {
        x: 50,
        y: 20
      },
      player: {
        x: 50,
        y: 20
      }
    }
  }

  const play = async () => {
    await saveToLocalStorage()
    navigate({
      pathname: '/',
      search: createSearchParams({
        mapName
      }).toString()
    })
  }

  useEffect(() => {
    if (!editor) {
      return
    }
    setWidth(editor.map.elements.tiles[0].length)
    setHeight(editor.map.elements.tiles.length)

    const maps = mapStore.getMaps()

    setMaps(maps)
    if (maps.length) {
      setCurrentMap(maps[0])
      setMapName(maps[0].name)
      // maps[0].map.enemies = maps[0].map.enemies.map(e => ({...e, type: 'dog1'}))

      editor.map = new Map(editor.player.game, maps[0].map)
    }
  }, [editor])

  return (
    <div>
      <div className={styles.header}>
        <div>
          <Select onChange={onMapChange} value={currentMap?.name}>
            {maps.map((map) => (
              <option value={map.name} key={map.name}>
                {map.name}
              </option>
            ))}
          </Select>
          <EditorButton onClick={() => setEditModalOpen(true)}>Edit</EditorButton>
          <EditorButton onClick={play}>Play</EditorButton>
        </div>
        <div>
          <EditorButton onClick={() => setCreateModalOpen(true)}>Create a new map</EditorButton>
          <EditorButton onClick={saveToLocalStorage}>Save</EditorButton>
        </div>

        <EditMapModal
          open={editModalOpen}
          width={width}
          height={height}
          name={mapName}
          handleClose={() => setEditModalOpen(false)}
          handleDelete={deleteCurrentMap}
          handleSave={onSave}
        />

        <CreateMapModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />
      </div>
      <div className={styles.hr} />
    </div>
  )
}

export default Header
