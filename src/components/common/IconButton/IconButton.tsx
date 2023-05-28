import React from 'react'
import styles from './IconButton.module.scss'

interface Props {
  icon: string
  onClick?: () => void
}

export const IconButton = ({ icon, onClick }: Props) => (
  <button className={styles.iconButton} onClick={onClick}>
    <img src={`icons/${icon}.svg`} />
  </button>
)
