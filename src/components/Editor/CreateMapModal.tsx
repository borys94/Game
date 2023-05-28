import { useEffect, useState } from 'react'
import { EditorButton } from '../common/EditorButton'
import { Input } from '../common/Input'
import Modal, { ModalButtonBar, ModalContent } from '../common/Modal/Modal'
import { Checkbox } from '../common/Checkbox/Checkbox'
import { Select } from '../common/Select/Select'
import powerStationMap from '../../maps/templates/powerStation'
import { MapDetails } from '../../game/mapStore'

const templates: MapDetails[] = [
  {
    name: 'Power station',
    map: powerStationMap
  }
]

type Props = {
  open: boolean
  handleClose: () => void
}

const CreateMapModal = ({ open, handleClose }: Props) => {
  const [draftName, setName] = useState('')
  const [draftWidth, setWidth] = useState(0)
  const [draftHeight, setHeight] = useState(0)
  const [templateSelected, setTemplateSelected] = useState(false)
  const [currentMap, setCurrentMap] = useState<string>()

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(+e.target.value)
  }

  const onSetHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(+e.target.value)
  }

  const onMapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMap(e.target.value)
  }

  const onSave = () => {
    handleClose()
  }

  useEffect(() => {
    if (open) {
      setHeight(20)
      setWidth(50)
      setName('')
    }
  }, [open]) // eslint-disable-line

  return (
    <Modal open={open} onClose={handleClose} title="Create a new map">
      <ModalContent>
        <Input label="Map name" value={draftName} onChange={onMapNameChange} />
        <Checkbox
          label="Select template"
          checked={templateSelected}
          onChange={() => setTemplateSelected(!templateSelected)}
        />

        {!templateSelected && (
          <>
            <Input label="Width" value={draftWidth} onChange={onWidthChange} type="number" width="30px" />
            <Input label="Height" value={draftHeight} onChange={onSetHeight} type="number" />
          </>
        )}

        {templateSelected && (
          <Select onChange={onTemplateChange} value={currentMap}>
            {templates.map((map) => (
              <option value={map.name} key={map.name}>
                {map.name}
              </option>
            ))}
          </Select>
        )}
      </ModalContent>
      <ModalButtonBar>
        <EditorButton variant="danger" onClick={handleClose}>
          Cancel
        </EditorButton>
        <EditorButton onClick={onSave}>Create</EditorButton>
      </ModalButtonBar>
    </Modal>
  )
}

export default CreateMapModal
