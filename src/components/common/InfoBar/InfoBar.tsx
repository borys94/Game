import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from './InfoBar.module.scss'
import { RootState } from '../../../store'
import { useEffect } from 'react'
import { deleteMessage } from '../../../store/infoBar'

// TODO: add animations
const InfoBar = () => {
  const message = useSelector((store: RootState) => store.infoBar.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) {
      return
    }
    const timeout = setTimeout(() => dispatch(deleteMessage()), 5000)
    return () => clearTimeout(timeout)
  }, [message]) // eslint-disable-line

  if (!message) {
    return null
  }

  return (
    <div className={styles.infoBar}>
      <Card>{message}</Card>
    </div>
  )
}

export default InfoBar
