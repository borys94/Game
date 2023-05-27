import React from 'react'

import styles from './Card.module.scss'

type Props = {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardOverlay} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Card
