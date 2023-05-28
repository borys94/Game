import { useEffect, useState } from 'react'
import { EditorButton } from '../../common/EditorButton'
import { Input } from '../../common/Input'
import Modal, { ModalButtonBar, ModalContent } from '../../common/Modal/Modal'
import { Checkbox } from '../../common/Checkbox/Checkbox'

type Props = {
  open: boolean
  width: number
  height: number
  name: string
  handleSave: (name: string, width: number, height: number, clearMap: boolean) => void
  handleClose: () => void
  handleDelete: () => void
}

const EditMapModal = ({ open, width, height, name, handleClose, handleSave, handleDelete }: Props) => {
  const [draftName, setName] = useState('')
  const [draftWidth, setWidth] = useState(0)
  const [draftHeight, setHeight] = useState(0)
  const [clearMap, setClearMap] = useState(false)

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(+e.target.value)
  }

  const onSetHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(+e.target.value)
  }

  const onMapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSave = () => {
    handleSave(draftName, draftWidth, draftHeight, clearMap)
    handleClose()
  }

  const onDelete = () => {
    handleDelete()
    handleClose()
  }

  useEffect(() => {
    if (open) {
      setHeight(height)
      setWidth(width)
      setName(name)
      setClearMap(false)
    }
  }, [open]) // eslint-disable-line

  return (
    <Modal open={open} onClose={handleClose} title="Edit">
      {/* <InfoBar>XXX</InfoBar> */}
      <ModalContent>
        <Input label="Map name" value={draftName} onChange={onMapNameChange} />
        <Input label="Width" value={draftWidth} onChange={onWidthChange} type="number" width="30px" />
        <Input label="Height" value={draftHeight} onChange={onSetHeight} type="number" />
        <Checkbox label="Clear map" checked={clearMap} onChange={() => setClearMap(!clearMap)} />
      </ModalContent>
      <ModalButtonBar>
        <EditorButton variant="danger" onClick={onDelete}>
          Delete map
        </EditorButton>
        <EditorButton onClick={onSave}>Save</EditorButton>
      </ModalButtonBar>
    </Modal>
  )
}

export default EditMapModal
