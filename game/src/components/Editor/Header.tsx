import { useEffect, useState } from 'react'
import { EditorButton } from '../common/EditorButton'
import { IconButton } from '../common/IconButton/IconButton'
import { Input } from '../common/Input'
import { Select } from '../common/Select/Select'
import styles from './Header.module.scss'
import mapStore, { MapDetails } from '../../game/mapStore'
import Editor from '../../lib/editor'
import Map from '../../game/map/map'
import Modal, { ModalButtonBar, ModalContent } from '../common/Modal/Modal'

type Props = {
  editor?: Editor
}

const Header = ({ editor }: Props) => {
  const [maps, setMaps] = useState<MapDetails[]>([])
  const [currentMap, setCurrentMap] = useState<MapDetails>()
  const [mapName, setMapName] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [editModalOpen, setEditModalOpen] = useState(false)

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value
    editor?.setColumns(value)
    setWidth(value)
  }

  const onSetHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value
    editor?.setRows(value)
    setHeight(value)
  }

  const onMapChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const mapDetails = maps.find((savedMap) => savedMap.name === e.target.value)!
    setCurrentMap(mapDetails)
    setMapName(mapDetails.name)
    editor!.map = new Map(editor!.player.game, mapDetails.map)
    editor!.map.loadEnemies()

    console.log(mapDetails)
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

      editor.map = new Map(editor.player.game, maps[0].map)
      editor.map.loadEnemies()
    }
  }, [editor])

  return (
    <div className={styles.header}>
      <Input label="Width" value={width} onChange={onWidthChange} type="number" width="30px" />
      <Input label="Height" value={height} onChange={onSetHeight} type="number" />
      <Select onChange={onMapChange} value={currentMap?.name}>
        {maps.map((map) => (
          <option value={map.name} key={map.name}>
            {map.name}
          </option>
        ))}
      </Select>
      <EditorButton>+</EditorButton>
      <EditorButton onClick={() => setEditModalOpen(true)}>Edit</EditorButton>
      <EditorButton>Save</EditorButton>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edycja">
        <ModalContent>
          <Input label="Map name" value={width} onChange={onWidthChange} />
          <div>
            <Input label="Width" value={width} onChange={onWidthChange} type="number" width="30px" />
          </div>
          <div>
            <Input label="Height" value={height} onChange={onSetHeight} type="number" />
          </div>
        </ModalContent>
        <ModalButtonBar>
          <EditorButton>Cancel</EditorButton>
          <EditorButton>Save</EditorButton>
        </ModalButtonBar>
      </Modal>

      {/* <dialog data-modal open>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog> */}
      {/* <IconButton icon='zoom-in' /> */}
    </div>
  )
}

export default Header
