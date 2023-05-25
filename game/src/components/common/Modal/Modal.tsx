import styles from './Modal.module.scss'

type Props = {
  children: React.ReactNode
  title: string
  open: boolean
  onClose: () => void
}

const Modal = ({ open, onClose, title, children }: Props) => {
  if (!open) {
    return null
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalTitle}>{title}</div>
        {children}
      </div>
    </div>
  )
}

export const ModalContent = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className={styles.modalContent}>
      {children}
    </div>
  )
}

export const ModalButtonBar = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className={styles.modalButtonBar}>
      {children}
    </div>
  )
}

export default Modal
