import { useEffect, useState } from 'react'
import { EditorButton } from '../../common/EditorButton'
import { Input } from '../../common/Input'
import Modal, { ModalButtonBar, ModalContent } from '../../common/Modal/Modal'

type Props = {
  open: boolean
  width: number
  height: number
  name: string
  handleSave: (name: string, width: number, height: number) => void
  handleClose: () => void
}

const EditMapModal = ({ open, width, height, name, handleClose, handleSave }: Props) => {
  const [draftName, setName] = useState('')
  const [draftWidth, setWidth] = useState(0)
  const [draftHeight, setHeight] = useState(0)

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value
    setWidth(value)
  }

  const onSetHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value
    setHeight(value)
  }

  const onMapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSave = () => {
    handleSave(draftName, draftWidth, draftHeight)
    handleClose()
  }

  useEffect(() => {
    if (open) {
      setHeight(height)
      setWidth(width)
      setName(name)
    }
  }, [open]) // eslint-disable-line

  return (
    <Modal open={open} onClose={handleClose} title="Edit">
      <ModalContent>
        <Input label="Map name" value={draftName} onChange={onMapNameChange} />
        <Input label="Width" value={draftWidth} onChange={onWidthChange} type="number" width="30px" />
        <Input label="Height" value={draftHeight} onChange={onSetHeight} type="number" />
        <Input label="Clear map" value={draftHeight} onChange={onSetHeight} type="checkbox" />
      </ModalContent>
      <ModalButtonBar>
        <EditorButton variant="danger" onClick={handleClose}>
          Delete map
        </EditorButton>
        <EditorButton onClick={onSave}>Save</EditorButton>
      </ModalButtonBar>
    </Modal>
  )
}

export default EditMapModal
