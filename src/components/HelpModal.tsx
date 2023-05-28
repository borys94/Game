import Modal, { ModalContent } from './common/Modal/Modal'

type Props = {
  open: boolean
  handleClose: () => void
}

const HelpModal = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose} title="Help">
      <ModalContent>
        <h2>TODO</h2>
      </ModalContent>
    </Modal>
  )
}

export default HelpModal
