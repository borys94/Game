import React from 'react'
import styles from './Button.module.scss'
import classnames from 'classnames'
import sounds from '../../game/sounds'

type Props = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'danger'
  onClick?: () => void
} & Omit<React.InputHTMLAttributes<HTMLButtonElement>, 'size'>

export const Button = ({ children, variant = 'primary', size = 'medium', onClick }: Props) => (
  <div
    className={classnames(styles.buttonWrapper, styles[size], styles[variant])}
    onMouseEnter={() => sounds.menuSound()}
  >
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
    <div className={styles.buttonBorder}></div>
  </div>
)

type IconButton = {
  children: React.ReactNode
  onClick?: () => void
}

export const IconButton = ({ children, onClick }: IconButton) => (
  // <div className={classnames(styles.buttonWrapper)} onMouseEnter={() => sounds.menuSound()}>
  <button className={classnames(styles.iconButton)} onClick={onClick} onMouseEnter={() => sounds.menuSound()}>
    {children}
  </button>
  // </div>
)
