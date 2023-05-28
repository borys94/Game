import React from 'react'
import styles from './EditorButton.module.scss'
import classnames from 'classnames'

type Props = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'danger'
  onClick?: () => void
} & Omit<React.InputHTMLAttributes<HTMLButtonElement>, 'size'>

export const EditorButton = ({ children, variant = 'primary', size = 'medium', onClick }: Props) => (
  <div className={classnames(styles.buttonWrapper, styles[size], styles[variant])}>
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
    <div className={styles.buttonBorder}></div>
  </div>
)
