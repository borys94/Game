import React from 'react'
import styles from './Button.module.scss'

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({
  children,
  onClick
}: Props) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
)
