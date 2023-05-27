import { useEffect, useState } from 'react'
import { EditorButton } from './common/EditorButton'
import { Input } from './common/Input'
import Modal, { ModalButtonBar, ModalContent } from './common/Modal/Modal'

type Props = {
  open: boolean
  handleClose: () => void
}

const HelpModal = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose} title="Help">
      <ModalContent>
        <h2>Guns</h2>
      </ModalContent>
    </Modal>
  )
}

export default HelpModal
