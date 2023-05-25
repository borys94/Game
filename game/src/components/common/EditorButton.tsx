import React from 'react'
import styles from './EditorButton.module.scss'

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export const EditorButton = ({ children, onClick }: Props) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
)
